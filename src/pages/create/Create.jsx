import { useState, useEffect, createRef } from 'react';

import { BasicBotRandom } from '@/telebots/BasicBotRandom';
import { BasicBot } from '@/telebots/BasicBot';
import { BasicBotQuestion } from '@/telebots/BasicBotQuestion';
import { getTelegramMessages, sendTelegramMessage } from '@services/telegramAPI.js';

import { getStorageItem, setStorageItem } from '@services/localStorage.js';

import Layout from '@/components/Layout';
import EditQuestions from '@/components/EditQuestion';
import AboutBot from '@/components/AboutBot';

import './Create.css';
import { BasicBotChatGPT } from '@/telebots/BasicBotChatGPT';

const RANDOM_BOT_NAME = 'randomBot001';
const SIMPLE_BOT_NAME = 'simpleBot01';
const QUESTION_BOT_NAME = 'questionBot01';
const GPT_BOT_NAME = 'botName_gpt0';

function Create() {
  const listOfQuestion = getStorageItem('listOfQuestions');
  const inputRefGpt = createRef();

  const questions = [
    {
      question:
        'Какой год основания Санкт-Петербурга? Выберите следующие ответы: 1) 1689, 2) 1703, 3) 1721',
      answer: '2',
      id: 0,
    },
    {
      question:
        'Кто изображен на банкноте в 100 рублей? Выберите следующие ответы: 1) Пушкин, 2) Сталин, 3) Ленин',
      answer: '1',
      id: 1,
    },
    {
      question:
        'Как называется самое высокое здание в мире? Выберите следующие ответы: 1) Москва-сити, 2) Бурдж Халифа, 3) Пизанская башня',
      answer: '2',
      id: 2,
    },
  ];

  const token = getStorageItem('actualKey');
  const [isRuningBot, setIsRuningBot] = useState(false);
  const [isClassInputBot, setisClassInputBot] = useState(true);
  const [botName, setBotName] = useState('');

  const [isSimpleBotActive, setIsSimpleBotActive] = useState(false);
  const [isRandomBotActive, setIsRandomBotActive] = useState(false);
  const [isQuestionBotActive, setIsQuestionBotActive] = useState(false);
  const [isGPTBotActive, setIsGPTBotActive] = useState(false);

  const createBot = () => {
    if (!token) return;
    if (!botName) return;
    const tokenGpt = inputRefGpt.current?.value;
    const settings = {
      name: botName,
      saveProcessedMessageId: (mId) => {
        const botData = JSON.parse(getStorageItem(botName) || '{}');
        const nextBotData = JSON.stringify({
          ...botData,
          processedUpdatesIds: [...(botData.processedUpdatesIds || []), mId],
        });
        setStorageItem(botName, nextBotData);
      },
      getProcessedMessagesIds: () => {
        const botData = JSON.parse(getStorageItem(botName) || '{}');
        return botData.processedUpdatesIds || [];
      },
      getTelegramMessagesAsync: async (lastUpdateId) => {
        return getTelegramMessages(token, lastUpdateId).then((readyData) => {
          return readyData.result;
        });
      },
      sendTelegramMessageAsync: async (userId, messageText) => {
        return sendTelegramMessage(token, {
          chat_id: userId,
          text: messageText,
        });
      },
      onSendCallback: () => {
        console.log('callback: message sent');
      },
      chatGPTKey: tokenGpt,
    };
    if (botName === RANDOM_BOT_NAME) {
      const bot = new BasicBotRandom(settings);
      bot.start();
      setIsRuningBot(true);
    }
    if (botName === SIMPLE_BOT_NAME) {
      const bot = new BasicBot(settings);
      bot.start();
      setIsRuningBot(true);
    }
    if (botName === QUESTION_BOT_NAME) {
      const bot = new BasicBotQuestion(settings);
      bot.start();
      setIsRuningBot(true);
    }
    if (botName === GPT_BOT_NAME) {
      const bot = new BasicBotChatGPT(settings);
      bot.start();
      setIsRuningBot(true);
    }
  };

  const chooseBotRandom = () => {
    setBotName(RANDOM_BOT_NAME);
    setIsQuestionBotActive(false);
    setIsSimpleBotActive(false);
    setIsRandomBotActive(true);
    setIsGPTBotActive(false);
  };
  const chooseBotSimple = () => {
    setBotName(SIMPLE_BOT_NAME);
    setIsQuestionBotActive(false);
    setIsSimpleBotActive(true);
    setIsRandomBotActive(false);
    setIsGPTBotActive(false);
  };
  const chooseBotGPT = () => {
    setBotName(GPT_BOT_NAME);
    setIsQuestionBotActive(false);
    setIsSimpleBotActive(false);
    setIsRandomBotActive(false);
    setIsGPTBotActive(true);
  };
  const chooseBotQuestion = () => {
    if (!listOfQuestion) {
      setStorageItem('listOfQuestions', JSON.stringify(questions));
    }
    setIsQuestionBotActive(true);
    setIsSimpleBotActive(false);
    setIsRandomBotActive(false);
    setIsGPTBotActive(false);
    setBotName(QUESTION_BOT_NAME);
  };

  const saveToStorage = (event) => {
    setStorageItem('actualKey', event.target.value);
    if (event.target.value) {
      setisClassInputBot(true);
    } else {
      setisClassInputBot(false);
    }
  };

  return (
    <Layout>
      <div className='create'>
        <div className='create-entry-token'>
          <h3>Enter Token:</h3>
          <input
            className={isClassInputBot ? 'settings_input' : 'settings_input_other'}
            placeholder='Token to access the HTTP API'
            type='text'
            defaultValue={getStorageItem('actualKey')}
            onChange={saveToStorage}
          />
        </div>

        <AboutBot />

        {!isRuningBot && (
          <div className='create-runing'>
            <ul className='create-choose-bot'>
              <li className='create-list'>
                <h2>Choose Simple Bot Instance</h2>
                <h3>
                  Наш телеграмм бот - это универсальный помощник для вашей повседневной жизни.
                </h3>
                <button
                  className={
                    isSimpleBotActive ? 'create-button-choose_active' : 'create-button-choose'
                  }
                  onClick={chooseBotSimple}
                >
                  Choose!
                </button>
              </li>

              <li className='create-list'>
                <h2>Choose Random Bot Instance</h2>
                <h3>
                  Этот телеграмм бот - ваш личный генератор случайных чисел! Бот генерирует числа с
                  использованием настоящего случайного алгоритма, что гарантирует их полную
                  случайность и непредсказуемость. Никаких повторений, никаких шаблонов - только
                  чистые случайные числа, чтобы помочь вам в любом задании, которое требует
                  использования случайных данных!
                </h3>
                <button
                  className={
                    isRandomBotActive ? 'create-button-choose_active' : 'create-button-choose'
                  }
                  onClick={chooseBotRandom}
                >
                  Choose!
                </button>
              </li>

              <li className='create-list'>
                <h2>Choose Question Bot Instance</h2>
                <h3>
                  Наш телеграмм бот - это удобный опросник, который поможет вам получить нужные
                  данные в считанные минуты. Он позволяет создавать кастомные опросы с любыми
                  вопросами и вариантами ответов, и быстро отправлять их вашей аудитории или друзьям
                  в Телеграм.
                </h3>
                <button
                  className={
                    isQuestionBotActive ? 'create-button-choose_active' : 'create-button-choose'
                  }
                  onClick={chooseBotQuestion}
                >
                  Choose!
                </button>
              </li>

              <li className='create-list'>
                <h2>Choose chatGPT Bot Instance</h2>
                <h3>для его использования понадобиться отдельный chatGPT токен.</h3>
                <input
                  ref={inputRefGpt}
                  className='Test__input'
                  placeholder='Token to access the ChatGPT API'
                  type='text'
                />
                <button
                  className={
                    isGPTBotActive ? 'create-button-choose_active' : 'create-button-choose'
                  }
                  onClick={chooseBotGPT}
                >
                  Choose!
                </button>
              </li>
            </ul>

            {isQuestionBotActive && <EditQuestions />}

            <button onClick={createBot} disabled={!botName} className='create-button-bot'>
              Create bot!
            </button>
          </div>
        )}

        {isRuningBot && <h2>bot is running</h2>}
      </div>
    </Layout>
  );
}

export default Create;
