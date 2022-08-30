import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/Dashboard';
import NewEvent from './pages/newevent/NewEvent';
import UpdateEvent from './pages/updateevent/UpdateEvent';
import Event from './pages/event/Event';
import Guests from './pages/guests/Guests';
import MyEvent from './pages/myevents/MyEvent';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Error from './pages/error/Error';
import Footer from './components/footer/Footer';
import Guest from './pages/guest/Guest';
import './App.scss';

function App() {
	return (
		<div className='container'>
			<Header />
			<div className='page_container'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/add-event' element={<NewEvent />} />
					<Route path='/update-event/:id' element={<UpdateEvent />} />
					<Route path='/guests' element={<Guests />} />
					<Route path='/event/:id' element={<Event />} />
					<Route path='/guest/:id' element={<Guest />} />
					<Route path='/my-events' element={<MyEvent />} />
					<Route path='/login' element={<Login />} className='center' />
					<Route path='/register' element={<Register />} />
					<Route path='*' element={<Error />} />
				</Routes>
			</div>
			<Footer />
		</div>
	);
}

export default App;
