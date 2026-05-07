// 3D Parallax System für Baba Ecke
class BabaParallax3D {
    constructor() {
        this.mouseX = 0;
        this.mouseY = 0;
        this.scrollY = 0;
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;
        this.isMobile = window.innerWidth < 768;
        this.particleInterval = null;
        this.init();
    }

    init() {
        console.log('🎬 Baba 3D Parallax wird geladen...');
        
        this.createBackground();
        this.createParallaxContainer();
        this.createFloatingElements();
        this.createParticleSystem();
        this.setupEventListeners();
        this.enhanceMovieCards();
        this.animate();
        
        console.log('✅ Baba 3D Parallax aktiviert!');
        this.showNotification('🎬 3D Parallax aktiviert!');
    }

    createBackground() {
        const animatedBg = document.createElement('div');
        animatedBg.className = 'animated-bg';
        document.body.insertBefore(animatedBg, document.body.firstChild);
    }

    createParallaxContainer() {
        const container = document.createElement('div');
        container.className = 'parallax-3d-container';
        container.id = 'babaParallax3d';
        document.body.appendChild(container);
    }

    createFloatingElements() {
        const container = document.getElementById('babaParallax3d');
        const elementCount = this.isMobile ? 8 : 15;
        
        const elements = [
            { type: 'movie-reel', count: Math.floor(elementCount * 0.4) },
            { type: 'film-strip', count: Math.floor(elementCount * 0.3) },
            { type: 'popcorn', count: Math.floor(elementCount * 0.2) },
            { type: 'camera', count: Math.floor(elementCount * 0.1) }
        ];

        elements.forEach(elementType => {
            for (let i = 0; i < elementType.count; i++) {
                const element = document.createElement('div');
                element.className = `floating-element ${elementType.type}`;
                
                // Random positioning
                element.style.left = Math.random() * 100 + '%';
                element.style.top = Math.random() * 100 + '%';
                element.style.animationDelay = Math.random() * 6 + 's';
                element.style.animationDuration = (4 + Math.random() * 4) + 's';
                
                // Random scale
                const scale = 0.6 + Math.random() * 0.6;
                element.style.transform = `scale(${scale})`;
                element.dataset.scale = scale;
                
                container.appendChild(element);
            }
        });
    }

