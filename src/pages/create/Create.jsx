import { useState, createRef, useEffect } from 'react';
import {
  BasicBot,
  // BasicBotFire,
  BasicBotQuestion,
  BasicBotChatGPT,
  BasicBotRandom,
  adapterBrowser,
} from 'telebot-lib';
import { getTelegramBotName } from '@services/telegramAPI.js';
import { getStorageItem, setStorageItem } from '@services/localStorage.js';

import useBotStore from '@/services/zustandStore.js';

import Layout from '@/components/Layout';

import './Create.css';

const RANDOM_BOT_NAME = 'randomBot001';
const SIMPLE_BOT_NAME = 'simpleBot01';
const QUESTION_BOT_NAME = 'questionBot01';
const GPT_BOT_NAME = 'botName_gpt0';
const FIRE_BOT_NAME = 'botName_fire023';

function BotCard(props) {
  // const [teleName, setTeleName] = useState('');
  // const teleNameUrl = teleName && `https://t.me/${teleName}`;

  // const saveResponseId = JSON.parse(localStorage.getItem('responseid')) ?? [];
  // const [responseid, setResponseId] = useState(saveResponseId);

  // getTelegramBotName(getStorageItem('actualKey')).then((readyData) => {
  //   console.log(' >1> ', readyData);
  //   setTeleName(readyData.result.username);
  //   setResponseId([...responseid, { id: readyData.result.id }]);
  // });

  return (
    <li className='bot-card'>
      <h2 className='bot-card__title'>{props.title}</h2>
      {props.customEl}
      <div className='bot-card__content-wrap'>
        <span className='bot-card__description'>{props.description}</span>
        <div className='bot-card__start-wrap'>
          <button
            // className={isInputActive ? 'bot-card__start_disable' : 'bot-card__start'}
            className='bot-card__start'
            onClick={props.handler}
          >
            Start
          </button>
        </div>
      </div>
      <div className={props.isActive ? 'bot-card__bot-active' : 'bot-card__bot-disable'}>
        <span className='bot-card__bot-active'>bot is running</span>
        {/* <a className='bot-card__link' href={teleNameUrl}>{teleNameUrl}</a> */}
      </div>
    </li>
  );
}

