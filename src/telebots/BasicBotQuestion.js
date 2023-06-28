import { BasicBot } from './BasicBot';
import { setStorageItem, getStorageItem } from '@services/localStorage.js';

export class BasicBotQuestion extends BasicBot {
  constructor(initSettings) {
    super(initSettings);
  }

  // initQuestion() {
  // }

  async _sendResponse(update) {
    if (!getStorageItem('users')) {
      setStorageItem(
        'users',
        JSON.stringify({
          [update.message.chat.id]: {
            name: update.message.chat.first_name,
            numberOfQuestions: 0,
            answers: [],
          },
        }),
      );
    }

    const isTextCurrectAnswer =
      update.message?.text === '1' ||
      update.message?.text === '2' ||
      update.message?.text === '3' ||
      update.message?.text === '4';
    const isTextStart = update.message?.text === '/start';
    const questionsList = JSON.parse(getStorageItem('listOfQuestions'));
    const users = JSON.parse(getStorageItem('users'));
    const isCurrentQuestionFirst = Number(users[update.message.chat.id].numberOfQuestions) === 0;
    const localUser = users;
    const isCurrentUser = Object.keys(users).find(
      (item) => item.name == update.message.chat.first_name,
    );

    if (users) {
      if (isCurrentUser) {
        users[update.message.chat.id] = {
          name: update.message.chat.first_name,
          numberOfQuestions: 0,
          answers: [],
        };
        setStorageItem('users', users);
      }
    }

    if (!isTextStart && !isTextCurrectAnswer) {
      if (isCurrentQuestionFirst) {
        this.sendTelegramMessageAsync(
          update.message?.from.id,
          'Привет, это бот-опросник, для начала введите "/start"',
        );
        this._onSend(update);
        return;
      }
      this.sendTelegramMessageAsync(update.message?.from.id, 'Ответ некорректный');
      this._onSend(update);
      return;
    }

    if (isTextStart) {
      if (!isCurrentQuestionFirst) {
        this.sendTelegramMessageAsync(
          update.message?.from.id,
          'Привет, видимо вы ответили не на все вопросы, продолжим,' +
            questionsList[users[update.message.chat.id].numberOfQuestions].question,
        );
        this._onSend(update);
        return;
      }
      this.sendTelegramMessageAsync(
        update.message?.from.id,
        'Привет! Ответьте на первый вопрос:\n' +
          questionsList[users[update.message.chat.id].numberOfQuestions].question +
          ' в ответе нужно указать только букву ответа',
      );
      this._onSend(update);
      return;
    }

    localUser[update.message.chat.id].numberOfQuestions++;
    setStorageItem('users', JSON.stringify(localUser));

    if (Number(users[update.message.chat.id].numberOfQuestions) >= questionsList.length) {
      localUser[update.message.chat.id].numberOfQuestions = 0;
      setStorageItem('users', JSON.stringify(localUser));
      this.sendTelegramMessageAsync(update.message?.from.id, 'Отлично, вы ответили на все вопросы');
      this._onSend(update);
      localUser[update.message.chat.id].answers.push(update.message?.text);
      localUser[update.message.chat.id].numberOfQuestions = 0;
      setStorageItem('users', JSON.stringify(localUser));
      return;
    }

    this.sendTelegramMessageAsync(
      update.message?.from.id,
      'Хорошо, вот следующий вопрос:\n' +
        questionsList[users[update.message.chat.id].numberOfQuestions].question,
    );
    this._onSend(update);

    localUser[update.message.chat.id].answers.push(update.message?.text);
    setStorageItem('users', JSON.stringify(localUser));
  }
}
