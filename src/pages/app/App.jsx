import Layout from '@/components/Layout';


function App() {

  return (

    <Layout>
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
    </Layout>
  );
}

export default App;
