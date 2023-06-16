import { BasicBot } from './BasicBot';
import { setStorageItem, getStorageItem } from '@services/localStorage.js';

export class BasicBotQuestion extends BasicBot {
  constructor(initSettings) {
    super(initSettings);
  }

  async _sendResponse(update) {
    const questions = [
      {
        question:
          'Какой год основания Санкт-Петербурга? Выберите следующие ответы: A) 1689, B) 1703, C) 1721',
        answer: 'B',
      },
      {
        question:
          'Кто изображен на банкноте в 100 рублей? Выберите следующие ответы: A) Пушкин, B) Сталин, C) Ленин',
        answer: 'A',
      },
      {
        question:
          'Как называется самое высокое здание в мире? Выберите следующие ответы: A) Москва-сити, B) Бурдж Халифа, C) Пизанская башня',
        answer: 'B',
      },
      {
        question:
          'Какое озеро самое большое? Выберите следующие ответы: A) Байкал, B) Мисисипи, C) Оклахома',
        answer: 'A',
      },
    ];

    if (!getStorageItem('numberOfQuestion')) {
      setStorageItem('numberOfQuestion', 0);
    }

    if (!getStorageItem('listOfQuestions')) {
      setStorageItem('listOfQuestions', JSON.stringify(questions));
    }

    if (
      update.message?.text !== '/start' &&
      update.message?.text !== 'A' &&
      update.message?.text !== 'B' &&
      update.message?.text !== 'C' &&
      update.message?.text !== 'D'
    ) {
      console.log(update.message?.text);
      this.sendTelegramMessageAsync(update.message?.from.id, 'Ответ некорректный');
      this._onSend(update);
      return;
    }

    if (update.message?.text === '/start') {
      if (Number(getStorageItem('numberOfQuestion')) !== 0) {
        this.sendTelegramMessageAsync(
          update.message?.from.id,
          'Привет, видимо вы ответили не на все вопросы, продолжим,' +
            JSON.parse(getStorageItem('listOfQuestions'))[getStorageItem('numberOfQuestion')]
              .question,
        );
        this._onSend(update);
        return;
      }
      setStorageItem('numberOfQuestion', 0);
      this.sendTelegramMessageAsync(
        update.message?.from.id,
        'Привет! Ответьте на первый вопрос:\n' +
          JSON.parse(getStorageItem('listOfQuestions'))[getStorageItem('numberOfQuestion')]
            .question +
          ' в ответе нужно указать только букву ответа',
      );
      this._onSend(update);
      return;
    }

    if (
      update.message?.text ===
      JSON.parse(getStorageItem('listOfQuestions'))[getStorageItem('numberOfQuestion')].answer
    ) {
      setStorageItem('numberOfQuestion', Number(getStorageItem('numberOfQuestion')) + 1);
      if (
        Number(getStorageItem('numberOfQuestion')) ==
        JSON.parse(getStorageItem('listOfQuestions')).length
      ) {
        this.sendTelegramMessageAsync(
          update.message?.from.id,
          'Отлично, вы ответили на все вопросы',
        );
        this._onSend(update);
        setStorageItem('numberOfQuestion', 0);
        return;
      }
      this.sendTelegramMessageAsync(
        update.message?.from.id,
        'Хорошо, вот следующий вопрос:\n' +
          JSON.parse(getStorageItem('listOfQuestions'))[getStorageItem('numberOfQuestion')]
            .question,
      );
      this._onSend(update);
      return;
    } else {
      setStorageItem('numberOfQuestion', Number(getStorageItem('numberOfQuestion')) + 1);
      this.sendTelegramMessageAsync(
        update.message?.from.id,
        'Хорошо, вот следующий вопрос:\n' +
          JSON.parse(getStorageItem('listOfQuestions'))[getStorageItem('numberOfQuestion')]
            .question,
      );
      this._onSend(update);
      return;
    }
  }
}
