import { BasicBot } from './BasicBot';

export class BasicBotRandom extends BasicBot {
  async _sendResponse(update) {
    let answer = Math.floor(100 * Math.random());
    await this.sendTelegramMessageAsync(update.message?.from.id, answer);
    this._onSend(update);
  }
}
