// --- Setup & Selectors ---
const header = document.querySelector('.navbar');
const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');
const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav-links a');

// --- Navbar Scroll Effect ---
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Active Link Highlight
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(a => {
        a.classList.remove('active');
        if (a.classList.contains(current)) { // Note: standard way is href comparison, let's fix below
            // This check is simplified, fixing real logic:
        }
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});

// --- Mobile Menu ---
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navLinks.classList.toggle('active');
};

// Close menu when clicking a link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navLinks.classList.remove('active');
    });
});

// --- Intersection Observer for Animations ---
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Trigger specific animations if needed
            if (entry.target.id === 'skills') {
                animateSkills();
            }
            if (entry.target.id === 'about') {
                animateStats();
            }
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// --- Skill Bars Animation ---
const skillBars = document.querySelectorAll('.skill-bar');
function animateSkills() {
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = level;
    });
}

// --- Stats Counter Animation ---
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;

    statNumbers.forEach(num => {
        const target = +num.getAttribute('data-target');
        const increment = target / 100;

        const updateCount = () => {
            const c = +num.innerText;
            if (c < target) {
                num.innerText = Math.ceil(c + increment);
                setTimeout(updateCount, 20);
            } else {
                num.innerText = target;
            }
        };
        updateCount();
    });
    statsAnimated = true;
}

// --- Scroll Reveal for Cards ---
const cards = document.querySelectorAll('.project-card, .service-card, .blog-card, .timeline-item');
cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';

    // Add simple inline observer for these small elements
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index % 3 * 150); // Stagger effect
                cardObserver.unobserve(entry.target);
            }
        });
    });
    cardObserver.observe(card);
});

// --- Tilt-on-hover for interactive cards ---
function initTilt() {
    const tiltEls = document.querySelectorAll('.project-card, .service-card, .blog-card, .timeline-item .content, .cta-button, .ghost-button');
    tiltEls.forEach(el => {
        const strength = 10;
        el.addEventListener('pointermove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * strength;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * strength;
            el.style.transform = `rotateX(${ -y }deg) rotateY(${ x }deg) translateY(-4px)`;
        });
        el.addEventListener('pointerleave', () => {
            el.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
    });
}

// --- Extra Flair: Progress Bar, Parallax, Ripples, Floating Orbs, Typewriter ---
const accentColor = '#7c3aed';

const injectedStyle = document.createElement('style');
injectedStyle.innerHTML = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        width: 0;
        background: linear-gradient(90deg, ${accentColor}, #f472b6, #22d3ee);
        box-shadow: 0 0 12px ${accentColor};
        z-index: 9999;
        transform-origin: left center;
        transition: width 0.1s ease-out;
    }
    .floating-orb {
        position: fixed;
        border-radius: 999px;
        filter: blur(18px);
        opacity: 0.32;
        pointer-events: none;
        mix-blend-mode: screen;
        animation: floaty 12s ease-in-out infinite alternate;
        z-index: 0;
    }
    @keyframes floaty {
        from { transform: translateY(-10px) translateX(0) scale(1); }
        to { transform: translateY(16px) translateX(12px) scale(1.08); }
    }
    [data-float] {
        transition: transform 0.2s ease, filter 0.2s ease;
        will-change: transform;
    }
    .ripple-target {
        position: relative;
        overflow: hidden;
    }
    .ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.7s ease-out;
        background: rgba(255,255,255,0.35);
        pointer-events: none;
    }
    @keyframes ripple {
        to { transform: scale(3.6); opacity: 0; }
    }
    .glow-pop {
        animation: glow-pop 1.4s ease-in-out infinite;
    }
    @keyframes glow-pop {
        0% { box-shadow: 0 0 0px rgba(124,58,237,0.0); }
        60% { box-shadow: 0 0 24px rgba(124,58,237,0.35); }
        100% { box-shadow: 0 0 0px rgba(124,58,237,0.0); }
    }
    .cursor-trail {
        position: fixed;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: ${accentColor};
        opacity: 0.6;
        pointer-events: none;
        filter: blur(6px);
        transition: transform 0.25s ease, opacity 0.25s ease;
        z-index: 9998;
    }
    [data-typewriter]::after {
        content: '';
        display: inline-block;
        width: 10px;
        margin-left: 4px;
        border-right: 2px solid ${accentColor};
        animation: blink 0.9s steps(1) infinite;
    }
    @keyframes blink { 50% { border-color: transparent; } }
`;
document.head.appendChild(injectedStyle);

function createScrollProgress() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);

    const update = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = `${progress}%`;
    };

    window.addEventListener('scroll', update);
    update();
}

function initParallax() {
    const floaters = document.querySelectorAll('[data-float]');
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 10;
        const y = (e.clientY / window.innerHeight - 0.5) * 10;
        floaters.forEach(el => {
            const depth = Number(el.getAttribute('data-float')) || 1;
            el.style.transform = `translate3d(${x / depth}px, ${y / depth}px, 0)`;
            el.style.filter = 'drop-shadow(0 10px 18px rgba(0,0,0,0.15))';
        });
    });
}

function initRipples() {
    const rippleTargets = document.querySelectorAll('button, .btn, a, .card, .project-card, .service-card');
    rippleTargets.forEach(el => {
        el.classList.add('ripple-target');
        el.addEventListener('pointerdown', (event) => {
            const rect = el.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
            el.appendChild(ripple);
            setTimeout(() => ripple.remove(), 650);
        });
        el.addEventListener('mouseenter', () => el.classList.add('glow-pop'));
        el.addEventListener('mouseleave', () => el.classList.remove('glow-pop'));
    });
}

function spawnFloatingOrbs() {
    const colors = [accentColor, '#22d3ee', '#f472b6', '#a855f7'];
    for (let i = 0; i < 6; i++) {
        const orb = document.createElement('div');
        orb.className = 'floating-orb';
        const size = Math.random() * 160 + 120;
        orb.style.width = `${size}px`;
        orb.style.height = `${size}px`;
        orb.style.background = colors[i % colors.length];
        orb.style.left = `${Math.random() * 90}vw`;
        orb.style.top = `${Math.random() * 90}vh`;
        orb.style.animationDuration = `${10 + Math.random() * 6}s`;
        orb.style.animationDelay = `${Math.random() * 3}s`;
        document.body.appendChild(orb);
    }
}

function initCursorTrail() {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    document.body.appendChild(trail);

    window.addEventListener('pointermove', (e) => {
        trail.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1)`;
        trail.style.opacity = '0.6';
        clearTimeout(trail._fade);
        trail._fade = setTimeout(() => {
            trail.style.opacity = '0';
            trail.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(0.8)`;
        }, 120);
    });
}

function initTypewriter() {
    const targets = document.querySelectorAll('[data-typewriter]');
    targets.forEach(target => {
        const full = target.getAttribute('data-typewriter').split('|');
        let idx = 0;
        let char = 0;
        let deleting = false;

        const tick = () => {
            const word = full[idx] || '';
            if (!deleting) {
                target.textContent = word.slice(0, char++);
                if (char > word.length + 5) deleting = true;
            } else {
                target.textContent = word.slice(0, char--);
                if (char < 0) {
                    deleting = false;
                    idx = (idx + 1) % full.length;
                }
            }
            setTimeout(tick, deleting ? 70 : 110);
        };
        tick();
    });
}

// Kick everything off
createScrollProgress();
initParallax();
initRipples();
spawnFloatingOrbs();
initCursorTrail();
initTypewriter();
initTilt();