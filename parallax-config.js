// Parallax Configuration für Baba Ecke
const ParallaxConfig = {
    // Performance Levels
    levels: {
        minimal: {
            floatingElements: 5,
            particles: 10,
            animationSpeed: 0.3,
            mouseTracking: false,
            specialEffects: false
        },
        standard: {
            floatingElements: 15,
            particles: 30,
            animationSpeed: 1,
            mouseTracking: true,
            specialEffects: true
        },
        maximum: {
            floatingElements: 25,
            particles: 50,
            animationSpeed: 1.5,
            mouseTracking: true,
            specialEffects: true
        }
    },
    
    // Auto-detect device performance
    detectPerformance() {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        // Mobile check
        if (window.innerWidth < 768) {
            return 'minimal';
        }
        
        // WebGL check
        if (!gl) {
            return 'minimal';
        }
        
        // Memory check
        if (navigator.deviceMemory && navigator.deviceMemory < 4) {
            return 'minimal';
        }
        
        // Hardware concurrency check
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
            return 'standard';
        }
        
        return 'maximum';
    },
    
    // Get current config
    getCurrentConfig() {
        const level = this.detectPerformance();
        console.log(`🎬 Parallax Performance Level: ${level.toUpperCase()}`);
        return this.levels[level];
    }
};

// Make config globally available
window.ParallaxConfig = ParallaxConfig;
