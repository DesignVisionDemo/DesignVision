document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');
  
    // Hardcoded credentials – change these as needed
    const validUsername = 'admin';
    const validPassword = 'password123';
  
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      errorMessage.style.display = 'none'; // Hide previous error
  
      // Create and display a loading overlay
      let overlay = document.createElement('div');
      overlay.id = 'login-loading';
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.background = 'rgba(0, 0, 0, 0.5)';
      overlay.style.display = 'flex';
      overlay.style.justifyContent = 'center';
      overlay.style.alignItems = 'center';
      overlay.innerHTML = '<div class="loading"></div>';
      document.body.appendChild(overlay);
  
      // Simulate loading delay before checking credentials
      setTimeout(() => {
        const username = usernameInput.value;
        const password = passwordInput.value;
        if (username === validUsername && password === validPassword) {
          window.location.href = 'home.html';
        } else {
          document.body.removeChild(overlay);
          errorMessage.style.display = 'block';
        }
      }, 1000);
    });
  });
  