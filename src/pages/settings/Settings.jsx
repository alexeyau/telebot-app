import './Settings.css';
import Layout from '@/components/Layout';
import {
	getStorageItem,
	setStorageItem,
} from '@services/localStorage.js';
import { useSelector } from 'react-redux';

function Settings() {

	const activeBot = useSelector((store) => store.botsData.activeBot);
	const activeBotInstance = useSelector((store) => store.botsData.activeBotInstance);

	let saveToStorage = (event) => {
		setStorageItem("actualKey", event.target.value)
	};

	console.log(activeBotInstance);

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
								defaultValue={getStorageItem("actualKey")}
							/>
						</div>
					</form>
				</li>
				<li>
					<input type="checkbox"/>
				</li>
				<li>
					<input type="checkbox"/>
				</li>
			</ol>
		</Layout>
	);
}

export default Settings;
