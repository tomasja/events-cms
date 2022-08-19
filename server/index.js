const express = require('express');
require('dotenv').config();
const cors = require('cors');
// const eventsRouter = require('./src/routes/events');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());
// app.use('/api/v1/events', eventsRouter);
app.all('*', (req, res) => {
  res.status(404).send('Path not found!');
});

app.listen(PORT, () => console.log(`Server is running on PORT:${PORT}`));
