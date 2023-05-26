export class BasicBot {
  static settings = {
    intervalTime: 15000,
  };

  static isProcessed(message, processedIdArr) {
    return processedIdArr.includes(message.message_id);
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
			test3: '1236',
			test4: '1237',
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
			const messages = await this.getTelegramMessagesAsync();
			messages
				.filter((message) => !BasicBot.isProcessed(message, this._processedIds))
				.forEach((message) => this._sendResponse(message));
		} catch (e) {
			console.log(e);
		}
	};

  async _sendResponse(message) {
    let answer = this.settings.greeting || 'hi!';
    if (message.text === '/start') {
      answer = 'vot du yu vont?';
    }
    await this.sendTelegramMessageAsync(message.from.id, answer);
    this._onSend(message);
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

  _onSend(message) {
    if (this.onSendCallback) {
      this.onSendCallback(message);
    }
    this.saveProcessedMessageId(message.message_id);
  }
}
