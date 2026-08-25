document.addEventListener('DOMContentLoaded', () => {

    // ── 1. SCROLL REVEAL ──────────────────────────────────────
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Stagger children if inside a grid
                const children = entry.target.querySelectorAll('.glass-card, .timeline-item, .edu-card');
                children.forEach((child, i) => {
                    child.style.transitionDelay = `${i * 0.1}s`;
                    child.style.opacity = '0';
                    child.style.transform = 'translateY(20px)';
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            child.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, i * 100 + 100);
                    });
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => observer.observe(el));

    // ── 2. NAVBAR SCROLL EFFECT ───────────────────────────────
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ── 3. MOBILE NAV TOGGLE ──────────────────────────────────
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        navToggle.classList.toggle('active');
    });
    // Close when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.classList.remove('active');
        });
    });

    // ── 4. SMOOTH SCROLL WITH NAVBAR OFFSET ──────────────────
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ── 5. ACTIVE NAV LINK ON SCROLL ─────────────────────────
    const sections = document.querySelectorAll('section[id], header[id]');
    const navItems = document.querySelectorAll('.nav-links a:not(.btn-nav)');
    const activateLink = () => {
        let currentSection = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (window.scrollY >= top) currentSection = section.getAttribute('id');
        });
        navItems.forEach(item => {
            item.style.color = '';
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.style.color = 'var(--accent)';
            }
        });
    };
    window.addEventListener('scroll', activateLink);
    activateLink();

    // ── 5. LANG TOOLTIP ALTERNATION ───────────────────────────
    const tooltip = document.querySelector('.lang-tooltip');
    if (tooltip) {
        const texts = ['Elegir idioma', 'Choose language'];
        let index = 0;
        setInterval(() => {
            // Fade out
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateX(-50%) translateY(-4px)';
            setTimeout(() => {
                index = (index + 1) % texts.length;
                tooltip.textContent = texts[index];
                // Fade in
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translateX(-50%) translateY(0px)';
            }, 350);
        }, 2000);
    }

});
