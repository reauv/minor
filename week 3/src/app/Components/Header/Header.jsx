import React from 'react';
import styles from './header.css';
import { Link } from 'react-router';

const Header = () =>
	<Link to='/' className={styles.container}>
		<img src='/logo.png' className={styles.logo} />
	</Link>

export default Header;
