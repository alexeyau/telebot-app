import './Monitor.css';

import { getStorageItem, setStorageItem } from '@services/localStorage.js';

import Layout from '@/components/Layout';

function Monitor() {
  const user = getStorageItem('activeUser');

  return (
    <Layout>
      <div>Monitor</div>
      <div>{user}</div>
    </Layout>
  );
}

export default Monitor;
