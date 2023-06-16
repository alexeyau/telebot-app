import { useState } from 'react';

import { BasicBotRandom } from '@/telebots/BasicBotRandom';
import { BasicBot } from '@/telebots/BasicBot';
import { BasicBotQuestion } from '@/telebots/BasicBotQuestion';

import { getTelegramMessages, sendTelegramMessage } from '@services/telegramAPI.js';

import { getStorageItem, setStorageItem } from '@services/localStorage.js';
import { useBotStore } from '@services/zustandStore';

import Layout from '@/components/Layout';

import './Create.css';

function Create() {
  const activeBotInstance = useBotStore((state) => state.activeBotInstance.instance);
  const setBotInstance = useBotStore((state) => state.setBotInstance);

  const token = getStorageItem('actualKey');
  const [isRuningBot, setIsRuningBot] = useState(false);

  const [isClassInputBot, setisClassInputBot] = useState(true);
  const [arrayAdditionallyQuestionsOfBot, setArrayAdditionallyQuestionsOfBot] = useState([]);
  const [additionallyNameOfSettings, setAdditionallyNameOfSettings] = useState('');
  const [additionallyOptionsOfSettings, setAdditionallyOptionsOfSettings] = useState('');
  const [botName, setBotName] = useState('');

  const settingsOfBot = activeBotInstance
    ? Object.keys(activeBotInstance.settings).map((key) => (
        <div key={key}>
          {key}
          <input defaultValue={activeBotInstance.settings[key]} />
        </div>
      ))
    : null;

  const listOfSettings = arrayAdditionallyQuestionsOfBot.map((item, index) => {
    return (
      <div key={index}>
        {' '}
        {index})<div>{item.name}</div>
        <div>{item.options}</div>
      </div>
    );
  });

  const createBot = () => {
    if (!token) return;
    if (!botName) return;
    setBotInstance();
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
      //setBotInstance("random", settings);
      bot.start();
      setIsRuningBot(true);
    }
    if (botName === 'simpleBot01') {
      const bot = new BasicBot(settings);
      //setBotInstance("simple", settings);
      bot.start();
      setIsRuningBot(true);
    }
    if (botName === 'questionBot01') {
      const bot = new BasicBotQuestion({ ...settings, oleg: 5 });
      //setBotInstance("question", settings);
      bot.start();
      setIsRuningBot(true);
    }
  };

  const chooseBotRandom = () => {
    // setIsQuestionBotActive(false);
    // setIsSimpleBotActive(false);
    // setIsRandomBotActive(true);
    setBotName('randomBot001');
  };

  const chooseBotSimple = () => {
    // setIsQuestionBotActive(false);
    // setIsSimpleBotActive(true);
    // setIsRandomBotActive(false);
    setBotName('simpleBot01');
  };

  const chooseBotQuestion = () => {
    // setIsQuestionBotActive(true);
    // setIsSimpleBotActive(false);
    // setIsRandomBotActive(false);
    setBotName('questionBot01');
  };

  const changeNameSettings = (event) => {
    setAdditionallyNameOfSettings(event.target.value);
  };

  const changeOptionsSettings = (event) => {
    setAdditionallyOptionsOfSettings(event.target.value);
  };

  const saveToStorage = (event) => {
    setStorageItem('actualKey', event.target.value);
    if (event.target.value) {
      setisClassInputBot(true);
    } else {
      setisClassInputBot(false);
    }
  };

  const addNewSettings = () => {
    setArrayAdditionallyQuestionsOfBot([
      ...arrayAdditionallyQuestionsOfBot,
      {
        name: additionallyNameOfSettings,
        options: additionallyOptionsOfSettings,
      },
    ]);
  };

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
            <ul className='Create_ChooseBot'>
              <li className='Create_List'>
                Choose Simple Bot Instance
                <div>
                  <button
                    className='Create__button'
                    onClick={chooseBotSimple}
                    //disabled={!token || isRandomBotActive}
                  >
                    Choose!
                  </button>
                </div>
              </li>

              <li className='Create_List'>
                Choose Random Bot Instance
                <div>
                  <button
                    className='Create__button'
                    onClick={chooseBotRandom}
                    //disabled={!token || isSimpleBotActive}
                  >
                    Choose!
                  </button>
                </div>
              </li>

              <li className='Create_List'>
                Choose Question Bot Instance
                <div>
                  <button
                    className='Create__button'
                    onClick={chooseBotQuestion}
                    //disabled={!token || isSimpleBotActive}
                  >
                    Choose!
                  </button>
                </div>
              </li>
            </ul>
            <button onClick={createBot}>Create bot!</button>
          </div>
        )}

        {isRuningBot && <h2>bot is running</h2>}

        {/* {isQuestionBotActive && (
          <div className='Create_AddNewOptions'>
            <h3>Ключ вопросу бота и ответ</h3>
            {settingsOfBot}
            {listOfSettings}

            <div>
              Запрос:
              <input onChange={changeNameSettings} />
              Ответ:
              <input onChange={changeOptionsSettings} />
            </div>

            <button className='button_addNewSettings' onClick={addNewSettings}>
              +
            </button>
          </div>
        )} */}
      </div>
    </Layout>
  );
}

export default Create;
