export class BasicBot {
  static settings = {
    intervalTime: 10000,
  }

  static isProcessed(message, processedIdArr) {
    return processedIdArr.includes(message.id);
  }

  constructor (initSettings) {
    const {
      onSendCallback,
      saveProcessedMessageId,
      getProcessedMessagesId,
      getTelegramMessages,
      sendTelegramMessage,
      botName,
    } = initSettings;

    this.onSendCallback = onSendCallback;
    this.saveProcessedMessageId = saveProcessedMessageId;
    this.getProcessedMessagesId = getProcessedMessagesId;
    this.getTelegramMessages = getTelegramMessages;
    this.sendTelegramMessage = sendTelegramMessage;

    this._processedIds = [];
    this._interval = null;
    this.botName = botName || "BasicBot";
  }

  async _doWork () {
    console.log(' > ', new Date());
    try {
      this._processedIds = this.getProcessedMessagesId(this.botName);
      const messages = await this.getTelegramMessages();
      messages
        .filter((message) => !BasicBot.isProcessed(message, this._processedIds))
        .forEach((message) => this._sendResponse(message));
    } catch (e) {
      console.log(e);
    }
  }

  async _sendResponse(message) {
    await this.sendTelegramMessage('hi!', message.from.id);
    this._onSend(message);
  }

  start() {
    this.interval = setInterval(this._doWork, BasicBot.settings.intervalTime);
  }

  stop() {
    clearInterval(this.interval);
  }

  _onSend(message) {
    if (this.onSendCallback) {
      this.onSendCallback(message);
      this.saveProcessedMessageId(this.botName, message.id); // id?
    }
  }

}
