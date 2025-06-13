const express = require('express');
const router = express.Router();
const { Rank } = require('../models/models');
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
    try {
        const ranks = await Rank.find();
        res.json(ranks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const rank = await Rank.findById(req.params.id);
        if (!rank) return res.status(404).json({ message: 'Rank not found' });
        res.json(rank);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const rank = new Rank({
        name: req.body.name,
        description: req.body.description
    });

    try {
        const newRank = await rank.save();
        res.status(201).json(newRank);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedRank = await Rank.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedRank) return res.status(404).json({ message: 'Rank not found' });
        res.json(updatedRank);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Некоректний ID' });
        }
        const result = await Rank.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ error: 'Звання не знайдено' });
        }
        res.json({ message: 'Звання видалено' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router; 