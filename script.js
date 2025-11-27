// E-Jeep Management System - Main JavaScript File

// Global Variables
let currentUser = null;
let notifications = [];
let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Mobile viewport fix for iOS
(function() {
    function setViewportHeight() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);
})();

// Prevent zoom on double tap (mobile)
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    let now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initializeApp();
    });
} else {
    initializeApp();
}

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
    // Toggle password visibility (mobile-friendly)
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    const passwordInput = document.getElementById('password');
    
    togglePasswordBtns.forEach(btn => {
        // Support both click and touch events
        ['click', 'touchend'].forEach(eventType => {
            btn.addEventListener(eventType, function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const icon = this.querySelector('i') || this;
                const input = passwordInput || this.previousElementSibling || 
                             this.closest('.input-group')?.querySelector('input[type="password"]');
                
                if (!input) return;
                
                const isPassword = input.type === 'password';
                input.type = isPassword ? 'text' : 'password';
                
                if (icon) {
                    icon.classList.toggle('fa-eye', !isPassword);
                    icon.classList.toggle('fa-eye-slash', isPassword);
                }
                
                this.setAttribute('aria-pressed', isPassword ? 'true' : 'false');
                
                // Focus input after toggle for better UX
                setTimeout(() => input.focus(), 100);
            }, { passive: false });
        });
    });

    // Role selector (mobile-friendly with touch support)
    const roleBtns = document.querySelectorAll('.role-btn');
    roleBtns.forEach(btn => {
        ['click', 'touchend'].forEach(eventType => {
            btn.addEventListener(eventType, function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                roleBtns.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-pressed', 'false');
                });
                
                this.classList.add('active');
                this.setAttribute('aria-pressed', 'true');
            }, { passive: false });
        });
        
        // Add haptic feedback on mobile
        if (isTouchDevice && navigator.vibrate) {
            btn.addEventListener('touchstart', function() {
                navigator.vibrate(10);
            }, { passive: true });
        }
    });

    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }

    // OTP input navigation (mobile-optimized)
    const otpInputs = document.querySelectorAll('.otp-input');
    otpInputs.forEach((input, index) => {
        // Mobile: use numeric keyboard
        input.setAttribute('inputmode', 'numeric');
        input.setAttribute('pattern', '[0-9]');
        
        input.addEventListener('input', function(e) {
            // Only allow numbers
            this.value = this.value.replace(/[^0-9]/g, '');
            
            if (this.value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
            
            // Auto-submit when all fields filled
            if (index === otpInputs.length - 1 && this.value.length === 1) {
                const allFilled = Array.from(otpInputs).every(inp => inp.value.length === 1);
                if (allFilled) {
                    setTimeout(() => {
                        const verifyBtn = document.getElementById('verifyBtn');
                        if (verifyBtn) verifyBtn.click();
                    }, 300);
                }
            }
        });
        
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value === '' && index > 0) {
                otpInputs[index - 1].focus();
                otpInputs[index - 1].select();
            }
            
            // Handle paste
            if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
                setTimeout(() => {
                    const pastedValue = this.value;
                    if (pastedValue.length > 1) {
                        const digits = pastedValue.replace(/[^0-9]/g, '').slice(0, otpInputs.length);
                        digits.split('').forEach((digit, i) => {
                            if (otpInputs[index + i]) {
                                otpInputs[index + i].value = digit;
                            }
                        });
                        const lastIndex = Math.min(index + digits.length - 1, otpInputs.length - 1);
                        otpInputs[lastIndex].focus();
                    }
                }, 10);
            }
        });
        
        // Prevent non-numeric input
        input.addEventListener('keypress', function(e) {
            if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
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


function redirectToDashboard(role) {
    switch(role) {
        case 'admin':
            window.location.href = 'admin-dashboard.html';
            break;
        case 'driver':
            window.location.href = 'driver-dashboard.html';
            break;
        case 'commuter':
            window.location.href = 'commuter-dashboard.html';
            break;
        default:
            window.location.href = 'admin-dashboard.html';
    }
}

// ===========================
// DASHBOARD FUNCTIONALITY
// ===========================

function initializeDashboard() {
    // Modal close handlers (mobile-friendly)
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Prevent body scroll when modal is open on mobile
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    if (modal.classList.contains('active')) {
                        document.body.style.overflow = 'hidden';
                        document.body.style.position = 'fixed';
                        document.body.style.width = '100%';
                    } else {
                        document.body.style.overflow = '';
                        document.body.style.position = '';
                        document.body.style.width = '';
                    }
                }
            });
        });
        observer.observe(modal, { attributes: true });
    });
    
    // Initialize mobile-specific features
    if (isMobile) {
        initializeCollapsibleSections();
        initializeMobileStatsScroll();
    }

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

