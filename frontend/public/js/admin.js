document.addEventListener('DOMContentLoaded', () => {
  showTab('appointments');
  loadRanks();
  loadRanksList();
  loadBarbers();
  loadServices();
  loadUsers();

  setupEditServiceForm();
  setupEditAppointmentForm();
  setupEditUserForm();
});

function showTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(tab => {
      tab.classList.remove('active');
  });
  const activeTab = document.getElementById(tabName);
  if (activeTab) activeTab.classList.add('active');

  document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('onclick') === `showTab('${tabName}')`) {
          btn.classList.add('active');
      }
  });
}

function showModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = 'block';
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = 'none';
}

function showMessage(text, type = 'info') {
  alert(text);
}

async function loadRanks() {
  try {
      const res = await fetch('http://localhost:5000/api/ranks');
      const ranks = await res.json();
      const select = document.getElementById('barberRank');
      if (!select) return;
      select.innerHTML = '<option value="">Виберіть ранг</option>';
      ranks.forEach(rank => {
          const option = document.createElement('option');
          option.value = rank._id;
          option.textContent = rank.name;
          select.appendChild(option);
      });
  } catch (e) {
      console.error(e);
  }
}

async function loadRanksList() {
  try {
      const res = await fetch('http://localhost:5000/api/ranks');
      const ranks = await res.json();
      const container = document.getElementById('ranksList');
      container.innerHTML = '<h3>Список рангів</h3>';
      const table = document.createElement('table');
      table.innerHTML = `
          <thead>
              <tr><th>Назва</th><th>Опис</th><th>Рівень</th><th>Дії</th></tr>
          </thead>
          <tbody></tbody>
      `;
      ranks.forEach(rank => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
              <td>${rank.name}</td>
              <td>${rank.description}</td>
              <td>${rank.level}</td>
              <td><button onclick="deleteRank('${rank._id}')">Видалити</button></td>
          `;
          table.querySelector('tbody').appendChild(tr);
      });
      container.appendChild(table);
  } catch (e) {
      console.error(e);
  }
}

async function deleteRank(id) {
  if (!confirm('Ви впевнені, що хочете видалити цей ранг?')) return;
  try {
      const res = await fetch(`http://localhost:5000/api/ranks/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Не вдалося видалити ранг');
      showMessage('Ранг успішно видалено', 'success');
      loadRanks();
      loadRanksList();
  } catch (e) {
      console.error(e);
      showMessage('Помилка при видаленні рангу', 'error');
  }
}

async function loadBarbers() {
  try {
      const res = await fetch('http://localhost:5000/api/barbers');
      if (!res.ok) throw new Error('Не вдалося завантажити барберів');
      const barbers = await res.json();
      const list = document.getElementById('barbersList');
      const bookingSelect = document.getElementById('bookingBarber');
      list.innerHTML = '';
      bookingSelect.innerHTML = '<option value="">Виберіть барбера</option>';

      barbers.forEach((barber, i) => {
          const photoNumber = i + 1;
          const photoUrl = `img/barber${photoNumber}.jpg`;
          const div = document.createElement('div');
          div.className = 'list-item';
          div.innerHTML = `
              <div>
                  <p>Ім'я: ${barber.name}</p>
                  <p>Посада: ${barber.position || ''}</p>
                  <p>Досвід: ${barber.experience} років</p>
                  <p>Опис: ${barber.description || ''}</p>
                  <p>Зображення: <img src="${photoUrl}" alt="${barber.name}" style="max-width:80px; max-height:80px;"></p>
                  <p>Ранг: ${barber.rank ? barber.rank.name : 'Не вказано'}</p>
              </div>
              <div class="button-group">
                  <button onclick="editBarber('${barber._id}', '${barber.name}', ${barber.experience}, '${barber.rank ? barber.rank._id : ''}', '${photoUrl}')">Редагувати</button>
                  <button onclick="deleteBarber('${barber._id}')">Видалити</button>
              </div>
          `;
          list.appendChild(div);

          const option = document.createElement('option');
          option.value = barber._id;
          option.textContent = `${barber.name}${barber.position ? ' - ' + barber.position : ''}`;
          bookingSelect.appendChild(option);
      });
  } catch (e) {
      console.error(e);
      showMessage('Помилка завантаження списку барберів', 'error');
  }
}

async function deleteBarber(id) {
  if (!confirm('Ви впевнені, що хочете видалити цього барбера?')) return;
  try {
      const res = await fetch(`http://localhost:5000/api/barbers/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Не вдалося видалити барбера');
      showMessage('Барбер успішно видалений', 'success');
      loadBarbers();
  } catch (e) {
      console.error(e);
      showMessage('Помилка при видаленні барбера', 'error');
  }
}

async function editBarber(id, name, experience, rankId, image_url) {
  document.getElementById('editBarberId').value = id;
  document.getElementById('editBarberName').value = name;
  document.getElementById('editBarberExperience').value = experience;
  document.getElementById('editBarberImage').value = image_url || '';

  try {
      const res = await fetch('http://localhost:5000/api/ranks');
      if (!res.ok) throw new Error('Не вдалося завантажити ранги');
      const ranks = await res.json();
      const select = document.getElementById('editBarberRank');
      select.innerHTML = '<option value="">Виберіть ранг</option>';
      ranks.forEach(rank => {
          const option = document.createElement('option');
          option.value = rank._id;
          option.textContent = rank.name;
          if (rank._id === rankId) option.selected = true;
          select.appendChild(option);
      });
  } catch (e) {
      console.error(e);
      showMessage('Помилка завантаження рангів', 'error');
  }

  showModal('editBarberModal');
}

async function loadServices() {
  try {
      const res = await fetch('http://localhost:5000/api/services');
      if (!res.ok) throw new Error('Не вдалося завантажити послуги');
      const services = await res.json();
      const list = document.getElementById('servicesList');
      const bookingSelect = document.getElementById('bookingService');
      list.innerHTML = '';
      bookingSelect.innerHTML = '<option value="">Виберіть послугу</option>';

      services.forEach(service => {
          const div = document.createElement('div');
          div.className = 'list-item';
          div.innerHTML = `
              <div>
                  <p>Назва: ${service.name}</p>
                  <p>Опис: ${service.description}</p>
                  <p>Ціна: ${service.price} грн</p>
                  <p>Тривалість: ${service.duration} хв</p>
                  ${service.image_url ? `<p>Зображення: <img src="${service.image_url}" alt="${service.name}" style="max-width:80px; max-height:80px;"></p>` : ''}
              </div>
              <div class="button-group">
                  <button onclick="editService('${service._id}', '${service.name}', '${service.description}', ${service.price}, ${service.duration}, '${service.image_url || ''}')">Редагувати</button>
                  <button onclick="deleteService('${service._id}')">Видалити</button>
              </div>
          `;
          list.appendChild(div);

          const option = document.createElement('option');
          option.value = service._id;
          option.textContent = `${service.name} - ${service.price} грн`;
          bookingSelect.appendChild(option);
      });
  } catch (e) {
      console.error(e);
      showMessage('Помилка завантаження списку послуг', 'error');
  }
}

async function deleteService(id) {
  if (!confirm('Ви впевнені, що хочете видалити цю послугу?')) return;
  try {
      const res = await fetch(`http://localhost:5000/api/services/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Не вдалося видалити послугу');
      showMessage('Послуга успішно видалена', 'success');
      loadServices();
  } catch (e) {
      console.error(e);
      showMessage('Помилка при видаленні послуги', 'error');
  }
}

function editService(id, name, description, price, duration, image_url) {
  document.getElementById('editServiceId').value = id;
  document.getElementById('editServiceName').value = name;
  document.getElementById('editServiceDescription').value = description;
  document.getElementById('editServicePrice').value = price;
  document.getElementById('editServiceDuration').value = duration;
  document.getElementById('editServiceImage').value = image_url || '';
  showModal('editServiceModal');
}

function setupEditServiceForm() {
  const form = document.getElementById('editServiceForm');
  if (!form) return;
  form.addEventListener('submit', async e => {
      e.preventDefault();
      const formData = new FormData(form);
      const id = formData.get('id');
      try {
          const res = await fetch(`http://localhost:5000/api/services/${id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  name: formData.get('name'),
                  description: formData.get('description'),
                  price: Number(formData.get('price')),
                  duration: Number(formData.get('duration')),
                  image_url: formData.get('image_url'),
              }),
          });
          if (res.ok) {
              showMessage('Послуга успішно оновлена', 'success');
              closeModal('editServiceModal');
              loadServices();
          } else {
              const error = await res.json();
              showMessage(error.message || 'Помилка оновлення послуги', 'error');
          }
      } catch (e) {
          console.error(e);
          showMessage('Помилка оновлення послуги', 'error');
      }
  });
}

async function loadAppointments() {
  try {
      const res = await fetch('http://localhost:5000/api/appointments');
      if (!res.ok) throw new Error('Не вдалося завантажити записи');
      const appointments = await res.json();
      const container = document.getElementById('appointmentsList');
      container.innerHTML = '';

      appointments.forEach(app => {
          const div = document.createElement('div');
          div.className = 'list-item';
          div.innerHTML = `
              <p>Клієнт: ${app.clientName}</p>
              <p>Послуга: ${app.serviceId && typeof app.serviceId === 'object' ? app.serviceId.name : 'Не вказано'}</p>
              <p>Барбер: ${app.barberId && typeof app.barberId === 'object' ? app.barberId.name : 'Не вказано'}</p>
              <p>Дата: ${new Date(app.date).toLocaleDateString()}</p>
              <p>Час: ${app.time}</p>
              <p>Статус: ${app.status}</p>
              <div class="button-group">
                  <button onclick="editAppointment('${app._id}', '${app.clientName}', '${app.serviceId}', '${app.barberId}', '${app.date}', '${app.time}', '${app.status}')">Редагувати</button>
                  <button onclick="deleteAppointment('${app._id}')">Видалити</button>
              </div>
          `;
          container.appendChild(div);
      });
  } catch (e) {
      console.error(e);
      showMessage('Помилка завантаження записів', 'error');
  }
}

function setupEditAppointmentForm() {
  const form = document.getElementById('editAppointmentForm');
  if (!form) return;
  form.addEventListener('submit', async e => {
      e.preventDefault();
      const formData = new FormData(form);
      const id = formData.get('id');
      try {
          const res = await fetch(`http://localhost:5000/api/appointments/${id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  clientName: formData.get('client_name'),
                  clientPhone: formData.get('client_phone'),
                  serviceId: formData.get('service_id'),
                  barberId: formData.get('barber_id'),
                  date: formData.get('booking_date'),
                  time: formData.get('booking_time'),
                  status: formData.get('status'),
              }),
          });
          if (res.ok) {
              showMessage('Запис успішно оновлено', 'success');
              closeModal('editAppointmentModal');
              loadAppointments();
          } else {
              const error = await res.json();
              showMessage(error.message || 'Помилка оновлення запису', 'error');
          }
      } catch (e) {
          console.error(e);
          showMessage('Помилка оновлення запису', 'error');
      }
  });
}

