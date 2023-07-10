import { NavLink } from 'react-router-dom';

function List(props) {
  return (
    <li key={props.id} className='header__text'>
      <NavLink to={props.link}>{props.title}</NavLink>
    </li>
  );
}

function Header() {
  const listOfLinks = [
    {
      title: `Main`,
      link: '/',
      id: '0',
    },
    {
      title: `Tutorial`,
      link: '/tutorial',
      id: '1',
    },
    {
      title: `Create`,
      link: '/create',
      id: '2',
    },
    {
      title: `Settings`,
      link: '/settings',
      id: '3',
    },
    {
      title: `Monitor`,
      link: '/monitor',
      id: '4',
    },
  ];

  return (
    <header className='header'>
      <div className='header__logo'>
        <img alt='nan'></img>
      </div>
      <ul className='header__menu'>
        {listOfLinks.map((linkInfo) => (
          <List link={linkInfo.link} title={linkInfo.title} key={linkInfo.id} />
        ))}
      </ul>
    </header>
  );
}

export default Header;
