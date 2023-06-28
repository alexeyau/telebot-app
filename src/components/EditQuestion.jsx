import { getStorageItem, setStorageItem } from '@services/localStorage.js';
import { useState, useEffect } from 'react';

function EditQuestions() {
  const listOfQuestion = getStorageItem('listOfQuestions');
  const [stateOfQuestion, setStateOfQuestion] = useState(JSON.parse(listOfQuestion));

  const saveNewOpions = () => {
    setStorageItem('listOfQuestions', JSON.stringify(stateOfQuestion));
  };
  const saveQuestions = (event, index) => {
    stateOfQuestion[index].question = event.target.value;
  };
  const saveAnswer = (event, index) => {
    stateOfQuestion[index].answer = event.target.value;
  };

  useEffect(() => {
    setStateOfQuestion(JSON.parse(listOfQuestion));
  }, [listOfQuestion]);

  const addNewOpions = () => {
    setStateOfQuestion((list) => [
      ...list,
      {
        question: '',
        answer: '',
      },
    ]);
  };

  const settingsOfBot = stateOfQuestion
    ? stateOfQuestion.map((item, index) => (
        <div key={index}>
          {index + 1}
          <input
            defaultValue={item.question}
            className='settings_questionInInput'
            onChange={(event) => saveQuestions(event, index)}
          />
          <input defaultValue={item.answer} onChange={(event) => saveAnswer(event, index)} />
        </div>
      ))
    : null;

  return (
    <div className='EditQuestions'>
      <h4>Тут вы можете редактировать и добавлять вопросы</h4>

      {settingsOfBot}

      <button className='create-buttons' onClick={saveNewOpions}>
        save
      </button>

      <button className='create-buttons' onClick={addNewOpions}>
        new
      </button>
    </div>
  );
}

export default EditQuestions;
