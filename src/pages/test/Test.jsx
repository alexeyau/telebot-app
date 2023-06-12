import { createRef, useState, useEffect } from 'react';

import {
  getTelegramBotName,
  getTelegramMessages,
  sendTelegramMessage,
} from '@services/telegramAPI.js';

import { getStorageItem, setStorageItem } from '@services/localStorage.js';
import { BasicBotRandom } from '@/telebots/BasicBotRandom';
import { BasicBotChatGPT } from '@/telebots/BasicBotChatGPT';

import Layout from '@/components/Layout';

import './Test.css';

const saveResponseId = JSON.parse(localStorage.getItem('responseid')) ?? [];

const saveToStorage = (event) => {
  setStorageItem('actualKey', event.target.value);
};

function Test() {

  const inputRef = createRef();
  const textareaRef = createRef();
  const inputRefGpt = createRef();

  const [teleName, setTeleName] = useState('');
  const [teleMessages, setTeleMessages] = useState([]);
  const [responseid, setResponseId] = useState(saveResponseId);

  const teleNameUrl = teleName && `https://t.me/${teleName}`;

  useEffect(() => {
    if (getStorageItem('actualKey').length < 1) console.log('entire token');
    localStorage.setItem('responseid', JSON.stringify(responseid));
  }, [responseid]);

  useEffect(() => {
    localStorage.setItem('responseid', JSON.stringify(responseid));
  }, [responseid]);

  const getName = () => {
    if (getStorageItem('actualKey').length < 1) {
      return;
    }
    getTelegramBotName(getStorageItem('actualKey')).then((readyData) => {
      console.log(' >1> ', readyData);
      setTeleName(readyData.result.username);
      setResponseId([...responseid, { id: readyData.result.id }]);
    });
  };

  const getMessages = () => {
    if (getStorageItem('actualKey').length < 1) {
      return;
    }
    getTelegramMessages(getStorageItem('actualKey')).then((readyData) => {
      console.log(' >2> ', readyData);
      setTeleMessages(readyData.result.map((update) => update.message));
    });
  };

  const doGreet = (userId, replyToMessageId) => {
    if (getStorageItem('actualKey').length < 1) {
      return;
    }
    const messageText = textareaRef.current?.value;
    console.log(textareaRef.current.value);
    sendTelegramMessage(getStorageItem('actualKey'), {
      chat_id: userId,
      reply_to_message_id: replyToMessageId,
      text: messageText,
    }).then((readyData) => {
      console.log(' >3> ', readyData);
      setTeleMessages(readyData.result.map((update) => update.message));
    });
  };

  const createBotInstance = () => {
    if (getStorageItem('actualKey').length < 1) {
      return;
    }
    const botName = 'botName001';
    const settings = {
      name: botName,
      saveProcessedMessageId: (mId) => {
        // todo move JSON to services methods
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
        return getTelegramMessages(getStorageItem('actualKey'), lastUpdateId).then((readyData) => {
          return readyData.result;
        });
      },
      sendTelegramMessageAsync: async (userId, messageText) => {
        return sendTelegramMessage(getStorageItem('actualKey'), {
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

  const createBotChatGPTInstance = () => {
    if (getStorageItem('actualKey').length < 1) {
      return;
    }
    const botName = 'botName_gpt0';
    const tokenGpt = inputRefGpt.current?.value;
    const settings = {
      name: botName,
      saveProcessedMessageId: (mId) => {
        // todo move JSON to services methods
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
        return getTelegramMessages(getStorageItem('actualKey'), lastUpdateId).then((readyData) => {
          return readyData.result;
        });
      },
      sendTelegramMessageAsync: async (userId, messageText) => {
        return sendTelegramMessage(getStorageItem('actualKey'), {
          chat_id: userId,
          text: messageText,
        });
      },
      onSendCallback: () => {
        console.log('callback: message sent');
      },
      chatGPTKey: tokenGpt,
    };
    const bot = new BasicBotChatGPT(settings);
    bot.start();
  };

  return (
    <Layout>
      <div className='Test'>
        <a href={'/'}>&laquo;</a>
        <ul className='Test_box'>
          <li>
            Create a Telegram-bot here: <a href='https://t.me/botfather'>https://t.me/botfather</a>
          </li>

          <li>
            Enter Token:
            <form>
              <div>
                <input
                  onChange={saveToStorage}
                  ref={inputRef}
                  className='Test__input'
                  placeholder='Token to access the HTTP API'
                  type='text'
                  defaultValue={getStorageItem('actualKey')}
                />
              </div>
            </form>
          </li>

          <li>
            Push the button:
            <div>
              <button className='Test__button' onClick={getName}>
                Say my name
              </button>
              <br />
              {teleName && <a href={teleNameUrl}>{teleNameUrl}</a>}
            </div>
          </li>

          <li>
            Push the next button:
            <div>
              <button className='Test__button' onClick={getMessages}>
                Get messages
              </button>
            </div>
            {teleMessages.map((message, index) => (
              <div key={index}>
                <h3>{message.text}</h3>
                <sup>{message.from.first_name}</sup>
                <input
                  type='button'
                  value='Greet'
                  onClick={() => {
                    console.log(message, 'месседж');
                    doGreet(message.from.id, message.message_id);
                  }}
                />
              </div>
            ))}
          </li>

          <li>
            <textarea
              className='Test__textarea'
              placeholder='Greetings'
            ></textarea>
          </li>

          <li>
            Create Bot Instace (try OOP):
            <div>
              <button className='Test__button' onClick={createBotInstance}>
                Create!
              </button>
            </div>
          </li>

          <li>
            Create GPT Bot Instance:
            <div>
              <input
                ref={inputRefGpt}
                className='Test__input'
                placeholder='Token to access the ChatGPT API'
                type='text'
              />
            </div>
            <div>
              <button className='Test__button' onClick={createBotChatGPTInstance}>
                Create GPT bot!
              </button>
            </div>
          </li>
        </ul>
      </div>
    </Layout>
  );
}

export default Test;
