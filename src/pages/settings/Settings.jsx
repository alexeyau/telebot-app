import Layout from '@/components/Layout';
import EditQuestions from '@/components/EditQuestion';
import React from 'react';
import { getStorageItem } from '@services/localStorage.js';
import './Settings.scss';

function Settings() {
  const removeBot = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Layout>
      <h3>Settings</h3>
      <div className='settings'>
        <div>
          <div>You can change some settings after bot is started</div>

          <div className='Create_AddNewOptions'>
            {Boolean(JSON.parse(getStorageItem('listOfQuestions'))) && <EditQuestions />}
          </div>
        </div>
        <div>
          <button className='create-buttons' onClick={removeBot}>
            remove bot
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Settings;
