import nodemailer from 'nodemailer';

class ZohoMailerClient {

  transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.ZOHO_HOST,
      port: process.env.ZOHO_PORT,
      secure: true,
      auth: {
        user: process.env.ZOHO_EMAIL,
        pass: process.env.ZOHO_PASSWORD,
      },
    });
  }

  async sendEmail(to: string[], subject: string, message: string) {
      try {
        return await this.transporter.sendMail({
          from: `BetBro AI ${process.env.ZOHO_EMAIL}`,
          to: to,
          subject: subject,
          text: message,
        });
      } catch (error) {
        console.log(`ZohoMailerClient.sendEmails.error: `, error);
        throw error;
      }
  }
}

export default ZohoMailerClient;
