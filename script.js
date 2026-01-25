// ===================================
// SCROLL-DRIVEN INTERACTIONS
// ===================================

let lastScrollY = window.scrollY;
let isScrollingDown = true;

// Navbar reference
const navbar = document.getElementById('navbar');

// Track scroll direction and apply text scaling
function handleScroll() {
    const currentScrollY = window.scrollY;
    isScrollingDown = currentScrollY > lastScrollY;

    // Navbar glass effect
    if (currentScrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Scroll-driven text scaling
    applyTextScaling(currentScrollY);

    // Reveal elements on scroll
    revealOnScroll();

    lastScrollY = currentScrollY;
}

// Apply subtle text scaling based on scroll direction
function applyTextScaling(scrollY) {
    const scrollTexts = document.querySelectorAll('.scroll-text');

    scrollTexts.forEach((text) => {
        const rect = text.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Check if element is in viewport
        if (rect.top < windowHeight && rect.bottom > 0) {
            const scrollProgress = (windowHeight - rect.top) / windowHeight;

            // Subtle scale based on scroll position (0.98 to 1.02)
            const scale = 0.98 + (scrollProgress * 0.04);
            const clampedScale = Math.min(Math.max(scale, 0.98), 1.02);

            text.style.transform = `scale(${clampedScale})`;
        }
    });
}

// Reveal elements as they enter viewport
function revealOnScroll() {
    const revealElements = document.querySelectorAll('.reveal-line, .scroll-reveal, .skill-card, .project-card, .timeline-item, .contact-content');

    revealElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Trigger reveal when element is 20% into viewport
        if (rect.top < windowHeight * 0.8) {
            // Stagger animation for grouped elements
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 100);
        }
    });

    // Handle About Me title scaling animation
    const aboutTitle = document.querySelector('.about-section .section-title');
    if (aboutTitle) {
        const rect = aboutTitle.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // When title top reaches 80% of viewport height, scale to normal
        // Otherwise keep it large
        if (rect.top < windowHeight * 0.7 && rect.bottom > windowHeight * 0.3) {
            aboutTitle.classList.add('scaled-in');
        } else {
            aboutTitle.classList.remove('scaled-in');
        }
    }

    // Handle Technical Expertise split animation
    const splitTitle = document.querySelector('.split-title');
    if (splitTitle) {
        const rect = splitTitle.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight * 0.6) {
            splitTitle.classList.add('split-joined');
        } else {
            splitTitle.classList.remove('split-joined');
        }
    }
}

// ===================================
// SMOOTH SCROLL FOR NAVIGATION
// ===================================

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// CONTINUOUS GRADIENT BACKGROUND SHIFT
// ===================================

let gradientPosition = 0;

function animateGradient() {
    gradientPosition += 0.1;

    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const isLightMode = document.body.classList.contains('light-mode');

    if (isLightMode) {
        // Light mode gradient
        const lightness1 = 98 - (scrollPercent * 3);
        const lightness2 = 95 - (scrollPercent * 5);

        document.body.style.background = `
            linear-gradient(
                ${180 + Math.sin(gradientPosition * 0.01) * 20}deg,
                hsl(0, 0%, ${lightness1}%) 0%,
                hsl(0, 0%, ${lightness2}%) 50%,
                hsl(0, 0%, ${lightness1 - 1}%) 100%
            )
        `;
    } else {
        // Dark mode gradient
        const lightness1 = 2 + (scrollPercent * 3);
        const lightness2 = 5 + (scrollPercent * 5);

        document.body.style.background = `
            linear-gradient(
                ${180 + Math.sin(gradientPosition * 0.01) * 20}deg,
                hsl(0, 0%, ${lightness1}%) 0%,
                hsl(0, 0%, ${lightness2}%) 50%,
                hsl(0, 0%, ${lightness1 + 1}%) 100%
            )
        `;
    }
    requestAnimationFrame(animateGradient);
}

// ===================================
// PARALLAX EFFECT FOR HERO
// ===================================

function applyParallax() {
    const scrolled = window.scrollY;
    const heroContent = document.querySelector('.hero-content');

    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / 700);
    }
}

// ===================================
// ENHANCED SCROLL LISTENER
// ===================================

let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleScroll();
            applyParallax();
            ticking = false;
        });
        ticking = true;
    }
});

// ===================================
// INTERSECTION OBSERVER FOR BETTER PERFORMANCE
// ===================================

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all reveal elements
document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = document.querySelectorAll(
        '.reveal-line, .skill-card, .project-card, .timeline-item, .contact-content'
    );

    elementsToObserve.forEach(el => observer.observe(el));

    // Initial reveal check
    revealOnScroll();

    // Start gradient animation
    animateGradient();
});

// ===================================
// SMOOTH ENTRANCE ANIMATIONS
// ===================================

