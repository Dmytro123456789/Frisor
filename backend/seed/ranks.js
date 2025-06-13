const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/barbershop', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const rankSchema = new mongoose.Schema({
    name: String,
    description: String,
    level: Number
});
const Rank = mongoose.model('Rank', rankSchema, 'ranks');

const ranks = [
    { name: 'Стажер', description: 'Початковий рівень', level: 1 },
    { name: 'Барбер', description: 'Базовий рівень', level: 2 },
    { name: 'Старший барбер', description: 'Досвідчений барбер', level: 3 },
    { name: 'Топ-барбер', description: 'Експерт', level: 4 },
    { name: 'Адміністратор', description: 'Керівник закладу', level: 5 }
];

async function seed() {
    await Rank.deleteMany({});
    await Rank.insertMany(ranks);
    console.log('Колекцію ranks створено і заповнено!');
    mongoose.disconnect();
}

seed(); 