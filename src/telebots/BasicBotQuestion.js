import { BasicBot } from './BasicBot';
import { setStorageItem, getStorageItem } from '@services/localStorage.js';

export class BasicBotQuestion extends BasicBot {
  constructor(initSettings) {
    super(initSettings);
  }

  async _sendResponse(update) {
    if (!getStorageItem('numberOfQuestion')) {
      setStorageItem('numberOfQuestion', 0);
    }

    const questions = [
      { question: 'Какой год основания Санкт-Петербурга?', answer: '1703' },
      { question: 'Кто изображен на банкноте в 100 рублей?', answer: 'Пушкин' },
      { question: 'Как называется самое высокое здание в мире?', answer: 'Бурдж Халифа' },
      { question: 'Какаое озеро самое большое?', answer: 'Байкал' },
    ];

    if (update.message?.text === '/start') {
      this.sendTelegramMessageAsync(
        update.message?.from.id,
        'Привет! Ответьте на первый вопрос:\n' +
          questions[getStorageItem('numberOfQuestion')].question,
      );
      this._onSend(update);
      return;
    }

    if (update.message?.text === questions[getStorageItem('numberOfQuestion')].answer) {
      setStorageItem('numberOfQuestion', Number(getStorageItem('numberOfQuestion')) + 1);
      if (Number(getStorageItem('numberOfQuestion')) == questions.length) {
        this.sendTelegramMessageAsync(
          update.message?.from.id,
          'Правильно, вы ответили на все вопросы',
        );
        this._onSend(update);
        setStorageItem('numberOfQuestion', 0);
        return;
      }
      this.sendTelegramMessageAsync(
        update.message?.from.id,
        'Правильно, вот следующий вопрос:\n' +
          questions[getStorageItem('numberOfQuestion')].question,
      );
      this._onSend(update);
      return;
    } else {
      this.sendTelegramMessageAsync(update.message?.from.id, 'Не верно, попробуйте снова');
      this._onSend(update);
    }
  }
}
