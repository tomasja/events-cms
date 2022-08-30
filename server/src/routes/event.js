const express = require('express');
const joi = require('joi');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const DB_CONFIG = require('../../config');
const isLoggedIn = require('../middleware/authorization');

const router = express.Router();

const eventUpdateSchema = joi.object({
  name: joi.string(),
  date: joi.date().min('now'),
  description: joi.string(),
  location: joi.string(),
  img: joi.string(),
  limit: joi.number(),
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [rows] = await connection.query(
      `SELECT * FROM events WHERE id=${id}`,
    );
    await connection.end();
    return res.json(rows);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get('/attenders/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [rows] = await connection.query(
      `SELECT * FROM guests JOIN events_has_guests ON events_has_guests.guests_id=guests.id WHERE events_id=${id} ORDER BY name ASC`,
    );
    await connection.end();
    return res.json(rows);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, date, description, location, img, limit } = req.body;
  try {
    try {
      await eventUpdateSchema.validateAsync({
        name,
        date,
        description,
        location,
        img,
        limit,
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        err,
      });
    }

    const eventData = {};
    if (name) eventData.name = name;
    if (date) eventData.date = date;
    if (description) eventData.description = description;
    if (location) eventData.location = location;
    if (limit) eventData.limit = limit;

    const con = await mysql.createConnection(DB_CONFIG);
    const [resp] = await con.query(
      `UPDATE events SET ? WHERE id="${Number(id)}"`,
      eventData,
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
