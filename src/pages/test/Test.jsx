import { createRef, useState, useEffect } from 'react';

import {
	getTelegramBotName,
	getTelegramMessages,
	sendTelegramMessage,
} from '@services/telegramAPI.js';






import './Test.css';



let saveResponseId = JSON.parse(localStorage.getItem('responseid')) ?? [];

function Test() {
	const inputRef = createRef();
	const textareaRef = createRef();
	const [teleName, setTeleName] = useState('');
	const [teleMessages, setTeleMessages] = useState([]);

	const [responseid, setResponseId] = useState(saveResponseId);

	useEffect(() => {
		localStorage.setItem('responseid', JSON.stringify(responseid));
	}, [responseid]);

	const teleNameUrl = teleName && `https://t.me/${teleName}`;

	const getName = () => {
		const token = inputRef.current?.value;
		getTelegramBotName(token).then((readyData) => {
			console.log(' >1> ', readyData);
			setTeleName(readyData.result.username);
			setResponseId([...responseid, { id: readyData.result.id }]);
		});
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
			chatId: userId,
			text: messageText,
		}).then((readyData) => {
			console.log(' >3> ', readyData);
			setTeleMessages(readyData.result.map((update) => update.message));
		});
	};

	return (
		<div className='Test'>
			<a href={'/'}>&laquo; back</a>
			<div>piu test</div>
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
			</ol>
		</div>
	);
}

export default Test;
