// Bildoptimierung und Lazy Loading
class ImageOptimizer {
    constructor() {
        this.loadedImages = new Set();
        this.imageQueue = [];
        this.isProcessing = false;
        this.initialized = false;
        
        // Warte auf DOM und initialisiere dann
        this.init();
    }

    init() {
        // Verhindere mehrfache Initialisierung
        if (this.initialized) return;
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupLazyLoading();
                this.optimizeExistingImages();
                this.initialized = true;
            });
        } else {
            // DOM ist bereits geladen
            setTimeout(() => {
                this.setupLazyLoading();
                this.optimizeExistingImages();
                this.initialized = true;
            }, 100);
        }
    }

    // Lazy Loading für neue und bestehende Bilder
    setupLazyLoading() {
        console.log('🖼️ Lazy Loading wird initialisiert...');
        
        // Intersection Observer für bessere Performance
        if ('IntersectionObserver' in window) {
            this.createIntersectionObserver();
        } else {
            console.warn('IntersectionObserver nicht unterstützt, verwende Fallback');
            this.fallbackLazyLoading();
        }

        // Beobachte neue Bilder die dynamisch hinzugefügt werden
        this.observeNewImages();
    }

    createIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '50px 0px', // Bilder 50px vor Sichtbereich laden (reduziert für bessere Performance)
            threshold: 0.1
        };

        this.imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImage(img);
                    this.imageObserver.unobserve(img);
                }
            });
        }, options);

        // Alle Bilder mit data-src beobachten
        this.observeImages();
    }

    observeImages() {
        const lazyImages = document.querySelectorAll('img[data-src]:not(.observed)');
        console.log(`📸 ${lazyImages.length} Bilder für Lazy Loading gefunden`);
        
        lazyImages.forEach(img => {
            img.classList.add('observed');
            this.imageObserver.observe(img);
            
            // Skeleton Loading Effekt hinzufügen
            const movieCard = img.closest('.movie-card');
            if (movieCard) {
                movieCard.classList.add('loading');
            }
        });
    }

    // Neue Bilder beobachten (für dynamisch hinzugefügte Inhalte)
    observeNewImages() {
        const observer = new MutationObserver((mutations) => {
            let hasNewImages = false;
            
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { // Element node
                        const newImages = node.querySelectorAll ? 
                            node.querySelectorAll('img[data-src]:not(.observed)') : [];
                        
                        if (newImages.length > 0) {
                            hasNewImages = true;
                        }
                    }
                });
            });
            
            if (hasNewImages) {
                setTimeout(() => this.observeImages(), 100);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Bild laden mit Optimierungen
    async loadImage(img) {
        if (this.loadedImages.has(img)) return;
        
        const movieCard = img.closest('.movie-card');
        const originalSrc = img.dataset.src;
        
        if (!originalSrc) {
            console.warn('Kein data-src Attribut gefunden:', img);
            return;
        }

        try {
            // Optimierte Bildquelle bestimmen
            const optimizedSrc = await this.getOptimizedImageSrc(originalSrc, img);
            
            // Bild preloaden
            const success = await this.preloadImage(optimizedSrc);
            
            if (success) {
                // Smooth transition
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                img.src = optimizedSrc;
                
                img.onload = () => {
                    img.style.opacity = '1';
                    img.classList.add('loaded');
                    if (movieCard) {
                        movieCard.classList.remove('loading');
                        movieCard.classList.add('loaded');
                    }
                    this.loadedImages.add(img);
                };
                
                img.onerror = () => {
                    this.handleImageError(img, movieCard);
                };
            } else {
                this.handleImageError(img, movieCard);
            }
            
        } catch (error) {
            console.warn('Fehler beim Laden des Bildes:', error);
            this.handleImageError(img, movieCard);
        }
    }

    // Optimierte Bildquelle bestimmen (vereinfacht)
    async getOptimizedImageSrc(originalSrc, img) {
        // Mobile Optimierung
        if (window.innerWidth <= 768) {
            // Für mobile Geräte kleinere Bilder verwenden wenn möglich
            if (originalSrc.includes('s718')) {
                return originalSrc.replace('s718', 's400');
            }
        }

        // Erstmal das Original zurückgeben
        return originalSrc;
    }

    // Bild preloaden
    preloadImage(src) {
        return new Promise((resolve) => {
            const img = new Image();
            
            const timeout = setTimeout(() => {
                resolve(false);
            }, 8000); // 8 Sekunden Timeout
            
            img.onload = () => {
                clearTimeout(timeout);
                resolve(true);
            };
            
            img.onerror = () => {
                clearTimeout(timeout);
                resolve(false);
            };
            
            img.src = src;
        });
    }

    // Fehlerbehandlung
    handleImageError(img, movieCard) {
        console.warn('Bild konnte nicht geladen werden:', img.dataset.src);
        
        // Placeholder SVG
        const placeholder = this.createPlaceholderSVG(
            img.offsetWidth || 200, 
            img.offsetHeight || 300
        );
        
        img.src = placeholder;
        img.classList.add('error');
        img.style.opacity = '1';
        
        if (movieCard) {
            movieCard.classList.remove('loading');
            movieCard.classList.add('error');
        }
    }

    // Placeholder SVG erstellen
    createPlaceholderSVG(width, height) {
        const svg = `
            <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#333"/>
                <text x="50%" y="50%" font-family="Arial" font-size="14" fill="#999" 
                      text-anchor="middle" dy=".3em">Bild nicht verfügbar</text>
            </svg>
        `;
        return 'data:image/svg+xml;base64,' + btoa(svg);
    }

    // Bestehende Bilder optimieren
    optimizeExistingImages() {
        const existingImages = document.querySelectorAll('.movie-card img:not([data-src]):not(.observed)');
        
        existingImages.forEach(img => {
            if (img.src && !img.src.startsWith('data:') && img.src !== 'placeholder') {
                // Bestehende Bilder in lazy loading umwandeln
                img.dataset.src = img.src;
                img.src = this.createPlaceholderSVG(200, 300);
                img.classList.add('observed');
                
                if (this.imageObserver) {
                    this.imageObserver.observe(img);
                }
            }
        });
    }

    // Fallback für ältere Browser
    fallbackLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const loadImagesInViewport = () => {
            lazyImages.forEach(img => {
                if (!img.classList.contains('loaded') && this.isInViewport(img)) {
                    this.loadImage(img);
                }
            });
        };

        // Event Listeners für Scroll und Resize
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    loadImagesInViewport();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });
        
        // Initial load
        loadImagesInViewport();
    }

    // Viewport-Check für Fallback
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.bottom >= 0 &&
            rect.right >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Performance Monitoring
    getPerformanceStats() {
        return {
            loadedImages: this.loadedImages.size,
            observerSupport: 'IntersectionObserver' in window,
            initialized: this.initialized
        };
    }

    // Öffentliche Methode um neue Bilder zu scannen
    scanForNewImages() {
        if (this.initialized && this.imageObserver) {
            this.observeImages();
        }
    }
}

// Auto-Initialisierung
const imageOptimizer = new ImageOptimizer();

// Global verfügbar machen
window.ImageOptimizer = imageOptimizer;
window.imageOptimizer = imageOptimizer;

// Performance Logging
if (window.console && console.log) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            console.log('🚀 Image Optimizer Stats:', imageOptimizer.getPerformanceStats());
        }, 2000);
    });
}
