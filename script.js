// ============================================
// HAMBURGER TOGGLES DROPDOWN MENU (always visible)
// ============================================

const hamburger = document.getElementById('hamburger');
const dropdownContent = document.getElementById('dropdown-content');
const header = document.getElementById('header');

if (hamburger && dropdownContent) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownContent.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-menu') && !e.target.closest('.hamburger')) {
            dropdownContent.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Close when a link is clicked
    document.querySelectorAll('.dropdown-content a').forEach(link => {
        link.addEventListener('click', () => {
            dropdownContent.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ============================================
// POSITION DROPDOWN UNDER HEADER
// ============================================

function updateDropdownPosition() {
    if (header && dropdownContent) {
        const headerRect = header.getBoundingClientRect();
        const headerHeight = header.offsetHeight;
        
        // Get main-content width to match dropdown width
        const mainContent = document.querySelector('.main-content');
        let dropdownWidth = window.innerWidth; // Default to full viewport width
        let dropdownLeft = 0;
        
        if (mainContent) {
            dropdownWidth = mainContent.offsetWidth;
            const mainContentRect = mainContent.getBoundingClientRect();
            dropdownLeft = mainContentRect.left;
        } else {
            // Fallback: center based on viewport
            dropdownLeft = (window.innerWidth - dropdownWidth) / 2;
        }
        
        // Set dropdown width and position to match main-content
        dropdownContent.style.width = dropdownWidth + 'px';
        dropdownContent.style.left = dropdownLeft + 'px';
        dropdownContent.style.transform = 'none';
        
        // Position dropdown directly below header
        dropdownContent.style.position = 'fixed';
        dropdownContent.style.top = (headerRect.top + headerHeight) + 'px';
    }
}

// Update on load, resize, and scroll
window.addEventListener('load', updateDropdownPosition);
window.addEventListener('resize', updateDropdownPosition);
window.addEventListener('scroll', updateDropdownPosition);
updateDropdownPosition();


// ============================================
// HEADER SCROLL EFFECT
// ============================================

let lastScrollY = 0;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 50) {
        header.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }

    lastScrollY = currentScrollY;
});

// ============================================
// BUTTON CLICK INTERACTIONS
// ============================================

document.querySelectorAll('.read-more-btn, .find-out-more').forEach(btn => {
    btn.addEventListener('click', function() {
        // Add a simple click effect
        this.style.opacity = '0.7';
        setTimeout(() => {
            this.style.opacity = '1';
        }, 150);
    });
});

// ============================================
// SMOOTH SCROLL FOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;

        e.preventDefault();

        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// ============================================
// ACCESSIBILITY: SKIP LINK
// ============================================

const skipLink = document.createElement('a');
skipLink.href = '#main-content';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
    position: fixed;
    top: -100px;
    left: 0;
    background: var(--primary, #6366f1);
    color: white;
    padding: 8px;
    z-index: 9999;
    transition: top 200ms ease;
`;

skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});

skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-100px';
});

document.body.insertBefore(skipLink, document.body.firstChild);