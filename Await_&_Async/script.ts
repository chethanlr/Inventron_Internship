const fetchBtn = document.getElementById("fetchBtn");
const loading = document.getElementById("loading");
const usersContainer = document.getElementById("users");
const errorDiv = document.getElementById("error");

fetchBtn.addEventListener("click", fetchUsers);

async function fetchUsers() {
  // Reset UI
  fetchBtn.disabled = true;
  loading.innerText = "Loading users...";
  usersContainer.innerHTML = "";
  errorDiv.innerText = "";

  try {
    // Step 1: Fetch API
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    // Step 2: Check if response is OK
    if (!response.ok) {
      throw new Error(`HTTP error — status ${response.status}`);
    }

    // Step 3: Convert response to JSON
    const users = await response.json();

    // Step 4: Display users
    users.forEach(user => {
      const card = document.createElement("div");
      card.className = "user-card";
      card.innerHTML = `
        <h3>${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>City:</strong> ${user.address.city}</p>
      `;
      usersContainer.appendChild(card);
    });

  } catch (error) {
    // Show the real error message
    errorDiv.innerText = `Error: ${error.message}`;
    console.error("Fetch failed:", error);

  } finally {
    // Always runs — clears loading & re-enables button
    loading.innerText = "";
    fetchBtn.disabled = false;
  }
}