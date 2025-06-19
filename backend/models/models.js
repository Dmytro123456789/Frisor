const mongoose = require('mongoose');

const rankSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    level: { type: Number, required: true },
});

const barberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    experience: { type: Number, required: true },
    description: String,
    image: String,
    rank: { type: mongoose.Schema.Types.ObjectId, ref: 'Rank' },
});

const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    image_url: String,
});

const appointmentSchema = new mongoose.Schema({
    clientName: { type: String, required: true },
    clientPhone: { type: String, required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    barberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Barber', required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending',
    },
    notes: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now },
});

const Rank = mongoose.model('Rank', rankSchema);
const Barber = mongoose.model('Barber', barberSchema);
const Service = mongoose.model('Service', serviceSchema);
const Appointment = mongoose.model('Appointment', appointmentSchema);
const User = mongoose.model('User', userSchema);

module.exports = { Rank, Barber, Service, Appointment, User }; 