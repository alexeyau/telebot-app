import { useState, useEffect } from 'react';

import { BasicBotRandom } from '@/telebots/BasicBotRandom';
import { BasicBot } from '@/telebots/BasicBot';
import { BasicBotQuestion } from '@/telebots/BasicBotQuestion';

import { getTelegramMessages, sendTelegramMessage } from '@services/telegramAPI.js';

import { getStorageItem, setStorageItem } from '@services/localStorage.js';
//import { useBotStore } from '@services/zustandStore';

import Layout from '@/components/Layout';

import './Create.css';

function Create() {
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

  const [stateOfQuestion, setStateOfQuestion] = useState(
    JSON.parse(getStorageItem('listOfQuestions')),
  );

  const saveQuestions = (event, index) => {
    stateOfQuestion[index].question = event.target.value;
  };
  const saveAnswer = (event, index) => {
    stateOfQuestion[index].answer = event.target.value;
  };

  const saveNewOpions = () => {
    setStorageItem('listOfQuestions', JSON.stringify(stateOfQuestion));
  };

  const token = getStorageItem('actualKey');
  const [isRuningBot, setIsRuningBot] = useState(false);
  const [isClassInputBot, setisClassInputBot] = useState(true);
  const [botName, setBotName] = useState('');
  const [isQuestionBotActive, setIsQuestionBotActive] = useState(false);

  const createBot = () => {
    if (!token) return;
    if (!botName) return;
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
    };
    if (botName === 'randomBot001') {
      const bot = new BasicBotRandom(settings);
      bot.start();
      setIsRuningBot(true);
    }
    if (botName === 'simpleBot01') {
      const bot = new BasicBot(settings);
      bot.start();
      setIsRuningBot(true);
    }
    if (botName === 'questionBot01') {
      const bot = new BasicBotQuestion({ ...settings, oleg: 5 });
      bot.start();
      setIsRuningBot(true);
    }
  };

  const chooseBotRandom = () => {
    setBotName('randomBot001');
  };

  const chooseBotSimple = () => {
    setBotName('simpleBot01');
  };

  const chooseBotQuestion = () => {
    if (getStorageItem('listOfQuestions') == 'false') {
      setStorageItem('listOfQuestions', JSON.stringify(questions));
    }
    setIsQuestionBotActive(true);
    setBotName('questionBot01');
  };

  useEffect(() => {
    setStateOfQuestion(JSON.parse(getStorageItem('listOfQuestions')));
  }, [getStorageItem('listOfQuestions')]);

  const saveToStorage = (event) => {
    setStorageItem('actualKey', event.target.value);
    if (event.target.value) {
      setisClassInputBot(true);
    } else {
      setisClassInputBot(false);
    }
  };

  const addNewOpions = () => {
    setStateOfQuestion((list) => [
      ...list,
      {
        question: '',
        answer: '',
      },
    ]);
  };

  const settingsOfBot = stateOfQuestion
    ? stateOfQuestion.map((item, index) => (
        <div key={index}>
          {index + 1}
          <input
            defaultValue={item.question}
            className='Settings_questionInInput'
            onChange={(event) => saveQuestions(event, index)}
          />
          <input defaultValue={item.answer} onChange={(event) => saveAnswer(event, index)} />
        </div>
      ))
    : null;

  return (
    <Layout>
      <div className='Create'>
        <li>
          Enter Token:
          <form>
            <div>
              <input
                className={isClassInputBot ? 'Settings_input' : 'Settings_input_other'}
                placeholder='Token to access the HTTP API'
                type='text'
                defaultValue={getStorageItem('actualKey')}
                onChange={saveToStorage}
              />
            </div>
          </form>
        </li>

        {!isRuningBot && (
          <div>
            <ul className='create-choose-bot'>
              <li className='create_List'>
                Choose Simple Bot Instance
                <div>
                  <button
                    className='create__button'
                    onClick={chooseBotSimple}
                    //disabled={!token || isRandomBotActive}
                  >
                    Choose!
                  </button>
                </div>
              </li>

              <li className='create_List'>
                Choose Random Bot Instance
                <div>
                  <button
                    className='create__button'
                    onClick={chooseBotRandom}
                    //disabled={!token || isSimpleBotActive}
                  >
                    Choose!
                  </button>
                </div>
              </li>

              <li className='create_List'>
                Choose Question Bot Instance
                <div>
                  <button
                    className='create__button'
                    onClick={chooseBotQuestion}
                    //disabled={!token || isSimpleBotActive}
                  >
                    Choose!
                  </button>
                </div>
              </li>
            </ul>

            {isQuestionBotActive && (
              <div>
                <h4>Тут вы можете редактировать и добавлять вопросы</h4>
                {settingsOfBot}

                <button className='button_addNewSettings' onClick={saveNewOpions}>
                  save
                </button>

                <button className='button_addNewSettings' onClick={addNewOpions}>
                  new
                </button>
              </div>
            )}

            <button onClick={createBot}>Create bot!</button>
          </div>
        )}

        {isRuningBot && <h2>bot is running</h2>}
      </div>
    </Layout>
  );
}

export default Create;
