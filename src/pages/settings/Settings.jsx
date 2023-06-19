import Layout from '@/components/Layout';
import React, { useState, useEffect } from 'react';
import { setStorageItem, getStorageItem } from '@services/localStorage.js';
import './Settings.css';

function Settings() {
  const [stateOfQuestion, setStateOfQuestion] = useState(
    getStorageItem('listOfQuestions') ? JSON.parse(getStorageItem('listOfQuestions')) : false,
  );

  const saveQuestions = (event, index) => {
    stateOfQuestion[index].question = event.target.value;
  };
  const saveAnswer = (event, index) => {
    stateOfQuestion[index].answer = event.target.value;
  };

  const saveNewOpions = () => {
    setStorageItem('listOfQuestions', JSON.stringify(stateOfQuestion));
  };

  const addNewOpions = () => {
    setStateOfQuestion((list) => [
      ...list,
      {
        question: '',
        answer: '',
      },
    ]);
  };

  useEffect(() => {
    setStorageItem('listOfQuestions', JSON.stringify(stateOfQuestion));
  }, [stateOfQuestion]);

  const settingsOfBot = stateOfQuestion
    ? stateOfQuestion.map((item, index) => (
        <div key={index}>
          {index + 1}
          <input
            defaultValue={item.question}
            className='Settings_questionInInput'
            onChange={(event) => saveQuestions(event, index)}
          />
          <input defaultValue={item.answer} onChange={(event) => saveAnswer(event, index)} />
        </div>
      ))
    : null;

  return (
    <Layout>
      <h3>Settings</h3>
      <div className='Settings'>
        <div>
          <div>You can change some settings after bot is started</div>

          <div className='Create_AddNewOptions'>
            {Boolean(settingsOfBot) && (
              <div>
                <h4>Тут вы можете редактировать и добавлять вопросы</h4>
                {settingsOfBot}

                <button className='button_addNewSettings' onClick={saveNewOpions}>
                  save
                </button>

                <button className='button_addNewSettings' onClick={addNewOpions}>
                  new
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Settings;