function editAppointment(id, clientName, serviceId, barberId, date, time, status) {
  document.getElementById('editAppointmentId').value = id;
  document.getElementById('editAppointmentClient').value = clientName;
  document.getElementById('editAppointmentPhone').value = '';
  document.getElementById('editAppointmentDate').value = date ? new Date(date).toISOString().split('T')[0] : '';
  document.getElementById('editAppointmentTime').value = time || '';

  Promise.all([
      fetch('http://localhost:5000/api/services').then(r => r.json()),
      fetch('http://localhost:5000/api/barbers').then(r => r.json())
  ]).then(([services, barbers]) => {
      const serviceSelect = document.getElementById('editAppointmentService');
      const barberSelect = document.getElementById('editAppointmentBarber');
      const statusSelect = document.getElementById('editAppointmentStatus');

      serviceSelect.innerHTML = '<option value="">Виберіть послугу</option>';
      services.forEach(service => {
          const option = document.createElement('option');
          option.value = service._id;
          option.textContent = `${service.name} - ${service.price} грн`;
          if (service._id === serviceId) option.selected = true;
          serviceSelect.appendChild(option);
      });

      barberSelect.innerHTML = '<option value="">Виберіть барбера</option>';
      barbers.forEach(barber => {
          const option = document.createElement('option');
          option.value = barber._id;
          option.textContent = `${barber.name}${barber.position ? ' - ' + barber.position : ''}`;
          if (barber._id === barberId) option.selected = true;
          barberSelect.appendChild(option);
      });

      if (statusSelect) statusSelect.value = status || 'pending';
  });

  showModal('editAppointmentModal');
}

