import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import './guest.scss';

const Guest = () => {
	const { id } = useParams();
	// const navigate = useNavigate();
	const [guestData, setGuestData] = useState([]);
	const [eventsData, setEventsData] = useState([]);

	useEffect(() => {
		const fetchGuest = async () => {
			try {
				const response = await fetch(
					`http://localhost:8080/api/v1/guests/${Number(id)}`
				);
				const data = await response.json();
				setGuestData(data);
			} catch (err) {
				console.log(err);
			}
		};
		fetchGuest();
	}, []);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await fetch(
					`http://localhost:8080/api/v1/guests/attender/${Number(id)}`
				);
				const data = await response.json();
				setEventsData(data);
			} catch (err) {
				console.log(err);
			}
		};
		fetchEvents();
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
				setEventsData((prev) =>
					prev.filter((eventsData) => eventsData.ehg_id !== ehg_id)
				);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Box sx={{ flexGrow: 1, minHeight: '100%' }}>
			<Grid container>
				<Grid xs={1}></Grid>
				<Grid xs={10}>
					{guestData.map(({ id, name, email, date }) => {
						return (
							<div key={id}>
								<h1>{name}</h1>
								<div>
									<div>Email: {email}</div>
									<div>
										Date of Births: {new Date(date).toLocaleDateString('lt-lt')}
									</div>
								</div>
							</div>
						);
					})}
					<div>
						<h2>Upcoming Events</h2>
						<table>
							<thead>
								<th>Date</th>
								<th>Name</th>
								<th>Time</th>
								<th>Location</th>
								<th></th>
							</thead>
							<tbody>
								{eventsData.map(({ ehg_id, date, name, location }) => {
									return (
										<tr key={ehg_id}>
											<td className='center'>
												{new Date(date).toLocaleDateString('lt-lt')}
											</td>
											<td>{name}</td>
											<td className='center'>
												{new Date(date).toLocaleTimeString('lt-lt', {
													hour: '2-digit',
													minute: '2-digit',
												})}
											</td>
											<td className='center'>{location}</td>
											<td className='center'>
												<Button
													btnTitle={'Delete from event'}
													btnClassName='btn-danger'
													onClick={() => onDelete(ehg_id)}
												/>
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

export default Guest;
