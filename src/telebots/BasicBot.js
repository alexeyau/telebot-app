export class BasicBot {
  static settings = {
    intervalTime: 15000,
  };

  static isProcessed(id, processedIdArr) {
    return processedIdArr.includes(id);
  }

  constructor(initSettings) {
    const {
      onSendCallback,
      saveProcessedMessageId,
      getProcessedMessagesIds,
      getTelegramMessagesAsync,
      sendTelegramMessageAsync,
      name,
    } = initSettings;

    this.settings = {
      test1: '1234',
      test2: '1235',
    };

    this.onSendCallback = onSendCallback;
    this.saveProcessedMessageId = saveProcessedMessageId;
    this.getProcessedMessagesIds = getProcessedMessagesIds;
    this.getTelegramMessagesAsync = getTelegramMessagesAsync;
    this.sendTelegramMessageAsync = sendTelegramMessageAsync;

    this._processedIds = [];
    this._interval = null;
    this.name = name || 'BasicBot';
  }

  _doWork = async () => {
    console.log(' tic/tac > ', new Date());
    try {
      this._processedIds = this.getProcessedMessagesIds(this.botName);
      const updates = await this.getTelegramMessagesAsync();
      updates
        .filter(
          (update) => update.message && !BasicBot.isProcessed(update.update_id, this._processedIds),
        )
        .forEach((update) => this._sendResponse(update));
    } catch (e) {
      console.log(e);
    }
  };

  async _sendResponse(update) {
    let answer = this.settings.greeting || 'hi!';
    if (update.message?.text === '/start') {
      answer = 'vot du yu vont?';
    }
    await this.sendTelegramMessageAsync(update.message?.from.id, answer);
    this._onSend(update);
  }

  start() {
    this.interval = setInterval(
      this._doWork,
      this.settings.intervalTime || BasicBot.settings.intervalTime,
    );
  }

  stop() {
    clearInterval(this.interval);
  }

  _onSend(update) {
    if (this.onSendCallback) {
      this.onSendCallback(update.message);
    }
    this.saveProcessedMessageId(update.update_id);
  }
}
