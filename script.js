const CREDENTIALS = {
    username: 'guest',
    password: '123'
};

if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'profile.html';
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

if (window.location.pathname.endsWith('profile.html') || window.location.pathname.endsWith('contact.html')) {
    if (!localStorage.getItem('isLoggedIn')) {
        window.location.href = 'index.html';
    }
    
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('isLoggedIn');
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
