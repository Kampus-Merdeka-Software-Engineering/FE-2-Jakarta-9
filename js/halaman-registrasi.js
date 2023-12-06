document.addEventListener('DOMContentLoaded', function () {
  const registrationForm = document.querySelector('form');

  registrationForm.addEventListener('submit', function (event) {
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

    fetch('http://localhost:7900/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(response => response.json())
      .then(data => {
        // Menanggapi pesan dari server
        alert(data.message);

        // Clear formulir jika registrasi berhasil
        if (data.message === 'Registrasi berhasil') {
          registrationForm.reset();

          // Redirect ke halaman registrasi setelah 2 detik
          setTimeout(function () {
            window.location.href = 'halaman-registrasi.html';
          }, 2000);
        }
      })
      .catch(error => {
        console.error(error);
        // Handle kesalahan registrasi di frontend
        alert('Registrasi gagal. Silakan coba lagi.');
      });
  });
});
