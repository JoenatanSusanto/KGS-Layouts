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
    // 2. NAVBAR TRANSPARAN → SOLID
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
    // 5. CONTACT FORM MULTI-STEP
    // ==========================================
    const formSteps = document.querySelectorAll('.form-step');
    const stepDots = document.querySelectorAll('.step-dot');
    const stepLabel = document.getElementById('stepLabel');
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    const submitBtn = document.getElementById('submitBtn');
    const contactForm = document.getElementById('contactForm');

    let currentStep = 1;
    const totalSteps = 4;

    const stepLabels = {
        1: 'Type of Service',
        2: 'Contact Details',
        3: 'Additional Info',
        4: 'Email & Submit'
    };

    function updateFormStep(step) {
        // Update form steps visibility
        formSteps.forEach(formStep => {
            formStep.classList.remove('active');
            if (parseInt(formStep.getAttribute('data-step')) === step) {
                formStep.classList.add('active');
            }
        });

        // Update step dots
        stepDots.forEach(dot => {
            const dotStep = parseInt(dot.getAttribute('data-step'));
            dot.classList.remove('active', 'completed');
            if (dotStep === step) {
                dot.classList.add('active');
            } else if (dotStep < step) {
                dot.classList.add('completed');
            }
        });

        // Update label
        stepLabel.textContent = stepLabels[step];

        // Update buttons
        if (step === 1) {
            btnPrev.disabled = true;
        } else {
            btnPrev.disabled = false;
        }

        if (step === totalSteps) {
            btnNext.style.display = 'none';
            submitBtn.style.display = 'flex';
        } else {
            btnNext.style.display = 'flex';
            submitBtn.style.display = 'none';
        }

        currentStep = step;
    }

    function validateStep(step) {
        if (step === 1) {
            const selectedService = document.querySelector('input[name="service_type"]:checked');
            if (!selectedService) {
                alert('Silakan pilih tipe layanan terlebih dahulu.');
                return false;
            }
            return true;
        }
        if (step === 2) {
            const fullName = document.getElementById('fullName').value.trim();
            const phoneNumber = document.getElementById('phoneNumber').value.trim();
            if (!fullName || !phoneNumber) {
                alert('Silakan isi nama lengkap dan nomor telepon.');
                return false;
            }
            return true;
        }
        if (step === 3) {
            return true;
        }
        if (step === 4) {
            const email = document.getElementById('email').value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                alert('Silakan masukkan alamat email yang valid.');
                return false;
            }
            return true;
        }
        return true;
    }

    btnNext.addEventListener('click', () => {
        if (validateStep(currentStep)) {
            if (currentStep < totalSteps) {
                updateFormStep(currentStep + 1);
            }
        }
    });

    btnPrev.addEventListener('click', () => {
        if (currentStep > 1) {
            updateFormStep(currentStep - 1);
        }
    });

    // Submit form
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateStep(4)) {
            const formData = {
                service_type: document.querySelector('input[name="service_type"]:checked')?.value,
                full_name: document.getElementById('fullName').value,
                phone_number: document.getElementById('phoneNumber').value,
                company_name: document.getElementById('companyName').value,
                additional_info: document.getElementById('additionalInfo').value,
                email: document.getElementById('email').value
            };

            console.log('Form Submitted:', formData);
            
            // Success animation
            submitBtn.innerHTML = `
                <span>Terkirim!</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
            `;
            submitBtn.style.backgroundColor = '#4CAF50';
            submitBtn.style.pointerEvents = 'none';
            
            // Reset setelah 3 detik
            setTimeout(() => {
                submitBtn.innerHTML = `
                    <span>Kirim Pesan</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                `;
                submitBtn.style.backgroundColor = '';
                submitBtn.style.pointerEvents = 'auto';
                contactForm.reset();
                updateFormStep(1);
            }, 3000);
        }
    });

    // Initial form state
    updateFormStep(1);

    // Keyboard navigation untuk form
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && document.activeElement?.tagName === 'INPUT' && 
            document.activeElement?.type !== 'radio' && document.activeElement?.type !== 'submit') {
            const activeStep = document.querySelector('.form-step.active');
            if (activeStep && parseInt(activeStep.getAttribute('data-step')) !== totalSteps) {
                e.preventDefault();
                btnNext.click();
            }
        }
    });

});