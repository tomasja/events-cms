import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {CalendarMonthOutlined, AccessTimeOutlined, LocationOnOutlined } from '@mui/icons-material'
import './card.scss'

const EventCard = ({name, img, date, description, location}) => {
  return (
    <Card sx={{ maxWidth: 400 }} className='card'>
      <CardActionArea>
        <CardMedia
          component="img"
          height="400"
          width="400"
          image={img}
          alt={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography className='eventsInfo'>
            <div className='eventsData'><CalendarMonthOutlined className='icon' />{new Date(date).toLocaleDateString('lt-lt')}</div>
            <div className='eventsData'><AccessTimeOutlined className='icon' />{new Date(date).toLocaleTimeString('lt-lt', { hour: '2-digit', minute: '2-digit' })}</div>
            <div className='eventsData'><LocationOnOutlined className='icon' />{location}</div>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default EventCard