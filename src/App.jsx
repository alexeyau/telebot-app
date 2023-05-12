import { useState } from 'react';

import reactLogo from './assets/react.svg';

// eslint-disable-next-line import/no-unresolved
import viteLogo from '/vite.svg';
import './App.css';


function App() {
	const [count, setCount] = useState(0);

  return (
    <div className="App">

      <div className='header'>

        <div className='header-logo'></div>
        <div className='header-menu'>
          <div className='header-text'>What is a bot?</div>
          <div className='header-text'>Examples of works</div>
          <div className='header-text'>Reviews</div>
          <div className='header-text'>Cost</div>
        </div>

      </div>
      
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
              <a href="https://vitejs.dev" target="_blank">
                <img src={viteLogo} className="logo" alt="Vite logo" />
              </a>
              <a href="https://reactjs.org" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
              </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
              <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
              </button>
              <p>
                Edit <code>src/App.jsx</code> and save to test HMR
              </p>
            </div>
            <p className="read-the-docs">
              Click on the Vite and React logos to learn more
            </p>
          </div>

        </div>

        <div className='footer'><div className='footer-text'>Footer</div></div>

      </div>



    </div>
  );
}

export default App;
