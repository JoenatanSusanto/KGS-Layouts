document.addEventListener('DOMContentLoaded', function () {

    // ==========================================
    // 1. LOADING SCREEN
    // ==========================================
    const loadingScreen = document.getElementById('loadingScreen');
    const body = document.body;

    body.classList.add('loading');

    setTimeout(() => {
        loadingScreen.classList.add('slide-up');
        
        setTimeout(() => {
            body.classList.remove('loading');
        }, 800);
    }, 2000);

    // ==========================================
    // 2. NAVBAR TRANSPARAN → SOLID SAAT SCROLL
    // ==========================================
    const navbar = document.getElementById('navbar');
    const heroSection = document.getElementById('hero');

    function updateNavbar() {
        const heroBottom = heroSection.offsetHeight;
        const scrollY = window.scrollY;

        if (scrollY > heroBottom - 80) {
            navbar.classList.remove('transparent');
            navbar.classList.add('solid');
        } else {
            navbar.classList.remove('solid');
            navbar.classList.add('transparent');
        }
    }

    window.addEventListener('scroll', updateNavbar);
    updateNavbar();

    // ==========================================
    // 3. MOBILE MENU TOGGLE
    // ==========================================
    const mobileMenuIcon = document.getElementById('mobileMenuIcon');
    const navLinks = document.getElementById('navLinks');

    mobileMenuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-active');
        if (navLinks.classList.contains('mobile-active')) {
            mobileMenuIcon.textContent = '✕';
        } else {
            mobileMenuIcon.textContent = '☰';
        }
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('mobile-active');
                mobileMenuIcon.textContent = '☰';
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('mobile-active');
            mobileMenuIcon.textContent = '☰';
        }
    });

    // ==========================================
    // 4. HERO ANIMATION
    // ==========================================
    const heroAnimateElements = document.querySelectorAll('.hero-animate');
    
    setTimeout(() => {
        heroAnimateElements.forEach(el => {
            el.classList.add('hero-visible');
        });
    }, 2200);

    // ==========================================
    // 5. INTERSECTION OBSERVER UNTUK ANIMASI SCROLL
    // ==========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

});