function Create() {
  const { setBotInstance } = useBotStore();
  const inputRefGpt = createRef();

  const token = getStorageItem('actualKey');
  const [isInputActive, setisInputActive] = useState(true);
  const [botName, setBotName] = useState('');

  const [isSimpleBotActive, setIsSimpleBotActive] = useState(false);
  const [isRandomBotActive, setIsRandomBotActive] = useState(false);
  const [isQuestionBotActive, setIsQuestionBotActive] = useState(false);
  const [isGPTBotActive, setIsGPTBotActive] = useState(false);
  const [isFireBotActive, setIsFireBotActive] = useState(false);

  const createBot = () => {
    if (!token) return;
    if (!botName) return;
    const tokenGpt = inputRefGpt.current?.value;
    const settings = {
      chatGPTKey: tokenGpt,
      token: token,
      botName: botName,
    };

    if (botName === RANDOM_BOT_NAME) {
      const bot = new adapterBrowser(BasicBotRandom, settings);
      bot.start();
      setBotInstance(bot);

      setIsRandomBotActive(true);
      setIsSimpleBotActive(false);
      setIsQuestionBotActive(false);
      setIsGPTBotActive(false);
      setIsFireBotActive(false);
    }
    if (botName === SIMPLE_BOT_NAME) {
      const bot = adapterBrowser(BasicBot, settings);
      bot.start();
      setBotInstance(bot);

      setIsRandomBotActive(false);
      setIsSimpleBotActive(true);
      setIsQuestionBotActive(false);
      setIsGPTBotActive(false);
      setIsFireBotActive(false);
    }
    // if (botName === FIRE_BOT_NAME) {
    //   const bot = adapterBrowser(BasicBotFire, settings);
    //   bot.start();
    //   setBotInstance(bot);

    //   setIsRandomBotActive(false);
    //   setIsSimpleBotActive(false);
    //   setIsQuestionBotActive(false);
    //   setIsGPTBotActive(false);
    //   setIsFireBotActive(true);
    // }
    if (botName === QUESTION_BOT_NAME) {
      const bot = new adapterBrowser(BasicBotQuestion, settings);
      bot.start();
      setBotInstance(bot);

      setIsRandomBotActive(false);
      setIsSimpleBotActive(false);
      setIsQuestionBotActive(true);
      setIsGPTBotActive(false);
      setIsFireBotActive(false);
    }
    if (botName === GPT_BOT_NAME) {
      const bot = new adapterBrowser(BasicBotChatGPT, settings);
      bot.start();
      setBotInstance(bot);

      setIsRandomBotActive(false);
      setIsSimpleBotActive(false);
      setIsQuestionBotActive(false);
      setIsGPTBotActive(true);
      setIsFireBotActive(false);
    }
  };

  const chooseBotRandom = () => {
    if (token) {
      setisInputActive(true);
    } else {
      setisInputActive(false);
    }
    setBotName(RANDOM_BOT_NAME);
  };
  const chooseBotSimple = () => {
    setBotName(SIMPLE_BOT_NAME);
    if (token) {
      setisInputActive(true);
    } else {
      setisInputActive(false);
    }
  };
  const chooseBotGPT = () => {
    setBotName(GPT_BOT_NAME);
    if (token) {
      setisInputActive(true);
    } else {
      setisInputActive(false);
    }
  };
  const chooseBotFire = () => {
    setBotName(FIRE_BOT_NAME);
    if (token) {
      setisInputActive(true);
    } else {
      setisInputActive(false);
    }
  };
  const chooseBotQuestion = () => {
    setBotName(QUESTION_BOT_NAME);
    if (token) {
      setisInputActive(true);
    } else {
      setisInputActive(false);
    }
  };

  useEffect(() => {
    createBot();
  }, [botName]);

  const saveToStorage = (event) => {
    setStorageItem('actualKey', event.target.value);
    if (event.target.value) {
      setisInputActive(true);
    } else {
      setisInputActive(false);
    }
  };

  const botArr = [
    {
      id: 1,
      title: 'Random Bot Instance',
      description: `Этот телеграм бот - ваш личный генератор случайных чисел! Бот генерирует числа с
        использованием настоящего случайного алгоритма, что гарантирует их полную
        случайность и непредсказуемость. Никаких повторений, никаких шаблонов - только
        чистые случайные числа, чтобы помочь вам в любом задании, которое требует
        использования случайных данных!`,
      handler: chooseBotRandom,
      isActive: isRandomBotActive,
    },

    {
      id: 2,
      title: 'Question Bot Instance',
      description: `Наш телеграм бот - это удобный опросник, который поможет вам получить нужные
        данные в считанные минуты. Он позволяет создавать кастомные опросы с любыми
        вопросами и вариантами ответов, и быстро отправлять их вашей аудитории или друзьям
        в Телеграм`,
      handler: chooseBotQuestion,
      isActive: isQuestionBotActive,
    },

    {
      id: 3,
      title: 'Simple Bot Instance',
      description: `Наш телеграмм бот - это универсальный помощник для вашей повседневной жизни.`,
      handler: chooseBotSimple,
      isActive: isSimpleBotActive,
    },

    {
      id: 4,
      title: 'ChatGPT Bot Instance',
      description: `chatGPT который возвращает стихи на выбранную тему. Для его использования
        понадобиться отдельный chatGPT токен.`,
      handler: chooseBotGPT,
      customEl: (
        <div className='create__input-shell'>
          <input
            ref={inputRefGpt}
            className='create__input'
            placeholder='Token to access the ChatGPT API'
            type='text'
          />
        </div>
      ),
      isActive: isGPTBotActive,
    },

    {
      id: 5,
      title: 'FireBase Bot Instance',
      description: `FireBase.`,
      handler: chooseBotFire,
      isActive: isFireBotActive,
    },
  ];

  return (
    <Layout>
      <div className='create'>
        <div className='create__entry-token'>
          <div className='create__entry-token-wrap'>
            <h3 className='create__entry-token_titile'>Enter Token:</h3>
            <input
              className={isInputActive ? 'create__input-disable' : 'create__input-active'}
              placeholder='Token to access the HTTP API'
              type='text'
              defaultValue={getStorageItem('actualKey')}
              onChange={saveToStorage}
            />
          </div>
          <span className={isInputActive ? 'create__token-disable' : 'create__token-active'}>
            Enter token!
          </span>
        </div>

        <div className='create__runing'>
          <ul className='create__choose-bot'>
            {botArr.map((cardInfo) => (
              <BotCard
                key={cardInfo.id}
                title={cardInfo.title}
                description={cardInfo.description}
                handler={cardInfo.handler}
                customEl={cardInfo.customEl}
                isActive={cardInfo.isActive}
              />
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export default Create;
