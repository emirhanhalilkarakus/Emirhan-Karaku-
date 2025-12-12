// --- Mobil Menü Toggle ---
const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navLinks.classList.toggle('active');
};

// --- Bölümlerin Genel Scroll Animasyonu ---
const sections = document.querySelectorAll('.section');
const sectionObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => {
  sectionObserver.observe(section);
});

// --- Yetenek Barlarının Dolma Animasyonu ---
const skillsSection = document.getElementById('skills');
const skillBars = document.querySelectorAll('.skill-bar');

const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillBars.forEach(bar => {
                const level = bar.getAttribute('data-level');
                bar.style.width = level;
            });
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// --- Proje Kartları İçin Gecikmeli Animasyon ---
const projectCards = document.querySelectorAll('.project-card');
const projectObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${index * 150}ms`;
            entry.target.classList.add('visible'); // Bu class'ı section'daki ile aynı kullanabiliriz.
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

projectCards.forEach(card => {
    card.classList.remove('visible'); // Başlangıçta görünmez yap
    projectObserver.observe(card);
});


// --- Aktif Navbar Linkini Belirleme ve Mobil Menüyü Kapatma ---
const navLinksAll = document.querySelectorAll('.nav-links a');
const allSections = document.querySelectorAll('section');
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

window.onscroll = () => {
    allSections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinksAll.forEach(link => {
                link.classList.remove('active');
                let targetLink = document.querySelector('.nav-links a[href*=' + id + ']');
                if (targetLink) {
                    targetLink.classList.add('active');
                }
            });
        };
    });

    // Scroll yapıldığında mobil menüyü kapat
    menuIcon.classList.remove('bx-x');
    navLinks.classList.remove('active');
};

// --- İstatistik Sayacı ---
const animateStats = () => {
    if (statsAnimated) return;
    statNumbers.forEach(num => {
        const target = parseInt(num.getAttribute('data-target'), 10);
        let current = 0;
        const step = Math.max(1, Math.floor(target / 80));
        const interval = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(interval);
            }
            num.textContent = current;
        }, 15);
    });
    statsAnimated = true;
};

const aboutSection = document.getElementById('about');
if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    aboutObserver.observe(aboutSection);
}