const CREDENTIALS = {
    username: 'guest',
    password: '123'
};

// Simpan login status
function saveLogin() {
    try {
        localStorage.setItem('login', 'yes');
    } catch(e) {
        sessionStorage.setItem('login', 'yes');
    }
}

// Cek login status
function isLoggedIn() {
    try {
        return localStorage.getItem('login') === 'yes' || sessionStorage.getItem('login') === 'yes';
    } catch(e) {
        return false;
    }
}

// Hapus login status
function logout() {
    try {
        localStorage.removeItem('login');
        sessionStorage.removeItem('login');
    } catch(e) {}
}

// HALAMAN LOGIN (index.html)
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('errorMessage');
        
        if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
            saveLogin();
            window.location.replace('profile.html');
        } else {
            errorMessage.textContent = 'Username atau password salah!';
            errorMessage.style.animation = 'shake 0.5s';
            setTimeout(() => {
                errorMessage.style.animation = '';
            }, 500);
        }
    });
    
    // Clear error saat mengetik
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            document.getElementById('errorMessage').textContent = '';
        });
    });
}

// HALAMAN PROFILE & CONTACT (cek login)
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    // Cek apakah sudah login
    if (!isLoggedIn()) {
        window.location.replace('index.html');
    }
    
    // Tombol logout
    logoutBtn.addEventListener('click', function() {
        logout();
        window.location.replace('index.html');
    });
}

// Animasi shake
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);
