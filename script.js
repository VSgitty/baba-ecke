

document.addEventListener('DOMContentLoaded', () => {
    // Handle series carousel
    const seriesContainer = document.querySelector('.main-container');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn && nextBtn && seriesContainer) {
        nextBtn.addEventListener('click', () => {
            const cardWidth = document.querySelector('.movie-card').offsetWidth;
            seriesContainer.scrollLeft += cardWidth + 30;
        });
        
        prevBtn.addEventListener('click', () => {
            const cardWidth = document.querySelector('.movie-card').offsetWidth;
            seriesContainer.scrollLeft -= cardWidth + 30;
        });
    }

    // Handle films carousel
    const filmsContainer = document.getElementById('filmsContainer');
    const prevBtnFilms = document.getElementById('prevBtnFilms');
    const nextBtnFilms = document.getElementById('nextBtnFilms');
    
    if (prevBtnFilms && nextBtnFilms && filmsContainer) {
        nextBtnFilms.addEventListener('click', () => {
            const cardWidth = document.querySelector('.movie-card').offsetWidth;
            filmsContainer.scrollLeft += cardWidth + 30;
        });
        
        prevBtnFilms.addEventListener('click', () => {
            const cardWidth = document.querySelector('.movie-card').offsetWidth;
            filmsContainer.scrollLeft -= cardWidth + 30;
        });
    }
});


// Enhanced book hover effects with audio feedback
document.addEventListener('DOMContentLoaded', function() {
    const movieCards = document.querySelectorAll('.movie-card');
    
    // Optional: Add subtle sound effects
    const createHoverSound = () => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.01, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    };
    
    movieCards.forEach((card, index) => {
        // Staggered entrance animation
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            // Optional sound effect (uncomment if desired)
            // try { createHoverSound(); } catch(e) {}
            
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'hover-ripple';
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: radial-gradient(circle, rgba(244, 193, 15, 0.3) 0%, transparent 70%);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
                z-index: 1;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
        
        // Smooth exit animation
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
    });
    
    // Add ripple animation keyframes
    const style = document.createElement('style');
    style.textContent = `
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
        
        .hover-ripple {
            animation: rippleEffect 0.6s ease-out;
        }
    `;
    document.head.appendChild(style);
    
    console.log('📚 Book-like hover effects activated!');
});







/* Parallax Cinema Section */
.parallax-cinema-section {
    position: relative;
    height: 100vh;
    min-height: 600px;
    overflow: hidden;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 60px 0;
}

.parallax-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 120%;
    transform-style: preserve-3d;
    perspective: 1000px;
}

.parallax-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.parallax-back {
    transform: translateZ(-100px) scale(1.1);
}

.parallax-mid {
    transform: translateZ(-50px) scale(1.05);
}

.parallax-front {
    transform: translateZ(0);
    z-index: 10;
}

/* Cinema Screen Background */
.cinema-screen {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 60%;
    background: linear-gradient(45deg, #1a1a1a, #2a2a2a);
    border: 8px solid #333;
    border-radius: 20px;
    box-shadow: 
        0 0 50px rgba(244, 193, 15, 0.3),
        inset 0 0 100px rgba(0, 0, 0, 0.8);
    opacity: 0.3;
}

.cinema-screen::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 90%;
    background: radial-gradient(ellipse at center, 
        rgba(244, 193, 15, 0.1) 0%, 
        transparent 70%);
    animation: screenGlow 4s ease-in-out infinite alternate;
}

@keyframes screenGlow {
    0% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
    100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.05); }
}

/* Floating Elements */
.floating-popcorn, .floating-film, .floating-tickets {
    position: absolute;
    font-size: 3rem;
    opacity: 0.6;
    animation: float 6s ease-in-out infinite;
}

.floating-popcorn {
    top: 20%;
    left: 15%;
    animation-delay: 0s;
}

.floating-film {
    top: 30%;
    right: 20%;
    animation-delay: 2s;
}

.floating-tickets {
    bottom: 25%;
    left: 10%;
    animation-delay: 4s;
}

@keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    25% { transform: translateY(-20px) rotate(5deg); }
    50% { transform: translateY(-10px) rotate(-3deg); }
    75% { transform: translateY(-15px) rotate(2deg); }
}

