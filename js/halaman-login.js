// halaman-login.js
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  const formData = new FormData(loginForm);

  const userData = {
    username: formData.get('username'),
    password: formData.get('password'),
    role: parseInt(formData.get('role'), 10),
  };

  try {
    const response = await fetch('http://localhost:7900/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Gagal login. Silakan coba lagi.');
    }

    console.log('Token:', data.token);
    console.log('UserId:', data.userId);
    console.log('Role:', data.role);

    // Redirect ke dashboard berdasarkan role
    if (data.role === '1') {
      window.location.href = '/dashboard-pemilik.html';
    } else if (data.role === '2') {
      window.location.href = '/dashboard-penyewa.html';
    } else {
      // Handle role lainnya jika diperlukan
    }
  } catch (error) {
    console.error(error);
    alert(error.message || 'Gagal login. Silakan coba lagi.');
  }
});
