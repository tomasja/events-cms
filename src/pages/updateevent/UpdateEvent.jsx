import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/button/Button';
import Input from '../../components/inputs/Input';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

const UpdateEvent = () => {
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

	const [newEventData, setNewEventData] = useState({
		name: '',
		date: '',
		description: '',
		location: '',
		img: '',
		limit: '',
	});

	const onFormSubmit = async (e) => {
		e.preventDefault();
		const event = {
			name: newEventData.name,
			date: newEventData.date,
			description: newEventData.description,
			location: newEventData.location,
			img: newEventData.img,
			limit: newEventData.limit,
		};
		try {
			const response = await fetch(
				`http://localhost:8080/api/v1/event/${Number(id)}`,
				{
					method: 'PATCH',
					body: JSON.stringify(event),
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			const data = await response.json();
			console.log(data);
			if (data.err) return alert(data.err);
			setNewEventData();
			navigate('/dashboard');
		} catch (err) {
			alert(err);
		}
	};

	return (
		<Box sx={{ flexGrow: 1, minHeight: '100%' }}>
			<Grid container>
				<Grid xs={1}></Grid>
				<Grid xs={10}>
					{event.map(
						({ id, name, date, description, location, img, limit }) => {
							return (
								<div>
									<h2>Update {name} info</h2>
									<table key={id}>
										<tr>
											<td>Name:</td>
											<td>{name}</td>
										</tr>
										<tr>
											<td>Date/time:</td>
											<td>
												{new Date(date).toLocaleDateString('lt-lt')}{' '}
												{new Date(date).toLocaleTimeString('lt-lt', {
													hour: '2-digit',
													minute: '2-digit',
												})}
											</td>
										</tr>
										<tr>
											<td>Description:</td>
											<td>{description}</td>
										</tr>
										<tr>
											<td>Location:</td>
											<td>{location}</td>
										</tr>
										<tr>
											<td>Limit:</td>
											<td>{limit}</td>
										</tr>
									</table>
								</div>
							);
						}
					)}

					<p>If You want to change data, please fill all inputs.</p>
					<form onSubmit={onFormSubmit}>
						<div>
							<Input
								className='full-width title'
								type='name'
								name='name'
								placeholder='Event Title'
								onChange={(event) =>
									setNewEventData((prev) => ({
										...prev,
										name: event.target.value,
									}))
								}
								value={newEventData.name}
							/>
						</div>
						<div>
							<textarea
								type='textarea'
								rows='5'
								name='description'
								placeholder='Short description'
								onChange={(event) =>
									setNewEventData((prev) => ({
										...prev,
										description: event.target.value,
									}))
								}
								value={newEventData.description}
							/>
						</div>
						<div>
							<Input
								type='datetime-local'
								name='date'
								placeholder='Date'
								onChange={(event) =>
									setNewEventData((prev) => ({
										...prev,
										date: event.target.value,
									}))
								}
								value={newEventData.date}
							/>
							<Input
								type='text'
								name='location'
								placeholder='Location'
								onChange={(event) =>
									setNewEventData((prev) => ({
										...prev,
										location: event.target.value,
									}))
								}
								value={newEventData.location}
							/>
							<Input
								type='number'
								name='limit'
								placeholder='Limit'
								onChange={(event) =>
									setNewEventData((prev) => ({
										...prev,
										limit: event.target.value,
									}))
								}
								value={newEventData.limit}
							/>
							<Input
								className='full-width'
								type='url'
								name='img'
								placeholder='Image'
								onChange={(event) =>
									setNewEventData((prev) => ({
										...prev,
										img: event.target.value,
									}))
								}
								value={newEventData.img}
							/>
						</div>
						<div>
							<Button btnTitle='Update' btnClassName='btn-primary'></Button>
						</div>
					</form>
				</Grid>
				<Grid xs={1}></Grid>
			</Grid>
		</Box>
	);
};

export default UpdateEvent;
