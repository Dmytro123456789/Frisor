// API Configuration
const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : 'https://frisor.onrender.com';

// Export for use in other files
window.API_BASE_URL = API_BASE_URL; 