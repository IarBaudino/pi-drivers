import React from 'react';
import styles from './navBar.module.css'; // Asegúrate de que la ruta sea correcta
import {Link} from 'react-router-dom'
const NavBar = () => {
  return (
    <div className={styles.container}>
      <Link to="/" className={styles.logoLink}>
        <img src="https://i.pinimg.com/564x/1a/4e/52/1a4e52dfe799dac527f42112bb84bc47.jpg" alt="logo" className={styles.logo} />
        <p className={styles.logoText}>START</p>
      </Link>
      <div>
        <Link to="/home">HOME</Link>
        <Link to="/create">CREATE</Link>
      </div>
      <div>
        <input type="text" name='' id='' />
        <input type="submit" />
      </div>
    </div>
  );
};

export default NavBar;