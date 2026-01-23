document.addEventListener('DOMContentLoaded', () => {
    const tabBlocks = document.querySelectorAll('[data-tabs]');

    tabBlocks.forEach((block) => {
        const triggers = Array.from(block.querySelectorAll('[data-tab-trigger]'));
        const panels = Array.from(block.querySelectorAll('[data-tab-panel]'));
        const defaultTab = parseInt(block.dataset.defaultTab || '0', 10);

        const setActive = (index) => {
            triggers.forEach((trigger) => {
                const triggerIndex = parseInt(trigger.dataset.tabIndex || '0', 10);
                const isActive = triggerIndex === index;

                trigger.classList.toggle('bg-gray-900', isActive);
                trigger.classList.toggle('text-white', isActive);
                trigger.classList.toggle('bg-gray-100', !isActive);
                trigger.classList.toggle('text-gray-700', !isActive);
            });

            panels.forEach((panel) => {
                const panelIndex = parseInt(panel.dataset.tabIndex || '0', 10);
                const isActive = panelIndex === index;

                if (isActive) {
                    panel.classList.remove('hidden');
                    panel.style.opacity = '0';
                    requestAnimationFrame(() => {
                        panel.style.opacity = '1';
                    });
                } else {
                    panel.style.opacity = '0';
                    panel.classList.add('hidden');
                }
            });
        };

        triggers.forEach((trigger) => {
            trigger.addEventListener('click', () => {
                const index = parseInt(trigger.dataset.tabIndex || '0', 10);
                setActive(index);
            });
        });

        setActive(isNaN(defaultTab) ? 0 : defaultTab);
    });
});
