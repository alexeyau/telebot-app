import Layout from '@/components/Layout';
import EditQuestions from '@/components/EditQuestion';
import React from 'react';
import { getStorageItem } from '@services/localStorage.js';
import './Settings.css';

function Settings() {
  const removeBot = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Layout>
      <h3 className='settings__title'>Settings</h3>
      <div className='settings'>
        <div className='settings__wrap'>
          <h3 className='settings__content'>You can change some settings after bot is started</h3>

          <div className='settings__wrap-list'>
            {Boolean(JSON.parse(getStorageItem('listOfQuestions'))) && <EditQuestions />}
          </div>
        </div>
        <div className='settings__wrap-button'>
          <button className='settings__buttons' onClick={removeBot}>
            remove bot
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Settings;
