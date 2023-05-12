import { BasicBot } from "./BasicBot";

export class BasicBotRandom extends BasicBot {
	async _sendResponse(message) {
		let answer = Math.floor(100 * Math.random());
		await this.sendTelegramMessageAsync(message.from.id, answer);
		this._onSend(message);
	}
}