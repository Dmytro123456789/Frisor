const mongoose = require('mongoose');
const Rank = require('../models/Rank');
const Barber = require('../models/Barber');
const Service = require('../models/Service');
const Booking = require('../models/Booking');
const Appointment = require('../models/Appointment');

const ranks = [
    {
        name: 'Junior Barber',
        description: 'Entry level barber position'
    },
    {
        name: 'Senior Barber',
        description: 'Experienced barber with advanced skills'
    },
    {
        name: 'Master Barber',
        description: 'Expert barber with extensive experience'
    }
];

const barbers = [
    {
        name: 'John Doe',
        rank: null,
        experience: 2,
        specialties: ['Haircuts', 'Beard Trimming'],
        image: 'barber1.jpg'
    },
    {
        name: 'Jane Smith',
        rank: null,
        experience: 5,
        specialties: ['Haircuts', 'Hair Coloring'],
        image: 'barber2.jpg'
    }
];

const services = [
    {
        name: 'Haircut',
        description: 'Classic haircut service',
        price: 30,
        duration: 30
    },
    {
        name: 'Beard Trim',
        description: 'Professional beard trimming',
        price: 20,
        duration: 20
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/barbershop', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        await Rank.deleteMany({});
        await Barber.deleteMany({});
        await Service.deleteMany({});
        await Booking.deleteMany({});
        await Appointment.deleteMany({});

        const createdRanks = await Rank.insertMany(ranks);
        console.log('Ranks seeded successfully');

        const barbersWithRanks = barbers.map((barber, index) => ({
            ...barber,
            rank: createdRanks[index % createdRanks.length]._id
        }));

        await Barber.insertMany(barbersWithRanks);
        console.log('Barbers seeded successfully');

        await Service.insertMany(services);
        console.log('Services seeded successfully');

        console.log('Database seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase(); 