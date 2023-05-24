import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './Components.css';

function Layout(props) {
  return (
    <div className="Layout">
      <Header />
      <div className='page'>
        <div className='content'>
          {props.children}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
