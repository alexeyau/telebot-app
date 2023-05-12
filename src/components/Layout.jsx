import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './Layout.css';

function Layout(props) {
  return (
    <div className="Layout">

        <Header />
        {props.children}
        <Footer />

    </div>
  );
}

export default Layout;