async function deleteAppointment(id) {
  if (!confirm('Ви впевнені, що хочете видалити цей запис?')) return;
  try {
      const res = await fetch(`http://localhost:5000/api/appointments/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Не вдалося видалити запис');
      showMessage('Запис успішно видалено', 'success');
      loadAppointments();
  } catch (e) {
      console.error(e);
      showMessage('Помилка при видаленні запису', 'error');
  }
}

async function loadUsers() {
  try {
      const res = await fetch('http://localhost:5000/api/users');
      if (!res.ok) throw new Error('Не вдалося завантажити користувачів');
      const users = await res.json();
      const tbody = document.querySelector('#usersTable tbody');
      tbody.innerHTML = '';

      users.forEach(user => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
              <td>${user._id}</td>
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td>${user.role}</td>
              <td>
                  <button onclick="editUser('${user._id}', '${user.name}', '${user.email}', '${user.phone || ''}', '${user.role}')">Редагувати</button>
                  <button onclick="deleteUser('${user._id}')">Видалити</button>
              </td>
          `;
          tbody.appendChild(tr);
      });
  } catch (e) {
      console.error(e);
      showMessage('Помилка завантаження користувачів', 'error');
  }
}

function editUser(id, name, email, phone, role) {
  document.getElementById('editUserId').value = id;
  document.getElementById('editUserName').value = name;
  document.getElementById('editUserEmail').value = email;
  document.getElementById('editUserPhone').value = phone || '';
  document.getElementById('editUserRole').value = role || 'user';
  showModal('editUserModal');
}

