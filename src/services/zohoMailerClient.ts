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

  async sendEmails(recipients: string[], subject: string, message: string) {
    const batchSize = 30;
    const totalRecipients = recipients.length;

    try {
      const responses = [];
      for (let i = 0; i < totalRecipients; i += batchSize) {
        const batchRecipients = recipients.slice(i, i + batchSize);

        const response = await this.transporter.sendMail({
          from: `BetBro AI ${process.env.ZOHO_EMAIL}`,
          to: '',
          bcc: batchRecipients,
          subject: subject,
          text: message,
        });

        responses.push(response);
      }

      return responses;
    } catch (error) {
      console.log(`ZohoMailerClient.sendEmails.error: `, error);
      throw error;
    }
  }
}

export default ZohoMailerClient;
