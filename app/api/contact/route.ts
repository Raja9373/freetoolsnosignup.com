import { checkRateLimit, validateSubmission, sendContactEmail } from '../../../src/server/emailService';

export async function POST(request: Request) {
  try {
    const forwarded = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const clientIp = forwarded.split(',')[0].trim();

    // 1. Rate Limiting Check
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

    const body = await request.json().catch(() => ({}));
    const userAgent = request.headers.get('user-agent') || '';

    // 2. Input Validation & Sanitization
    const validation = validateSubmission({
      ...body,
      ip: clientIp,
      userAgent,
    });

    if (!validation.valid || !validation.cleanData) {
      return Response.json(
        {
          success: false,
          error: validation.error || 'Invalid form submission.',
        },
        { status: 400 }
      );
    }

    // 3. Dispatch Email with Destination & Reply-To
    const emailResult = await sendContactEmail(validation.cleanData);

    return Response.json(
      {
        success: emailResult.success,
        message: emailResult.message,
        provider: emailResult.provider,
      },
      { status: emailResult.success ? 200 : 500 }
    );
  } catch (err: any) {
    console.error('Unhandled contact API route error:', err);
    return Response.json(
      {
        success: false,
        error: 'An unexpected internal error occurred. Please try again later.',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json({
    status: 'ok',
    service: 'FreeToolsNoSignup Contact API',
    destinationConfigured: true,
    supportEmail: 'hello@freetoolsnosignup.com',
  });
}
