import { getStorageItem, setStorageItem } from '@services/localStorage.js';
import { useState, useEffect } from 'react';

import './Components.css';

function EditQuestions() {
  const listOfQuestion = getStorageItem('listOfQuestions');
  const [stateOfQuestion, setStateOfQuestion] = useState(JSON.parse(listOfQuestion));

  const saveNewOpions = () => {
    setStorageItem('listOfQuestions', JSON.stringify(stateOfQuestion));
  };
  const saveQuestions = (event, index) => {
    stateOfQuestion[index].question = event.target.value;
  };

  const deleteListItem = (index) => {
    setStateOfQuestion((prev) => {
      const newArr = [...prev];
      newArr.splice(index, 1);
      return newArr;
    });
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
        <div key={index} className='editQuestions_list'>
          {index + 1}
          <input
            defaultValue={item.question}
            className='editQuestions_questionInInput'
            onChange={(event) => saveQuestions(event, index)}
          />
          <button className='create-buttons' onClick={() => deleteListItem(index)}>
            delete
          </button>
        </div>
      ))
    : null;

  return (
    <div className='editQuestions'>
      <h4>Тут вы можете редактировать и добавлять вопросы</h4>

      {settingsOfBot}

      <div>
        <button className='create-buttons' onClick={saveNewOpions}>
          save
        </button>

        <button className='create-buttons' onClick={addNewOpions}>
          new
        </button>
      </div>
    </div>
  );
}

export default EditQuestions;
