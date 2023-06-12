import './Monitor.css';

import { getStorageItem } from '@services/localStorage.js';

import Layout from '@/components/Layout';

function Monitor() {
  const users = JSON.parse(getStorageItem('activeUsers')).map(user => {
    return (
      <div className='Monitor_ListOfUser_Item' key={user}>{user } </div>
    )
  });

  return (
    <Layout>
      <h3>Monitor</h3>
      <div className='Monitor'>
        <ul>
          <li>You can see what is happening (service is not ready yet)</li>
          <li>
            <div className='Monitor_ListOfUsers'>
              <div>user:</div>
              {users}
            </div>
          </li>
        </ul>
      </div>
    </Layout>
  );
}

export default Monitor;