function setupEditUserForm() {
  const form = document.getElementById('editUserForm');
  if (!form) return;
  form.addEventListener('submit', async e => {
      e.preventDefault();
      const formData = new FormData(form);
      const id = formData.get('id');
      try {
          const res = await fetch(`http://localhost:5000/api/users/${id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  name: formData.get('name'),
                  email: formData.get('email'),
                  phone: formData.get('phone'),
                  role: formData.get('role'),
              }),
          });
          if (res.ok) {
              showMessage('Користувача успішно оновлено', 'success');
              closeModal('editUserModal');
              loadUsers();
          } else {
              const error = await res.json();
              showMessage(error.message || 'Помилка оновлення користувача', 'error');
          }
      } catch (e) {
          console.error(e);
          showMessage('Помилка оновлення користувача', 'error');
      }
  });
}

async function deleteUser(id) {
  if (!confirm('Ви впевнені, що хочете видалити цього користувача?')) return;
  try {
      const res = await fetch(`http://localhost:5000/api/users/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Не вдалося видалити користувача');
      showMessage('Користувач успішно видалений', 'success');
      loadUsers();
  } catch (e) {
      console.error(e);
      showMessage('Помилка при видаленні користувача', 'error');
  }
}

document.getElementById('addBookingForm')?.addEventListener('submit', async e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  try {
      const res = await fetch('http://localhost:5000/api/appointments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              clientName: formData.get('clientName'),
              clientPhone: formData.get('clientPhone'),
              serviceId: formData.get('serviceId'),
              barberId: formData.get('barberId'),
              date: formData.get('date'),
              time: formData.get('time'),
              status: formData.get('status'),
          }),
      });
      if (res.ok) {
          showMessage('Запис успішно створено', 'success');
          closeModal('addBookingModal');
          loadAppointments();
          e.target.reset();
      } else {
          const error = await res.json();
          showMessage(error.message || 'Помилка створення запису', 'error');
      }
  } catch (e) {
      console.error(e);
      showMessage('Помилка створення запису', 'error');
  }
});