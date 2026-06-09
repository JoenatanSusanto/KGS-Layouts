document.addEventListener('DOMContentLoaded', function () {

    // ==========================================
    // 1. LOADING SCREEN
    // ==========================================
    const loadingScreen = document.getElementById('loadingScreen');
    const body = document.body;
    body.classList.add('loading');

    setTimeout(() => {
        loadingScreen.classList.add('slide-up');
        setTimeout(() => { body.classList.remove('loading'); }, 800);
    }, 2000);

    // ==========================================
    // 2. NAVBAR SCROLL EFFECT
    // ==========================================
    const navbar = document.getElementById('navbar');
    const heroSection = document.getElementById('hero');

    function updateNavbar() {
        if (!heroSection) return;
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
        mobileMenuIcon.textContent = navLinks.classList.contains('mobile-active') ? '✕' : '☰';
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
        heroAnimateElements.forEach(el => el.classList.add('hero-visible'));
    }, 2200);

    // ==========================================
    // 5. INTERSECTION OBSERVER
    // ==========================================
    const observerOptions = { root: null, rootMargin: '0px 0px -60px 0px', threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // ==========================================
    // 6. HORIZONTAL SCROLL SERVICES
    // ==========================================
    const servicesTrack = document.querySelector('.services-horizontal-track');
    const servicesWrapper = document.querySelector('#services');

    if (servicesTrack && servicesWrapper) {
        function handleServicesScroll() {
            const wrapperRect = servicesWrapper.getBoundingClientRect();
            const trackWidth = servicesTrack.scrollWidth;
            const viewportWidth = window.innerWidth;
            const wrapperHeight = servicesWrapper.offsetHeight;
            const scrollableHeight = wrapperHeight - window.innerHeight;
            const progress = Math.min(Math.max(-wrapperRect.top / scrollableHeight, 0), 1);
            const maxScrollLeft = trackWidth - viewportWidth;
            const translateX = -progress * maxScrollLeft;
            servicesTrack.style.transform = `translateX(${translateX}px)`;
        }
        window.addEventListener('scroll', handleServicesScroll);
        window.addEventListener('resize', handleServicesScroll);
        handleServicesScroll();
    }

    // ==========================================
    // 7. SMOOTH SCROLL
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

});