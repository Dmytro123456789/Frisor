const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const appointmentsRouter = require('./routes/appointments');
const barbersRouter = require('./routes/barbers');
const servicesRouter = require('./routes/services');
const ranksRouter = require('./routes/ranks');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/appointments', appointmentsRouter);
app.use('/api/barbers', barbersRouter);
app.use('/api/services', servicesRouter);
app.use('/api/ranks', ranksRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

mongoose.connect('mongodb+srv://admin:admin123@barbershop.y5grhe0.mongodb.net/barbershop?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});