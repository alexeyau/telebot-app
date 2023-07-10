import { NavLink } from 'react-router-dom';
import Layout from '@/components/Layout';
import image from '@/assets/teleBotBackground.png';
import './App.css';

function List(props) {
  return (
    <div className='content-about'>
      <h3 className='content-about__table'>{props.table}</h3>
      <span className='content-about__content'>{props.content}</span>
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
      content: `Универсальный инструмент для создания разнообразных ботов
        который можно использовать для запуска и в браузере и на Node.js`,
    },
    {
      id: 3,
      table: 'Какие технологии используем?',
      content: `JavaScript.написать конкретно про технологии`,
    },
  ];

  return (
    <Layout>
      <div className='app'>
        <div className='app__wrap'>
          <img alt='nothing' src={image} className='app__img'></img>
        </div>

        <div className='app__paragraph'>
          <h3 className='app__table'>Браузерные телеграм боты</h3>

          <span className='app__content'>
            Это учебный проект, но боты вполне реальные. Введите токен, запустите бота и он будет
            работать прямо в вашем браузере. Это легко и просто.
            <br></br>
            Чат-боты представляют собой программы, с которыми пользователь может осуществлять
            имитацию живого общения. Использование ботов в мессенджерах - один из наиболее
            эффективных каналов коммуникации с пользователем.
          </span>

          <div className='app__list'>
            {aboutArr.map((listInfo) => (
              <List key={listInfo.id} table={listInfo.table} content={listInfo.content} />
            ))}
          </div>
        </div>

        <div className='app__button'>
          <NavLink to='/create'>Начать &raquo;</NavLink>
        </div>
      </div>
    </Layout>
  );
}

export default App;
