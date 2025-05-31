document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        threshold: 0.1
    };

    const revealOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(revealOnScroll, observerOptions);

    document.querySelectorAll('.section-title, .about-content, .skill-category, .timeline-item, .project-card, .contact-info, .contact-form, #education .timeline-item, #certifications .timeline-item')
        .forEach(el => observer.observe(el));

    // Animate skill bars
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.skill-progress');
                bars.forEach(bar => {
                    const width = bar.getAttribute('data-skill');
                    bar.style.width = width;
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skill-category').forEach(el => skillObserver.observe(el));

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll indicator
        const indicator = document.querySelector('.scroll-indicator');
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        indicator.style.width = scrollPercent + "%";

        // Scroll-to-top button
        const scrollTopBtn = document.querySelector('.scroll-top');
        if (scrollTop > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // Scroll-to-top functionality
    document.querySelector('.scroll-top').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});