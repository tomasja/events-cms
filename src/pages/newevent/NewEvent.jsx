import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';
import Input from '../../components/inputs/Input';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import './newevent.scss';

const NewEvent = () => {
	const navigate = useNavigate();
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
		try {
			const response = await fetch(`http://localhost:8080/api/v1/events`, {
				method: 'POST',
				body: JSON.stringify(newEventData),
				headers: {
					'Content-Type': 'application/json',
				},
			});
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
					<h2>Add New Event</h2>
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
								required
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
								required
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
								required
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
							/>
							<Input
								// className='full-width'
								type='url'
								name='img'
								placeholder='Image'
								onChange={(event) =>
									setNewEventData((prev) => ({
										...prev,
										img: event.target.value,
									}))
								}
							/>
						</div>
						<div>
							<Button
								btnTitle='Create New event'
								btnClassName='btn-success'
							></Button>
						</div>
					</form>
				</Grid>
				<Grid xs={1}></Grid>
			</Grid>
		</Box>
	);
};

export default NewEvent;
