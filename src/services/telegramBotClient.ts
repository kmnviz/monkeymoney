import TelegramBot from 'node-telegram-bot-api';

class TelegramBotClient {

  bot;
  channelId;

  constructor() {
    this.bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);
    this.channelId = process.env.TELEGRAM_BET_BRO_CHANNEL_ID;
  }

  async sendMessage(message) {
    try {
      const response = await this.bot.sendMessage(this.channelId, message, {
        disable_web_page_preview: true,
      });
      console.log('Message sent: ', response.message_id);
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
}

export default TelegramBotClient;
