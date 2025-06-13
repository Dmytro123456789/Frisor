const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://admin:admin123@barbershop.y5grhe0.mongodb.net/?retryWrites=true&w=majority&appName=Barbershop";
const client = new MongoClient(uri);

async function connect() {
    try {
        await client.connect();
        console.log('Підключено до MongoDB Atlas');
        return client.db('barbershop');
    } catch (err) {
        console.error('Помилка підключення до MongoDB:', err);
        process.exit(1);
    }
}

module.exports = {
    connect,
    client
}; 