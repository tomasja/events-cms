import React, { useEffect, useState } from 'react';
import Card from '../../components/card/Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import './home.scss';

const Home = () => {
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
					<h1>Upcoming Events</h1>
					<div className='eventsCards'>
						{events.map(({ id, img, name, date, description, location }) => {
							return (
								<Card
									key={id}
									img={img}
									name={name}
									date={date}
									description={description}
									location={location}
								/>
							);
						})}
					</div>
				</Grid>
				<Grid xs={1}></Grid>
			</Grid>
		</Box>
	);
};

export default Home;
