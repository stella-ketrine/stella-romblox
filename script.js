const CREDENTIALS = {
    username: 'guest',
    password: '123'
};

// Fungsi untuk set login status
function setLoginStatus(status) {
    try {
        localStorage.setItem('isLoggedIn', status);
        sessionStorage.setItem('isLoggedIn', status);
    } catch (e) {
        document.cookie = "isLoggedIn=" + status + "; path=/; max-age=86400; SameSite=Lax";
    }
}

// Fungsi untuk get login status
function getLoginStatus() {
    try {
        let status = localStorage.getItem('isLoggedIn');
        if (!status) status = sessionStorage.getItem('isLoggedIn');
        if (status) return status;
    } catch (e) {}
    
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'isLoggedIn') return value;
    }
    return null;
}

// Fungsi untuk remove login status
function removeLoginStatus() {
    try {
        localStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('isLoggedIn');
    } catch (e) {}
    document.cookie = "isLoggedIn=; path=/; max-age=0";
}

// Cek apakah halaman login
function isLoginPage() {
    const path = window.location.pathname;
    return path.endsWith('index.html') || 
           path.endsWith('/') || 
           path === '/' ||
           path.endsWith('/stella-romblox') ||
           path.endsWith('/stella-romblox/');
}

// Cek apakah halaman yang dilindungi
function isProtectedPage() {
    const path = window.location.pathname;
    return path.includes('profile.html') || path.includes('contact.html');
}

// Halaman Login
if (isLoginPage()) {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            console.log('Mencoba login dengan:', username);
            
            if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
                console.log('Login BERHASIL!');
                setLoginStatus('true');
                
                // Double check
                setTimeout(function() {
                    console.log('Status tersimpan:', getLoginStatus());
                    window.location.href = 'profile.html';
                }, 200);
            } else {
                console.log('Login GAGAL - username/password salah');
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
if (isProtectedPage()) {
    console.log('=== PROTECTED PAGE ===');
    console.log('Current path:', window.location.pathname);
    console.log('Login status:', getLoginStatus());
    
    const loginStatus = getLoginStatus();
    
    if (!loginStatus || loginStatus !== 'true') {
        console.log('TIDAK LOGIN - Redirect ke index.html');
        alert('Anda harus login terlebih dahulu!');
        window.location.href = 'index.html';
    } else {
        console.log('SUDAH LOGIN - Tampilkan halaman');
    }
    
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Logout clicked');
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

console.log('Script.js loaded successfully');
console.log('Current page:', window.location.pathname);
