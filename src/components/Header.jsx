import { NavLink } from 'react-router-dom';


function Header() {
  return (
<<<<<<< HEAD
    <div className='header'>
      <div className='header-logo'></div>
      <div className='header-menu'>
        <div className='header-text'>What is a bot?</div>
        <div className='header-text'>Examples of works</div>
        <div className='header-text'>Reviews</div>
        <div className='header-text'>Cost</div>
=======
      <div className='header'>
        <div className='header-logo'></div>
        <div className='header-menu'>
          <div className='header-text'>
            <NavLink to="/settings">Settings</NavLink>
          </div>
          <div className='header-text'><NavLink to="/monitor">Monitor</NavLink></div>
          <div className='header-text'><NavLink to="/create">Create</NavLink></div>
        </div>
>>>>>>> develop
      </div>
    </div>
  );
}

export default Header;
