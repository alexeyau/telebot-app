import { useState } from 'react';

import { BasicBotRandom } from '@/telebots/BasicBotRandom';
import { BasicBot } from '@/telebots/BasicBot';

import { getTelegramMessages, sendTelegramMessage } from '@services/telegramAPI.js';

import { getStorageItem, setStorageItem } from '@services/localStorage.js';
import { useBotStore } from '@services/zustandStore';

import Layout from '@/components/Layout';

import './Create.css';

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
  const [botName, setBotName] = useState('');

  const settingsOfBot = activeBotInstance
    ? Object.keys(activeBotInstance.settings).map((key) => (
        <div key={key}>
          {key}
          <input defaultValue={activeBotInstance.settings[key]} />
        </div>
      ))
    : null;

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
      bot.start();
    }
    if (botName === 'simpleBot01') {
      const bot = new BasicBot(settings);
      bot.start();
    }
  };

  const chooseBotRandom = () => {
    setBotName('randomBot001');
  };

  const chooseBotSimple = () => {
    setBotName('simpleBot01');
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
    setArrayAdditionallySettingsOfBot([
      ...arrayAdditionallySettingsOfBot,
      {
        name: additionallyNameOfSettings,
        options: additionallyOptionsOfSettings,
      },
    ]);
  };

  const listOfSettings = arrayAdditionallySettingsOfBot.map((item, index) => {
    return (
      <div key={index}>
        {' '}
        {index}
        <div>{item.name}</div>
        <div>{item.options}</div>
      </div>
    );
  });

  return (
    <Layout>
      <div className='create'>
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

        <ul className='create-choose-bot'>
          <li className='create-list'>
            Create Simple Bot Instance:
            <div>
              <button
                className='create-button'
                onClick={chooseBotSimple}
                disabled={!token || isRandomBotActive}
              >
                Choose!
              </button>
            </div>
          </li>

          <li className='create-list'>
            Create Random Bot Instance:
            <div>
              <button
                className='create-button'
                onClick={chooseBotRandom}
                disabled={!token || isSimpleBotActive}
              >
                Choose!
              </button>
            </div>
          </li>
        </ul>

        <h3>Ключ вопросу бота и ответ</h3>

        {settingsOfBot}
        {listOfSettings}

        <div className='create-addNewOptions'>
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

        <button onClick={createBot}>Create bot!</button>
      </div>
    </Layout>
  );
}

export default Create;
