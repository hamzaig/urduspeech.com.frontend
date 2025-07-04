# Email Setup Guide

## Overview
The password reset functionality requires email configuration to send password reset links to users. Currently, the system uses a development mode that logs emails to the console.

## Development Mode
In development mode, emails are logged to the console instead of being sent. You can see the email content in your terminal when testing password reset functionality.

## Production Email Setup

### Option 1: Gmail SMTP
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. Add these environment variables to your `.env.local`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=UrduSpeech <noreply@urduspeech.com>
```

### Option 2: Other SMTP Providers
You can use any SMTP provider (SendGrid, Mailgun, etc.) by updating the environment variables:

```env
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
SMTP_FROM=UrduSpeech <noreply@urduspeech.com>
```

### Option 3: Email Service Providers
For better deliverability, consider using email service providers:

#### SendGrid
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

#### Mailgun
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=your-mailgun-username
SMTP_PASS=your-mailgun-password
```

## Testing Password Reset

### Development Testing
1. Go to `/forgot-password`
2. Enter a registered email address
3. Check the console for the reset token
4. Use the "Test Reset Password" button or manually visit `/reset-password?token=YOUR_TOKEN`

### Production Testing
1. Configure email settings as above
2. Go to `/forgot-password`
3. Enter a registered email address
4. Check the email inbox for the reset link
5. Click the link to reset the password

## Email Templates
The system includes professionally designed email templates for:
- Password reset emails
- Welcome emails (for new users)

Templates are located in `lib/email-service.ts` and can be customized as needed.

## Troubleshooting

### Common Issues
1. **Emails not sending**: Check SMTP credentials and firewall settings
2. **Reset links not working**: Verify `NEXT_PUBLIC_APP_URL` is set correctly
3. **Token expiration**: Reset tokens expire after 1 hour

### Debug Mode
To see email content in development, check the console logs. The system will log:
- Email recipient
- Email subject
- Email content

### Security Notes
- Reset tokens are automatically cleared after use
- Tokens expire after 1 hour
- The system doesn't reveal if an email exists (security best practice)
- All passwords are hashed using bcrypt 