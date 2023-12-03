document.addEventListener('DOMContentLoaded', function () {
  // Fungsi yang dipanggil ketika formulir login dikirim
  function handleLogin(event) {
      event.preventDefault(); // Mencegah formulir dikirim seperti biasa
      alert('Login successful!'); // Gantilah dengan logika login sesuai kebutuhan
  }

  // Mendapatkan elemen formulir login
  const loginForm = document.querySelector('form');

  // Menambahkan event listener ke formulir untuk menangani login
  if (loginForm) {
      loginForm.addEventListener('submit', handleLogin);
  }
});
