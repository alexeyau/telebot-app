import './Create.css';

import {  useSelector, useDispatch } from 'react-redux';
import { useState, useEffect} from 'react';

import { BasicBotRandom } from '@/telebots/BasicBotRandom';
import { BasicBot } from '@/telebots/BasicBot';
import { getTelegramBotName, getTelegramMessages, sendTelegramMessage, } from '@services/telegramAPI.js';
import { getStorageItem, setStorageItem, } from '@services/localStorage.js';

import Layout from '@/components/Layout';


function Create() {

	const activeBot = useSelector((store) => store.botsData.activeBot);
	const activeBotInstance = useSelector((store) => store.botsData.activeBotInstance);

	const dispatch = useDispatch();

	const token = getStorageItem('actualKey');
	const isRandomBotActive = activeBot === 'random';
	const isSimpleBotActive = activeBot === 'simple';

	//const [token, setToken] = useState(getStorageItem('actualKey'));
	const [isClassInputBot, setisClassInputBot] = useState(true);
	const [arrayAdditionallySettingsOfBot, setArrayAdditionallySettingsOfBot] = useState([]);
	const [additionallyNameOfSettings, setAdditionallyNameOfSettings] = useState('');
	const [additionallyOptionsOfSettings, setAdditionallyOptionsOfSettings] = useState('');

	const settingsOfBot = activeBotInstance
		? Object.keys(activeBotInstance.settings).map(key =>
			<div key={key}>
				{key}
				<input defaultValue={activeBotInstance.settings[key]}/>
			</div>
		)
		: null;

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

	let saveToStorage = (event) => {
		setStorageItem('actualKey', event.target.value);
		if(!event.target.value) {
			setisClassInputBot(false);
			alert('Enter toket');
		}
		if(event.target.value) {
			setisClassInputBot(true);
		}
	};

	let addNewSettings = () => {
		setArrayAdditionallySettingsOfBot([
			...arrayAdditionallySettingsOfBot,
			{
				name: additionallyNameOfSettings,
				options: additionallyOptionsOfSettings,
			}
		]);
	};

	let changeNameSettings = (event) => {
		setAdditionallyNameOfSettings(event.target.value);
	};

	let changeOptionsSettings = (event) => {
		setAdditionallyOptionsOfSettings(event.target.value);
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
				<ul className='test_box'>
					<li>
						Enter Token:
						<form>
							<div>
								<input
									className={isClassInputBot ? 'Settings_input' : 'Settings_input_other'}
									//className={classInputBot}
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
						return (<div> {index}
							<div>{item.name}</div>
							<div>{item.options}</div>
						</div>);
					})}
					<div>Запрос:
						<input onChange={changeNameSettings}/>
						Ответ:
						<input onChange={changeOptionsSettings}/>
					</div>
					<button
						className='buttoon_addNewSettings'
						onClick={addNewSettings}>
						+
					</button>
				</ul>
			</div>
		</Layout>
	);
}

export default Create;
