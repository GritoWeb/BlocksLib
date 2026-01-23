document.addEventListener('DOMContentLoaded', () => {
    const accordions = document.querySelectorAll('[data-faq-accordion]');

    accordions.forEach((accordion) => {
        const allowMultiple = accordion.dataset.allowMultiple === 'true';
        const openFirst = accordion.dataset.openFirst === 'true';
        const items = Array.from(accordion.querySelectorAll('[data-accordion-item]'));

        const setItemState = (item, open) => {
            const panel = item.querySelector('[data-accordion-panel]');
            const vertical = item.querySelector('[data-accordion-vertical]');
            const trigger = item.querySelector('[data-accordion-trigger]');

            item.dataset.open = open ? 'true' : 'false';

            if (panel) {
                panel.style.maxHeight = open ? `${panel.scrollHeight}px` : '0px';
                panel.style.opacity = open ? '1' : '0';
                panel.setAttribute('aria-hidden', open ? 'false' : 'true');
            }

            if (vertical) {
                vertical.style.transform = open ? 'scaleY(0)' : 'scaleY(1)';
            }

            if (trigger) {
                trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
            }
        };

        items.forEach((item, index) => {
            const panel = item.querySelector('[data-accordion-panel]');
            const vertical = item.querySelector('[data-accordion-vertical]');
            const horizontal = item.querySelector('[data-accordion-horizontal]');
            const trigger = item.querySelector('[data-accordion-trigger]');

            if (panel) {
                panel.style.maxHeight = '0px';
                panel.style.opacity = '0';
                panel.style.transition = 'max-height 300ms ease, opacity 300ms ease';
            }

            if (vertical) {
                vertical.style.transition = 'transform 200ms ease';
            }

            if (horizontal) {
                horizontal.style.transition = 'transform 200ms ease';
            }

            if (openFirst && index === 0) {
                setItemState(item, true);
            } else {
                setItemState(item, false);
            }

            if (trigger) {
                trigger.addEventListener('click', () => {
                    const isOpen = item.dataset.open === 'true';

                    if (!allowMultiple) {
                        items.forEach((other) => {
                            if (other !== item) {
                                setItemState(other, false);
                            }
                        });
                    }

                    setItemState(item, !isOpen);
                });
            }
        });

        window.addEventListener('resize', () => {
            items.forEach((item) => {
                if (item.dataset.open === 'true') {
                    const panel = item.querySelector('[data-accordion-panel]');
                    if (panel) {
                        panel.style.maxHeight = `${panel.scrollHeight}px`;
                    }
                }
            });
        });
    });
});
