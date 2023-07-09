import { NavLink } from 'react-router-dom';
import Layout from '@/components/Layout';
import './App.css';

function List(props) {
  return (
    <div className='content-about'>
      <div className='content-about__table'>{props.table}</div>
      <div className='content-about__content'>{props.content}</div>
    </div>
  );
}

function App() {
  const aboutArr = [
    {
      id: 1,
      table: 'Зачем?',
      content: `Браузерный бот прост в разработке и подходит для коротковременного использования.
        Быстрый опрос, корпоративный квест или прототип коммерческого бота.`,
    },
    {
      id: 2,
      table: 'Что предлагаем?',
      content: `Универсальный инструмент для создания разнообразных ботов`,
    },
    {
      id: 3,
      table: 'Какие технологии используем?',
      content: `JavaScript. Нашу библиотеку можно использовать для запуска и в браузере и на Node.js`,
    },
  ];

  return (
    <Layout>
      <div className='app'>
        <div className='app__paragraph'>
          <div className='app__table'>Браузерные телеграмм боты</div>

          <div>
            Это учебный проект, но боты вполне реальные. Введите токен, запустите бота и он будет
            работать прямо в вашем браузере. Это легко и просто.
            <br></br>
            Чат-боты представляют собой программы, с которыми пользователь может осуществлять
            имитацию живого общения. Использование ботов в мессенджерах - один из наиболее
            эффективных каналов коммуникации с пользователем.
          </div>
        </div>

        <div className='app__list'>
          {aboutArr.map((listInfo) => (
            <List key={listInfo.id} table={listInfo.table} content={listInfo.content} />
          ))}
        </div>

        <div className='app__content'>
          <div className='app__table'>Общие описания ботов</div>

          <ul className='app__list-first'>
            <li>многозадачность</li>
            <li>Постоянно на связи</li>
            <li>Легко маштабируемые</li>
          </ul>

          <div className='app__button'>
            <NavLink to='/create'>Начать</NavLink>
          </div>
        </div>

        <div className='app__wrap'>
          <img alt='nothing' src='' className='app__img'></img>
        </div>
      </div>
    </Layout>
  );
}

export default App;
