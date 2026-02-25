// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const scrollTopBtn = document.getElementById('scrollTop');

// ===== Top Banner Close =====
const topBanner = document.getElementById('topBanner');
const closeBanner = document.getElementById('closeBanner');

if (topBanner && closeBanner) {
    closeBanner.addEventListener('click', () => {
        topBanner.classList.add('hidden');
        navbar.style.top = '0';
    });
}

// Navbar always stays scrolled (white) on all pages

// ===== Scroll to Top Button Visibility =====
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Show/hide scroll to top button
    if (currentScroll > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// ===== Mobile Menu =====
function openMenu() {
    hamburger.classList.add('active');
    navLinks.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
        closeMenu();
    } else {
        openMenu();
    }
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
});


// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ===== Scroll to Top =====
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Smooth Scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== Form Submission =====
const ctaForm = document.getElementById('ctaForm');
if (ctaForm) {
    ctaForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = ctaForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;

        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> تم الإرسال بنجاح!';
            btn.style.background = 'linear-gradient(135deg, #27AE60, #2ECC71)';

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
                ctaForm.reset();
            }, 2500);
        }, 1500);
    });
}

// ===== Newsletter Form =====
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input');
        const btn = newsletterForm.querySelector('button');

        btn.innerHTML = '<i class="fas fa-check"></i>';
        input.value = '';

        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-paper-plane"></i>';
        }, 2000);
    });
}

// ===== Initialize AOS (Animate On Scroll) =====
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80,
        delay: 0,
    });
}

// ===== Animated Counter =====
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);

        element.textContent = '+' + current.toLocaleString('ar-EG');

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = '+' + target.toLocaleString('ar-EG');
        }
    }

    requestAnimationFrame(update);
}

// ===== Counter Observer =====
const statElements = document.querySelectorAll('.about-stat strong, .hero-floating-card strong');

if (statElements.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
                entry.target.dataset.counted = 'true';
                const text = entry.target.textContent;
                const num = parseInt(text.replace(/[^0-9]/g, ''));
                if (!isNaN(num)) {
                    animateCounter(entry.target, num);
                }
            }
        });
    }, { threshold: 0.5 });

    statElements.forEach(el => counterObserver.observe(el));
}


console.log('✨ Bouthina Portfolio Website Loaded Successfully!');
