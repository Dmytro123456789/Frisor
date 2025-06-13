const API_URL = 'http://localhost:5000/api';

const STATUS_MAP = {
  scheduled: 'Заплановано',
  confirmed: 'Підтверджено',
  completed: 'Завершено',
  cancelled: 'Скасовано',
  pending: 'Очікує'
};

async function loadBarbers() {
  try {
    const response = await fetch(`${API_URL}/barbers`);
    const barbers = await response.json();
    const barbersList = document.getElementById('barbersList');
    barbersList.innerHTML = '';
    barbers.forEach(barber => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${barber.name}</td>
        <td>${barber.position}</td>
        <td>${barber.experience}</td>
        <td>
          <button class="btn btn-sm btn-primary" onclick="editBarber(${barber.id})">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteBarber(${barber.id})">Delete</button>
        </td>
      `;
      barbersList.appendChild(row);
    });
  } catch (error) {
    console.error('Помилка при завантаженні барберів:', error);
  }
  try {
    const response = await fetch('http://localhost:5000/api/barbers');
    if (!response.ok) throw new Error('HTTP error ' + response.status);
    const barbers = await response.json();
    console.log(barbers);
  } catch (error) {
    console.error('Помилка при завантаженні барберів:', error.message);
  }
}

async function loadAppointments() {
  try {
    const response = await fetch(`${API_URL}/appointments`);
    const appointments = await response.json();
    const appointmentsList = document.getElementById('appointmentsList');
    appointmentsList.innerHTML = '';
    appointments.forEach(app => {
      const date = new Date(app.date);
      const dateStr = date.toLocaleDateString();
      const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${dateStr}</td>
        <td>${timeStr}</td>
        <td>${app.clientName}</td>
        <td>${app.barber}</td>
        <td>${app.service}</td>
        <td>${STATUS_MAP[app.status] || app.status}</td>
        <td></td>
      `;
      appointmentsList.appendChild(row);
    });
  } catch (error) {
    console.error('Помилка при завантаженні записів:', error);
  }
}

document.getElementById('barberForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = {
    name: document.getElementById('name').value,
    position: document.getElementById('position').value,
    experience: parseInt(document.getElementById('experience').value),
    description: document.getElementById('description').value,
    instagram: document.getElementById('instagram').value,
    facebook: document.getElementById('facebook').value
  };

  try {
    const response = await fetch(`${API_URL}/barbers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      document.getElementById('barberForm').reset();
      await loadBarbers();
      alert('Барбера успішно додано!');
    } else {
      const error = await response.text();
      alert('Помилка при додаванні барбера: ' + error);
    }
  } catch (error) {
    console.error('Помилка при додаванні барбера:', error);
    alert('Помилка при додаванні барбера!');
  }
});

async function deleteBarber(id) {
  if (!confirm('Ви впевнені, що хочете видалити цього барбера?')) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/barbers/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      await loadBarbers();
      alert('Барбера успішно видалено!');
    } else {
      const error = await response.text();
      alert('Помилка при видаленні барбера: ' + error);
    }
  } catch (error) {
    console.error('Помилка при видаленні барбера:', error);
    alert('Помилка при видаленні барбера!');
  }
}

async function editBarber(id) {
  try {
    const response = await fetch(`${API_URL}/barbers/${id}`);
    const barber = await response.json();
    
    document.getElementById('editId').value = barber.id;
    document.getElementById('editName').value = barber.name;
    document.getElementById('editPosition').value = barber.position;
    document.getElementById('editExperience').value = barber.experience;
    document.getElementById('editDescription').value = barber.description;
    document.getElementById('editInstagram').value = barber.instagram;
    document.getElementById('editFacebook').value = barber.facebook;
    
    const modal = new bootstrap.Modal(document.getElementById('editBarberModal'));
    modal.show();
  } catch (error) {
    console.error('Помилка при завантаженні даних барбера:', error);
    alert('Помилка при завантаженні даних барбера!');
  }
}

document.getElementById('saveEditButton').addEventListener('click', async () => {
  const id = document.getElementById('editId').value;
  const formData = {
    name: document.getElementById('editName').value,
    position: document.getElementById('editPosition').value,
    experience: parseInt(document.getElementById('editExperience').value),
    description: document.getElementById('editDescription').value,
    instagram: document.getElementById('editInstagram').value,
    facebook: document.getElementById('editFacebook').value
  };

  try {
    const response = await fetch(`${API_URL}/barbers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      const modal = bootstrap.Modal.getInstance(document.getElementById('editBarberModal'));
      modal.hide();
      await loadBarbers();
      alert('Зміни успішно збережено!');
    } else {
      const error = await response.text();
      alert('Помилка при збереженні змін: ' + error);
    }
  } catch (error) {
    console.error('Помилка при збереженні змін:', error);
    alert('Помилка при збереженні змін!');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  loadBarbers();
  loadAppointments();
});