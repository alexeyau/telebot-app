import { useState } from 'react';

import { BasicBotRandom } from '@/telebots/BasicBotRandom';
import { BasicBot } from '@/telebots/BasicBot';
import {
  getTelegramBotName,
  getTelegramMessages,
  sendTelegramMessage,
} from '@services/telegramAPI.js';
import { getStorageItem, setStorageItem } from '@services/localStorage.js';
import './Create.css';
import { useBotStore } from '@services/zustandStore';
import Layout from '@/components/Layout';

function Create() {
  const activeBot = useBotStore((state) => state.activeBotInstance.typeOfBot);
  const activeBotInstance = useBotStore((state) => state.activeBotInstance.instance);
  const setBotInstance = useBotStore((state) => state.setBotInstance);

  const token = getStorageItem('actualKey');

  const isRandomBotActive = activeBot === 'random';
  const isSimpleBotActive = activeBot === 'simple';

  const [isClassInputBot, setisClassInputBot] = useState(true);
  const [arrayAdditionallySettingsOfBot, setArrayAdditionallySettingsOfBot] = useState([]);
  const [additionallyNameOfSettings, setAdditionallyNameOfSettings] = useState('');
  const [additionallyOptionsOfSettings, setAdditionallyOptionsOfSettings] = useState('');

  const settingsOfBot = activeBotInstance
    ? Object.keys(activeBotInstance.settings).map((key) => (
        <div key={key}>
          {key}
          <input defaultValue={activeBotInstance.settings[key]} />
        </div>
      ))
    : null;

  const createBotRandomInstance = () => {
    if (!token) {
      return;
    }
    setBotInstance();
    const botName = 'botName001';
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
        console.log(' >', botData);

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
    const bot = new BasicBotRandom(settings);
    bot.start();
  };

  const createBotSimpleInstance = () => {
    if (!token) {
      return;
    }
    const botName = 'botNameSimple001';
    const settings = {
      name: botName,
      saveProcessedMessageId: (uId) => {
        const botData = JSON.parse(getStorageItem(botName) || '{}');
        const nextBotData = JSON.stringify({
          ...botData,
          processedUpdatesIds: [...(botData.processedUpdatesIds || []), uId],
        });
        setStorageItem(botName, nextBotData);
      },
      getProcessedMessagesIds: () => {
        const botData = JSON.parse(getStorageItem(botName) || '{}');
        console.log(' >', botData);

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
    const bot = new BasicBotRandom(settings);
    setBotInstance('simple', bot);
    bot.start();
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
    setArrayAdditionallySettingsOfBot([
      ...arrayAdditionallySettingsOfBot,
      {
        name: additionallyNameOfSettings,
        options: additionallyOptionsOfSettings,
      },
    ]);
  };

  const changeNameSettings = (event) => {
    setAdditionallyNameOfSettings(event.target.value);
  };

  const changeOptionsSettings = (event) => {
    setAdditionallyOptionsOfSettings(event.target.value);
  };

  return (
    <Layout>
      <div className='Create'>
        <ul className='test_box'>
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
          <ul className='test_box'>
            <li className='Create_List'>
              Create Simple Bot Instance:
              <div>
                <button
                  className='Create__button'
                  onClick={createBotSimpleInstance}
                  disabled={!token || isRandomBotActive}
                >
                  Create!
                </button>
              </div>
            </li>

            <li className='Create_List'>
              Create Random Bot Instance:
              <div>
                <button
                  className='Create__button'
                  onClick={createBotRandomInstance}
                  disabled={!token || isSimpleBotActive}
                >
                  Create!
                </button>
              </div>
            </li>
          </ul>
          <h3>Ключ вопросу бота и ответ</h3>
          {settingsOfBot}
          {arrayAdditionallySettingsOfBot.map((item, index) => {
            return (
              <div key={index}>
                {' '}
                {index}
                <div>{item.name}</div>
                <div>{item.options}</div>
              </div>
            );
          })}
          <div>
            Запрос:
            <input onChange={changeNameSettings} />
            Ответ:
            <input onChange={changeOptionsSettings} />
          </div>
          <button className='buttoon_addNewSettings' onClick={addNewSettings}>
            +
          </button>
        </ul>
      </div>
    </Layout>
  );
}

export default Create;
