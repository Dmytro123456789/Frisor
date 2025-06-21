const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// CORS configuration for production
const whitelist = ['http://localhost:3000', 'http://localhost:5000', 'https://frisorb.vercel.app'];
const corsOptions = {
    origin: function (origin, callback) {
        console.log('Request origin:', origin);
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection with environment variables
let MONGODB_URI = process.env.MONGODB_URI;
if (process.env.NODE_ENV !== 'production') {
    if (!MONGODB_URI) {
        throw new Error('MONGODB_URI is not defined. Please create a .env file for local development.');
    }
} else {
    // Fallback for production if the env var is somehow missing (not recommended)
    MONGODB_URI = MONGODB_URI || 'mongodb+srv://admin:admin123@barbershop.y5grhe0.mongodb.net/barbershop?retryWrites=true&w=majority';
}

mongoose.connect(MONGODB_URI)
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

// Serve static files only in development
if (process.env.NODE_ENV !== 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/public')));
}

// Health check endpoint for Render
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}); 