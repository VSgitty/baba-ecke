// Drag and Drop Functionality for Movie Cards
class MovieDragDrop {
    constructor() {
        this.draggedElement = null;
        this.placeholder = null;
        this.init();
    }

    init() {
        this.createPlaceholder();
        this.attachEventListeners();
        console.log('🎬 Drag & Drop für Movie Cards aktiviert!');
    }

    createPlaceholder() {
        this.placeholder = document.createElement('div');
        this.placeholder.className = 'movie-card-placeholder';
        this.placeholder.innerHTML = `
            <div class="placeholder-content">
                <div class="placeholder-icon">📦</div>
                <p>Hier ablegen</p>
            </div>
        `;
    }

    attachEventListeners() {
        // Warte bis DOM geladen ist
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.makeMovieCardsDraggable();
                this.restoreAllOrders();
            });
        } else {
            this.makeMovieCardsDraggable();
            this.restoreAllOrders();
        }

        // Re-attach listeners when new cards are added
        const observer = new MutationObserver(() => {
            this.makeMovieCardsDraggable();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    makeMovieCardsDraggable() {
        const movieCards = document.querySelectorAll('.movie-card');
        
        movieCards.forEach(card => {
            if (card.draggable) return; // Already made draggable
            
            card.draggable = true;
            card.style.cursor = 'grab';
            
            // Remove existing listeners to prevent duplicates
            this.removeEventListeners(card);
            
            // Add event listeners
            card.addEventListener('dragstart', this.handleDragStart.bind(this));
            card.addEventListener('dragend', this.handleDragEnd.bind(this));
            card.addEventListener('dragover', this.handleDragOver.bind(this));
            card.addEventListener('drop', this.handleDrop.bind(this));
            card.addEventListener('dragenter', this.handleDragEnter.bind(this));
            card.addEventListener('dragleave', this.handleDragLeave.bind(this));

            // Touch events for mobile
            card.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
            card.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
            card.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: false });
        });
        
        console.log(`🎬 ${movieCards.length} Movie Cards als draggable markiert`);
    }

    removeEventListeners(card) {
        const events = ['dragstart', 'dragend', 'dragover', 'drop', 'dragenter', 'dragleave', 'touchstart', 'touchmove', 'touchend'];
        events.forEach(event => {
            card.removeEventListener(event, this[`handle${event.charAt(0).toUpperCase() + event.slice(1)}`]);
        });
    }

    handleDragStart(e) {
        this.draggedElement = e.target.closest('.movie-card');
        if (!this.draggedElement) return;
        
        this.draggedElement.style.opacity = '0.5';
        this.draggedElement.style.cursor = 'grabbing';
        
        // Add dragging class for visual feedback
        this.draggedElement.classList.add('dragging');
        
        // Set drag data
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.draggedElement.outerHTML);
        
        // Store original position for undo
        const container = this.draggedElement.parentNode;
        this.originalPosition = Array.from(container.children).indexOf(this.draggedElement);
        this.originalContainer = container;
        
        console.log('🎬 Drag gestartet:', this.draggedElement.querySelector('h3')?.textContent);
    }

    handleDragEnd(e) {
        if (this.draggedElement) {
            this.draggedElement.style.opacity = '1';
            this.draggedElement.style.cursor = 'grab';
            this.draggedElement.classList.remove('dragging');
        }
        
        // Remove all placeholders
        document.querySelectorAll('.movie-card-placeholder').forEach(p => p.remove());
        
        // Remove drag-over classes
        document.querySelectorAll('.drag-over').forEach(el => {
            el.classList.remove('drag-over');
        });
        
        this.draggedElement = null;
        console.log('🎬 Drag beendet');
    }

    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        
        const card = e.target.closest('.movie-card');
        if (card && card !== this.draggedElement) {
            this.showDropZone(card, e);
        }
    }

    handleDragEnter(e) {
        e.preventDefault();
        const card = e.target.closest('.movie-card');
        if (card && card !== this.draggedElement) {
            card.classList.add('drag-over');
        }
    }

    handleDragLeave(e) {
        const card = e.target.closest('.movie-card');
        if (card && !card.contains(e.relatedTarget)) {
            card.classList.remove('drag-over');
        }
    }

    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const dropTarget = e.target.closest('.movie-card');
        if (!dropTarget || dropTarget === this.draggedElement) {
            console.log('❌ Ungültiges Drop-Ziel');
            return;
        }
        
        const container = dropTarget.parentNode;
        
        // Stelle sicher, dass beide Elemente im gleichen Container sind
        if (container !== this.draggedElement.parentNode) {
            console.log('❌ Verschiedene Container - Drop nicht erlaubt');
            return;
        }
        
        // Determine drop position based on mouse position
        const rect = dropTarget.getBoundingClientRect();
        const isAfter = this.isDropAfter(e, rect);
        
        console.log('🎬 Dropping', this.draggedElement.querySelector('h3')?.textContent, isAfter ? 'after' : 'before', dropTarget.querySelector('h3')?.textContent);
        
        // Move the element
        if (isAfter) {
            // Insert after the target
            if (dropTarget.nextSibling) {
                container.insertBefore(this.draggedElement, dropTarget.nextSibling);
            } else {
                container.appendChild(this.draggedElement);
            }
        } else {
            // Insert before the target
            container.insertBefore(this.draggedElement, dropTarget);
        }
        
        // Clean up
        dropTarget.classList.remove('drag-over');
        document.querySelectorAll('.movie-card-placeholder').forEach(p => p.remove());
        
        // Save new order immediately
        this.saveOrder(container);
        
        // Show success feedback
        this.showSuccessFeedback();
        
        console.log('🎬 Film erfolgreich verschoben:', this.draggedElement.querySelector('h3')?.textContent);
    }

    showDropZone(targetCard, e) {
        // Remove existing placeholders
        document.querySelectorAll('.movie-card-placeholder').forEach(p => p.remove());
        
        const rect = targetCard.getBoundingClientRect();
        const isAfter = this.isDropAfter(e, rect);
        
        const placeholder = this.placeholder.cloneNode(true);
        
        if (isAfter) {
            if (targetCard.nextSibling) {
                targetCard.parentNode.insertBefore(placeholder, targetCard.nextSibling);
            } else {
                targetCard.parentNode.appendChild(placeholder);
            }
        } else {
            targetCard.parentNode.insertBefore(placeholder, targetCard);
        }
    }

    isDropAfter(e, rect) {
        // Check if we're in a grid layout
        const container = e.target.closest('.main-container');
        const computedStyle = window.getComputedStyle(container);
        const isGrid = computedStyle.display === 'grid' || computedStyle.display === 'flex';
        
        if (isGrid) {
            // For grid/flex layouts, check both X and Y position
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // If mouse is in the right half or bottom half
            return e.clientX > centerX || e.clientY > centerY;
        } else {
            // For vertical layouts, only check Y position
            return e.clientY > rect.top + rect.height / 2;
        }
    }

    saveOrder(container) {
        const containerId = this.getContainerId(container);
        const movieCards = container.querySelectorAll('.movie-card');
        const order = [];
        
        movieCards.forEach((card, index) => {
            const title = card.querySelector('h3')?.textContent || '';
            const movieId = this.extractMovieId(card);
            const imgSrc = card.querySelector('img')?.src || '';
            
            order.push({
                index: index,
                title: title,
                movieId: movieId,
                imgSrc: imgSrc,
                html: card.outerHTML
            });
        });
        
        // Save to localStorage
        const storageKey = `movieOrder_${containerId}`;
        localStorage.setItem(storageKey, JSON.stringify(order));
        console.log(`💾 Reihenfolge gespeichert für ${containerId}:`, order.length, 'Filme');
        console.log('💾 Storage Key:', storageKey);
        console.log('💾 Saved Order:', order.map(item => item.title));
        
        return true;
    }

    getContainerId(container) {
        // Versuche verschiedene Methoden, um eine eindeutige ID zu finden
        if (container.id) {
            return container.id;
        }
        
        // Schaue nach parent mit ID
        let parent = container.parentNode;
        while (parent && parent !== document.body) {
            if (parent.id) {
                return parent.id + '_container';
            }
            parent = parent.parentNode;
        }
        
        // Schaue nach section headers
        const sectionHeader = container.closest('.section-header');
        if (sectionHeader) {
            const headerText = sectionHeader.querySelector('h2')?.textContent || '';
            if (headerText.includes('Filme')) return 'filmsContainer';
            if (headerText.includes('Watchlist')) return 'watchlistContainer';
            if (headerText.includes('Serie')) return 'moviesContainer';
        }
        
        // Fallback basierend auf Position
        const allContainers = document.querySelectorAll('.main-container');
        const containerIndex = Array.from(allContainers).indexOf(container);
        return `container_${containerIndex}`;
    }

    loadOrder(containerId) {
        const storageKey = `movieOrder_${containerId}`;
        const savedOrder = localStorage.getItem(storageKey);
        
        console.log(`📂 Versuche Reihenfolge zu laden für: ${containerId}`);
        console.log(`📂 Storage Key: ${storageKey}`);
        
        if (!savedOrder) {
            console.log(`📂 Keine gespeicherte Reihenfolge gefunden für ${containerId}`);
            return false;
        }
        
        try {
            const order = JSON.parse(savedOrder);
            console.log(`📂 Gefundene Reihenfolge:`, order.map(item => item.title));
            
            const container = this.findContainer(containerId);
            if (!container) {
                console.log(`❌ Container nicht gefunden: ${containerId}`);
                return false;
            }
            
            const existingCards = Array.from(container.querySelectorAll('.movie-card'));
            console.log(`📂 Existierende Karten:`, existingCards.map(card => card.querySelector('h3')?.textContent));
            
            const sortedCards = [];
            
            // Sortiere existierende Karten nach gespeicherter Reihenfolge
            order.forEach(orderItem => {
                const matchingCard = existingCards.find(card => {
                    const title = card.querySelector('h3')?.textContent || '';
                    const movieId = this.extractMovieId(card);
                    return title === orderItem.title || movieId === orderItem.movieId;
                });
                
                if (matchingCard) {
                    sortedCards.push(matchingCard);
                }
            });
            
            // Füge Karten hinzu, die nicht in der gespeicherten Reihenfolge waren
            existingCards.forEach(card => {
                if (!sortedCards.includes(card)) {
                    sortedCards.push(card);
                }
            });
            
            // Reorder DOM elements
            sortedCards.forEach(card => {
                container.appendChild(card);
            });
            
            console.log(`✅ Reihenfolge erfolgreich geladen für ${containerId}:`, sortedCards.length, 'Filme');
            return true;
        } catch (error) {
            console.error('❌ Fehler beim Laden der Reihenfolge:', error);
            return false;
        }
    }

    findContainer(containerId) {
        // Direkte ID-Suche
        let container = document.getElementById(containerId);
        if (container) return container;
        
        // Suche nach Container mit ähnlicher ID
        const containers = document.querySelectorAll('.main-container');
        for (let cont of containers) {
            const id = this.getContainerId(cont);
            if (id === containerId) {
                return cont;
            }
        }
        
        return null;
    }

    extractMovieId(card) {
        const onclickAttr = card.getAttribute('onclick');
        if (onclickAttr) {
            const match = onclickAttr.match(/openMovie\(['"]([^'"]+)['"]\)/);
            return match ? match[1] : null;
        }
        
        // Fallback: verwende Titel als ID
        const title = card.querySelector('h3')?.textContent || '';
        return title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    }

        showSuccessFeedback() {
        // Create success notification
        const notification = document.createElement('div');
        notification.className = 'drag-success-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">✅</span>
                <span class="notification-text">Film verschoben!</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 2000);
    }

    // Touch events for mobile support
    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
        this.touchCard = e.target.closest('.movie-card');
        
        // Add long press detection
        this.longPressTimer = setTimeout(() => {
            if (this.touchCard) {
                this.touchCard.classList.add('touch-dragging');
                this.touchCard.style.transform = 'scale(1.05)';
                this.touchCard.style.zIndex = '1000';
                navigator.vibrate && navigator.vibrate(50); // Haptic feedback
            }
        }, 500);
    }

    handleTouchMove(e) {
        if (this.longPressTimer) {
            clearTimeout(this.longPressTimer);
        }
        
        if (this.touchCard && this.touchCard.classList.contains('touch-dragging')) {
            e.preventDefault();
            
            const touch = e.touches[0];
            const deltaX = touch.clientX - this.touchStartX;
            const deltaY = touch.clientY - this.touchStartY;
            
            this.touchCard.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.05)`;
            
            // Find element under touch
            const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
            const targetCard = elementBelow?.closest('.movie-card');
            
            if (targetCard && targetCard !== this.touchCard) {
                targetCard.classList.add('touch-drop-target');
            }
            
            // Remove highlight from other cards
            document.querySelectorAll('.movie-card').forEach(card => {
                if (card !== targetCard && card !== this.touchCard) {
                    card.classList.remove('touch-drop-target');
                }
            });
        }
    }

    handleTouchEnd(e) {
        if (this.longPressTimer) {
            clearTimeout(this.longPressTimer);
        }
        
        if (this.touchCard && this.touchCard.classList.contains('touch-dragging')) {
            const touch = e.changedTouches[0];
            const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
            const targetCard = elementBelow?.closest('.movie-card');
            
            if (targetCard && targetCard !== this.touchCard) {
                // Perform the move
                const container = targetCard.parentNode;
                
                // Determine position
                const rect = targetCard.getBoundingClientRect();
                const isAfter = touch.clientY > rect.top + rect.height / 2;
                
                if (isAfter) {
                    if (targetCard.nextSibling) {
                        container.insertBefore(this.touchCard, targetCard.nextSibling);
                    } else {
                        container.appendChild(this.touchCard);
                    }
                } else {
                    container.insertBefore(this.touchCard, targetCard);
                }
                
                this.saveOrder(container);
                this.showSuccessFeedback();
            }
            
            // Clean up
            this.touchCard.style.transform = '';
            this.touchCard.style.zIndex = '';
            this.touchCard.classList.remove('touch-dragging');
            
            document.querySelectorAll('.touch-drop-target').forEach(card => {
                card.classList.remove('touch-drop-target');
            });
        }
        
        this.touchCard = null;
    }

    // Public method to restore saved orders on page load
    restoreAllOrders() {
        console.log('🔄 Starte Wiederherstellung aller gespeicherten Reihenfolgen...');
        
        const containers = document.querySelectorAll('.main-container');
        let restoredCount = 0;
        
        containers.forEach(container => {
            const containerId = this.getContainerId(container);
            console.log(`🔄 Versuche Wiederherstellung für Container: ${containerId}`);
            
            if (this.loadOrder(containerId)) {
                restoredCount++;
                console.log(`✅ Erfolgreich wiederhergestellt: ${containerId}`);
            } else {
                console.log(`⚠️ Keine Daten gefunden für: ${containerId}`);
            }
        });
        
        console.log(`🔄 Wiederherstellung abgeschlossen: ${restoredCount}/${containers.length} Container`);
        
        // Debug: Zeige alle gespeicherten Keys
        console.log('💾 Alle localStorage Keys:', Object.keys(localStorage).filter(key => key.startsWith('movieOrder_')));
    }

    // Debug method to clear all saved orders
    clearAllOrders() {
        const keys = Object.keys(localStorage).filter(key => key.startsWith('movieOrder_'));
        keys.forEach(key => localStorage.removeItem(key));
        console.log(`🗑️ ${keys.length} gespeicherte Reihenfolgen gelöscht`);
        location.reload();
    }

    // Debug method to show current order
    debugCurrentOrder(containerId) {
        const container = this.findContainer(containerId);
        if (container) {
            const cards = container.querySelectorAll('.movie-card');
            const currentOrder = Array.from(cards).map(card => card.querySelector('h3')?.textContent);
            console.log(`🔍 Aktuelle Reihenfolge für ${containerId}:`, currentOrder);
            return currentOrder;
        }
        return null;
    }
}

// Initialize drag and drop
const movieDragDrop = new MovieDragDrop();

// Expose for debugging
window.movieDragDrop = movieDragDrop;

// Debug functions
window.debugDragDrop = {
    clearAll: () => movieDragDrop.clearAllOrders(),
    restore: () => movieDragDrop.restoreAllOrders(),
    showOrder: (id) => movieDragDrop.debugCurrentOrder(id),
    showStorage: () => {
        const keys = Object.keys(localStorage).filter(key => key.startsWith('movieOrder_'));
        keys.forEach(key => {
            console.log(`${key}:`, JSON.parse(localStorage.getItem(key)).map(item => item.title));
        });
    }
};

// Restore saved orders when page loads with delay to ensure DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎬 DOM Content Loaded - Starte Drag & Drop Initialisierung');
    
    // Multiple attempts to restore order as DOM might still be loading
    setTimeout(() => movieDragDrop.restoreAllOrders(), 500);
    setTimeout(() => movieDragDrop.restoreAllOrders(), 1500);
    setTimeout(() => movieDragDrop.restoreAllOrders(), 3000);
});

// Also try when window is fully loaded
window.addEventListener('load', () => {
    console.log('🎬 Window Loaded - Finale Wiederherstellung');
    setTimeout(() => movieDragDrop.restoreAllOrders(), 1000);
});







        