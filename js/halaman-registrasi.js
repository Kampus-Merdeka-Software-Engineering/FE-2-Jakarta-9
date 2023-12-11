const registrationForm = document.getElementById('form');

registrationForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  const formData = new FormData(registrationForm);

  const userData = {
    username: formData.get('username'),
    password: formData.get('password'),
    nama: formData.get('nama'),
    jenisKelamin: formData.get('jenisKelamin'),
    telepon: formData.get('telepon'),
    email: formData.get('email'),
    role: parseInt(formData.get('role')),
  };

  try {
    const response = await fetch('http://localhost:7900/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Registrasi gagal. Silakan coba lagi.');
    }

    const data = await response.json();

    // Menanggapi pesan dari server
    alert(data.message);

    // Clear formulir jika registrasi berhasil
    if (data.message === 'Registrasi berhasil') {
      registrationForm.reset();

      // Reload halaman setelah 2 detik
      setTimeout(function () {
        location.reload();
      }, 2000);
    }
  } catch (error) {
    console.error(error);
    // Handle kesalahan registrasi di frontend
    alert('Registrasi gagal. Silakan coba lagi.');
  }
});