    createParticleSystem() {
        if (this.isMobile) return; // Skip particles on mobile
        
        const container = document.getElementById('babaParallax3d');
        
        this.particleInterval = setInterval(() => {
            if (document.hidden) return;
            if (document.querySelectorAll('.particle').length < 30) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDuration = (6 + Math.random() * 4) + 's';
                
                container.appendChild(particle);
                
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.remove();
                    }
                }, 10000);
            }
        }, 300);
    }

    setupEventListeners() {
        // Mouse movement tracking
        document.addEventListener('mousemove', (e) => {
            this.mouseX = (e.clientX - this.windowHalfX) / this.windowHalfX;
            this.mouseY = (e.clientY - this.windowHalfY) / this.windowHalfY;
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.windowHalfX = window.innerWidth / 2;
            this.windowHalfY = window.innerHeight / 2;
            this.isMobile = window.innerWidth < 768;
        });

        // Scroll parallax
        window.addEventListener('scroll', () => {
            this.updateScrollParallax();
        });

        // Pause animations when tab is not visible
        document.addEventListener('visibilitychange', () => {
            const container = document.getElementById('babaParallax3d');
            if (container) {
                if (document.hidden) {
                    container.style.animationPlayState = 'paused';
                } else {
                    container.style.animationPlayState = 'running';
                }
            }
        });
    }

    animate() {
        const floatingElements = document.querySelectorAll('.floating-element');
        
        floatingElements.forEach((element, index) => {
            const speed = (index % 3 + 1) * 0.3;
            const rotationSpeed = (index % 2 + 1) * 0.2;
            
            const translateX = this.mouseX * speed * 15;
            const translateY = this.mouseY * speed * 15;
            const rotateX = this.mouseY * rotationSpeed * 8;
            const rotateY = this.mouseX * rotationSpeed * 8;
            const scale = element.dataset.scale || 1;
            const scrollOffset = (Number(element.dataset.scrollOffset) || 0);
            
            element.style.transform = `
                translateX(${translateX}px) 
                translateY(${translateY + scrollOffset}px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
                scale(${scale})
            `;
        });

        requestAnimationFrame(() => this.animate());
    }

    updateScrollParallax() {
        const scrolled = window.pageYOffset;
        const floatingElements = document.querySelectorAll('.floating-element');
        
        floatingElements.forEach((element, index) => {
            const speed = (index % 4 + 1) * 0.1;
            const yPos = scrolled * speed;
            element.dataset.scrollOffset = String(yPos);
        });
    }

    enhanceMovieCards() {
        const movieCards = document.querySelectorAll('.movie-card');
        
        movieCards.forEach((card, index) => {
            // Add special effects to certain movies
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            
            if (title.includes('saw') || title.includes('scream') || title.includes('horror')) {
                card.addEventListener('mouseenter', () => {
                    this.createSparkles(card, '#ff0000');
                });
            }
            
            if (title.includes('sci-fi') || title.includes('alien') || title.includes('space')) {
                card.addEventListener('mouseenter', () => {
                    this.createSparkles(card, '#00ffff');
                });
            }
            // Enhanced hover effect
            card.addEventListener('mousemove', (e) => {
                if (this.isMobile) return;
                
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 8;
                const rotateY = (centerX - x) / 8;
                
                card.style.transform = `
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    translateZ(20px)
                    scale(1.02)
                `;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
            });
        });
    }

    createSparkles(element, color = '#f4c10f') {
        const sparkleCount = this.isMobile ? 3 : 8;
        
        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: ${color};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: sparkleAnim 1.5s ease-out forwards;
                pointer-events: none;
                z-index: 10;
                box-shadow: 0 0 6px ${color};
            `;
            
            element.style.position = 'relative';
            element.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.remove();
                }
            }, 1500);
        }
    }

    showNotification(message, duration = 3000) {
        const notification = document.createElement('div');
        notification.innerHTML = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #f4c10f, #da7f09);
            color: #000;
            padding: 12px 20px;
            border-radius: 25px;
            font-weight: bold;
            z-index: 10000;
            animation: slideInRight 0.5s ease;
            box-shadow: 0 4px 15px rgba(244, 193, 15, 0.3);
        `;
        
        // Add slide animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            @keyframes sparkleAnim {
                0% {
                    transform: scale(0) rotate(0deg);
                    opacity: 1;
                }
                50% {
                    transform: scale(1) rotate(180deg);
                    opacity: 1;
                }
                100% {
                    transform: scale(0) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 500);
        }, duration);
    }

    // Add special section effects
    addSectionEffects() {
        const sections = document.querySelectorAll('.parallax-section, .main-container');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerSectionEffect(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }

    triggerSectionEffect(section) {
        // Check section content for special effects
        const content = section.textContent.toLowerCase();
        
        if (content.includes('saw')) {
            this.createBloodEffect(section);
        } else if (content.includes('scream')) {
            this.createGhostEffect(section);
        } else if (content.includes('watchlist')) {
            this.createHeartEffect(section);
        } else {
            this.createSparkleEffect(section);
        }
    }

    createBloodEffect(section) {
        for (let i = 0; i < 5; i++) {
            const drop = document.createElement('div');
            drop.style.cssText = `
                position: absolute;
                width: 6px;
                height: 10px;
                background: #8B0000;
                border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
                left: ${Math.random() * 100}%;
                top: -10px;
                animation: bloodDrop 2s ease-in forwards;
                pointer-events: none;
                z-index: 5;
            `;
            
            section.style.position = 'relative';
            section.appendChild(drop);
            
            setTimeout(() => {
                if (drop.parentNode) {
                    drop.remove();
                }
            }, 2000);
        }
        
        // Add blood drop animation
        if (!document.querySelector('#bloodDropStyle')) {
            const style = document.createElement('style');
            style.id = 'bloodDropStyle';
            style.textContent = `
                @keyframes bloodDrop {
                    0% { transform: translateY(-10px); opacity: 1; }
                    100% { transform: translateY(200px); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    createGhostEffect(section) {
        const ghost = document.createElement('div');
        ghost.textContent = '👻';
        ghost.style.cssText = `
            position: absolute;
            font-size: 40px;
            right: -50px;
            top: 20%;
            animation: ghostFloat 4s ease-in-out forwards;
            pointer-events: none;
            z-index: 10;
            filter: drop-shadow(0 0 10px rgba(255,255,255,0.5));
        `;
        
        section.style.position = 'relative';
        section.appendChild(ghost);
        
        setTimeout(() => {
            if (ghost.parentNode) {
                ghost.remove();
            }
        }, 4000);
        
        // Add ghost animation
        if (!document.querySelector('#ghostFloatStyle')) {
            const style = document.createElement('style');
            style.id = 'ghostFloatStyle';
            style.textContent = `
                @keyframes ghostFloat {
                    0% { 
                        transform: translateX(0px) translateY(0px); 
                        opacity: 0; 
                    }
                    25% { 
                        transform: translateX(-30px) translateY(-20px); 
                        opacity: 0.8; 
                    }
                    75% { 
                        transform: translateX(-60px) translateY(-10px); 
                        opacity: 0.8; 
                    }
                    100% { 
                        transform: translateX(-100px) translateY(-30px); 
                        opacity: 0; 
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    createHeartEffect(section) {
        const hearts = ['❤️', '💖', '💕', '💗'];
        
        for (let i = 0; i < 6; i++) {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.cssText = `
                position: absolute;
                font-size: 20px;
                left: ${Math.random() * 100}%;
                top: 100%;
                animation: heartFloat 3s ease-out forwards;
                pointer-events: none;
                z-index: 10;
                animation-delay: ${i * 0.2}s;
            `;
            
            section.style.position = 'relative';
            section.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.remove();
                }
            }, 3500);
        }
        
        // Add heart animation
        if (!document.querySelector('#heartFloatStyle')) {
            const style = document.createElement('style');
            style.id = 'heartFloatStyle';
            style.textContent = `
                @keyframes heartFloat {
                    0% {
                        transform: translateY(0px) scale(0);
                        opacity: 0;
                    }
                    25% {
                        transform: translateY(-50px) scale(1);
                        opacity: 1;
                    }
                    75% {
                        transform: translateY(-100px) scale(1.2);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-150px) scale(0);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    createSparkleEffect(section) {
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: #f4c10f;
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: sparkleSection 2s ease-out forwards;
                pointer-events: none;
                z-index: 5;
                box-shadow: 0 0 8px #f4c10f;
                animation-delay: ${i * 0.1}s;
            `;
            
            section.style.position = 'relative';
            section.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.remove();
                }
            }, 2500);
        }
        
        // Add sparkle animation
        if (!document.querySelector('#sparkleSectionStyle')) {
            const style = document.createElement('style');
            style.id = 'sparkleSectionStyle';
            style.textContent = `
                @keyframes sparkleSection {
                    0% {
                        transform: scale(0) rotate(0deg);
                        opacity: 1;
                    }
                    50% {
                        transform: scale(1.5) rotate(180deg);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(0) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Add neon effect to titles
    addNeonEffects() {
        const titles = document.querySelectorAll('h1, h2, .logo');
        
        titles.forEach((title, index) => {
            if (index % 2 === 0) { // Every second title gets neon effect
                title.classList.add('neon-text');
            }
        });
    }

    // Performance monitoring
    monitorPerformance() {
        let frameCount = 0;
        let lastTime = performance.now();
        
        const checkFPS = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                
                if (fps < 30 && !this.isMobile) {
                    console.warn('🐌 Low FPS detected, reducing effects...');
                    this.reducedEffects();
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(checkFPS);
        };
        
        checkFPS();
    }

    reducedEffects() {
        // Remove some particles
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            if (index % 2 === 0) {
                particle.remove();
            }
        });
        
        // Reduce floating elements
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            if (index % 3 === 0) {
                element.style.opacity = '0.05';
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure all other scripts are loaded
    setTimeout(() => {
        const babaParallax = new BabaParallax3D();
        
        // Add section effects after initialization
        setTimeout(() => {
            babaParallax.addSectionEffects();
            babaParallax.addNeonEffects();
            babaParallax.monitorPerformance();
        }, 1000);
        
        // Make it globally available
        window.babaParallax = babaParallax;
        
    }, 500);
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BabaParallax3D;
}
