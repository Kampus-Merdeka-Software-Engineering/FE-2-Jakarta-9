// halaman-registrasi.js
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
    role: parseInt(formData.get('role'), 10), // Menggunakan parseInt dengan basis 10
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
      // Cek apakah respons berupa JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        throw new Error(data.error || 'Registrasi gagal. Silakan coba lagi.');
      } else {
        // Menangani respons selain JSON (misalnya, HTML)
        const text = await response.text();
        throw new Error(text || 'Registrasi gagal. Silakan coba lagi.');
      }
    }

    // Menanggapi pesan dari server
    alert('Pendaftaran berhasil');

    // Clear formulir jika registrasi berhasil
    registrationForm.reset();

    // Reload halaman setelah 2 detik
    setTimeout(function () {
      location.reload();
    }, 2000);
  } catch (error) {
    console.error(error);
    // Handle kesalahan registrasi di frontend
    alert(error.message || 'Registrasi gagal. Silakan coba lagi.');
  }
});
