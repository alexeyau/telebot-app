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
        <div key={item.id} className='edit-questions__list'>
          <span className='edit-questions__qustion-number'>{index + 1}) </span>
          <input
            defaultValue={item.question}
            className='edit-questions__question-in-input'
            onChange={(event) => saveQuestions(event, index)}
          />
          <button className='edit-questions__buttons' onClick={() => deleteListItem(index)}>
            delete
          </button>
        </div>
      ))
    : null;

  return (
    <div className='edit-questions'>
      <h4 className='edit-questions__title'>Тут вы можете редактировать и добавлять вопросы</h4>

      {settingsOfBot}

      <div>
        <button className='edit-questions__buttons' onClick={saveNewOpions}>
          save
        </button>

        <button className='edit-questions__buttons' onClick={addNewOpions}>
          new
        </button>
      </div>
    </div>
  );
}

export default EditQuestions;
