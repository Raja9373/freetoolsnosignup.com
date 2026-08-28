import { checkRateLimit, validateSubmission, sendContactEmail } from '../src/server/emailService';

export default async function handler(req: any, res: any) {
  // 1. Web API Request/Response (Edge or Next/Vercel standard fetch format)
  if (typeof Request !== 'undefined' && req instanceof Request) {
    try {
      if (req.method === 'GET') {
        return Response.json({
          status: 'ok',
          service: 'FreeToolsNoSignup Contact API',
          destinationConfigured: true,
          supportEmail: 'hello@freetoolsnosignup.com',
        });
      }
      const forwarded = req.headers.get('x-forwarded-for') || '127.0.0.1';
      const clientIp = forwarded.split(',')[0].trim();
      const rateLimitCheck = checkRateLimit(clientIp);
      if (!rateLimitCheck.allowed) {
        return Response.json(
          {
            success: false,
            error: `Too many submissions from your connection. Please wait ${rateLimitCheck.retryAfterSeconds || 60} seconds before sending another message.`,
          },
          { status: 429 }
        );
      }
      const body = await req.json().catch(() => ({}));
      const userAgent = req.headers.get('user-agent') || '';
      const validation = validateSubmission({ ...body, ip: clientIp, userAgent });
      if (!validation.valid || !validation.cleanData) {
        return Response.json({ success: false, error: validation.error || 'Invalid form submission.' }, { status: 400 });
      }
      const emailResult = await sendContactEmail(validation.cleanData);
      return Response.json(
        { success: emailResult.success, message: emailResult.message, provider: emailResult.provider },
        { status: emailResult.success ? 200 : 500 }
      );
    } catch (err: any) {
      return Response.json({ success: false, error: 'An unexpected internal error occurred.' }, { status: 500 });
    }
  }

  // 2. Node.js IncomingMessage / ServerResponse (Vercel Node Serverless handler)
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'ok',
      service: 'FreeToolsNoSignup Contact API',
      destinationConfigured: true,
      supportEmail: 'hello@freetoolsnosignup.com',
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const forwarded = req.headers ? (req.headers['x-forwarded-for'] || req.headers['x-real-ip']) : null;
    const clientIp = typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : (req.socket?.remoteAddress || '127.0.0.1');

    const rateLimitCheck = checkRateLimit(clientIp);
    if (!rateLimitCheck.allowed) {
      return res.status(429).json({
        success: false,
        error: `Too many submissions from your connection. Please wait ${rateLimitCheck.retryAfterSeconds || 60} seconds before sending another message.`,
      });
    }

    const body = req.body || {};
    const userAgent = (req.headers ? req.headers['user-agent'] : '') || '';
    const validation = validateSubmission({ ...body, ip: clientIp, userAgent });

    if (!validation.valid || !validation.cleanData) {
      return res.status(400).json({
        success: false,
        error: validation.error || 'Invalid form submission.',
      });
    }

    const emailResult = await sendContactEmail(validation.cleanData);
    if (emailResult.success) {
      return res.status(200).json({
        success: true,
        message: emailResult.message,
        provider: emailResult.provider,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Unable to process your message at this moment. Please email hello@freetoolsnosignup.com directly.',
      });
    }
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: 'An unexpected internal error occurred. Please try again later.',
    });
  }
}
