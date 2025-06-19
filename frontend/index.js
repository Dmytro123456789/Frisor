const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Імпорт роутів
const appointmentsRouter = require('../backend/routes/appointments');
const authRouter = require('../backend/routes/auth');
const barbersRouter = require('../backend/routes/barbers');
const servicesRouter = require('../backend/routes/services');
const ranksRouter = require('../backend/routes/ranks');
const usersRouter = require('../backend/routes/users');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend/public')));

// MongoDB підключення
mongoose.connect('mongodb://localhost:27017/barbershop', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB підключено успішно'))
.catch(err => console.error('Помилка підключення до MongoDB:', err));

// Роути API
app.use('/api/appointments', appointmentsRouter);
app.use('/api/auth', authRouter);
app.use('/api/barbers', barbersRouter);
app.use('/api/services', servicesRouter);
app.use('/api/ranks', ranksRouter);
app.use('/api/users', usersRouter);

// Обробка запитів до фронтенду
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/public/index.html'));
});

// Обробка помилок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Щось пішло не так!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Сервер запущено на порту ${PORT}`);
}); 