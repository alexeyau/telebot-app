export const getTelegramBotName = (token) => {
	return fetch(`https://api.telegram.org/bot${token}/getMe`).then((data) => {
		return data.json();
	});
};

export const getTelegramMessages = (token) => {
	return fetch(`https://api.telegram.org/bot${token}/getUpdates`).then(
		(data) => {
			return data.json();
		}
	);
};

export const sendTelegramMessage = (token, data) => {
	return fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}).then((data) => {
		return data.json();
	});
};
