import './Monitor.css';

import { getStorageItem, setStorageItem } from '@services/localStorage.js';

import Layout from '@/components/Layout';

function Monitor() {
  const user = getStorageItem('activeUser');

  return (
    <Layout>
      <h3>Monitor</h3>
      <div className='Monitor'>
        <ul>
          <li>You can see what is happening (service is not ready yet)</li>
          <li>
            <div>user: {user}</div>
          </li>
        </ul>
      </div>
    </Layout>
  );
}

export default Monitor;
