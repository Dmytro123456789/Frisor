# Frisor Barbershop

Сучасний веб-сайт для барбершопу з системою онлайн-записів та адміністративною панеллю.

## 🚀 Технології

### Backend
- **Node.js** - серверна платформа
- **Express.js** - веб-фреймворк
- **MongoDB** - база даних
- **Mongoose** - ODM для MongoDB

### Frontend
- **HTML5** - структура
- **CSS3** - стилізація
- **JavaScript (ES6+)** - інтерактивність
- **Font Awesome** - іконки

## 📁 Структура проекту

```
kursova/
├── backend/                 # Backend сервер
│   ├── app.js              # Головний файл сервера
│   ├── models/             # Моделі MongoDB
│   ├── routes/             # API маршрути
│   └── package.json        # Залежності backend
├── frontend/               # Frontend додаток
│   ├── public/             # Статичні файли
│   │   ├── css/           # Стилі
│   │   ├── js/            # JavaScript файли
│   │   ├── img/           # Зображення
│   │   └── *.html         # HTML сторінки
│   └── package.json       # Залежності frontend
└── README.md              # Документація
```

## 🛠️ Функціональність

### Для користувачів
- ✅ Реєстрація та авторизація
- ✅ Перегляд послуг та барберів
- ✅ Онлайн-запис на стрижку
- ✅ Перегляд своїх записів
- ✅ Скасування записів

### Для адміністраторів
- ✅ Адміністративна панель
- ✅ Управління послугами
- ✅ Управління барберами
- ✅ Управління рангами
- ✅ Перегляд всіх записів
- ✅ Управління користувачами

## 🚀 Швидкий старт

### Локальне запуск

1. **Клонуйте репозиторій**
   ```bash
   git clone <your-repo-url>
   cd kursova
   ```

2. **Налаштуйте Backend**
   ```bash
   cd backend
   npm install
   # Створіть .env файл на основі env.example
   npm run dev
   ```

3. **Налаштуйте Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Відкрийте браузер**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Production деплой

Дивіться детальну інструкцію в [DEPLOYMENT_INSTRUCTIONS.md](./DEPLOYMENT_INSTRUCTIONS.md)

## 📋 API Endpoints

### Аутентифікація
- `POST /api/auth/register` - реєстрація
- `POST /api/auth/login` - авторизація

### Послуги
- `GET /api/services` - отримати всі послуги
- `POST /api/services` - створити послугу (admin)
- `PUT /api/services/:id` - оновити послугу (admin)
- `DELETE /api/services/:id` - видалити послугу (admin)

### Барбери
- `GET /api/barbers` - отримати всіх барберів
- `POST /api/barbers` - створити барбера (admin)
- `PUT /api/barbers/:id` - оновити барбера (admin)
- `DELETE /api/barbers/:id` - видалити барбера (admin)

### Записи
- `GET /api/appointments` - отримати записи
- `POST /api/appointments` - створити запис
- `PUT /api/appointments/:id` - оновити запис
- `DELETE /api/appointments/:id` - видалити запис

## 🔧 Налаштування

### Змінні середовища

Створіть файл `.env` в папці `backend`:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

### База даних

1. Створіть кластер на [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Створіть базу даних `barbershop`
3. Скопіюйте connection string в `.env`

## 🎨 Дизайн

- **Сучасний мінімалістичний дизайн**
- **Адаптивна верстка**
- **Темна кольорова схема**
- **Зручний інтерфейс**

## 🔒 Безпека

- ✅ Валідація вхідних даних
- ✅ Захист від CORS атак
- ✅ Безпечне зберігання паролів
- ✅ Авторизація користувачів

## 📱 Підтримувані браузери

- Chrome (рекомендовано)
- Firefox
- Safari
- Edge

## 🤝 Внесок

1. Fork проект
2. Створіть feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit зміни (`git commit -m 'Add some AmazingFeature'`)
4. Push в branch (`git push origin feature/AmazingFeature`)
5. Відкрийте Pull Request

## 📄 Ліцензія

Цей проект розповсюджується під ліцензією MIT. Дивіться `LICENSE` для деталей.

## 📞 Контакти

- **Email**: your-email@example.com
- **GitHub**: [your-username](https://github.com/your-username)

---

**Створено з ❤️ для Frisor Barbershop** 