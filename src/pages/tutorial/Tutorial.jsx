import { NavLink } from 'react-router-dom';
import Layout from '@/components/Layout';

function Tutorial() {
  return (
    <Layout>
      <h3>Tutorial</h3>
      <div className='Tutorial'>
        <ul>
          <li>Every bot on this project is running in your browser.</li>
          <li>
            To start any bot you need to have a Token. You can get it here:{' '}
            <a href='https://t.me/botfather'>https://t.me/botfather</a>
          </li>
          <li>
            All bots you can start are listed on page: <NavLink to='/create'>Create</NavLink>
          </li>
        </ul>
      </div>
    </Layout>
  );
}

export default Tutorial;
