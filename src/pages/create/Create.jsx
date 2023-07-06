import { useState, createRef, useEffect } from 'react';
import {
  BasicBot,
  BasicBotQuestion,
  BasicBotChatGPT,
  BasicBotRandom,
  adapterBrowser,
} from 'telebot-lib';
import { getTelegramBotName } from '@services/telegramAPI.js';
import { getStorageItem, setStorageItem } from '@services/localStorage.js';

import Layout from '@/components/Layout';

import './Create.css';

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
      id: 0,
    },
    {
      question:
        'Кто изображен на банкноте в 100 рублей? Выберите следующие ответы: 1) Пушкин, 2) Сталин, 3) Ленин',
      id: 1,
    },
    {
      question:
        'Как называется самое высокое здание в мире? Выберите следующие ответы: 1) Москва-сити, 2) Бурдж Халифа, 3) Пизанская башня',

      id: 2,
    },
  ];

  const token = getStorageItem('actualKey');
  const [isRuningBot, setIsRuningBot] = useState(false);
  const [isClassInputBot, setisClassInputBot] = useState(true);
  const [botName, setBotName] = useState('');

  const saveResponseId = JSON.parse(localStorage.getItem('responseid')) ?? [];
  const [teleName, setTeleName] = useState('');
  const teleNameUrl = teleName && `https://t.me/${teleName}`;
  const [responseid, setResponseId] = useState(saveResponseId);

  const createBot = () => {
    if (!token) return;
    if (!botName) return;
    const tokenGpt = inputRefGpt.current?.value;
    const settings = {
      chatGPTKey: tokenGpt,
      token: token,
      botName: botName,
    };

    getTelegramBotName(getStorageItem('actualKey')).then((readyData) => {
      console.log(' >1> ', readyData);
      setTeleName(readyData.result.username);
      setResponseId([...responseid, { id: readyData.result.id }]);
    });

    if (botName === RANDOM_BOT_NAME) {
      const bot = new adapterBrowser(BasicBotRandom, settings);
      bot.start();
      setIsRuningBot(true);
    }
    if (botName === SIMPLE_BOT_NAME) {
      const bot = adapterBrowser(BasicBot, settings);
      bot.start();
      setIsRuningBot(true);
    }
    if (botName === QUESTION_BOT_NAME) {
      const bot = new adapterBrowser(BasicBotQuestion, settings);
      bot.start();
      setIsRuningBot(true);
    }
    if (botName === GPT_BOT_NAME) {
      const bot = new adapterBrowser(BasicBotChatGPT, settings);
      bot.start();
      setIsRuningBot(true);
    }
  };

  const chooseBotRandom = () => {
    setBotName(RANDOM_BOT_NAME);
  };
  const chooseBotSimple = () => {
    setBotName(SIMPLE_BOT_NAME);
  };
  const chooseBotGPT = () => {
    setBotName(GPT_BOT_NAME);
  };
  const chooseBotQuestion = () => {
    if (!listOfQuestion) {
      setStorageItem('listOfQuestions', JSON.stringify(questions));
    }
    setBotName(QUESTION_BOT_NAME);
  };

  useEffect(() => {
    createBot();
  }, [botName]);

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
        <div className='create-entry_token'>
          <h3>Enter Token:</h3>
          <input
            className={isClassInputBot ? 'settings_input' : 'settings_input_other'}
            placeholder='Token to access the HTTP API'
            type='text'
            defaultValue={getStorageItem('actualKey')}
            onChange={saveToStorage}
          />
        </div>

        {!isRuningBot && (
          <div className='create-runing'>
            <ul className='create-choose_bot'>
              <li className='create-list'>
                <h2>Choose Random Bot Instance</h2>
                <div>
                  Этот телеграмм бот - ваш личный генератор случайных чисел! Бот генерирует числа с
                  использованием настоящего случайного алгоритма, что гарантирует их полную
                  случайность и непредсказуемость. Никаких повторений, никаких шаблонов - только
                  чистые случайные числа, чтобы помочь вам в любом задании, которое требует
                  использования случайных данных!
                </div>
                <button className='create-button_choose' onClick={chooseBotRandom}>
                  Start
                </button>
              </li>

              <li className='create-list'>
                <h2>Choose Question Bot Instance</h2>
                <div>
                  Наш телеграмм бот - это удобный опросник, который поможет вам получить нужные
                  данные в считанные минуты. Он позволяет создавать кастомные опросы с любыми
                  вопросами и вариантами ответов, и быстро отправлять их вашей аудитории или друзьям
                  в Телеграм.
                </div>
                <button className='create-button_choose' onClick={chooseBotQuestion}>
                  Start
                </button>
              </li>

              <li className='create-list'>
                <h2>Choose Simple Bot Instance</h2>
                <div>
                  Наш телеграмм бот - это универсальный помощник для вашей повседневной жизни.
                </div>
                <button className='create-button_choose' onClick={chooseBotSimple}>
                  Start
                </button>
              </li>

              <li className='create-list'>
                <h2>Choose chatGPT Bot Instance</h2>
                <div>
                  chatGPT который возвращает стихи на выбранную тему. Для его использования
                  понадобиться отдельный chatGPT токен.
                </div>
                <div className='create-input_shell'>
                  <input
                    ref={inputRefGpt}
                    className='create-input'
                    placeholder='Token to access the ChatGPT API'
                    type='text'
                  />
                </div>
                <button className='create-button_choose' onClick={chooseBotGPT}>
                  Start
                </button>
              </li>
            </ul>
          </div>
        )}

        {isRuningBot && (
          <div>
            <h2>bot is running</h2>
            {teleName && <a href={teleNameUrl}>{teleNameUrl}</a>}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Create;
