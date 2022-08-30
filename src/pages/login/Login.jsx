import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import './login.scss';
import Button from '../../components/button/Button';
import Input from '../../components/inputs/Input';
// import { AuthContext } from '../../App';

const Login = () => {
	const navigate = useNavigate();
	const [userData, setUserData] = useState({
		email: '',
		password: '',
	});
	const onFormSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await fetch(`http://localhost:8080/api/v1/auth/login`, {
				method: 'POST',
				body: JSON.stringify(userData),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await response.json();
			console.log(data);
			if (data.err) return alert(data.err);
			// setUser();
			localStorage.setItem('user', JSON.stringify(data.user));
			navigate('/dashboard');
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Box sx={{ flexGrow: 1, minHeight: '100%', marginTop: '20%' }}>
			<Grid container>
				<Grid xs={4}></Grid>
				<Grid xs={4}>
					<h2>Login for employees</h2>
					<form onSubmit={onFormSubmit}>
						<div>
							<h5>Login data</h5>
							<p>Email: kateiva.gytis@valdas.lt</p>
							<p>Password: 0cac6971</p>
						</div>
						<Input
							type='email'
							name='email'
							id='email'
							value={userData.email}
							placeholder='email'
							onChange={(event) =>
								setUserData((prev) => ({ ...prev, email: event.target.value }))
							}
							required
						/>

						<Input
							type='password'
							name='password'
							id='password'
							placeholder='password'
							value={userData.password}
							onChange={(event) =>
								setUserData((prev) => ({
									...prev,
									password: event.target.value,
								}))
							}
							required
						/>

						<Button btnTitle='Login' btnClassName='btn-primary'></Button>
					</form>
				</Grid>
				<Grid xs={4}></Grid>
			</Grid>
		</Box>
	);
};

export default Login;
