import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <div className='header'>
      <div className='header-logo'></div>
      <div className='header-menu'>
        <div className='header-text'>
          <NavLink to='/'>Main</NavLink>
        </div>
        <div className='header-text'>
          <NavLink to='/tutorial'>Tutorial</NavLink>
        </div>
        <div className='header-text'>
          <NavLink to='/create'>Create</NavLink>
        </div>
        <div className='header-text'>
          <NavLink to='/settings'>Settings</NavLink>
        </div>
        <div className='header-text'>
          <NavLink to='/monitor'>Monitor</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Header;
