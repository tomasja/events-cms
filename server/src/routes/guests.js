const express = require('express');
const joi = require('joi');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const DB_CONFIG = require('../../config');
const isLoggedIn = require('../middleware/authorization');

const router = express.Router();

const guestSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  date: joi.date().required(),
});

router.get('/', async (req, res) => {
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [rows] = await connection.query(
      'SELECT * FROM guests ORDER BY name ASC',
    );
    await connection.end();
    return res.json(rows);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [rows] = await connection.query(
      `SELECT * FROM guests WHERE id=${id}`,
    );
    await connection.end();
    return res.json(rows);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get('/attender/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [rows] = await connection.query(
      `SELECT * FROM events JOIN events_has_guests ON events_has_guests.events_id=events.id WHERE guests_id=${id}`,
    );
    await connection.end();
    return res.json(rows);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  const guestData = req.body;
  console.log(guestData);
  try {
    await guestSchema.validateAsync(guestData);
    const connection = await mysql.createConnection(DB_CONFIG);
    const [rows] = await connection.query(
      `SELECT * FROM guests WHERE email='${guestData.email}' AND date='${guestData.date}'`,
    );
    console.log(rows);
    if (rows.length > 0) {
      return res.status(400).json({
        status: 'Bad Request!',
        alert: 'Guest with this email and date of birth exist!',
      });
    }
    const [response] = await connection.query(
      'INSERT INTO guests SET ?',
      guestData,
    );
    await connection.end();
    return res.json({
      db: response,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post('/add-to-event/:id', async (req, res) => {
  const { id } = req.params;
  const { guests_id } = req.body;
  console.log(id, guests_id);
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [response] = await connection.query(
      `INSERT INTO events_has_guests (events_id, guests_id) VALUES (${id}, ${guests_id})`,
    );
    await connection.end();
    return res.json({
      db: response,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.delete('/attend/:ehg_id', async (req, res) => {
  const { ehg_id } = req.params;
  try {
    const con = await mysql.createConnection(DB_CONFIG);
    const [resp] = await con.query(
      `DELETE FROM events_has_guests WHERE ehg_id="${Number(ehg_id)}"`,
    );
    await con.end();
    return res.json(resp);
  } catch (err) {
    return res.status(500).json({
      status: 500,
      err,
    });
  }
});

module.exports = router;
