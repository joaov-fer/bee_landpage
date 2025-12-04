document.addEventListener('DOMContentLoaded', () => {
    // ==================== FORMSPREE FORM ====================
    const form = document.querySelector('.signup-form');
    const successModal = document.getElementById('successModal');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btn = form.querySelector('button[type="submit"]');
            const btnText = btn.textContent;
            btn.textContent = 'Enviando...';
            btn.disabled = true;

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    form.reset();
                    successModal.classList.add('show');
                } else {
                    alert('Erro ao enviar. Tente novamente.');
                }
            } catch (error) {
                alert('Erro ao enviar. Tente novamente.');
            }

            btn.textContent = btnText;
            btn.disabled = false;
        });
    }

    // Close modal
    window.closeSuccessModal = () => {
        successModal.classList.remove('show');
    };

    // Close on backdrop click
    successModal?.addEventListener('click', (e) => {
        if (e.target === successModal) closeSuccessModal();
    });

    // ==================== MOBILE MENU ====================
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            const isVisible = navLinks.style.display === 'flex';

            if (isVisible) {
                navLinks.style.display = 'none';
                mobileBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(18, 18, 18, 0.95)';
                navLinks.style.padding = '2rem';
                navLinks.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
                mobileBtn.innerHTML = '<i class="fa-solid fa-times"></i>';
            }
        });
    }

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => observer.observe(el));

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (window.innerWidth <= 768 && navLinks.style.display === 'flex') {
                    navLinks.style.display = 'none';
                    mobileBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
                }

                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(18, 18, 18, 0.95)';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'rgba(18, 18, 18, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });
});
