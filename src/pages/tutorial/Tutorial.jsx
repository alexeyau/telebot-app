import { NavLink } from 'react-router-dom';
import Layout from '@/components/Layout';
import './Tutorial.css';

function Tutorial() {
  return (
    <Layout>
      <div className='tutorial'>
        <h3 className='tutorial__title'>Tutorial</h3>
        <ul className='tutorial__list'>
          <li className='tutorial__list-item'>
            To start any bot you need to have a Token. You can get it here:{' '}
            <a className='tutorial__list-link' href='https://t.me/botfather'>
              https://t.me/botfather
            </a>
          </li>
          <li className='tutorial__list-item'>
            All bots you can start are listed on page:{' '}
            <NavLink className='tutorial__list-link' to='/create'>
              Create
            </NavLink>
          </li>
        </ul>
      </div>
    </Layout>
  );
}

export default Tutorial;
