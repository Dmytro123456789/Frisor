const mongoose = require('mongoose');

const rankSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    level: Number
});

const barberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rank: { type: mongoose.Schema.Types.ObjectId, ref: 'Rank' },
    experience: { type: Number, default: 0 },
    specialties: [String],
    image: String,
    schedule: {
        monday: { start: String, end: String },
        tuesday: { start: String, end: String },
        wednesday: { start: String, end: String },
        thursday: { start: String, end: String },
        friday: { start: String, end: String },
        saturday: { start: String, end: String },
        sunday: { start: String, end: String }
    }
});

const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    duration: { type: Number, required: true }
});

const appointmentSchema = new mongoose.Schema({
    barberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Barber', required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    clientName: { type: String, required: true },
    clientPhone: { type: String, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    notes: { type: String }
});

// User schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

module.exports = {
    User: mongoose.model('User', userSchema, 'users'),
    Rank: mongoose.model('Rank', rankSchema, 'ranks'),
    Barber: mongoose.model('Barber', barberSchema, 'barbers'),
    Service: mongoose.model('Service', serviceSchema, 'services'),
    Appointment: mongoose.model('Appointment', appointmentSchema, 'appointments')
}; 