document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', async function (event) {
    event.preventDefault();  // Mencegah formulir untuk melakukan submit bawaan

    try {
      await login();  // Panggil fungsi login() di sini
    } catch (error) {
      console.error('Terjadi kesalahan saat login:', error.message);
    }
  });
});

async function login() {
  
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const roleInput = document.getElementById('role');

  const username = usernameInput.value;
  const password = passwordInput.value;
  const role = roleInput.value;

  // Validasi input
  if (!username || !password || !role) {
    console.error('Harap lengkapi semua kolom');
    return;
  }

  try {
    const response = await fetch('http://localhost:7900/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, role }),
    });

    if (!response.ok) {
      // Handle kesalahan HTTP (contoh: 404 Not Found, 500 Internal Server Error, dll.)
      const errorMessage = await response.json();
      console.error(`Login gagal: ${errorMessage.message}`);
      return;
    }

    const userData = await response.json();

    // Redirect sesuai peran pengguna
    if (userData.redirect) {
      window.location.href = userData.redirect;
    } else {
      // Handle peran tidak valid
      console.error('Peran pengguna tidak valid');
    }
  } catch (error) {
    // Handle kesalahan selama proses fetch atau parsing JSON
    console.error('Terjadi kesalahan:', error.message);
  }
}
