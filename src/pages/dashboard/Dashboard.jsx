import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './dashboard.scss';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Button from '../../components/button/Button';
import { styled } from '@mui/material/styles';
import Container from '@mui/system';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { sizing } from '@mui/system';

const Dashboard = () => {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await fetch(`http://localhost:8080/api/v1/events`);
				const data = await response.json();
				setEvents(data);
			} catch (err) {
				console.log(err);
			}
		};
		fetchEvents();
	}, []);

	return (
		<Box sx={{ flexGrow: 1, minHeight: '100%' }}>
			<Grid container>
				<Grid xs={1}></Grid>
				<Grid xs={10}>
					<h2>Upcoming Events</h2>
					<table>
						<thead>
							<tr>
								<th>Date</th>
								<th>Name</th>
								<th>Time</th>
								<th>Location</th>
								<th>Limit</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{events.map(({ id, name, date, location, limit, num }) => {
								return (
									<tr key={id}>
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
											{num}/{limit}
										</td>
										<td className='center'>
											<Link to={`/event/${id}`}>
												<Button
													btnTitle={<PersonAddOutlinedIcon />}
													btnClassName='btn-info small'
												/>
											</Link>
											<Link to={`/update-event/${id}`}>
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
				</Grid>
				<Grid xs={1}></Grid>
			</Grid>
		</Box>
	);
};

export default Dashboard;
