import React from 'react';
import styles from './header.css';
import { Link } from 'react-router';
import PlayerContainer from 'Containers/PlayerContainer';

const Header = () =>
	<div className={styles.container}>
		<Link to='/'>
			<img src='/logo.png' className={styles.logo} />
		</Link>
		<div className={styles.player}>
			<PlayerContainer />
		</div>
		<div className={styles.spacer} />
	</div>

export default Header;
