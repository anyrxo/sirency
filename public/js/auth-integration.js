// Clerk and Supabase Integration for Static Site
// This script initializes Clerk for authentication and Supabase for database interactions

// Configuration constants
const CLERK_PUBLISHABLE_KEY = 'pk_test_d2VsbC1tb2NjYXNpbi0yNi5jbGVyay5hY2NvdW50cy5kZXYk';
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
    display: inline-block;
}

.nav-login-btn {
    background: transparent;
    color: white;
    padding: 10px 24px;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 14px;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.3);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-right: 15px; /* Spacing from Apply Button */
    margin-top: 10px; /* Vertical Alignment fix */
}

.nav-login-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: #0ca;
    color: #0ca;
}

@media (max-width: 768px) {
    .nav-login-btn {
        margin-top: 15px;
        width: 100%;
        text-align: center;
        margin-right: 0;
        margin-bottom: 10px;
    }
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
            
            createRoleModal(Clerk);
            
            // Initial Check
            handleAuthUI(Clerk);
            
            // Re-check periodically to handle dynamic navbar changes or slow loads
            setTimeout(() => handleAuthUI(Clerk), 500);
            setTimeout(() => handleAuthUI(Clerk), 2000);
            
            Clerk.addListener((payload) => {
                handleAuthUI(Clerk);
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
    
    // Global handlers
    window.selectRole = (role, element) => {
        selectedRole = role;
        document.querySelectorAll('.role-btn').forEach(btn => btn.classList.remove('selected'));
        element.classList.add('selected');
        const btn = document.getElementById('role-submit-btn');
        btn.classList.add('active');
        btn.textContent = `Continue as ${role.charAt(0).toUpperCase() + role.slice(1)}`;
    };
    
    window.proceedToAuth = () => {
        document.getElementById('role-selection-modal').classList.remove('visible');
        Clerk.openSignUp({
            unsafeMetadata: { role: selectedRole, source: 'sirency_web_v1' },
            afterSignUpUrl: '/401.html',
            afterSignInUrl: '/401.html'
        });
    };
    
    window.openDirectLogin = () => {
        document.getElementById('role-selection-modal').classList.remove('visible');
        Clerk.openSignIn({ afterSignInUrl: '/401.html' });
    };

    window.showRoleModal = () => {
        document.getElementById('role-selection-modal').classList.add('visible');
    };
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('visible');
    });
}

function handleAuthUI(Clerk) {
    // 1. Handle Protected Page Logic
    const protectedContainer = document.getElementById('clerk-auth-container');
    if (protectedContainer) {
        // ... (existing logic for 401.html)
        // Leaving this part mostly as is, assuming it was working locally
        const buttonContainer = document.getElementById('clerk-button-container');
        const message = document.getElementById('auth-message');
        if (Clerk.user) {
             const role = Clerk.user.publicMetadata?.role || Clerk.user.unsafeMetadata?.role || 'User';
            message.innerHTML = `Welcome back, <span style="color:#0ca">${Clerk.user.firstName || 'Creator'}</span><br><span style="font-size:0.8em; opacity:0.7">Role: ${role.toString().toUpperCase()}</span>`;
            const userButton = document.createElement('div');
            userButton.style.marginTop = '20px';
            buttonContainer.innerHTML = '';
            buttonContainer.appendChild(userButton);
            Clerk.mountUserButton(userButton);
        } else {
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

    // 2. FORCE INSERT INTO NAVBAR (The aggressive fix)
    
    // Try to find the container I manually added in HTML
    let authWidget = document.getElementById('clerk-floating-widget');
    
    // If NOT found, let's find the "Apply Now" button and insert before it
    if (!authWidget) {
        console.log('Clerk Widget container not found, attempting injection...');
        // Selector for the list item containing the Apply Now button
        // Based on the HTML structure: <li class="mobile-margin-top-10"><a ... class="button-primary ...">Apply now</a></li>
        const applyBtn = document.querySelector('a.button-primary'); // Using generic class to catch it
        
        if (applyBtn && applyBtn.parentNode) {
            console.log('Found Apply Button, injecting Login Button...');
            
            // Create a wrapper if it doesn't exist to hold both buttons side-by-side
            let wrapper = applyBtn.parentNode.querySelector('.auth-wrapper');
            if (!wrapper) {
                wrapper = document.createElement('div');
                wrapper.className = 'auth-wrapper';
                wrapper.style.display = 'flex';
                wrapper.style.alignItems = 'center';
                // Move Apply button into wrapper
                applyBtn.parentNode.insertBefore(wrapper, applyBtn);
                wrapper.appendChild(applyBtn);
            }
            
            // Create our widget container
            authWidget = document.createElement('div');
            authWidget.id = 'clerk-floating-widget';
            // Insert it at the start of the wrapper (before Apply button)
            wrapper.insertBefore(authWidget, wrapper.firstChild);
        }
    }

    if (authWidget) {
        authWidget.innerHTML = ''; // Clear current content
        
        if (Clerk.user) {
            // User Logged In: Show Avatar
            const userButtonDiv = document.createElement('div');
            userButtonDiv.style.marginRight = '15px';
            authWidget.appendChild(userButtonDiv);
            Clerk.mountUserButton(userButtonDiv);
        } else {
            // User Logged Out: Show Login Text Button
            const signInButton = document.createElement('button');
            signInButton.textContent = 'LOGIN';
            signInButton.className = 'nav-login-btn'; // Uses the styles defined at top
            signInButton.onclick = () => window.showRoleModal();
            authWidget.appendChild(signInButton);
        }
    } else {
        console.warn('Could not find a place to inject the Login button in the Navbar.');
    }
}
