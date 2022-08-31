const express = require('express');
const joi = require('joi');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const DB_CONFIG = require('../../config');
const isLoggedIn = require('../middleware/authorization');
const { assert } = require('joi');

const router = express.Router();

const authRegisterSchema = joi.object({
  full_name: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().min(4).required(),
  repPassword: joi.string().required(),
});

const authLoginSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().min(4).required(),
});

router.get('/users', async (req, res) => {
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [rows] = await connection.query('SELECT * FROM users');
    await connection.end();
    return res.json(rows);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post('/register', async (req, res) => {
  const { full_name: fullName, email, password, repPassword } = req.body;
  try {
    await authRegisterSchema.validateAsync({
      full_name: fullName,
      email,
      password,
      repPassword,
    });
    if (password !== repPassword) {
      return res
        .status(400)
        .json({ status: 'Bad Request!', error: 'Passwords do not match!' });
    }
  } catch (err) {
    return res.status(400).json(err);
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const connection = await mysql.createConnection(DB_CONFIG);
    const [rows] = await connection.query(
      `SELECT * FROM users WHERE email="${email}"`,
    );
    if (rows.length > 0) {
      return res.status(400).json({
        status: 'Bad Request!',
        error: 'User already exists!',
      });
    }
    const [response] = await connection.query('INSERT INTO users SET ?', {
      full_name: fullName,
      email,
      password: hashedPassword,
    });
    await connection.end();
    const token = jwt.sign(
      {
        id: response.insertId,
        full_name: fullName,
        email,
      },
      process.env.JWT_SECRET,
    );
    return res.json({
      db: response,
      token,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    await authLoginSchema.validateAsync({ email, password });
  } catch (err) {
    return res.status(400).json(err);
  }
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [user] = await connection.query(
      `SELECT * FROM users WHERE email="${email}"`,
    );
    await connection.end();
    if (user.length === 0) {
      return res
        .status(400)
        .json({ status: 'Bad Request!', error: 'User not found!' });
    }
    const compare = await bcrypt.compare(password, user[0].password);
    if (!compare) {
      return res
        .status(400)
        .json({ status: 'Bad Request!', error: 'Password is incorrect!' });
    }
    const token = jwt.sign(
      {
        id: user[0].id,
        full_name: user[0].full_name,
      },
      process.env.JWT_SECRET,
    );

    return res.cookie('jwt', token).json({ status: true, user, token });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get('/logout', (req, res) =>
  res.clearCookie('jwt').json({ status: true }),
);

module.exports = router;
