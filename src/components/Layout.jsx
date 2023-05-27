import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './Components.css';

function Layout(props) {
  return (
<<<<<<< HEAD
    <div className='Layout'>
      <Header />
      {props.children}
=======
    <div className="Layout">
      <Header />
      <div className='page'>
        <div className='content'>
          {props.children}
        </div>
      </div>
>>>>>>> develop
      <Footer />
    </div>
  );
}

export default Layout;
