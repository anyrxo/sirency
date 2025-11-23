// Clerk and Supabase Integration for Static Site
// This script initializes Clerk for authentication and Supabase for database interactions

// Configuration constants
// UPDATED: Using the exact publishable key provided by the user
const CLERK_PUBLISHABLE_KEY = 'pk_test_d2VsbC1tb2NjYXNpbi0yNi5jbGVyay5hY2NvdW50cy5kZXYk';

// Supabase Configuration
const SUPABASE_URL = 'https://herjyhkvtgmoazimibaa.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhlcmp5aGt2dGdtb2F6aW1pYmFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4ODI3MjIsImV4cCI6MjA3OTQ1ODcyMn0.KgswQpv2RPI550sfinw7vTCze9ijgsWTeb7NwUvBpMg';

// Styles for custom auth components
const AUTH_STYLES = `
.clerk-role-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
}

.clerk-role-modal.visible {
    opacity: 1;
    pointer-events: auto;
}

.role-card {
    background: rgba(20, 20, 20, 0.95);
    border: 1px solid rgba(0, 204, 170, 0.3);
    border-radius: 16px;
    padding: 40px;
    max-width: 480px;
    width: 90%;
    text-align: center;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 204, 170, 0.1);
    transform: translateY(20px);
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.clerk-role-modal.visible .role-card {
    transform: translateY(0);
}

.role-title {
    color: white;
    font-family: 'Anton', sans-serif;
    font-size: 2.5rem;
    margin-bottom: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.role-subtitle {
    color: #a0a0a0;
    font-family: 'Poppins', sans-serif;
    margin-bottom: 30px;
    font-size: 1rem;
    line-height: 1.5;
}

.role-options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
}

.role-btn {
    background: rgba(255, 255, 255, 0.03);
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 25px 15px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.role-btn:hover {
    border-color: #0ca;
    background: rgba(0, 204, 170, 0.1);
    transform: translateY(-2px);
}

.role-btn.selected {
    border-color: #0ca;
    background: rgba(0, 204, 170, 0.15);
    box-shadow: 0 0 20px rgba(0, 204, 170, 0.2);
}

.role-icon {
    font-size: 2rem;
    margin-bottom: 5px;
}

.role-name {
    color: white;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 1.1rem;
}

.role-desc {
    color: #888;
    font-family: 'Poppins', sans-serif;
    font-size: 0.8rem;
}

.auth-submit-btn {
    background: #0ca;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 15px 40px;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    width: 100%;
    margin-top: 20px;
    transition: all 0.3s ease;
    opacity: 0.5;
    pointer-events: none;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.auth-submit-btn.active {
    opacity: 1;
    pointer-events: auto;
    box-shadow: 0 4px 15px rgba(0, 204, 170, 0.4);
}

.auth-submit-btn:hover {
    background: #00b395;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 204, 170, 0.6);
}

.login-link {
    margin-top: 20px;
    color: #888;
    font-family: 'Poppins', sans-serif;
    font-size: 0.9rem;
}

.login-link span {
    color: #0ca;
    cursor: pointer;
    text-decoration: underline;
}

/* Floating Widget Styles */
#clerk-floating-widget {
    transition: all 0.3s ease;
}

.nav-login-btn {
    background: rgba(0, 204, 170, 0.1);
    border: 1px solid rgba(0, 204, 170, 0.3);
    color: #0ca;
    padding: 8px 20px;
    border-radius: 50px;
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    gap: 8px;
}

.nav-login-btn:hover {
    background: rgba(0, 204, 170, 0.2);
    box-shadow: 0 0 15px rgba(0, 204, 170, 0.3);
    transform: translateY(-1px);
    color: white;
    border-color: #0ca;
}
`;

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.textContent = AUTH_STYLES;
document.head.appendChild(styleSheet);

// Initialize when the DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    await loadClerk();
    initSupabase();
});

let selectedRole = null;

async function loadClerk() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@clerk/clerk-js@latest/dist/clerk.browser.js';
    script.crossOrigin = 'anonymous';
    script.onload = async () => {
        try {
            const Clerk = window.Clerk;
            await Clerk.load({
                publishableKey: CLERK_PUBLISHABLE_KEY
            });
            console.log('Clerk loaded');
            
            // Create the role selection modal
            createRoleModal(Clerk);
            
            // Setup UI based on auth state
            handleAuthUI(Clerk);
            
            // Listen for sign outs to reset UI
            Clerk.addListener((payload) => {
                if (!payload.user) {
                    handleAuthUI(Clerk);
                }
            });

        } catch (err) {
            console.error('Error loading Clerk:', err);
        }
    };
    document.head.appendChild(script);
}

function initSupabase() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    script.onload = () => {
        try {
            window.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            console.log('Supabase initialized');
        } catch (err) {
            console.error('Error initializing Supabase:', err);
        }
    };
    document.head.appendChild(script);
}

