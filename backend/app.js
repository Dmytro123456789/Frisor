const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://admin:admin123@barbershop.y5grhe0.mongodb.net/barbershop?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const servicesRouter = require('./routes/services');
const barbersRouter = require('./routes/barbers');
const ranksRouter = require('./routes/ranks');
const appointmentsRouter = require('./routes/appointments');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');

app.use('/api/services', servicesRouter);
app.use('/api/barbers', barbersRouter);
app.use('/api/ranks', ranksRouter);
app.use('/api/appointments', appointmentsRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

app.use(express.static(path.join(__dirname, '../frontend/public')));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 