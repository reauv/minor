import React from 'react';
import styles from './header.css';
import { Link } from 'react-router';
import PlayerContainer from 'Containers/PlayerContainer';

const Header = () =>
	<Link to='/' className={styles.container}>
		<img src='/logo.png' className={styles.logo} />
		<div className={styles.player}>
			<PlayerContainer />
		</div>
	</Link>

export default Header;
