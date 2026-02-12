const API_URL = 'https://jsonplaceholder.typicode.com/users';

const fetchBtn = document.getElementById('fetchBtn');
const statusEl = document.getElementById('status');
const usersEl  = document.getElementById('users');

fetchBtn.addEventListener('click', fetchUsers);

async function fetchUsers() {
  fetchBtn.disabled = true;
  statusEl.textContent = 'Loading...';
  usersEl.innerHTML = '';

  try {
    const response = await fetch(API_URL);

    if (!response.ok) throw new Error(`HTTP error ${response.status}`);

    const users = await response.json();

    statusEl.textContent = `${users.length} users loaded`;

    users.forEach(user => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${user.name}</h3>
        <p>${user.email}</p>
        <p>${user.address.city} · ${user.company.name}</p>
      `;
      usersEl.appendChild(card);
    });

  } catch (err) {
    statusEl.textContent = `Error: ${err.message}`;

  } finally {
    fetchBtn.disabled = false;
  }
}