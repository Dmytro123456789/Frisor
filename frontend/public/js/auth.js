const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const messageDiv = document.getElementById('message');

function toggleForms(showLogin = true) {
  loginBtn.classList.toggle('active', showLogin);
  registerBtn.classList.toggle('active', !showLogin);
  loginForm.style.display = showLogin ? 'block' : 'none';
  registerForm.style.display = showLogin ? 'none' : 'block';
}

function showMessage(text, type = 'info') {
  messageDiv.textContent = text;
  messageDiv.className = `message ${type}`;
  messageDiv.style.display = 'block';
  setTimeout(() => {
    messageDiv.style.display = 'none';
  }, 3000);
}

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(loginForm);
  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
      }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      showMessage('Login successful! Redirecting...', 'success');
      if (data.role === 'admin') {
        window.location.href = 'admin.html';
      } else {
        window.location.href = 'user-bookings.html';
      }
    } else {
      showMessage(data.message || 'Login failed', 'error');
    }
  } catch (error) {
    console.error('Login error:', error);
    showMessage('An error occurred during login', 'error');
  }
});

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(registerForm);
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');

  if (password !== confirmPassword) {
    showMessage('Passwords do not match', 'error');
    return;
  }

  try {
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        password: formData.get('password'),
      }),
    });

    const data = await res.json();
    if (res.ok) {
      showMessage('Registration successful! Please log in.', 'success');
      toggleForms(true);
      registerForm.reset();
    } else {
      showMessage(data.message || 'Registration failed', 'error');
    }
  } catch (error) {
    console.error('Registration error:', error);
    showMessage('An error occurred during registration', 'error');
  }
});

document.querySelectorAll('.form-group input').forEach(input => {
  const label = input.previousElementSibling;
  if (label && label.tagName === 'LABEL') {
    input.addEventListener('focus', () => label.classList.add('active'));
    input.addEventListener('blur', () => {
      if (!input.value) label.classList.remove('active');
    });
    if (input.value) label.classList.add('active');
  }
}); 