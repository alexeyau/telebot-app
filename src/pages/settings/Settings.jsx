import Layout from '@/components/Layout';
import React, { useState, useEffect } from 'react';
import { setStorageItem, getStorageItem } from '@services/localStorage.js';
import './Settings.scss';

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

  const deleteListItem = (index) => {
    setStateOfQuestion((prev) => {
      const newArr = [...prev];
      newArr.splice(index, 1);
      return newArr;
    });
  };

  useEffect(() => {
    setStorageItem('listOfQuestions', JSON.stringify(stateOfQuestion));
  }, [stateOfQuestion]);

  const settingsOfBot = stateOfQuestion
    ? stateOfQuestion.map((item, index) => (
        <div key={item.question}>
          {index + 1}
          <textarea
            defaultValue={item.question}
            className='settings_questionInInput'
            onChange={(event) => saveQuestions(event, index)}
          ></textarea>
          <input
            defaultValue={item.answer}
            onChange={(event) => saveAnswer(event, index)}
            className='settings_answerInInput'
            contentEditable='true'
          />
          <button onClick={() => deleteListItem(index)} className='settings_button'>
            delete
          </button>
        </div>
      ))
    : null;

  return (
    <Layout>
      <h3>Settings</h3>
      <div className='settings'>
        <div>
          <div>You can change some settings after bot is started</div>

          <div className='Create_AddNewOptions'>
            {Boolean(settingsOfBot) && (
              <div>
                <h4>Тут вы можете редактировать и добавлять вопросы</h4>
                {settingsOfBot}

                <button className='settings_button' onClick={saveNewOpions}>
                  save
                </button>

                <button className='settings_button' onClick={addNewOpions}>
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
