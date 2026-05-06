// Pop-up Blocker und Seitenschutz
(function() {
    'use strict';

    // Blockiere window.open Pop-ups
    const originalOpen = window.open;
    window.open = function(url, name, specs) {
        console.log('Pop-up blockiert:', url);
        return null;
    };

    // Blockiere neue Fenster/Tabs
    window.addEventListener('beforeunload', function(e) {
        // Verhindere ungewollte Redirects
        return;
    });

    // Blockiere Alert/Confirm Dialoge
    window.alert = function(message) {
        console.log('Alert blockiert:', message);
        return false;
    };

    window.confirm = function(message) {
        console.log('Confirm blockiert:', message);
        return false;
    };

    // Blockiere Focus-Stealing
    let userInteracted = false;
    document.addEventListener('click', () => userInteracted = true);
    document.addEventListener('keydown', () => userInteracted = true);

    const originalFocus = window.focus;
    window.focus = function() {
        if (!userInteracted) {
            console.log('Focus-Stealing blockiert');
            return;
        }
        return originalFocus.call(this);
    };

    // Blockiere automatische Downloads
    const originalClick = HTMLElement.prototype.click;
    HTMLElement.prototype.click = function() {
        if (this.tagName === 'A' && this.hasAttribute('download')) {
            console.log('Automatischer Download blockiert');
            return;
        }
        return originalClick.call(this);
    };

    // Überwache iframe Änderungen
    function monitorIframes() {
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            try {
                iframe.addEventListener('load', function() {
                    try {
                        // Blockiere Pop-ups im iframe
                        if (this.contentWindow) {
                            this.contentWindow.open = function() {
                                console.log('iframe Pop-up blockiert');
                                return null;
                            };
                        }
                    } catch(e) {
                        // Cross-origin iframe - können wir nicht direkt kontrollieren
                        console.log('Cross-origin iframe erkannt');
                    }
                });
            } catch(e) {
                console.log('Iframe monitoring Fehler:', e);
            }
        });
    }

    // Starte iframe Monitoring
    monitorIframes();
    
    // Überwache neue iframes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.tagName === 'IFRAME') {
                    monitorIframes();
                }
            });
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();
