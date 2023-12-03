// halaman-registrasi.js

document.addEventListener('DOMContentLoaded', function () {
  const registrationForm = document.querySelector('form');

  registrationForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const formData = new FormData(registrationForm);
      const data = {};
      
      formData.forEach((value, key) => {
          data[key] = value;
      });

      // Kirim data ke backend
      sendDataToBackend(data);
  });

  function sendDataToBackend(data) {
      // Ganti URL dengan endpoint backend yang sesuai
      const backendURL = 'http://localhost:3000/register';

      fetch(backendURL, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(result => {
          console.log('Registrasi berhasil:', result);
          // Tambahkan logika atau pengalihan halaman jika diperlukan
      })
      .catch(error => {
          console.error('Registrasi gagal:', error);
          // Tambahkan penanganan kesalahan jika diperlukan
      });
  }
});
