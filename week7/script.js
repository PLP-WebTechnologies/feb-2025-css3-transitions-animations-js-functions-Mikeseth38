document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const savePrefsBtn = document.getElementById('savePrefs');
    const usernameInput = document.getElementById('username');
    const themeSelect = document.getElementById('theme');
    const animateBtn = document.getElementById('animateBtn');
    const animatedBox = document.getElementById('animatedBox');
    const body = document.body;
    
    // Animation types
    const animations = ['rotate', 'bounce', 'expand'];
    let currentAnimation = 0;
    
    // Load saved preferences
    loadPreferences();
    
    // Save preferences to localStorage
    savePrefsBtn.addEventListener('click', function() {
        const preferences = {
            username: usernameInput.value,
            theme: themeSelect.value
        };
        
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
        applyTheme(preferences.theme);
        
        // Add visual feedback
        this.textContent = 'Saved!';
        setTimeout(() => {
            this.textContent = 'Save Preferences';
        }, 2000);
    });
    
    // Trigger animation
    animateBtn.addEventListener('click', function() {
        // Remove any existing animation classes
        animatedBox.classList.remove(...animations);
        
        // Add the current animation class
        animatedBox.classList.add(animations[currentAnimation]);
        
        // Cycle to the next animation
        currentAnimation = (currentAnimation + 1) % animations.length;
        
        // Reset animation after it completes
        setTimeout(() => {
            animatedBox.classList.remove(...animations);
        }, 1000);
    });
    
    // Load preferences from localStorage
    function loadPreferences() {
        const savedPrefs = localStorage.getItem('userPreferences');
        
        if (savedPrefs) {
            const preferences = JSON.parse(savedPrefs);
            usernameInput.value = preferences.username || '';
            themeSelect.value = preferences.theme || 'light';
            applyTheme(preferences.theme);
        }
    }
    
    // Apply the selected theme
    function applyTheme(theme) {
        // Remove all theme classes first
        body.classList.remove('light', 'dark', 'blue');
        
        // Add the selected theme class
        if (theme) {
            body.classList.add(theme);
        } else {
            body.classList.add('light');
        }
    }
});