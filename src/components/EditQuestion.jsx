import { useState, useEffect, useMemo } from 'react';

import useBotStore from '@/services/zustandStore.js';

import './Components.css';

function EditQuestions() {
  const { botInstance } = useBotStore();

  console.log(botInstance);

  const listOfQuestion = useMemo(() => botInstance.getQuestions('listOfQuestions'), []);
  //const listOfQuestion = botInstance.getQuestions('listOfQuestions');
  const [stateOfQuestion, setStateOfQuestion] = useState(listOfQuestion);

  const saveNewOpions = () => {
    botInstance.setQuestions(stateOfQuestion);
  };

  const correctQuestions = (event, index) => {
    stateOfQuestion[index].question = event.target.value;
  };

  const deleteListItem = (index) => {
    setStateOfQuestion((prev) => {
      const newArr = [...prev];
      newArr.splice(index, 1);
      return newArr;
    });
  };

  const addNewOpions = () => {
    setStateOfQuestion((list) => [
      ...list,
      {
        question: '',
        id: stateOfQuestion.length + 1,
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
            onChange={(event) => correctQuestions(event, index)}
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
