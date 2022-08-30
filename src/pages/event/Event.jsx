import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/Input';
import Button from '../../components/button/Button';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

const Event = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [event, setEvent] = useState([]);

	useEffect(() => {
		const fetchEvent = async () => {
			try {
				const response = await fetch(
					`http://localhost:8080/api/v1/event/${Number(id)}`
				);
				const data = await response.json();
				setEvent(data);
			} catch (err) {
				console.log(err);
			}
		};
		fetchEvent();
	}, []);

	const [attenders, setAttenders] = useState([]);

	useEffect(() => {
		const fetchAttenders = async () => {
			try {
				const response = await fetch(
					`http://localhost:8080/api/v1/event/attenders/${Number(id)}`
				);
				const data = await response.json();
				setAttenders(data);
			} catch (err) {
				console.log(err);
			}
		};
		fetchAttenders();
	}, []);

	const onDelete = async (ehg_id) => {
		try {
			const response = await fetch(
				`http://localhost:8080/api/v1/guests/attend/${ehg_id}`,
				{
					method: 'DELETE',
				}
			);
			const data = await response.json();
			console.log(data);
			if (data.affectedRows > 0) {
				setAttenders((prev) =>
					prev.filter((attenders) => attenders.ehg_id !== ehg_id)
				);
			}
		} catch (err) {
			console.log(err);
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

	const [newAttender, setNewAttender] = useState({
		guests_id: '',
	});

	const onFormSubmit = async (e) => {
		console.log(newAttender);
		try {
			const response = await fetch(
				`http://localhost:8080/api/v1/guests/add-to-event/${Number(id)}`,
				// `http://localhost:8080/api/v1/guests/add-to-event`,
				{
					method: 'POST',
					body: JSON.stringify(newAttender),
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			const data = await response.json();
			console.log(response);
			if (data.err) return console.log(data.err);
			setNewAttender();
			navigate(`/event/${Number(id)}`);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Box sx={{ flexGrow: 1, minHeight: '100%' }}>
			<Grid container>
				<Grid xs={12} container>
					<Grid xs={1}></Grid>
					<Grid xs={10}>
						{event.map(({ id, name, date, location, limit }) => {
							return (
								<div key={id}>
									<h1>{name}</h1>
									<h3>
										{new Date(date).toLocaleDateString('lt-lt')}{' '}
										{new Date(date).toLocaleTimeString('lt-lt', {
											hour: '2-digit',
											minute: '2-digit',
										})}
										, {location}
									</h3>
								</div>
							);
						})}
					</Grid>
					<Grid xs={1}></Grid>
				</Grid>
				<Grid xs={12} container spacing={8}>
					<Grid xs={1}></Grid>
					<Grid xs={8}>
						<h3>Registered guests</h3>
						<table>
							<thead>
								<th>Name</th>
								<th>Email</th>
								<th>Age</th>
								<th></th>
							</thead>
							<tbody>
								{attenders.map(({ ehg_id, id, name, email, date }) => {
									return (
										<tr key={ehg_id}>
											<td>{name}</td>
											<td>{email}</td>
											<td className='center'>
												{new Date(date).toLocaleDateString('lt-lt')}
											</td>
											<td>
												<Link to={`/guest/${id}`}>
													<Button
														btnTitle={<RemoveRedEyeIcon />}
														btnClassName='btn-primary small'
													/>
												</Link>
											</td>
											<td>
												<Button
													btnTitle={<PersonRemoveIcon />}
													btnClassName='btn-danger small'
													onClick={() => onDelete(ehg_id)}
												/>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</Grid>
					<Grid xs={2}>
						<h3>Add new guest to the event</h3>
						<form onSubmit={onFormSubmit}>
							<input
								list='guests'
								onChange={(event) =>
									setNewAttender((prev) => ({
										...prev,
										guests_id: event.target.value,
									}))
								}
							/>
							<datalist id='guests'>
								{guests.map(({ id, name }) => {
									return (
										<option key={id} id={id} value={id} label={name}>
											{name}
										</option>
									);
								})}
							</datalist>
							<Button btnTitle='Add Guest'></Button>
						</form>
					</Grid>
					<Grid xs={1}></Grid>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Event;
