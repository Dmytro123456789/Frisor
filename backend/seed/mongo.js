const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://admin:admin123@barbershop.y5grhe0.mongodb.net/?retryWrites=true&w=majority&appName=Barbershop";
const client = new MongoClient(uri);

async function seed() {
    try {
        await client.connect();
        const db = client.db('barbershop');

        const ranks = [
            { 
                name: 'Стажер',
                description: 'Початковий рівень, навчання основам барберінгу',
                level: 1
            },
            { 
                name: 'Барбер',
                description: 'Базовий рівень, самостійна робота з клієнтами',
                level: 2
            },
            { 
                name: 'Старший барбер',
                description: 'Досвідчений барбер з широким спектром послуг',
                level: 3
            },
            { 
                name: 'Топ-барбер',
                description: 'Експерт з найвищим рівнем майстерності',
                level: 4
            },
            { 
                name: 'Адміністратор',
                description: 'Керівник закладу, експерт з управління',
                level: 5
            }
        ];

        const barbers = [
            {
                name: 'Олександр',
                position: 'Старший барбер',
                experience: 5,
                description: 'Спеціалізується на класичних стрижках та моделюванні бороди',
                image_url: 'img/barber1.jpg',
                rang: 'Старший барбер'
            },
            {
                name: 'Максим',
                position: 'Барбер',
                experience: 3,
                description: 'Експерт з сучасних стрижок та укладок',
                image_url: 'img/barber2.jpg',
                rang: 'Барбер'
            },
            {
                name: 'Дмитро',
                position: 'Барбер',
                experience: 4,
                description: 'Має великий досвід у роботі з різними типами волосся',
                image_url: 'img/barber3.jpg',
                rang: 'Барбер'
            }
        ];

        const services = [
            {
                name: 'Класична стрижка',
                description: 'Традиційна чоловіча стрижка з використанням ножиць та машинки',
                price: 300.00,
                duration: 45,
                image_url: 'img/service1.jpg'
            },
            {
                name: 'Стрижка бороди',
                description: 'Професійне моделювання та оформлення бороди',
                price: 200.00,
                duration: 30,
                image_url: 'img/service2.jpg'
            },
            {
                name: 'Комплексний догляд',
                description: 'Стрижка + оформлення бороди + догляд за шкірою',
                price: 450.00,
                duration: 60,
                image_url: 'img/service3.jpg'
            },
            {
                name: 'Дитяча стрижка',
                description: 'Стрижка для дітей до 12 років',
                price: 250.00,
                duration: 30,
                image_url: 'img/service4.jpg'
            }
        ];

        const appointments = [
            {
                client_name: 'Іван Петренко',
                service_name: 'Класична стрижка',
                barber_name: 'Олександр',
                booking_date: '2024-06-02',
                booking_time: '14:00',
                status: 'pending',
                created_at: new Date()
            },
            {
                client_name: 'Олег Сидоренко',
                service_name: 'Стрижка бороди',
                barber_name: 'Максим',
                booking_date: '2024-06-03',
                booking_time: '16:30',
                status: 'confirmed',
                created_at: new Date()
            },
            {
                client_name: 'Марія Коваленко',
                service_name: 'Комплексний догляд',
                barber_name: 'Дмитро',
                booking_date: '2024-06-04',
                booking_time: '12:00',
                status: 'pending',
                created_at: new Date()
            }
        ];

        await db.collection('barbers').deleteMany({});
        await db.collection('services').deleteMany({});
        await db.collection('appointments').deleteMany({});
        await db.collection('ranks').deleteMany({});

        const ranksResult = await db.collection('ranks').insertMany(ranks);
        const rankIds = Object.values(ranksResult.insertedIds);

        const barbersWithRanks = barbers.map((barber, index) => ({
            name: barber.name,
            experience: barber.experience,
            description: barber.description,
            image: barber.image_url,
            rank: rankIds[index % rankIds.length],
            isAvailable: true
        }));

        await db.collection('barbers').insertMany(barbersWithRanks);
        await db.collection('services').insertMany(services);
        await db.collection('appointments').insertMany(appointments);

        console.log('Дані успішно додано до MongoDB Atlas!');
    } catch (err) {
        console.error('Помилка при додаванні даних:', err);
    } finally {
        await client.close();
    }
}

seed(); 