window.addEventListener('load', () => {
    // Fade in hero content
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';

            setTimeout(() => {
                el.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
});

// ===================================
// ACTIVE NAVIGATION HIGHLIGHT
// ===================================

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ===================================
// GITHUB LINK HOVER EFFECTS
// ===================================

document.querySelectorAll('.github-link').forEach(link => {
    link.addEventListener('mouseenter', function () {
        this.style.transform = 'translateX(5px) scale(1.1)';
    });

    link.addEventListener('mouseleave', function () {
        this.style.transform = 'translateX(0) scale(1)';
    });
});

// ===================================
// PREVENT SCROLL JANK
// ===================================

let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    document.body.classList.add('scrolling');

    scrollTimeout = setTimeout(() => {
        document.body.classList.remove('scrolling');
    }, 150);
}, { passive: true });

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to resize events
window.addEventListener('resize', debounce(() => {
    revealOnScroll();
}, 250));

// ===================================
// THEME TOGGLE (DARK/LIGHT MODE)
// ===================================

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
}

// Theme toggle button functionality
const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');

    // Save theme preference
    const theme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);

    // Update gradient for the new theme
    updateGradientForTheme(theme);
});

// Update gradient animation based on theme
function updateGradientForTheme(theme) {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);

    if (theme === 'light') {
        const lightness1 = 98 - (scrollPercent * 3); // Very light to slightly darker
        const lightness2 = 95 - (scrollPercent * 5); // Light grey variations

        document.body.style.background = `
            linear-gradient(
                ${180 + Math.sin(gradientPosition * 0.01) * 20}deg,
                hsl(0, 0%, ${lightness1}%) 0%,
                hsl(0, 0%, ${lightness2}%) 50%,
                hsl(0, 0%, ${lightness1 - 1}%) 100%
            )
        `;
    } else {
        const lightness1 = 2 + (scrollPercent * 3);
        const lightness2 = 5 + (scrollPercent * 5);

        document.body.style.background = `
            linear-gradient(
                ${180 + Math.sin(gradientPosition * 0.01) * 20}deg,
                hsl(0, 0%, ${lightness1}%) 0%,
                hsl(0, 0%, ${lightness2}%) 50%,
                hsl(0, 0%, ${lightness1 + 1}%) 100%
            )
        `;
    }
}

// ===================================
// TIMELINE SCROLL ANIMATION - GLOWING DOT
// ===================================

// Create and animate glowing dots on timelines
function initTimelineProgressDots() {
    const timelines = document.querySelectorAll('.timeline');

    timelines.forEach(timeline => {
        // Create the glowing dot element
        const progressDot = document.createElement('div');
        progressDot.className = 'timeline-progress-dot';
        timeline.appendChild(progressDot);
    });
}

// Animate timeline progress dots based on scroll
function animateTimelineProgressDots() {
    const aboutSection = document.querySelector('.about-section');
    if (!aboutSection) return;

    const timelines = document.querySelectorAll('.timeline');
    const sectionRect = aboutSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Check if about section is in view
    const isInView = sectionRect.top < windowHeight && sectionRect.bottom > 0;

    timelines.forEach(timeline => {
        const progressDot = timeline.querySelector('.timeline-progress-dot');
        if (!progressDot) return;

        const markers = timeline.querySelectorAll('.timeline-marker');
        if (markers.length === 0) return;

        const timelineRect = timeline.getBoundingClientRect();

        // Calculate scroll progress for this specific timeline
        let scrollProgress = 0;

        if (isInView && timelineRect.top < windowHeight * 0.7) {
            // Timeline is in active scroll zone
            const timelineTop = timelineRect.top;
            const activeZoneStart = windowHeight * 0.7;
            // Reduced scroll distance: use half the timeline height instead of full height
            const activeZoneEnd = -timelineRect.height * 0.5;

            // Calculate progress (0 to 1)
            scrollProgress = (activeZoneStart - timelineTop) / (activeZoneStart - activeZoneEnd);
            scrollProgress = Math.max(0, Math.min(1, scrollProgress));

            // Calculate which marker should be active
            const markerIndex = Math.floor(scrollProgress * markers.length);
            const activeMarkerIndex = Math.min(markerIndex, markers.length - 1);

            // Get the active marker's position
            const activeMarker = markers[activeMarkerIndex];
            const markerRect = activeMarker.getBoundingClientRect();
            const timelineLeft = timelineRect.left;
            const markerCenter = markerRect.left + (markerRect.width / 2) - timelineLeft;

            // Position the dot at the marker
            progressDot.style.left = `${markerCenter}px`;
            progressDot.classList.add('active');
        } else {
            progressDot.classList.remove('active');
        }
    });
}


// Add to scroll listener
let timelineTickering = false;

window.addEventListener('scroll', () => {
    if (!timelineTickering) {
        window.requestAnimationFrame(() => {
            animateTimelineProgressDots();
            timelineTickering = false;
        });
        timelineTickering = true;
    }
}, { passive: true });

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initTimelineProgressDots();
    animateTimelineProgressDots();
});

