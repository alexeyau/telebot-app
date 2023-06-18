import './Monitor.css';
import { useMemo } from 'react';
import { getStorageItem } from '@services/localStorage.js';
import Layout from '@/components/Layout';

function Monitor() {
  const activeUsers = useMemo(() => getStorageItem('activeUsers'), []);
  const users = useMemo(() => {
    if (!activeUsers) return null;
    return JSON.parse(activeUsers)?.map((user) => (
      <li className='Monitor_ListOfUser_Item' key={user}>
        {user}
      </li>
    ));
  }, [activeUsers]);

  return (
    <Layout>
      <h3>Monitor</h3>
      <div className='Monitor'>
        <ul>
          <div>You can see what is happening (service is not ready yet)</div>
          <div>
            <div className='Monitor_ListOfUsers'>
              {Boolean(activeUsers) && <div>user:</div>}
              {users}
            </div>
          </div>
        </ul>
      </div>
    </Layout>
  );
}

export default Monitor;
