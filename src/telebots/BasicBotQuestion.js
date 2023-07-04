import { BasicBot } from './BasicBot';
import { setStorageItem, getStorageItem } from '@services/localStorage.js';

export class BasicBotQuestion extends BasicBot {
  constructor(initSettings) {
    super(initSettings);
  }

  async _sendResponse(update) {
    if (!getStorageItem('questionBot01')) {
      setStorageItem(
        'questionBot01',
        JSON.stringify(
          {
            users: {
              [update.message.chat.id]: {
                name: update.message.chat.first_name,
                numberOfQuestions: 0,
                answers: [],
              },
            },
            processedUpdatesIds: [],
          },
          '445634545',
        ),
      );
    }

    const isTextCurrectAnswer =
      update.message?.text === '1' ||
      update.message?.text === '2' ||
      update.message?.text === '3' ||
      update.message?.text === '4';
    const isTextStart = update.message?.text === '/start';
    const questionsList = JSON.parse(getStorageItem('listOfQuestions'));
    const users = JSON.parse(getStorageItem('questionBot01'));
    const isCurrentQuestionFirst =
      Number(users['users'][update.message.chat.id].numberOfQuestions) === 0;
    const localUser = users;
    const isCurrentUser = Object.keys(users).find(
      (item) => item.name == update.message.chat.first_name,
    );

    if (users['users']) {
      if (isCurrentUser) {
        users['users'][update.message.chat.id] = {
          name: update.message.chat.first_name,
          numberOfQuestions: 0,
          answers: [],
        };
        setStorageItem('questionBot01', users);
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
            questionsList[users['users'][update.message.chat.id].numberOfQuestions].question,
        );
        this._onSend(update);
        return;
      }
      this.sendTelegramMessageAsync(
        update.message?.from.id,
        'Привет! Ответьте на первый вопрос:\n' +
          questionsList[users['users'][update.message.chat.id].numberOfQuestions].question +
          ' в ответе нужно указать только букву ответа',
      );
      this._onSend(update);
      return;
    }

    localUser['users'][update.message.chat.id].numberOfQuestions++;
    setStorageItem('questionBot01', JSON.stringify(localUser));

    if (Number(users['users'][update.message.chat.id].numberOfQuestions) >= questionsList.length) {
      localUser['users'][update.message.chat.id].numberOfQuestions = 0;
      setStorageItem('questionBot01', JSON.stringify(localUser));
      this.sendTelegramMessageAsync(update.message?.from.id, 'Отлично, вы ответили на все вопросы');
      let local = JSON.parse(getStorageItem('questionBot01'));
      local['users'][update.message.chat.id]['answers'].push(update.message?.text);
      local['users'][update.message.chat.id].numberOfQuestions = 0;
      setStorageItem('questionBot01', JSON.stringify(local));
      this._onSend(update);
      return;
    }

    this.sendTelegramMessageAsync(
      update.message?.from.id,
      'Хорошо, вот следующий вопрос:\n' +
        questionsList[users['users'][update.message.chat.id].numberOfQuestions].question,
    );
    this._onSend(update);

    let local = JSON.parse(getStorageItem('questionBot01'));
    local['users'][update.message.chat.id]['answers'].push(update.message?.text);
    setStorageItem('questionBot01', JSON.stringify(local));
  }
}
