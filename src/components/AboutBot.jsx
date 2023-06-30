import { useState } from 'react';
import { getTelegramBotName, getTelegramMessages } from '@services/telegramAPI.js';
import { getStorageItem } from '@services/localStorage.js';

function AboutBot() {
  const saveResponseId = JSON.parse(localStorage.getItem('responseid')) ?? [];
  const [teleMessages, setTeleMessages] = useState([]);
  const [teleName, setTeleName] = useState('');
  const teleNameUrl = teleName && `https://t.me/${teleName}`;
  const [responseid, setResponseId] = useState(saveResponseId);

  const getName = () => {
    if (!getStorageItem('actualKey')) {
      return;
    }
    getTelegramBotName(getStorageItem('actualKey')).then((readyData) => {
      console.log(' >1> ', readyData);
      setTeleName(readyData.result.username);
      setResponseId([...responseid, { id: readyData.result.id }]);
    });
  };

  const getMessages = () => {
    if (!getStorageItem('actualKey')) {
      return;
    }
    getTelegramMessages(getStorageItem('actualKey')).then((readyData) => {
      console.log(' >2> ', readyData);
      setTeleMessages(readyData.result.map((update) => update.message));
    });
  };

  return (
    <div className='create-botInfo'>
      <div className='create-botInfo_getName'>
        <button className='create-button-choose' onClick={getName}>
          Get bot name
        </button>
        <br />
        {teleName && <a href={teleNameUrl}>{teleNameUrl}</a>}
      </div>

      <div className='create-botInfo_getMessage'>
        <div>
          <button className='create-button-choose' onClick={getMessages}>
            Get messages
          </button>
        </div>
        {teleMessages.map((message, index) => (
          <div key={index}>
            <h3>{message.text}</h3>
            <sup>{message.from.first_name}</sup>
            <input type='button' value='Greet' />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutBot;
