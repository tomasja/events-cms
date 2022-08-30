import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';
import Input from '../../components/inputs/Input';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import './gustes.scss';

const Guests = () => {
	const navigate = useNavigate();
	const [guestData, setNewGuestData] = useState({
		name: '',
		date: '',
		email: '',
	});

	const onFormSubmit = async (e) => {
		// e.preventDefault();
		try {
			const response = await fetch(`http://localhost:8080/api/v1/guests`, {
				method: 'POST',
				body: JSON.stringify(guestData),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await response.json();
			console.log(data);
			if (data.err) return alert(data.err);
			setNewGuestData();
			navigate('/guests');
		} catch (err) {
			alert(err);
		}
	};

	const [guests, setGuests] = useState([]);

	useEffect(() => {
		const fetchGuests = async () => {
			try {
				const response = await fetch(`http://localhost:8080/api/v1/guests`);
				const data = await response.json();
				setGuests(data);
			} catch (err) {
				console.log(err);
			}
		};
		fetchGuests();
	}, []);

	return (
		<Box sx={{ flexGrow: 1, minHeight: '100%' }}>
			<Grid container>
				<Grid xs={1}></Grid>
				<Grid xs={10}>
					<h2>Add New Guest</h2>
					<form onSubmit={onFormSubmit}>
						<div>
							<Input
								className='title'
								type='name'
								name='name'
								placeholder='Full Name'
								onChange={(guest) =>
									setNewGuestData((prev) => ({
										...prev,
										name: guest.target.value,
									}))
								}
								required
							/>
							<Input
								type='email'
								name='email'
								placeholder='Email'
								onChange={(guest) =>
									setNewGuestData((prev) => ({
										...prev,
										email: guest.target.value,
									}))
								}
							/>
							<Input
								type='date'
								name='date'
								placeholder='Date of Birth'
								onChange={(guest) =>
									setNewGuestData((prev) => ({
										...prev,
										date: guest.target.value,
									}))
								}
								required
							/>
							<Button
								btnTitle='Create New Guest'
								btnClassName='btn-success'
							></Button>
						</div>
					</form>
					<div>
						<h2>All registered guests</h2>
						<table>
							<thead>
								<th>Full Name</th>
								<th>Email</th>
								<th>Date of Birth</th>
								<th></th>
							</thead>
							<tbody>
								{guests.map(({ id, name, email, date }) => {
									return (
										<tr key={id}>
											<td>{name}</td>
											<td>{email}</td>
											<td>{new Date(date).toLocaleDateString('lt-lt')}</td>
											<td>
												<Link to={`/guest/${id}`}>
													<Button
														btnTitle={<EditOutlinedIcon />}
														btnClassName='btn-success small'
													/>
												</Link>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</Grid>
				<Grid xs={1}></Grid>
			</Grid>
		</Box>
	);
};

export default Guests;
