import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../App';

import './header.scss';

const Header = () => {
	// const { isLoggedIn, setUser } = useContext(AuthContext);

	const onUserLogout = () => {
		// setUser(null);
		localStorage.clear();
	};

	return (
		<nav>
			<Link to='/' className='logo'>
				Events CRM
			</Link>
			<div>
				<Link to='/dashboard'>Dashboard</Link>
				<Link to='/add-event'>Create Event</Link>
				<Link to='/guests'>Guests</Link>
				{/* {isLoggedIn && <Link to='/dashboard'>Dashboard</Link>}
				{isLoggedIn && <Link to='/add-event'>Create Event</Link>}
				{isLoggedIn && <Link to='/guests'>Guests</Link>} */}
			</div>
			<div>
				{/* <Link to='/my-events' className='myEvents'>
					My Events
				</Link> */}
				<Link to='/login'>Login</Link>
				<Link to='/register'>Register</Link>
				{/* <Link>
					<button onClick={onUserLogout}>Logout</button>
				</Link> */}
			</div>
		</nav>
	);
};

export default Header;
