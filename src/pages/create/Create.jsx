import './Create.css';

import { useSelector, useDispatch } from 'react-redux';

import { BasicBotRandom } from '@/telebots/BasicBotRandom';
import { BasicBot } from '@/telebots/BasicBot';
import { getTelegramBotName, getTelegramMessages, sendTelegramMessage, } from '@services/telegramAPI.js';
import { getStorageItem, setStorageItem, } from '@services/localStorage.js';

import Layout from '@/components/Layout';

function Create() {
  const activeBot = useSelector((store) => store.botsData.activeBot);
  const dispatch = useDispatch();

	const token = getStorageItem('actualKey');
	const isRandomBotActive = activeBot === 'random';
	const isSimpleBotActive = activeBot === 'simple';

	const createBotRandomInstance = () => {
		if(!token) {return;}
		onCreateRandomBot();
		const botName = 'botName001';
		const settings = {
			name: botName,
			saveProcessedMessageId: (mId) => {
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

	const createBotSimpleInstance = () => {
		if(!token) {return;}
		const botName = 'botNameSimple001';
		const settings = {
			name: botName,
			saveProcessedMessageId: (mId) => {
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
		console.log(bot.settings, '----->');
		onCreateSimpleBot(bot);
		bot.start();
	};

	const sendSimpleBotActionCreator = (botInstance) => ({
		type: 'CHANGE-SIMPLE',
		body: {
			activeBotInstance: botInstance,
		},
	});
	const  sendRandomBotAction = {
		type: 'CHANGE-RANDOM'
	};

  let onCreateSimpleBot = (botInstance) => {
    dispatch(sendSimpleBotActionCreator(botInstance));
  };

  let onCreateRandomBot = () => {
    dispatch(sendRandomBotAction);
  };

  return (
    <Layout>
      <div className='Create'>
        <h3 className='Create_H3'>Your bot token is: {token}</h3>
        <h4 className='Create_H4'>{activeBot}</h4>

            <ol className='test_box'>
            <li className='Create_List'>
              Create Simple Bot Instance:
              <div>
                <button
                  className='Create__button'    
                  onClick={createBotSimpleInstance}
                  disabled={!token || isRandomBotActive}
                >
                  Create1!
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
                  Create2!
                </button>
              </div>
            </li>
          </ol>
			</div>
		</Layout>
	);
}

export default Create;
