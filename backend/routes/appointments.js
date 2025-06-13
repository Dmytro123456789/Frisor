const express = require('express');
const router = express.Router();
const { Appointment } = require('../models/models');

router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const { barberId, serviceId, date, time, clientName, clientPhone, userId, notes } = req.body;
    if (!barberId || !serviceId || !date || !time || !clientName || !clientPhone) {
        return res.status(400).json({ message: 'Всі поля обов\'язкові для заповнення' });
    }
    // Перевірка: чи вже є запис для цього барбера на цю дату і годину
    try {
        const exists = await Appointment.findOne({
            barberId,
            date: new Date(date),
            time
        });
        if (exists) {
            return res.status(409).json({ message: 'Барбер вже зайнятий на цей час. Оберіть іншу годину.' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Помилка перевірки запису', error: error.message });
    }
    const appointment = new Appointment({
        barberId,
        serviceId,
        date,
        time,
        clientName,
        clientPhone,
        userId: userId || undefined,
        notes: notes || ''
    });
    try {
        const newAppointment = await appointment.save();
        res.status(201).json(newAppointment);
    } catch (error) {
        console.error('Error saving appointment:', error);
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.json({ message: 'Appointment deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const update = req.body;
        const updated = await Appointment.findByIdAndUpdate(req.params.id, update, { new: true });
        if (!updated) return res.status(404).json({ message: 'Appointment not found' });
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;