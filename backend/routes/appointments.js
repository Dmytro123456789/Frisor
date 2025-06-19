const express = require('express');
const router = express.Router();
const { Appointment } = require('../models/models');

router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate('barberId')
            .populate('serviceId');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { barberId, date, time } = req.body;
        const existingAppointment = await Appointment.findOne({
            barberId,
            date,
            time,
        });

        if (existingAppointment) {
            return res.status(400).json({
                message: 'This time slot is already booked',
            });
        }

        const appointment = new Appointment(req.body);
        const savedAppointment = await appointment.save();
        res.status(201).json(savedAppointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.json(appointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.json({ message: 'Appointment deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;