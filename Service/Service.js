document.addEventListener('DOMContentLoaded', function () {

    // ==========================================
    // 1. LOADING SCREEN
    // ==========================================
    const loadingScreen = document.getElementById('loadingScreen');
    const body = document.body;

    // Cegah scroll saat loading
    body.classList.add('loading');

    // Setelah 2 detik, slide loading screen ke atas
    setTimeout(() => {
        loadingScreen.classList.add('slide-up');
        
        // Kembalikan scroll setelah animasi selesai
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
    // 4. HERO ANIMATION (muncul dari bawah setelah loading)
    // ==========================================
    const heroAnimateElements = document.querySelectorAll('.hero-animate');
    
    // Tampilkan hero setelah loading screen selesai (2 detik + 0.8 detik animasi)
    setTimeout(() => {
        heroAnimateElements.forEach(el => {
            el.classList.add('hero-visible');
        });
    }, 2200);

    // ==========================================
    // 5. SIDEBAR ACTIVE LINK PADA SCROLL
    // ==========================================
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const sections = [];

    // Kumpulkan semua section yang di-target oleh sidebar
    sidebarLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            const section = document.querySelector(href);
            if (section) {
                sections.push({ link, section });
            }
        }
    });

    function updateActiveSidebarLink() {
        let currentSection = null;
        const scrollY = window.scrollY + 150; // offset

        sections.forEach(({ section }) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                currentSection = section;
            }
        });

        // Jika belum ada section yang aktif, cek section terakhir yang sudah dilewati
        if (!currentSection && sections.length > 0) {
            const lastSection = sections[sections.length - 1].section;
            if (scrollY >= lastSection.offsetTop + lastSection.offsetHeight) {
                currentSection = lastSection;
            }
        }

        // Update kelas active
        sections.forEach(({ link, section }) => {
            if (currentSection && section === currentSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveSidebarLink);
    updateActiveSidebarLink();

    // Smooth scroll untuk sidebar links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // 6. INTERSECTION OBSERVER UNTUK ANIMASI SCROLL
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