/* Cinema Seats */
.cinema-seats {
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0.4;
}

.seat-row {
    display: flex;
    gap: 10px;
    perspective: 500px;
}

.seat {
    width: 30px;
    height: 35px;
    background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
    border-radius: 8px 8px 15px 15px;
    position: relative;
    transform: rotateX(15deg);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

.seat.occupied {
    background: linear-gradient(145deg, #8b0000, #660000);
    box-shadow: 0 5px 15px rgba(139, 0, 0, 0.3);
}

.seat::before {
    content: '';
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 25px;
    height: 20px;
    background: inherit;
    border-radius: 8px 8px 0 0;
}

/* Main Content */
.parallax-content {
    position: relative;
    z-index: 20;
    text-align: center;
    color: white;
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;
}

.parallax-title {
    font-size: clamp(2.5rem, 8vw, 6rem);
    font-weight: 900;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 3px;
}

/* Glitch Text Effect */
.glitch-text {
    position: relative;
    display: inline-block;
    color: #f4c10f;
    text-shadow: 
        0 0 10px rgba(244, 193, 15, 0.8),
        0 0 20px rgba(244, 193, 15, 0.6),
        0 0 30px rgba(244, 193, 15, 0.4);
}

.glitch-text::before,
.glitch-text::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.glitch-text::before {
    animation: glitch-1 2s infinite;
    color: #ff0040;
    z-index: -1;
}

.glitch-text::after {
    animation: glitch-2 2s infinite;
    color: #00ffff;
    z-index: -2;
}

@keyframes glitch-1 {
    0%, 14%, 15%, 49%, 50%, 99%, 100% {
        transform: translate(0);
    }
    15%, 49% {
        transform: translate(-2px, 2px);
    }
}

@keyframes glitch-2 {
    0%, 20%, 21%, 62%, 63%, 99%, 100% {
        transform: translate(0);
    }
    21%, 62% {
        transform: translate(2px, -2px);
    }
}

.parallax-subtitle {
    font-size: 1.5rem;
    margin-bottom: 40px;
    opacity: 0.9;
    color: #da7f09;
}

/* Statistics */
.parallax-stats {
    display: flex;
    justify-content: center;
    gap: 60px;
    margin: 50px 0;
    flex-wrap: wrap;
}

.stat-item {
    text-align: center;
    min-width: 120px;
}

.stat-number {
    display: block;
    font-size: 3rem;
    font-weight: 900;
    color: #f4c10f;
    text-shadow: 0 0 20px rgba(244, 193, 15, 0.5);
    margin-bottom: 10px;
}

.stat-label {
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    opacity: 0.8;
}

/* Buttons */
.parallax-buttons {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 40px;
}

.parallax-btn {
    padding: 15px 30px;
    border: none;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    min-width: 200px;
    justify-content: center;
}

.parallax-btn.primary {
    background: linear-gradient(135deg, #f4c10f 0%, #da7f09 100%);
    color: #000;
    box-shadow: 0 8px 25px rgba(244, 193, 15, 0.3);
}

.parallax-btn.primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(244, 193, 15, 0.5);
    background: linear-gradient(135deg, #ffcd1f 0%, #ea8f19 100%);
}

.parallax-btn.secondary {
    background: transparent;
    color: #f4c10f;
    border: 2px solid #f4c10f;
    box-shadow: 0 8px 25px rgba(244, 193, 15, 0.1);
}

.parallax-btn.secondary:hover {
    background: rgba(244, 193, 15, 0.1);
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(244, 193, 15, 0.3);
}

/* Animated Particles */
.parallax-particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 5;
}

.particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: #f4c10f;
    border-radius: 50%;
    opacity: 0.6;
    animation: particleFloat 8s linear infinite;
}

.particle:nth-child(1) {
    left: 10%;
    animation-delay: 0s;
    animation-duration: 8s;
}

.particle:nth-child(2) {
    left: 30%;
    animation-delay: 2s;
    animation-duration: 10s;
}

.particle:nth-child(3) {
    left: 50%;
    animation-delay: 4s;
    animation-duration: 12s;
}

.particle:nth-child(4) {
    left: 70%;
    animation-delay: 6s;
    animation-duration: 9s;
}

.particle:nth-child(5) {
    left: 90%;
    animation-delay: 1s;
    animation-duration: 11s;
}

@keyframes particleFloat {
    0% {
        transform: translateY(100vh) rotate(0deg);
        opacity: 0;
    }
    10% {
        opacity: 0.6;
    }
    90% {
        opacity: 0.6;
    }
    100% {
        transform: translateY(-100px) rotate(360deg);
        opacity: 0;
    }
}

/* Responsive Design - Fortsetzung */
@media (max-width: 768px) {
    .parallax-cinema-section {
        height: 80vh;
        min-height: 500px;
    }
    
    .parallax-stats {
        gap: 30px;
    }
    
    .stat-number {
        font-size: 2rem;
    }
    
    .parallax-buttons {
        flex-direction: column;
        align-items: center;
    }
    
    .parallax-btn {
        min-width: 250px;
    }
    
    .floating-popcorn, .floating-film, .floating-tickets {
        font-size: 2rem;
    }
    
    .cinema-screen {
        width: 90%;
        height: 50%;
    }
    
    .seat-row {
        gap: 5px;
    }
    
    .seat {
        width: 20px;
        height: 25px;
    }
}

@media (max-width: 480px) {
    .parallax-title {
        font-size: 2rem;
    }
    
    .parallax-subtitle {
        font-size: 1.2rem;
    }
    
    .parallax-stats {
        gap: 20px;
    }
    
    .stat-item {
        min-width: 80px;
    }
    
    .stat-number {
        font-size: 1.5rem;
    }
    
    .stat-label {
        font-size: 0.9rem;
    }
}

/* Scroll-triggered animations */
.parallax-cinema-section.in-view .parallax-title {
    animation: slideInUp 1s ease-out;
}

.parallax-cinema-section.in-view .parallax-subtitle {
    animation: slideInUp 1s ease-out 0.2s both;
}

.parallax-cinema-section.in-view .parallax-stats {
    animation: slideInUp 1s ease-out 0.4s both;
}

.parallax-cinema-section.in-view .parallax-buttons {
    animation: slideInUp 1s ease-out 0.6s both;
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(50px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Enhanced Parallax Effect on Scroll */
.parallax-cinema-section.scrolling .parallax-back {
    transform: translateZ(-100px) scale(1.1) translateY(var(--scroll-speed-slow));
}

.parallax-cinema-section.scrolling .parallax-mid {
    transform: translateZ(-50px) scale(1.05) translateY(var(--scroll-speed-medium));
}

.parallax-cinema-section.scrolling .parallax-front {
    transform: translateZ(0) translateY(var(--scroll-speed-fast));
}






// Parallax Cinema Section Effects
document.addEventListener('DOMContentLoaded', function() {
    const parallaxSection = document.querySelector('.parallax-cinema-section');
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (!parallaxSection) return;
    
    console.log('🎬 Parallax Cinema Section wird initialisiert...');
    
    // Intersection Observer für Scroll-Animationen
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const parallaxObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                animateStatNumbers();
            }
        });
    }, observerOptions);
    
    parallaxObserver.observe(parallaxSection);
    
    // Parallax Scroll Effect
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rect = parallaxSection.getBoundingClientRect();
        const speed = scrolled * 0.5;
        
        if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
            parallaxSection.classList.add('scrolling');
            
            // Set CSS custom properties for different scroll speeds
            parallaxSection.style.setProperty('--scroll-speed-slow', `${speed * 0.2}px`);
            parallaxSection.style.setProperty('--scroll-speed-medium', `${speed * 0.5}px`);
            parallaxSection.style.setProperty('--scroll-speed-fast', `${speed * 0.8}px`);
            
            // Individual layer transforms
            parallaxLayers.forEach((layer, index) => {
                const layerSpeed = (index + 1) * 0.3;
                layer.style.transform = `translateY(${speed * layerSpeed}px)`;
            });
        } else {
            parallaxSection.classList.remove('scrolling');
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Animate Statistics Numbers
    function animateStatNumbers() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.count);
            const duration = 2000;
            const start = performance.now();
            
            function updateNumber(currentTime) {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(target * easeOutQuart);
                
                stat.textContent = current.toLocaleString();
                
                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                } else {
                    stat.textContent = target.toLocaleString();
                }
            }
            
            requestAnimationFrame(updateNumber);
        });
    }
    
    // Enhanced Glitch Effect
    function enhanceGlitchEffect() {
        const glitchText = document.querySelector('.glitch-text');
        if (!glitchText) return;
        
        setInterval(() => {
            if (Math.random() > 0.95) {
                glitchText.style.animation = 'none';
                glitchText.offsetHeight; // Trigger reflow
                glitchText.style.animation = null;
            }
        }, 100);
    }
    
    enhanceGlitchEffect();
    
    // Particle System Enhancement
    function createExtraParticles() {
        const particleContainer = document.querySelector('.parallax-particles');
        if (!particleContainer) return;
        
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle extra-particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (8 + Math.random() * 4) + 's';
            particle.style.opacity = 0.3 + Math.random() * 0.3;
            
            // Random colors
            const colors = ['#f4c10f', '#da7f09', '#ff6b6b', '#4ecdc4', '#45b7d1'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            particleContainer.appendChild(particle);
        }
    }
    
    createExtraParticles();
    
    // Mouse Movement Parallax
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    });
    
    function updateMouseParallax() {
        const floatingElements = document.querySelectorAll('.floating-popcorn, .floating-film, .floating-tickets');
        
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.02;
            const x = mouseX * speed * 20;
            const y = mouseY * speed * 20;
            
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        requestAnimationFrame(updateMouseParallax);
    }
    
    updateMouseParallax();
    
    // Cinema Screen Interactive Effect
    const cinemaScreen = document.querySelector('.cinema-screen');
    if (cinemaScreen) {
        cinemaScreen.addEventListener('click', function() {
            this.style.animation = 'screenFlicker 0.5s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    }
    
    // Add screen flicker animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes screenFlicker {
            0%, 100% { opacity: 0.3; }
            10% { opacity: 0.8; }
            20% { opacity: 0.2; }
            30% { opacity: 0.9; }
            40% { opacity: 0.1; }
            50% { opacity: 1; }
            60% { opacity: 0.3; }
            70% { opacity: 0.7; }
            80% { opacity: 0.4; }
            90% { opacity: 0.8; }
        }
        
        .extra-particle {
            width: 2px;
            height: 2px;
            border-radius: 50%;
            box-shadow: 0 0 6px currentColor;
        }
    `;
    document.head.appendChild(style);
    
    console.log('✅ Parallax Cinema Section erfolgreich initialisiert!');
});

// Performance optimization for mobile
if (window.innerWidth <= 768) {
    // Reduce particle count on mobile
    const particles = document.querySelectorAll('.extra-particle');
    particles.forEach((particle, index) => {
        if (index > 5) particle.remove();
    });
    
    // Disable mouse parallax on mobile
    document.addEventListener('touchstart', () => {
        const floatingElements = document.querySelectorAll('.floating-popcorn, .floating-film, .floating-tickets');
        floatingElements.forEach(element => {
            element.style.transform = 'none';
        });
    });
}


    // Enhanced book hover effects with audio feedback
document.addEventListener('DOMContentLoaded', function() {
    const movieCards = document.querySelectorAll('.movie-card');
    
    // Optional: Add subtle sound effects
    const createHoverSound = () => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.01, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    };
    
    movieCards.forEach((card, index) => {
        // Staggered entrance animation
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            // Optional sound effect (uncomment if desired)
            // try { createHoverSound(); } catch(e) {}
            
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'hover-ripple';
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: radial-gradient(circle, rgba(244, 193, 15, 0.3) 0%, transparent 70%);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
                z-index: 1;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
        
        // Smooth exit animation
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
    });
    
    // Add ripple animation keyframes
    const style = document.createElement('style');
    style.textContent = `
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
        
        .hover-ripple {
            animation: rippleEffect 0.6s ease-out;
        }
    `;
    document.head.appendChild(style);
    
    console.log('📚 Book-like hover effects activated!');
});




// Parallax Cinema Section Effects
document.addEventListener('DOMContentLoaded', function() {
    const parallaxSection = document.querySelector('.parallax-cinema-section');
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (!parallaxSection) return;
    
    console.log('🎬 Parallax Cinema Section wird initialisiert...');
    
    // Intersection Observer für Scroll-Animationen
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const parallaxObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                animateStatNumbers();
            }
        });
    }, observerOptions);
    
    parallaxObserver.observe(parallaxSection);
    
    // Parallax Scroll Effect
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rect = parallaxSection.getBoundingClientRect();
        const speed = scrolled * 0.5;
        
        if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
            parallaxSection.classList.add('scrolling');
            
            // Set CSS custom properties for different scroll speeds
            parallaxSection.style.setProperty('--scroll-speed-slow', `${speed * 0.2}px`);
            parallaxSection.style.setProperty('--scroll-speed-medium', `${speed * 0.5}px`);
            parallaxSection.style.setProperty('--scroll-speed-fast', `${speed * 0.8}px`);
            
            // Individual layer transforms
            parallaxLayers.forEach((layer, index) => {
                const layerSpeed = (index + 1) * 0.3;
                layer.style.transform = `translateY(${speed * layerSpeed}px)`;
            });
        } else {
            parallaxSection.classList.remove('scrolling');
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Animate Statistics Numbers
    function animateStatNumbers() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.count);
            const duration = 2000;
            const start = performance.now();
            
            function updateNumber(currentTime) {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(target * easeOutQuart);
                
                stat.textContent = current.toLocaleString();
                
                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                } else {
                    stat.textContent = target.toLocaleString();
                }
            }
            
            requestAnimationFrame(updateNumber);
        });
    }
    
    // Enhanced Glitch Effect
    function enhanceGlitchEffect() {
        const glitchText = document.querySelector('.glitch-text');
        if (!glitchText) return;
        
        setInterval(() => {
            if (Math.random() > 0.95) {
                glitchText.style.animation = 'none';
                glitchText.offsetHeight; // Trigger reflow
                glitchText.style.animation = null;
            }
        }, 100);
    }
    
    enhanceGlitchEffect();
    
    // Particle System Enhancement
    function createExtraParticles() {
        const particleContainer = document.querySelector('.parallax-particles');
        if (!particleContainer) return;
        
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle extra-particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (8 + Math.random() * 4) + 's';
            particle.style.opacity = 0.3 + Math.random() * 0.3;
            
            // Random colors
            const colors = ['#f4c10f', '#da7f09', '#ff6b6b', '#4ecdc4', '#45b7d1'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            particleContainer.appendChild(particle);
        }
    }
    
    createExtraParticles();
    
    // Mouse Movement Parallax
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    });
    
    function updateMouseParallax() {
        const floatingElements = document.querySelectorAll('.floating-popcorn, .floating-film, .floating-tickets');
        
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.02;
            const x = mouseX * speed * 20;
            const y = mouseY * speed * 20;
            
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        requestAnimationFrame(updateMouseParallax);
    }
    
    updateMouseParallax();
    
    // Cinema Screen Interactive Effect
    const cinemaScreen = document.querySelector('.cinema-screen');
    if (cinemaScreen) {
        cinemaScreen.addEventListener('click', function() {
            this.style.animation = 'screenFlicker 0.5s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    }
    
    // Add screen flicker animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes screenFlicker {
            0%, 100% { opacity: 0.3; }
            10% { opacity: 0.8; }
            20% { opacity: 0.2; }
            30% { opacity: 0.9; }
            40% { opacity: 0.1; }
            50% { opacity: 1; }
            60% { opacity: 0.3; }
            70% { opacity: 0.7; }
            80% { opacity: 0.4; }
            90% { opacity: 0.8; }
        }
        
        .extra-particle {
            width: 2px;
            height: 2px;
            border-radius: 50%;
            box-shadow: 0 0 6px currentColor;
        }
    `;
    document.head.appendChild(style);
    
    console.log('✅ Parallax Cinema Section erfolgreich initialisiert!');
});

// Performance optimization for mobile
if (window.innerWidth <= 768) {
    // Reduce particle count on mobile
    const particles = document.querySelectorAll('.extra-particle');
    particles.forEach((particle, index) => {
        if (index > 5) particle.remove();
    });
    
    // Disable mouse parallax on mobile
    document.addEventListener('touchstart', () => {
        const floatingElements = document.querySelectorAll('.floating-popcorn, .floating-film, .floating-tickets');
        floatingElements.forEach(element => {
            element.style.transform = 'none';
        });
    });
}
