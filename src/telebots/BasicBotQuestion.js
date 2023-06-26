import { BasicBot } from './BasicBot';
import { setStorageItem, getStorageItem } from '@services/localStorage.js';

export class BasicBotQuestion extends BasicBot {
  constructor(initSettings) {
    super(initSettings);
    this.initQuestion();
  }

  initQuestion() {
    if (!getStorageItem('numberOfQuestion')) {
      setStorageItem('numberOfQuestion', 0);
    }
  }

  async _sendResponse(update) {
    // if (!getStorageItem('numberOfQuestion')) {
    //   setStorageItem('numberOfQuestion', 0);
    // };

    if (!getStorageItem(update.message.chat.first_name)) {
      setStorageItem(update.message.chat.first_name, JSON.stringify([]));
    }
    const isTextCurrectAnswer =
      update.message?.text === 'A' ||
      update.message?.text === 'B' ||
      update.message?.text === 'C' ||
      update.message?.text === 'D';
    const isTextStart = update.message?.text === '/start';
    const currentQuestion = getStorageItem('numberOfQuestion');
    const questionsList = JSON.parse(getStorageItem('listOfQuestions'));
    const isCurrentQuestionFirst = Number(currentQuestion) === 0;

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
            questionsList[currentQuestion].question,
        );
        this._onSend(update);
        return;
      }
      setStorageItem('numberOfQuestion', 0);
      this.sendTelegramMessageAsync(
        update.message?.from.id,
        'Привет! Ответьте на первый вопрос:\n' +
          questionsList[currentQuestion].question +
          ' в ответе нужно указать только букву ответа',
      );
      this._onSend(update);
      return;
    }

    if (update.message?.text === questionsList[currentQuestion].answer) {
      setStorageItem('numberOfQuestion', Number(currentQuestion) + 1);
      if (Number(currentQuestion) >= questionsList.length) {
        ///////////

        let newAnswer = JSON.parse(getStorageItem(update.message.chat.first_name));
        newAnswer.push(update.message?.text);
        if (
          JSON.parse(getStorageItem(update.message.chat.first_name)).length >= questionsList.length
        ) {
          newAnswer = [];
        }
        console.log(newAnswer);
        setStorageItem(update.message.chat.first_name, JSON.stringify(newAnswer));

        //////////////

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
        'Хорошо, вот следующий вопрос:\n' + questionsList[currentQuestion].question,
      );

      ////////////////////////////////////////////

      if (JSON.parse(getStorageItem(update.message.chat.first_name)).length > 0) {
        let newAnswer = JSON.parse(getStorageItem(update.message.chat.first_name));
        newAnswer.push(update.message?.text);
        if (
          JSON.parse(getStorageItem(update.message.chat.first_name)).length >= questionsList.length
        ) {
          newAnswer = [];
        }
        console.log(newAnswer);
        setStorageItem(update.message.chat.first_name, JSON.stringify(newAnswer));
      }

      if (JSON.parse(getStorageItem(update.message.chat.first_name)).length == 0) {
        let newAnswer = [update.message?.text];
        console.log(newAnswer);
        setStorageItem(update.message.chat.first_name, JSON.stringify(newAnswer));
      }

      ///////////////////////////////////////////////
      this._onSend(update);
      return;
    } else {
      setStorageItem('numberOfQuestion', Number(currentQuestion) + 1);
      if (Number(currentQuestion) >= questionsList.length) {
        ///////////

        let newAnswer = JSON.parse(getStorageItem(update.message.chat.first_name));
        newAnswer.push(update.message?.text);
        console.log(newAnswer);
        setStorageItem(update.message.chat.first_name, JSON.stringify(newAnswer));

        //////////////
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
        'Хорошо, вот следующий вопрос:\n' + questionsList[currentQuestion].question,
      );
      //////////////////////////////////////////////////////////////////////

      if (JSON.parse(getStorageItem(update.message.chat.first_name)).length > 0) {
        let newAnswer = JSON.parse(getStorageItem(update.message.chat.first_name));
        newAnswer.push(update.message?.text);
        if (
          JSON.parse(getStorageItem(update.message.chat.first_name)).length >= questionsList.length
        ) {
          newAnswer = [];
        }
        console.log(newAnswer);
        setStorageItem(update.message.chat.first_name, JSON.stringify(newAnswer));
      }

      if (JSON.parse(getStorageItem(update.message.chat.first_name)).length == 0) {
        let newAnswer = [update.message?.text];
        console.log(newAnswer);
        setStorageItem(update.message.chat.first_name, JSON.stringify(newAnswer));
      }

      /////////////////////////////////////////////////////////
      this._onSend(update);
      return;
    }
  }
}
