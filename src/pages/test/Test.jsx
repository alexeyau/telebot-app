import { createRef, useState } from 'react';
import './Test.css';


function Test() {

	const inputRef = createRef();
	const textareaRef = createRef();
	const [teleName, setTeleName] = useState('');
	const [teleMessages, setTeleMessages] = useState([]);

	const teleNameUrl = teleName && `https://t.me/${teleName}`;

	const getName = () => {
		const token = inputRef.current?.value;
		fetch(`https://api.telegram.org/bot${token}/getMe`)
			.then((data) => {
				return data.json();
			})
			.then((readyData) => {
				console.log(' >1> ', readyData);
				setTeleName(readyData.result.username);
			});
	};

	const getMessages = () => {
		const token = inputRef.current?.value;
		fetch(`https://api.telegram.org/bot${token}/getUpdates`)
			.then((data) => {
				return data.json();
			})
			.then((readyData) => {
				console.log(' >2> ', readyData);
				setTeleMessages(readyData.result.map((update) => update.message));
			});
	};

	const doGreet = (userId) => {
		const token = inputRef.current?.value;
		const messageText = textareaRef.current?.value;
		console.log(textareaRef.current.value);
		fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				chat_id: userId,
				text: messageText,
			}),
		})
			.then((data) => {
				return data.json();
			})
			.then((readyData) => {
				console.log(' >3> ', readyData);
				setTeleMessages(readyData.result.map((update) => update.message));
			});
	};

	return (
		<div className="Test">
			<a href={'/'}>&laquo; back</a>
			<div>
        piu test
			</div>
			<ol>

				<li>
          Create a Telegram-bot here:
					{' '}
					<a
						href="https://t.me/botfather"
					>
            https://t.me/botfather
					</a>
				</li>

				<li>
          Enter Token:
					<form>
						<div>
							<input
								ref={inputRef}
								className="Test__input"
								placeholder="Token to access the HTTP API"
								type="text"
							/>
						</div>
					</form>
				</li>

				<li>
          Push the button:
					<div>
						<button
							className="Test__button"
							onClick={getName}
						>
              Say my name
						</button>
						<br />
						{teleName && (
							<a href={teleNameUrl}>{teleNameUrl}</a>
						)}
					</div>
				</li>

				<li>
          Push the next button:
					<div>
						<button
							className="Test__button"
							onClick={getMessages}
						>
              Get messages
						</button>
					</div>
					{teleMessages.map((message, index) => (
						<div key={index}>
							<h3>{message.text}</h3>
							<sup>
								{message.from.first_name}
							</sup>
							<input
								type="button"
								value="Greet"
								onClick={() => {
									doGreet(message.from.id);
								}}
							/>
						</div>
					))}
				</li>

				<li>

					<textarea
						ref={textareaRef}
						placeholder="Greetings"
					>
					</textarea>
				</li>
			</ol>
		</div>
	);
}

export default Test;
