/**
 * Home Tabs Carousel - Frontend functionality
 * 
 * Features:
 * - Auto-advance tabs every 5 seconds
 * - User interaction lock (disable auto-advance when user clicks a tab)
 * - Accessible tab switching with ARIA updates
 */

document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.home-tabs-carousel');
    
    carousels.forEach(carousel => {
        const blockId = carousel.dataset.blockId;
        const tabs = carousel.querySelectorAll('.home-tab');
        const panels = carousel.querySelectorAll('.home-tab-panel');
        
        let currentIndex = 0;
        let autoAdvanceInterval = null;
        let isUserInteracting = carousel.dataset.isUserInteracting === 'true';
        
        // Get the letters in order
        const tabLetters = Array.from(tabs).map(tab => tab.dataset.tab);
        
        // Set initial active tab based on data attribute
        const initialActiveTab = carousel.dataset.activeTab;
        currentIndex = tabLetters.indexOf(initialActiveTab);
        if (currentIndex === -1) currentIndex = 0;
        
        /**
         * Switch to a specific tab
         */
        function switchTab(index) {
            // Update tabs
            tabs.forEach((tab, i) => {
                const isActive = i === index;
                tab.setAttribute('aria-selected', isActive);
                
                if (isActive) {
                    tab.classList.remove('text-green-300-translucent','border-green-900', 'pb-[16px]', 'border-none');
                    tab.classList.add('text-green-300');
                    tab.classList.add('border-b', 'border-green-300', 'border-b-[9px]');
                } else {
                    tab.classList.add('border-none');
                    tab.classList.remove('border-green-300');
                    tab.classList.add('text-green-300-translucent','border-green-900', 'pb-[16px]');
                    tab.classList.remove('text-green-300');
                }
            });
            
            // First, fade out all panels
            panels.forEach((panel, i) => {
                if (i !== index && !panel.classList.contains('hidden')) {
                    // Fade out current panel
                    panel.style.transition = 'opacity 0.3s ease-out';
                    panel.style.opacity = '0';
                    
                    // Hide after fade out completes
                    setTimeout(() => {
                        panel.classList.add('hidden');
                    }, 300);
                }
            });
            
            // Then, fade in the new panel after fade out completes
            setTimeout(() => {
                const newPanel = panels[index];
                newPanel.classList.remove('hidden');
                newPanel.style.opacity = '0';
                
                // Trigger fade in animation
                requestAnimationFrame(() => {
                    newPanel.style.transition = 'opacity 0.4s ease-in';
                    newPanel.style.opacity = '1';
                });
            }, 300);
            
            currentIndex = index;
        }
        
        /**
         * Auto-advance to next tab
         */
        function autoAdvance() {
            const nextIndex = (currentIndex + 1) % tabs.length;
            switchTab(nextIndex);
        }
        
        /**
         * Start auto-advance
         */
        function startAutoAdvance() {
            if (!isUserInteracting) {
                autoAdvanceInterval = setInterval(autoAdvance, 5000);
            }
        }
        
        /**
         * Stop auto-advance
         */
        function stopAutoAdvance() {
            if (autoAdvanceInterval) {
                clearInterval(autoAdvanceInterval);
                autoAdvanceInterval = null;
            }
        }
        
        /**
         * Handle user tab click
         */
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                // Stop auto-advance permanently when user clicks
                stopAutoAdvance();
                isUserInteracting = true;
                carousel.dataset.isUserInteracting = 'true';
                
                // Switch to clicked tab
                switchTab(index);
            });
            
            // Keyboard navigation support
            tab.addEventListener('keydown', (e) => {
                let newIndex = currentIndex;
                
                switch(e.key) {
                    case 'ArrowRight':
                    case 'ArrowDown':
                        e.preventDefault();
                        newIndex = (currentIndex + 1) % tabs.length;
                        break;
                    case 'ArrowLeft':
                    case 'ArrowUp':
                        e.preventDefault();
                        newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
                        break;
                    case 'Home':
                        e.preventDefault();
                        newIndex = 0;
                        break;
                    case 'End':
                        e.preventDefault();
                        newIndex = tabs.length - 1;
                        break;
                    default:
                        return;
                }
                
                // Stop auto-advance permanently on keyboard interaction
                stopAutoAdvance();
                isUserInteracting = true;
                carousel.dataset.isUserInteracting = 'true';
                
                // Switch tab and focus
                switchTab(newIndex);
                tabs[newIndex].focus();
            });
        });
        
        // Initialize panels with opacity
        panels.forEach((panel, i) => {
            if (i === currentIndex) {
                panel.style.opacity = '1';
            } else {
                panel.style.opacity = '0';
            }
        });
        
        // Initialize - show the correct initial tab
        switchTab(currentIndex);
        
        // Start auto-advance only if user hasn't interacted
        if (!isUserInteracting) {
            startAutoAdvance();
            
            // Pause on hover (only if not user interacting)
            carousel.addEventListener('mouseenter', () => {
                if (!isUserInteracting) {
                    stopAutoAdvance();
                }
            });
            
            carousel.addEventListener('mouseleave', () => {
                if (!isUserInteracting) {
                    startAutoAdvance();
                }
            });
        }
    });
});