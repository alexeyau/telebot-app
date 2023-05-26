import { useSelector } from 'react-redux';
import {useState} from 'react';

import {
	getStorageItem,
	setStorageItem,
} from '@services/localStorage.js';

import Layout from '@/components/Layout';
import './Settings.css';


function Settings() {
  const activeBot = useSelector((store) => store.botsData.activeBot);
  const activeBotInstance = useSelector((store) => store.botsData.activeBotInstance);

	const [arrayAdditionallySettingsOfBot, setArrayAdditionallySettingsOfBot] = useState([]);


	let additionallyNameOfSetttings = '';
	let additionallyOptionsOfSettings = '';

	const settingsOfBot = Object.keys(activeBotInstance.settings).map(key =>
		<div key={key}>
			{key}
			<input defaultValue={activeBotInstance.settings[key]}/>
		</div>
	);

	let saveToStorage = (event) => {
		setStorageItem('actualKey', event.target.value);
	};

	let addNewSettings = () => {
		setArrayAdditionallySettingsOfBot(
			...arrayAdditionallySettingsOfBot,
			{
				name: additionallyNameOfSetttings,
				options: additionallyOptionsOfSettings,
			}
		);
		console.log(arrayAdditionallySettingsOfBot);
	};

	let changeNameSettings = (event) => {
		additionallyNameOfSetttings = event.target.value;
		console.log(additionallyNameOfSetttings);
	};

	let changeOptionsSettings = (event) => {
		additionallyOptionsOfSettings = event.target.value;
		console.log(additionallyOptionsOfSettings);
	};

	return (
		<Layout>
			<ol className='test_box'>
				<li>
					<h3>activeBot: {activeBot}</h3>
					Enter Token:
					<form>
						<div>
							<input
								onChange={saveToStorage}
								className='Test__input'
								placeholder='Token to access the HTTP API'
								type='text'
								defaultValue={getStorageItem('actualKey')}
							/>
						</div>
					</form>
				</li>
				{settingsOfBot}
				<div>
					<input onChange={changeNameSettings}/>
					<input onChange={changeOptionsSettings}/>
				</div>
				<button
					className='buttoon_addNewSettings'
					onClick={addNewSettings}>
					+
				</button>
			</ol>
		</Layout>
	);
}

export default Settings;
