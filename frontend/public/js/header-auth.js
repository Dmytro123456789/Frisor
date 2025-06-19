// Auth header logic for all pages
(function() {
  // Config: change to 'sessionStorage' if needed
  const storage = localStorage;
  const TOKEN_KEY = 'token';

  function isLoggedIn() {
    return !!storage.getItem(TOKEN_KEY);
  }

  function isAdmin() {
    return isLoggedIn() && localStorage.getItem('userRole') === 'admin';
  }

  function logout() {
    storage.removeItem(TOKEN_KEY);
    localStorage.removeItem('userId');
    localStorage.removeItem('userPhone');
    localStorage.removeItem('userRole');
    window.location.href = 'index.html';
  }

  function updateHeaderAuth() {
    const headerMenu = document.querySelector('.header-menu ul');
    if (!headerMenu) return;
    const loginLi = headerMenu.querySelector('a.login-btn')?.parentElement;
    const logoutLi = headerMenu.querySelector('button.logout-btn')?.parentElement;
    if (loginLi) headerMenu.removeChild(loginLi);
    if (logoutLi) headerMenu.removeChild(logoutLi);
    let phoneLi = document.getElementById('userPhoneHeader');
    if (phoneLi) headerMenu.removeChild(phoneLi);
    const li = document.createElement('li');
    if (isLoggedIn()) {
      const userPhone = localStorage.getItem('userPhone');
      if (userPhone) {
        const phoneLi = document.createElement('li');
        phoneLi.id = 'userPhoneHeader';
        phoneLi.style = 'color:#fff;font-size:1.1rem;margin-right:10px;';
        phoneLi.textContent = userPhone;
        headerMenu.insertBefore(phoneLi, headerMenu.firstChild);
      }
      const btn = document.createElement('button');
      btn.className = 'logout-btn';
      btn.innerText = 'LOGOUT';
      btn.onclick = logout;
      li.appendChild(btn);
    } else {
      const a = document.createElement('a');
      a.href = 'auth.html';
      a.className = 'login-btn';
      a.innerHTML = '<i class="fas fa-user"></i> LOGIN';
      li.appendChild(a);
    }
    headerMenu.appendChild(li);
  }

  function showUserBookingsModal() {
    let modal = document.getElementById('userBookingsModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'userBookingsModal';
      modal.style.position = 'fixed';
      modal.style.top = '0';
      modal.style.left = '0';
      modal.style.width = '100vw';
      modal.style.height = '100vh';
      modal.style.background = 'rgba(0,0,0,0.18)';
      modal.style.zIndex = '9999';
      modal.style.display = 'flex';
      modal.style.alignItems = 'center';
      modal.style.justifyContent = 'center';
      modal.innerHTML = `
        <div style="background:#fff;max-width:420px;width:95vw;padding:2rem 1.5rem;border-radius:16px;box-shadow:0 8px 32px rgba(0,49,45,0.13);position:relative;">
          <button id="closeUserBookingsModal" style="position:absolute;top:10px;right:10px;font-size:1.2rem;background:none;border:none;cursor:pointer;">&times;</button>
          <h3 style="margin-bottom:1rem;">Мої записи</h3>
          <div id="userBookingsList">Завантаження...</div>
        </div>
      `;
      document.body.appendChild(modal);
      document.getElementById('closeUserBookingsModal').onclick = function() {
        modal.remove();
      };
    }
    loadUserBookings();
  }

  async function loadUserBookings() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      document.getElementById('userBookingsList').innerHTML = 'Не знайдено userId користувача.';
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/appointments');
      const all = await res.json();
      const my = all.filter(b => b.userId === userId);
      if (!my.length) {
        document.getElementById('userBookingsList').innerHTML = 'У вас немає записів.';
        return;
      }
      document.getElementById('userBookingsList').innerHTML = my.map(b => `
        <div style='border-bottom:1px solid #eee;padding:0.5rem 0;'>
          <div><b>Дата:</b> ${b.date ? new Date(b.date).toLocaleDateString() : ''} <b>Час:</b> ${b.time || ''}</div>
          <div><b>Барбер:</b> ${b.barberName || b.barberId || ''}</div>
          <div><b>Послуга:</b> ${b.serviceName || b.serviceId || ''}</div>
          <div><b>Статус:</b> ${b.status || ''}</div>
          <button onclick="cancelUserBooking('${b._id}')" style='margin:0.5rem 0.5rem 0 0;'>Скасувати</button>
          <button onclick="deleteUserBooking('${b._id}')" style='margin:0.5rem 0;'>Видалити</button>
        </div>
      `).join('');
    } catch (e) {
      document.getElementById('userBookingsList').innerHTML = 'Помилка завантаження.';
    }
  }

  window.cancelUserBooking = async function(id) {
    if (!confirm('Скасувати цей запис?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/appointments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'cancelled' })
      });
      if (res.ok) loadUserBookings();
    } catch {}
  }
  window.deleteUserBooking = async function(id) {
    if (!confirm('Видалити цей запис?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/appointments/${id}`, { method: 'DELETE' });
      if (res.ok) loadUserBookings();
    } catch {}
  }

  function addUserBookingsBtn() {
    if (!isLoggedIn() || isAdmin()) return;
    let btn = document.getElementById('userBookingsBtn');
    if (!btn) {
      btn = document.createElement('a');
      btn.id = 'userBookingsBtn';
      btn.title = 'Мої записи';
      btn.href = 'user-bookings.html';
      btn.innerHTML = '<i class="fas fa-calendar-check"></i>';
      btn.style = 'margin-left:10px;padding:4px 8px;font-size:1.25rem;border-radius:50%;background:none;color:#fff;border:none;cursor:pointer;transition:color 0.2s;text-decoration:none;';
      btn.onmouseover = function(){btn.style.color='#00b894'};
      btn.onmouseout = function(){btn.style.color='#fff'};
      const headerMenu = document.querySelector('.header-menu ul');
      if (headerMenu) headerMenu.appendChild(btn);
    }
  }

  document.addEventListener('DOMContentLoaded', updateHeaderAuth);
  document.addEventListener('DOMContentLoaded', addUserBookingsBtn);
  window.updateHeaderAuth = updateHeaderAuth;
  window.isAdmin = isAdmin;
  window.addUserBookingsBtn = addUserBookingsBtn;
})(); 