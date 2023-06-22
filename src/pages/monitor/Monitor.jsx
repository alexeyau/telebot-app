import { useMemo } from 'react';
import { getStorageItem } from '@services/localStorage.js';
import Layout from '@/components/Layout';

import './Monitor.scss';

function Monitor() {
  const activeUsers = useMemo(() => getStorageItem('activeUsers'), []);
  const users = useMemo(() => {
    if (!activeUsers) return null;
    return JSON.parse(activeUsers)?.map((user) => (
      <div className='monitor_ListOfUsers_Item' key={user}>
        {user}
      </div>
    ));
  }, [activeUsers]);

  return (
    <Layout>
      <div className='monitor'>
        <h3>Monitor</h3>
        <ul>
          <div>You can see what is happening (service is not ready yet)</div>
          <div>
            <div className='monitor_ListOfUsers'>
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