// Mobile Menu Toggle
function addMobileMenuToggle() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    
    // Create mobile menu button
    const menuBtn = document.createElement('button');
    menuBtn.className = 'mobile-menu-btn';
    menuBtn.setAttribute('aria-label', 'Toggle menu');
    menuBtn.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
    menuBtn.style.cssText = `
        display: none;
        position: fixed;
        top: 15px;
        left: 15px;
        z-index: 1001;
        width: 48px;
        height: 48px;
        border-radius: 10px;
        background: var(--color-blue);
        color: white;
        border: none;
        cursor: pointer;
        box-shadow: var(--shadow-md);
        -webkit-tap-highlight-color: transparent;
    `;
    
    if (window.matchMedia('(max-width: 768px)').matches) {
        menuBtn.style.display = 'flex';
        menuBtn.style.alignItems = 'center';
        menuBtn.style.justifyContent = 'center';
        document.body.appendChild(menuBtn);
    }
    
    // Toggle sidebar
    menuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        const isOpen = sidebar.classList.contains('mobile-open');
        
        sidebar.classList.toggle('mobile-open');
        document.body.classList.toggle('menu-open', !isOpen);
        
        const icon = this.querySelector('i');
        if (!isOpen) {
            icon.className = 'fas fa-times';
            // Prevent body scroll when menu is open
            document.body.style.overflow = 'hidden';
        } else {
            icon.className = 'fas fa-bars';
            document.body.style.overflow = '';
        }
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.matchMedia('(max-width: 768px)').matches) {
            if (sidebar.classList.contains('mobile-open') && 
                !sidebar.contains(e.target) && 
                !menuBtn.contains(e.target)) {
                sidebar.classList.remove('mobile-open');
                document.body.classList.remove('menu-open');
                document.body.style.overflow = '';
                menuBtn.querySelector('i').className = 'fas fa-bars';
            }
        }
    });
    
    // Close sidebar on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('mobile-open')) {
            sidebar.classList.remove('mobile-open');
            document.body.classList.remove('menu-open');
            document.body.style.overflow = '';
            menuBtn.querySelector('i').className = 'fas fa-bars';
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.matchMedia('(max-width: 768px)').matches) {
            menuBtn.style.display = 'flex';
        } else {
            menuBtn.style.display = 'none';
            sidebar.classList.remove('mobile-open');
        }
    });
}

// Prevent accidental form submission on mobile
function preventAccidentalSubmission() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        let submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.addEventListener('touchstart', function() {
                this.style.opacity = '0.8';
            }, { passive: true });
            
            submitButton.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 200);
            }, { passive: true });
        }
    });
}

// Optimize images for mobile
function optimizeImages() {
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.loading = 'lazy';
        });
    }
}

// Add pull-to-refresh prevention (optional - can be enabled)
function preventPullToRefresh() {
    let touchStartY = 0;
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchmove', function(e) {
        const touchY = e.touches[0].clientY;
        const touchDiff = touchY - touchStartY;
        
        // Prevent pull-to-refresh when scrolling down
        if (touchDiff > 0 && window.scrollY === 0) {
            e.preventDefault();
        }
    }, { passive: false });
}

// Initialize mobile optimizations
function initializeMobileOptimizations() {
    if (isMobile) {
        optimizeImages();
        preventAccidentalSubmission();
        // preventPullToRefresh(); // Uncomment if needed
        
        // Add mobile-specific classes
        document.documentElement.classList.add('mobile-device');
        if (isTouchDevice) {
            document.documentElement.classList.add('touch-device');
        }
        
        // Optimize scroll performance
        document.documentElement.style.webkitOverflowScrolling = 'touch';
    }
}

// Enhanced initializeApp function
function initializeApp() {
    // Initialize mobile optimizations first
    initializeMobileOptimizations();
    
    // Check if we're on login page or dashboard
    if (document.querySelector('.login-container')) {
        initializeLoginPage();
    } else if (document.querySelector('.dashboard')) {
        initializeDashboard();
    }
}

// Export functions for use in other scripts
window.ejeepSystem = {
    formatCurrency,
    formatDate,
    formatTime,
    showAlert,
    generateSampleJeeps,
    generateSampleTransactions,
    isMobile,
    isTouchDevice
};


