// E-Jeep Management System - Main JavaScript File

// Global Variables
let currentUser = null;
let notifications = [];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Check if we're on login page or dashboard
    if (document.querySelector('.login-container')) {
        initializeLoginPage();
    } else if (document.querySelector('.dashboard')) {
        initializeDashboard();
    }
}

// ===========================
// LOGIN PAGE FUNCTIONALITY
// ===========================

function initializeLoginPage() {
    // Toggle password visibility
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });

    // Role selector
    const roleBtns = document.querySelectorAll('.role-btn');
    roleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            roleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Form switching
    const showSignupBtn = document.getElementById('showSignup');
    const showLoginBtn = document.getElementById('showLogin');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const backToLoginBtn = document.getElementById('backToLogin');

    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');

    if (showSignupBtn) {
        showSignupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.classList.add('hidden');
            signupForm.classList.remove('hidden');
            forgotPasswordForm.classList.add('hidden');
        });
    }

    if (showLoginBtn) {
        showLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.classList.remove('hidden');
            signupForm.classList.add('hidden');
            forgotPasswordForm.classList.add('hidden');
        });
    }

    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.classList.add('hidden');
            signupForm.classList.add('hidden');
            forgotPasswordForm.classList.remove('hidden');
        });
    }

    if (backToLoginBtn) {
        backToLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.classList.remove('hidden');
            signupForm.classList.add('hidden');
            forgotPasswordForm.classList.add('hidden');
        });
    }

    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }

    // Signup form submission
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSignup();
        });
    }

    // Forgot password form submission
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleForgotPassword();
        });
    }

    // OTP input navigation
    const otpInputs = document.querySelectorAll('.otp-input');
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            if (this.value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value === '' && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
    });
}

function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const activeRole = document.querySelector('.role-btn.active').dataset.role;

    // Simulate login - in production, this would call a backend API
    console.log('Logging in:', { email, password, role: activeRole });

    // Show 2FA form (simulated)
    const twoFactorForm = document.getElementById('twoFactorForm');
    if (twoFactorForm) {
        document.getElementById('loginForm').classList.add('hidden');
        twoFactorForm.classList.remove('hidden');
        
        // Simulate automatic redirect after 2 seconds
        setTimeout(() => {
            redirectToDashboard(activeRole);
        }, 2000);
    } else {
        redirectToDashboard(activeRole);
    }
}

function handleSignup() {
    alert('Account created successfully! Please login.');
    document.getElementById('signupForm').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
}

function handleForgotPassword() {
    alert('Password reset link sent to your email!');
    document.getElementById('forgotPasswordForm').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
}

function redirectToDashboard(role) {
    switch(role) {
        case 'admin':
            window.location.href = 'admin-dashboard.html';
            break;
        case 'driver':
            window.location.href = 'driver-dashboard.html';
            break;
        case 'user':
            window.location.href = 'user-dashboard.html';
            break;
        default:
            window.location.href = 'admin-dashboard.html';
    }
}

// ===========================
// DASHBOARD FUNCTIONALITY
// ===========================

function initializeDashboard() {
    // Modal close handlers
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });

    // Initialize charts with hover effects
    initializeCharts();

    // Initialize search functionality
    initializeSearch();

    // Initialize notifications
    initializeNotifications();

    // Initialize tab switching
    initializeTabs();
}

function initializeCharts() {
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach(bar => {
        bar.addEventListener('mouseenter', function() {
            const title = this.getAttribute('title');
            if (title) {
                showTooltip(this, title);
            }
        });
        bar.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });
}

function showTooltip(element, text) {
    // Remove existing tooltip
    hideTooltip();
    
    const tooltip = document.createElement('div');
    tooltip.className = 'chart-tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: var(--color-navy);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 13px;
        z-index: 1000;
        pointer-events: none;
        white-space: nowrap;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
}

function hideTooltip() {
    const tooltip = document.querySelector('.chart-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

function initializeSearch() {
    const searchInputs = document.querySelectorAll('input[type="text"][placeholder*="Search"]');
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            // In production, this would filter actual data
            console.log('Searching for:', searchTerm);
        });
    });
}

function initializeNotifications() {
    const notificationBtn = document.getElementById('notificationBtn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            // In production, this would show a notification dropdown
            console.log('Showing notifications');
        });
    }
}

function initializeTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all tabs in the same group
            const parent = this.parentElement;
            parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // In production, this would load different data based on the selected tab
            const period = this.textContent.toLowerCase();
            console.log('Loading data for period:', period);
        });
    });
}

// ===========================
// UTILITY FUNCTIONS
// ===========================

// Format currency
function formatCurrency(amount) {
    return '₱' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Format date
function formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

// Format time
function formatTime(date) {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleTimeString('en-US', options);
}

// Show alert message
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? 'var(--color-green)' : type === 'error' ? 'var(--color-red)' : 'var(--color-blue)'};
        color: white;
        border-radius: 10px;
        box-shadow: var(--shadow-md);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => alertDiv.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===========================
// SAMPLE DATA GENERATION
// ===========================

// Generate sample jeep data
function generateSampleJeeps(count = 10) {
    const jeeps = [];
    const routes = ['Route 1', 'Route 2', 'Route 3', 'Route 4'];
    const drivers = ['Juan Dela Cruz', 'Maria Santos', 'Pedro Reyes', 'Ana Garcia', 'Carlos Lopez'];
    
    for (let i = 0; i < count; i++) {
        jeeps.push({
            plateNumber: `ABC-${1000 + i}`,
            route: routes[Math.floor(Math.random() * routes.length)],
            driver: drivers[Math.floor(Math.random() * drivers.length)],
            capacity: 20,
            currentPassengers: Math.floor(Math.random() * 20),
            status: ['Active', 'Idle', 'Maintenance'][Math.floor(Math.random() * 3)],
            revenue: Math.floor(Math.random() * 5000) + 2000
        });
    }
    
    return jeeps;
}

// Generate sample transaction data
function generateSampleTransactions(count = 20) {
    const transactions = [];
    const jeeps = ['ABC-1234', 'XYZ-5678', 'DEF-9012', 'GHI-3456', 'JKL-7890'];
    const routes = ['Route 1', 'Route 2', 'Route 3', 'Route 4'];
    
    for (let i = 0; i < count; i++) {
        const date = new Date();
        date.setHours(date.getHours() - Math.floor(Math.random() * 48));
        
        transactions.push({
            id: `TXN-${1000 + i}`,
            date: date,
            jeep: jeeps[Math.floor(Math.random() * jeeps.length)],
            route: routes[Math.floor(Math.random() * routes.length)],
            passengers: Math.floor(Math.random() * 20) + 1,
            amount: 15 * (Math.floor(Math.random() * 20) + 1),
            paymentMethod: ['Cash', 'E-Wallet'][Math.floor(Math.random() * 2)]
        });
    }
    
    return transactions;
}

// Export functions for use in other scripts
window.ejeepSystem = {
    formatCurrency,
    formatDate,
    formatTime,
    showAlert,
    generateSampleJeeps,
    generateSampleTransactions
};