function createRoleModal(Clerk) {
    const modal = document.createElement('div');
    modal.className = 'clerk-role-modal';
    modal.id = 'role-selection-modal';
    
    modal.innerHTML = `
        <div class="role-card">
            <h2 class="role-title">Select Your Role</h2>
            <p class="role-subtitle">Choose how you want to access the SirenCY platform. This will determine your dashboard experience.</p>
            
            <div class="role-options">
                <div class="role-btn" onclick="selectRole('model', this)">
                    <div class="role-icon">💎</div>
                    <div class="role-name">Model</div>
                    <div class="role-desc">For creators & talent</div>
                </div>
                
                <div class="role-btn" onclick="selectRole('staff', this)">
                    <div class="role-icon">⚡</div>
                    <div class="role-name">Staff</div>
                    <div class="role-desc">For agency team</div>
                </div>
            </div>
            
            <button class="auth-submit-btn" id="role-submit-btn" onclick="proceedToAuth()">
                Continue to Login
            </button>
            
            <div class="login-link">
                Already have an account? <span onclick="openDirectLogin()">Log in directly</span>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add global functions for the onclick handlers
    window.selectRole = (role, element) => {
        selectedRole = role;
        
        // Visual selection
        document.querySelectorAll('.role-btn').forEach(btn => btn.classList.remove('selected'));
        element.classList.add('selected');
        
        // Enable button
        const btn = document.getElementById('role-submit-btn');
        btn.classList.add('active');
        btn.textContent = `Continue as ${role.charAt(0).toUpperCase() + role.slice(1)}`;
    };
    
    window.proceedToAuth = () => {
        const modal = document.getElementById('role-selection-modal');
        modal.classList.remove('visible');
        
        // Pass metadata to Clerk sign up
        Clerk.openSignUp({
            unsafeMetadata: {
                role: selectedRole,
                source: 'sirency_web_v1'
            },
            afterSignUpUrl: '/401.html',
            afterSignInUrl: '/401.html'
        });
    };
    
    window.openDirectLogin = () => {
        const modal = document.getElementById('role-selection-modal');
        modal.classList.remove('visible');
        Clerk.openSignIn({
            afterSignInUrl: '/401.html'
        });
    };

    window.showRoleModal = () => {
        const modal = document.getElementById('role-selection-modal');
        modal.classList.add('visible');
    };
    
    // Close modal when clicking outside card
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('visible');
        }
    });
}

function handleAuthUI(Clerk) {
    // Check if we're on the protected page
    const protectedContainer = document.getElementById('clerk-auth-container');
    const buttonContainer = document.getElementById('clerk-button-container');
    const message = document.getElementById('auth-message');

    if (protectedContainer && buttonContainer) {
        if (Clerk.user) {
            // User is signed in
            const role = Clerk.user.publicMetadata?.role || Clerk.user.unsafeMetadata?.role || 'User';
            message.innerHTML = `Welcome back, <span style="color:#0ca">${Clerk.user.firstName || 'Creator'}</span><br><span style="font-size:0.8em; opacity:0.7">Role: ${role.toString().toUpperCase()}</span>`;
            message.style.color = 'white';
            
            // Mount user button
            const userButton = document.createElement('div');
            userButton.style.marginTop = '20px';
            buttonContainer.innerHTML = '';
            buttonContainer.appendChild(userButton);
            Clerk.mountUserButton(userButton);
            
            // Show content based on role
            // This is client-side only - real security happens on your API/Backend
            if (role === 'staff') {
                // Show staff dashboard link or content
                const staffLink = document.createElement('div');
                staffLink.innerHTML = '<a href="#" class="button-primary" style="margin-top:20px; display:inline-block">Access Staff Portal</a>';
                buttonContainer.appendChild(staffLink);
            } else {
                // Show model dashboard
                 const modelLink = document.createElement('div');
                modelLink.innerHTML = '<a href="#" class="button-primary" style="margin-top:20px; display:inline-block">Go to Creator Dashboard</a>';
                buttonContainer.appendChild(modelLink);
            }
            
        } else {
            // User is signed out on protected page
            message.textContent = 'Access Restricted. Please identify yourself.';
            
            const signInButton = document.createElement('button');
            signInButton.textContent = 'Enter Portal';
            signInButton.className = 'w-button'; 
            signInButton.style.cssText = 'padding: 12px 30px; background-color: #0ca; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;';
            signInButton.onclick = () => window.showRoleModal();
            
            buttonContainer.innerHTML = '';
            buttonContainer.appendChild(signInButton);
        }
        return;
    }

    // Standard Navbar Integration
    const navbar = document.querySelector('.navbar-wrapper') || document.body;
    
    let authWidget = document.getElementById('clerk-floating-widget');
    if (!authWidget) {
        authWidget = document.createElement('div');
        authWidget.id = 'clerk-floating-widget';
        
        if (document.querySelector('.navbar-wrapper')) {
            document.querySelector('.navbar-wrapper').appendChild(authWidget);
            authWidget.style.position = 'absolute';
            authWidget.style.right = '20px'; // Adjusted for mobile menu button
            authWidget.style.top = '50%';
            authWidget.style.transform = 'translateY(-50%)';
            
            // Hide on very small screens or adjust position via media queries if needed
            // Currently relies on the script being smart about placement
        } else {
            authWidget.style.position = 'fixed';
            authWidget.style.top = '20px';
            authWidget.style.right = '20px';
            authWidget.style.zIndex = '9999';
            document.body.appendChild(authWidget);
        }
    }

    if (Clerk.user) {
        const userButton = document.createElement('div');
        authWidget.innerHTML = '';
        authWidget.appendChild(userButton);
        Clerk.mountUserButton(userButton);
    } else {
        const signInButton = document.createElement('button');
        signInButton.innerHTML = '<span>🔒</span> Login';
        signInButton.className = 'nav-login-btn';
        
        signInButton.onclick = () => window.showRoleModal();
        
        authWidget.innerHTML = '';
        authWidget.appendChild(signInButton);
    }
}
