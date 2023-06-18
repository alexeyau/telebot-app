import './Monitor.css';

import { getStorageItem } from '@services/localStorage.js';

import Layout from '@/components/Layout';

function Monitor() {
  const activeUsers = getStorageItem('activeUsers');
  const users = activeUsers
    ? JSON.parse(activeUsers).map((user) => {
        return (
          <div className='Monitor_ListOfUser_Item' key={user}>
            {user}{' '}
          </div>
        );
      })
    : null;

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
