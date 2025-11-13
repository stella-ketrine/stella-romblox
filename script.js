const CREDENTIALS = {
    username: 'guest',
    password: '123'
};

// Fungsi untuk set login status
function setLoginStatus(status) {
    try {
        localStorage.setItem('isLoggedIn', status);
    } catch (e) {
        document.cookie = "isLoggedIn=" + status + "; path=/; max-age=86400";
    }
}

// Fungsi untuk get login status
function getLoginStatus() {
    try {
        return localStorage.getItem('isLoggedIn');
    } catch (e) {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === 'isLoggedIn') return value;
        }
        return null;
    }
}

// Fungsi untuk remove login status
function removeLoginStatus() {
    try {
        localStorage.removeItem('isLoggedIn');
    } catch (e) {
        document.cookie = "isLoggedIn=; path=/; max-age=0";
    }
}

// Halaman Login
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
                setLoginStatus('true');
                console.log('Login berhasil, redirect ke profile.html');
                setTimeout(function() {
                    window.location.href = 'profile.html';
                }, 100);
            } else {
                errorMessage.textContent = 'Username atau password salah!';
                errorMessage.style.animation = 'shake 0.5s';
                
                setTimeout(() => {
                    errorMessage.style.animation = '';
                }, 500);
            }
        });
        
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                errorMessage.textContent = '';
            });
        });
    }
}

// Halaman Profile & Contact - Proteksi
if (window.location.pathname.endsWith('profile.html') || window.location.pathname.endsWith('contact.html')) {
    console.log('Checking login status...');
    console.log('Login status:', getLoginStatus());
    
    if (!getLoginStatus() || getLoginStatus() !== 'true') {
        console.log('Tidak login, redirect ke index.html');
        window.location.href = 'index.html';
    } else {
        console.log('Sudah login, tampilkan halaman');
    }
    
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            removeLoginStatus();
            window.location.href = 'index.html';
        });
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);
