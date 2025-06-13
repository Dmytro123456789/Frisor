const express = require('express');
const router = express.Router();
const { Barber } = require('../models/models');
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
    try {
        const barbers = await Barber.find().populate('rank');
        res.json(barbers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const barber = await Barber.findById(req.params.id).populate('rank');
        if (!barber) return res.status(404).json({ message: 'Barber not found' });
        res.json(barber);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const barber = new Barber({
        name: req.body.name,
        rank: req.body.rank,
        experience: req.body.experience,
        specialties: req.body.specialties,
        image: req.body.image,
        schedule: req.body.schedule
    });

    try {
        const newBarber = await barber.save();
        res.status(201).json(newBarber);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedBarber = await Barber.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedBarber) return res.status(404).json({ message: 'Barber not found' });
        res.json(updatedBarber);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Некоректний ID' });
        }
        const result = await Barber.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ error: 'Барбера не знайдено' });
        }
        res.json({ message: 'Барбера видалено' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;