import { useState } from 'react';
import reactLogo from '@/assets/react.svg';
import viteLogo from '/vite.svg';
import Layout from '@/components/Layout';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Layout>
      <div className='page'>
        <div className='content'>
          <div className='content-item'>
            <div className='content-item-advertisement'>We help develop bots of any complexity</div>
            <ul className='content-item-list'>
              <li>Many years in the work</li>
              <li>Lots of orders</li>
              <li>A lot of users</li>
            </ul>
            <div className='content-item-button'>
              <a href={`/test`}>Test &raquo;</a>
            </div>
          </div>

          <div className='content-links'>
            <div>
              <a href='https://vitejs.dev' target='_blank' rel='noreferrer'>
                <img src={viteLogo} className='logo' alt='Vite logo' />
              </a>
              <a href='https://reactjs.org' target='_blank' rel='noreferrer'>
                <img src={reactLogo} className='logo react' alt='React logo' />
              </a>
            </div>
            <h1>Vite + React</h1>
            <div className='card'>
              <button
                onClick={() => {
                  updateAmount(10);
                  setCount((count) => count + 1);
                }}
              >
                count is {count}
              </button>
              <p>
                Edit <code>src/App.jsx</code> and save to test HMR
              </p>
            </div>
            <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
