import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';
import Input from '../../components/inputs/Input';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import '../login/login.scss';

const Register = () => {
	const navigate = useNavigate();
	const [userData, setUserData] = useState({
		full_name: '',
		email: '',
		password: '',
		repPassword: '',
	});
	console.log(userData);
	const onFormSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await fetch(
				`http://localhost:8080/api/v1/auth/register`,
				{
					method: 'POST',
					body: JSON.stringify(userData),
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			const data = await response.json();
			if (data.err) return alert(data.err);
			localStorage.setItem('user', JSON.stringify(data.user));
			navigate('/login');
		} catch (err) {
			alert(err);
		}
	};

	return (
		<Box sx={{ flexGrow: 1, minHeight: '100%', marginTop: '20%' }}>
			<Grid container>
				<Grid xs={4}></Grid>
				<Grid xs={4}>
					<h2>Register new employee</h2>
					<form onSubmit={onFormSubmit}>
						<Input
							type='text'
							name='full_name'
							id='full_name'
							placeholder='Full Name'
							onChange={(event) =>
								setUserData((prev) => ({
									...prev,
									full_name: event.target.value,
								}))
							}
							value={userData.full_name}
							required
							className={'full-width'}
						/>
						<Input
							type='email'
							name='email'
							id='email'
							placeholder='Email'
							onChange={(event) =>
								setUserData((prev) => ({ ...prev, email: event.target.value }))
							}
							value={userData.email}
							inpRequired
							className={'full-width'}
						/>

						<Input
							type='password'
							name='password'
							id='password'
							placeholder='Password'
							onChange={(event) =>
								setUserData((prev) => ({
									...prev,
									password: event.target.value,
								}))
							}
							value={userData.password}
							required
							className={'full-width'}
						/>

						<Input
							type='password'
							name='repPassword'
							id='repPassword'
							placeholder='Replace password'
							value={userData.repPassword}
							onChange={(event) =>
								setUserData((prev) => ({
									...prev,
									repPassword: event.target.value,
								}))
							}
							required
							className={'full-width'}
						/>

						<Button btnTitle='Register' btnClassName='btn-primary'></Button>
					</form>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Register;
