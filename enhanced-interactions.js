/**
 * Enhanced Interactive Cinema Platform
 * Handles carousels, cover interactions, parallax effects, and mobile touch events
 */

class CinematicPlatform {
    constructor() {
        this.isTouch = false;
        this.startX = 0;
        this.scrollLeft = 0;
        this.init();
    }

    init() {
        this.detectTouchDevice();
        this.initCarousels();
        this.initCoverInteractions();
        this.initParallaxEffects();
        this.initSmoothScroll();
    }

    // ═══ TOUCH DETECTION ═══
    detectTouchDevice() {
        this.isTouch = () => {
            return (('ontouchstart' in window) ||
                    (navigator.maxTouchPoints > 0) ||
                    (navigator.msMaxTouchPoints > 0));
        };
    }

    // ═══ CAROUSEL NAVIGATION ═══
    initCarousels() {
        // Series carousel
        this.setupCarousel('.main-container', '#prevBtn', '#nextBtn');
        
        // Films carousel
        this.setupCarousel('#filmsContainer', '#prevBtnFilms', '#nextBtnFilms');
        
        // Categories carousel (if exists)
        const categoriesContainer = document.querySelector('.categories-container');
        if (categoriesContainer) {
            this.enableTouchScroll(categoriesContainer);
        }
    }

    setupCarousel(containerSelector, prevBtnSelector, nextBtnSelector) {
        const container = document.querySelector(containerSelector);
        const prevBtn = document.querySelector(prevBtnSelector);
        const nextBtn = document.querySelector(nextBtnSelector);

        if (!container || !prevBtn || !nextBtn) return;

        const cardWidth = () => {
            const card = container.querySelector('.movie-card');
            return card ? card.offsetWidth + 30 : 300; // card width + gap
        };

        prevBtn.addEventListener('click', () => {
            container.scrollLeft -= cardWidth();
        });

        nextBtn.addEventListener('click', () => {
            container.scrollLeft += cardWidth();
        });

        // Enable keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') container.scrollLeft -= cardWidth();
            if (e.key === 'ArrowRight') container.scrollLeft += cardWidth();
        });

        // Enable touch swipe
        this.enableTouchScroll(container);
    }

    // ═══ TOUCH SWIPE SUPPORT ═══
    enableTouchScroll(container) {
        let isDown = false;
        let startX = 0;
        let scrollLeft = 0;

        container.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });

        container.addEventListener('mouseleave', () => {
            isDown = false;
        });

        container.addEventListener('mouseup', () => {
            isDown = false;
        });

        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 1.5;
            container.scrollLeft = scrollLeft - walk;
        });

        // Touch events for mobile
        container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });

        container.addEventListener('touchmove', (e) => {
            const x = e.touches[0].pageX - container.offsetLeft;
            const walk = (x - startX) * 1.5;
            container.scrollLeft = scrollLeft - walk;
        });
    }

    // ═══ DYNAMIC COVER INTERACTIONS ═══
    initCoverInteractions() {
        const movieCards = document.querySelectorAll('.movie-card');

        movieCards.forEach((card, index) => {
            // Add data attributes for animation control
            card.dataset.index = index;
            card.style.animationDelay = `${index * 0.05}s`;

            // Desktop hover effects
            card.addEventListener('mouseenter', (e) => {
                this.createCoverEffect(card, 'enter');
            });

            card.addEventListener('mouseleave', (e) => {
                this.createCoverEffect(card, 'leave');
            });

            // Mobile tap effects
            if (this.isTouch()) {
                card.addEventListener('touchstart', (e) => {
                    this.createCoverEffect(card, 'enter');
                });
            }

            // Add focus state for accessibility
            card.addEventListener('focus', () => {
                this.createCoverEffect(card, 'enter');
            });

            card.addEventListener('blur', () => {
                this.createCoverEffect(card, 'leave');
            });
        });
    }

    createCoverEffect(card, type) {
        if (type === 'enter') {
            // Remove existing ripples
            const oldRipple = card.querySelector('.cover-ripple');
            if (oldRipple) oldRipple.remove();

            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'cover-ripple';
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 20px;
                height: 20px;
                background: radial-gradient(circle, rgba(244, 193, 15, 0.6) 0%, transparent 70%);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                pointer-events: none;
                z-index: 2;
                animation: coverRipple 0.8s ease-out forwards;
            `;

            card.style.position = 'relative';
            card.appendChild(ripple);

            // Add subtle particles
            this.addParticles(card);
        }
    }

    addParticles(card) {
        const particleCount = 3;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'cover-particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(244, 193, 15, 0.7);
                border-radius: 50%;
                pointer-events: none;
                z-index: 2;
                animation: particleFloat 1.5s ease-out forwards;
            `;

            const angle = (Math.PI * 2 * i) / 3;
            const distance = 80;
            particle.style.setProperty('--x', Math.cos(angle) * distance + 'px');
            particle.style.setProperty('--y', Math.sin(angle) * distance + 'px');
            particle.style.left = '50%';
            particle.style.top = '50%';

            card.style.position = 'relative';
            card.appendChild(particle);

            setTimeout(() => particle.remove(), 1500);
        }
    }

    // ═══ PARALLAX SCROLL EFFECTS ═══
    initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');

        if (parallaxElements.length === 0) return;

        window.addEventListener('scroll', () => {
            parallaxElements.forEach((element) => {
                const speed = parseFloat(element.dataset.parallax);
                const yOffset = window.pageYOffset;
                element.style.transform = `translateY(${yOffset * speed}px)`;
            });
        }, { passive: true });
    }

    // ═══ SMOOTH SCROLL BEHAVIOR ═══
    initSmoothScroll() {
        document.documentElement.style.scrollBehavior = 'smooth';

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
}

// ═══ ANIMATIONS KEYFRAMES ═══
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes coverRipple {
        0% {
            width: 20px;
            height: 20px;
            opacity: 1;
        }
        100% {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }

    @keyframes particleFloat {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(var(--x), var(--y)) scale(0.3);
        }
    }

    @keyframes rippleEffect {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .movie-card {
        animation: slideInUp 0.6s ease-out forwards;
    }
`;
document.head.appendChild(animationStyles);

// ═══ INITIALIZE ON DOM READY ═══
document.addEventListener('DOMContentLoaded', () => {
    new CinematicPlatform();
});

// ═══ PERFORMANCE OPTIMIZATION ═══
// Use Intersection Observer for lazy loading
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imgObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
});
