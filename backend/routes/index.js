// This file is unused. All routes are registered directly in server.js

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:3000']
}));

app.get('/api/barbers', (req, res) => {
  res.json([{ id: 1, name: 'John' }, { id: 2, name: 'Anna' }]);
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
