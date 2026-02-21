document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const heroTitle = document.getElementById('hero-title');

    // 1. Initial Hero Animations
    setTimeout(() => {
        if (heroTitle) {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
            heroTitle.classList.add('animate-in');
        }
    }, 300);

    // 2. Navbar Scroll Logic
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Intersection Observer for Reveal on Scroll
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll, .service-card, .project-item, .about-visual, .about-text');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
        revealObserver.observe(el);
    });

    // 4. Smooth Anchor Scrolling with Offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 5. Active Link Highlight on Scroll
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 120) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 6. Mobile Menu Logic (Refined)
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinksContainer = document.getElementById('navLinks');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            mobileBtn.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
            document.body.style.overflow = navLinksContainer.classList.contains('active') ? 'hidden' : 'auto';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileBtn.classList.remove('active');
                navLinksContainer.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // 7. Parallax for Hero (Subtle)
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / 800);
        }
    });
});
