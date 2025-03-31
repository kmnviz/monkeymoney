import TelegramBot from 'node-telegram-bot-api';

class TelegramBotClient {

  bot;
  channelId;
  premiumChannelId;
  projectMarsChannelId;

  constructor() {
    this.bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);
    this.channelId = process.env.TELEGRAM_BET_BRO_CHANNEL_ID;
    this.premiumChannelId = process.env.TELEGRAM_BET_BRO_PREMIUM_CHANNEL_ID;
    this.projectMarsChannelId = process.env.TELEGRAM_BET_BRO_PROJECT_MARS_CHANNEL_ID;
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

  async sendMessageToPremiumChannel(message) {
    try {
      const response = await this.bot.sendMessage(this.premiumChannelId, message, {
        disable_web_page_preview: true,
      });
      console.log('Message sent to premium channel: ', response.message_id);
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  async sendMessageToProjectMars(message) {
    try {
      const response = await this.bot.sendMessage(this.projectMarsChannelId, message, {
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
