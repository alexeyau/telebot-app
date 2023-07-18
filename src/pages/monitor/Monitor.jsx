import { useMemo } from 'react';
import { getStorageItem } from '@services/localStorage.js';
import Layout from '@/components/Layout';

import './Monitor.css';

function Monitor() {
  let activeUsers = '';
  if (!JSON.parse(getStorageItem('questionBot01'))) {
    activeUsers = false;
  } else {
    activeUsers = useMemo(() => JSON.parse(getStorageItem('questionBot01')).users, []);
  }

  const users = useMemo(() => {
    if (!activeUsers) return null;

    return Object.values(activeUsers).map((user) => (
      <li className='users__item' key={user.name}>
        {user.name}
        {user.answers.map((item, index) => {
          return (
            <div className='users__answers' key={Math.floor(100 * Math.random())}>
              {index + 1}) {item}
            </div>
          );
        })}
      </li>
    ));
  }, [activeUsers]);

  return (
    <Layout>
      <div className='monitor'>
        <h3 className='monitor__title'>Monitor</h3>
        <div className='monitor__wrap'>
          <span className='monitor__list-title'>
            You can see what is happening (service is not ready yet)
          </span>

          <div className='monitor__wrap-list-item'>
            <ul className='monitor__list'>
              {Boolean(activeUsers) && <h3 className='monitor__list-name'>user:</h3>}
              {users}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Monitor;
