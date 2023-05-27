import { createRef, useState, useEffect } from 'react';

import { shallow } from 'zustand/shallow';
import { useBotStore } from '@/services/zustand/store/useBotStore';
// const { amount, title } = useBotStore(
//   (state) => ({ amount: state.amount, title: state.title }),
//   shallow,
// );
// const updateAmount = useBotStore((state) => state.updateAmount);
// console.log(amount, title);

import {
  getTelegramBotName,
  getTelegramMessages,
  sendTelegramMessage,
} from '@services/telegramAPI.js';
import { getStorageItem, setStorageItem } from '@services/localStorage.js';
import { BasicBotRandom } from '@/telebots/BasicBotRandom';
<<<<<<< HEAD

=======
import { BasicBot } from '@/telebots/BasicBot';
>>>>>>> develop
import Layout from '@/components/Layout';

import './Test.css';

let saveResponseId = JSON.parse(localStorage.getItem('responseid')) ?? [];

<<<<<<< HEAD
function Test() {
  const inputRef = createRef();
  const textareaRef = createRef();
  const [teleName, setTeleName] = useState('');
  const [teleMessages, setTeleMessages] = useState([]);
=======
let saveToStorage = (event) => {
	setStorageItem("actualKey", event.target.value)
};

function Test(props) {

	const inputRef = createRef();
	const textareaRef = createRef();
	const [teleName, setTeleName] = useState('');
	const [teleMessages, setTeleMessages] = useState([]);
>>>>>>> develop

  const [responseid, setResponseId] = useState(saveResponseId);

<<<<<<< HEAD
  useEffect(() => {
    localStorage.setItem('responseid', JSON.stringify(responseid));
  }, [responseid]);
=======
	useEffect(() => {
		if(getStorageItem("actualKey").length < 1) console.log("entire token")
		localStorage.setItem('responseid', JSON.stringify(responseid));
	}, [responseid]);
>>>>>>> develop

  const teleNameUrl = teleName && `https://t.me/${teleName}`;

<<<<<<< HEAD
  const getName = () => {
    const token = inputRef.current?.value;
    getTelegramBotName(token).then((readyData) => {
      console.log(' >1> ', readyData);
      setTeleName(readyData.result.username);
      setResponseId([...responseid, { id: readyData.result.id }]);
    });
    console.log(token, settings);
  };

  const getMessages = () => {
    const token = inputRef.current?.value;
    getTelegramMessages(token).then((readyData) => {
      console.log(' >2> ', readyData);
      setTeleMessages(readyData.result.map((update) => update.message));
    });
  };

  const doGreet = (userId) => {
    const token = inputRef.current?.value;
    const messageText = textareaRef.current?.value;
    console.log(textareaRef.current.value);
    sendTelegramMessage(token, {
      chat_id: userId,
      text: messageText,
    }).then((readyData) => {
      console.log(' >3> ', readyData);
      setTeleMessages(readyData.result.map((update) => update.message));
    });
  };

  const createBotInstance = () => {
    const botName = 'botName001';
    const token = inputRef.current?.value;
    const settings = {
      name: botName,
      saveProcessedMessageId: (mId) => {
        // todo move JSON to services methods
        const botData = JSON.parse(getStorageItem(botName) || '{}');
        const nextBotData = JSON.stringify({
          ...botData,
          processedMessagesIds: [...(botData.processedMessagesIds || []), mId],
        });
        setStorageItem(botName, nextBotData);
      },
      getProcessedMessagesIds: () => {
        const botData = JSON.parse(getStorageItem(botName) || '{}');

        return botData.processedMessagesIds || [];
      },
      getTelegramMessagesAsync: async () => {
        return getTelegramMessages(token).then((readyData) => {
          return readyData.result.map((update) => update.message);
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

  return (
    <Layout>
      <div className='Test'>
        <a href={'/'}>&laquo; back</a>
        <div>piu test</div>
        <ol className='test_box'>
          <li>
            Create a Telegram-bot here: <a href='https://t.me/botfather'>https://t.me/botfather</a>
          </li>
=======
	const getName = () => {
		if(getStorageItem("actualKey").length < 1) return;
		const token = inputRef.current?.value;
		getTelegramBotName(token).then((readyData) => {
			console.log(' >1> ', readyData);
			setTeleName(readyData.result.username);
			setResponseId([...responseid, { id: readyData.result.id }]);
		});
	};

	const getMessages = () => {
		if(getStorageItem("actualKey").length < 1) return;
		const token = inputRef.current?.value;
		getTelegramMessages(token).then((readyData) => {
			console.log(' >2> ', readyData);
			setTeleMessages(readyData.result.map((update) => update.message));
		});
	};

	const doGreet = (userId) => {
		if(getStorageItem("actualKey").length < 1) return;
		const token = inputRef.current?.value;
		const messageText = textareaRef.current?.value;
		console.log(textareaRef.current.value);
		sendTelegramMessage(token, {
			chat_id: userId,
			text: messageText,
		}).then((readyData) => {
			console.log(' >3> ', readyData);
			setTeleMessages(readyData.result.map((update) => update.message));
		});
	};

	const createBotInstance = () => {
		if(getStorageItem("actualKey").length < 1) return;
		const botName = 'botName001';
		const token = inputRef.current?.value;
		const settings = {
			name: botName,
			saveProcessedMessageId: (mId) => {
				// todo move JSON to services methods
				const botData = JSON.parse(getStorageItem(botName) || '{}');
				const nextBotData = JSON.stringify({
					...botData,
					processedMessagesIds: [
						...(botData.processedMessagesIds || []),
						mId,
					],
				});
				setStorageItem(botName, nextBotData);
			},
			getProcessedMessagesIds: () => {
				const botData = JSON.parse(getStorageItem(botName) || '{}');
				return botData.processedMessagesIds || [];
			},
			getTelegramMessagesAsync: async () => {
				return getTelegramMessages(token).then((readyData) => {
					return readyData.result.map(update => update.message);
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
			}
		};
		const bot = new BasicBotRandom(settings);
		bot.start();
	};

	return (
		<Layout>
			<div className='Test'>
				<a href={'/'}>&laquo;</a>
				<ol className='test_box'>
					<li>
						Create a Telegram-bot here:{' '}
						<a href='https://t.me/botfather'>https://t.me/botfather</a>
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
									defaultValue={getStorageItem("actualKey")}
								/>
							</div>
						</form>
					</li>
>>>>>>> develop

          <li>
            Enter Token:
            <form>
              <div>
                <input
                  ref={inputRef}
                  className='Test__input'
                  placeholder='Token to access the HTTP API'
                  type='text'
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
                    doGreet(message.from.id);
                  }}
                />
              </div>
            ))}
          </li>

          <li>
            <textarea
              className='test__textarea'
              ref={textareaRef}
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
        </ol>
      </div>
    </Layout>
  );
}

export default Test;
