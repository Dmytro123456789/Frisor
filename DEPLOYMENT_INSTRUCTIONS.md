# Інструкція по деплою Frisor Barbershop

## Огляд
Цей проект складається з:
- **Backend**: Node.js + Express + MongoDB (деплой на Render)
- **Frontend**: HTML/CSS/JavaScript (деплой на Vercel)

## 1. Підготовка Backend для Render

### 1.1 Налаштування MongoDB
1. Створіть безкоштовний кластер на [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Створіть базу даних `barbershop`
3. Скопіюйте connection string

### 1.2 Деплой на Render

1. **Зареєструйтесь на Render**: https://render.com

2. **Створіть новий Web Service**:
   - Connect ваш GitHub репозиторій
   - Виберіть папку `backend`
   - Назва: `frisor-backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Налаштуйте Environment Variables**:
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Очікуйте деплою** (зазвичай 2-5 хвилин)

5. **Скопіюйте URL вашого сервісу** (наприклад: `https://frisor-backend.onrender.com`)

## 2. Підготовка Frontend для Vercel

### 2.1 Оновлення конфігурації

1. **Оновіть `frontend/public/js/config.js`**:
   ```javascript
   const API_BASE_URL = window.location.hostname === 'localhost' 
       ? 'http://localhost:5000' 
       : 'https://your-backend-domain.onrender.com'; // Замініть на ваш URL
   ```

### 2.2 Деплой на Vercel

1. **Зареєструйтесь на Vercel**: https://vercel.com

2. **Підключіть GitHub репозиторій**:
   - Import ваш репозиторій
   - Framework Preset: `Other`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `public`

3. **Налаштуйте Environment Variables** (якщо потрібно):
   ```
   VITE_API_URL=https://your-backend-domain.onrender.com
   ```

4. **Deploy**

5. **Скопіюйте URL вашого сайту** (наприклад: `https://frisor-frontend.vercel.app`)

## 3. Фінальні налаштування

### 3.1 Оновлення CORS в Backend

1. **Оновіть `backend/app.js`**:
   ```javascript
   const corsOptions = {
       origin: process.env.NODE_ENV === 'production' 
           ? ['https://your-frontend-domain.vercel.app'] // Замініть на ваш Vercel URL
           : ['http://localhost:3000', 'http://localhost:5000'],
       credentials: true,
       optionsSuccessStatus: 200
   };
   ```

2. **Redeploy backend на Render**

### 3.2 Тестування

1. **Перевірте backend**: `https://your-backend-domain.onrender.com/health`
2. **Перевірте frontend**: `https://your-frontend-domain.vercel.app`
3. **Тестуйте функціональність**:
   - Реєстрація/логін
   - Запис на стрижку
   - Адмін панель

## 4. Структура файлів після налаштування

```
kursova/
├── backend/
│   ├── app.js (оновлений з CORS та env vars)
│   ├── package.json (з build script)
│   └── routes/
├── frontend/
│   ├── public/
│   │   ├── js/
│   │   │   ├── config.js (новий файл)
│   │   │   ├── auth.js (оновлений)
│   │   │   ├── admin.js (оновлений)
│   │   │   └── header-auth.js (оновлений)
│   │   └── *.html (з config.js)
│   ├── package.json (оновлений)
│   └── vercel.json (новий файл)
└── DEPLOYMENT_INSTRUCTIONS.md (цей файл)
```

## 5. Важливі моменти

### 5.1 Безпека
- ✅ MongoDB connection string в environment variables
- ✅ CORS налаштований для production
- ✅ API URL динамічно визначається

### 5.2 Моніторинг
- Render: перевіряйте логи в dashboard
- Vercel: перевіряйте Function Logs
- MongoDB Atlas: моніторинг бази даних

### 5.3 Масштабування
- Render: автоматичне масштабування
- Vercel: глобальний CDN
- MongoDB Atlas: автоматичні backup

## 6. Troubleshooting

### 6.1 Backend не запускається
- Перевірте MongoDB connection string
- Перевірте логи в Render dashboard
- Переконайтесь що всі залежності в package.json

### 6.2 Frontend не може підключитися до backend
- Перевірте CORS налаштування
- Перевірте API_BASE_URL в config.js
- Перевірте що backend доступний

### 6.3 Помилки в браузері
- Відкрийте Developer Tools (F12)
- Перевірте Console на помилки
- Перевірте Network tab для API запитів

## 7. Корисні команди

### Локальне тестування
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm start
```

### Перевірка статусу
```bash
# Backend health check
curl https://your-backend-domain.onrender.com/health

# Frontend
curl https://your-frontend-domain.vercel.app
```

## 8. Контакти для підтримки

- **Render Support**: https://render.com/docs/help
- **Vercel Support**: https://vercel.com/docs/support
- **MongoDB Atlas**: https://docs.atlas.mongodb.com/support/

---

**Успішного деплою! 🚀** 