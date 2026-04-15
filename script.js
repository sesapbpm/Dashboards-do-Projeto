// ============================
// PASSWORD & LOGIN
// ============================
const CORRECT_PASSWORD = 'heii';

function handleLogin(e) {
    e.preventDefault();
    const input = document.getElementById('password-input');
    const errorMsg = document.getElementById('error-msg');
    
    if (input.value === CORRECT_PASSWORD) {
        errorMsg.classList.remove('show');
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('dashboard-screen').classList.remove('hidden');
        sessionStorage.setItem('authenticated', 'true');
    } else {
        errorMsg.classList.add('show');
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 400);
        input.value = '';
        input.focus();
    }
    return false;
}

function handleLogout() {
    sessionStorage.removeItem('authenticated');
    document.getElementById('dashboard-screen').classList.add('hidden');
    document.getElementById('login-screen').classList.remove('hidden');
    document.getElementById('password-input').value = '';
    // Reset to inicio page
    switchPage('inicio');
}

function togglePassword() {
    const input = document.getElementById('password-input');
    const eyeIcon = document.getElementById('eye-icon');
    if (input.type === 'password') {
        input.type = 'text';
        eyeIcon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
    } else {
        input.type = 'password';
        eyeIcon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
    }
}

// ============================
// NAVIGATION
// ============================
function switchPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active-page'));
    
    // Show target page
    const target = document.getElementById('page-' + pageId);
    if (target) {
        target.classList.add('active-page');
    }
    
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === pageId) {
            link.classList.add('active');
        }
    });

    // Close mobile menu
    document.getElementById('nav-links').classList.remove('open');
    document.getElementById('hamburger').classList.remove('active');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Setup nav link click handlers
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        switchPage(link.dataset.page);
    });
});

// ============================
// MOBILE MENU
// ============================
function toggleMenu() {
    document.getElementById('nav-links').classList.toggle('open');
    document.getElementById('hamburger').classList.toggle('active');
}

// ============================
// PARTICLES (Login Background)
// ============================
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (4 + Math.random() * 4) + 's';
        particle.style.width = (2 + Math.random() * 4) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}

// ============================
// SESSION CHECK
// ============================
function checkSession() {
    if (sessionStorage.getItem('authenticated') === 'true') {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('dashboard-screen').classList.remove('hidden');
    }
}

// ============================
// INIT
// ============================
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    checkSession();
    
    // Enter key on password
    document.getElementById('password-input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleLogin(e);
        }
    });
});
