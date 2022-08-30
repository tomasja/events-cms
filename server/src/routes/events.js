const express = require('express');
const joi = require('joi');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const DB_CONFIG = require('../../config');
const isLoggedIn = require('../middleware/authorization');

const router = express.Router();

const eventSchema = joi.object({
  name: joi.string().required(),
  date: joi.date().min('now').required(),
  description: joi.string(),
  location: joi.string().required(),
  img: joi.string().required(),
  limit: joi.number().required(),
});

router.get('/', async (req, res) => {
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [rows] = await connection.query(
      'SELECT *, (SELECT COUNT(guests_id) FROM events_has_guests WHERE events_id=id) as num FROM events WHERE date>CURDATE() ORDER BY date ASC',
    );
    console.log(rows);
    await connection.end();
    return res.json(rows);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  const eventData = req.body;
  console.log(eventData);
  try {
    await eventSchema.validateAsync(eventData);
    const connection = await mysql.createConnection(DB_CONFIG);
    const [response] = await connection.query(
      'INSERT INTO events SET ?',
      eventData,
    );
    await connection.end();
    return res.json({
      db: response,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
