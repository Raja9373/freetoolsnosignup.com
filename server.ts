import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { checkRateLimit, validateSubmission, sendContactEmail } from './src/server/emailService';

// Load environment variables if available
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parsing middleware with size safety
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));

  // Request IP extraction helper
  const getClientIp = (req: express.Request): string => {
    const forwarded = req.headers['x-forwarded-for'];
    if (typeof forwarded === 'string') {
      return forwarded.split(',')[0].trim();
    }
    return req.socket?.remoteAddress || '127.0.0.1';
  };

  // API Health Check
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'FreeToolsNoSignup Backend',
      timestamp: new Date().toISOString(),
    });
  });

  // API Email System Status
  app.get('/api/contact/status', (_req, res) => {
    const hasResend = Boolean(process.env.RESEND_API_KEY);
    const hasSmtp = Boolean(process.env.SMTP_HOST || process.env.SMTP_USER);
    const hasSendgrid = Boolean(process.env.SENDGRID_API_KEY);

    let activeProvider = 'Local Delivery Channel (Configurable via ENV)';
    if (hasResend) activeProvider = 'Resend Verified API';
    else if (hasSmtp) activeProvider = 'Custom SMTP Mail Server';
    else if (hasSendgrid) activeProvider = 'SendGrid API';

    res.json({
      configured: true,
      provider: activeProvider,
      supportEmail: 'support@freetoolsnosignup.com',
      destinationConfigured: true,
      rateLimitSecured: true,
      spamHoneypotSecured: true,
      replyToEnabled: true,
    });
  });

  // API Contact Form Submission Handler
  app.post('/api/contact', async (req, res) => {
    try {
      const clientIp = getClientIp(req);

      // 1. Rate Limiting Check
      const rateLimitCheck = checkRateLimit(clientIp);
      if (!rateLimitCheck.allowed) {
        return res.status(429).json({
          success: false,
          error: `Too many submissions from your connection. Please wait ${rateLimitCheck.retryAfterSeconds || 60} seconds before sending another message.`,
        });
      }

      // 2. Input Validation & Sanitization (Honeypot + Header Injection + RFC 5322)
      const userAgent = req.headers['user-agent'] || '';
      const validation = validateSubmission({
        ...req.body,
        ip: clientIp,
        userAgent,
      });

      if (!validation.valid || !validation.cleanData) {
        return res.status(400).json({
          success: false,
          error: validation.error || 'Invalid form submission.',
        });
      }

      // 3. Dispatch Email with Destination & Reply-To
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
          error: 'An error occurred while transmitting your message to the support queue. Please retry or contact support@freetoolsnosignup.com directly.',
        });
      }
    } catch (err: any) {
      console.error('Unhandled contact route exception:', err);
      return res.status(500).json({
        success: false,
        error: 'An unexpected internal error occurred. Please try again later.',
      });
    }
  });

  // Vite middleware for development vs static asset serving for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 FreeToolsNoSignup Full-Stack Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
