const video1 = document.getElementById('projectVideo1');
const video2 = document.getElementById('projectVideo2');
const video3 = document.getElementById('projectVideo3');
const video4 = document.getElementById('projectVideo4');
const video5 = document.getElementById('projectVideo5');
const video6 = document.getElementById('projectVideo6');

const hoverSign = document.querySelector(".hover-sign");

// --- Sidebar (mobile burger) robust toggling ---
(function initMobileMenu() {
    const sideBar = document.querySelector('.sidebar');
    const menuBtn = document.querySelector('.menu-icon');
    const closeBtn = document.querySelector('.close-icon');

    if (!sideBar || !menuBtn) {
        // nothing to do if elements are missing
        return;
    }

    // ensure initial state
    sideBar.classList.add('close-sidebar');
    sideBar.setAttribute('aria-hidden', 'true');

    function openMenu() {
        sideBar.classList.remove('close-sidebar');
        sideBar.classList.add('open-sidebar');
        sideBar.setAttribute('aria-hidden', 'false');
        menuBtn.setAttribute('aria-expanded', 'true');
        // lock body scroll on open for mobile
        document.documentElement.style.overflow = 'hidden';
    }

    function closeMenu() {
        sideBar.classList.remove('open-sidebar');
        sideBar.classList.add('close-sidebar');
        sideBar.setAttribute('aria-hidden', 'true');
        menuBtn.setAttribute('aria-expanded', 'false');
        document.documentElement.style.overflow = '';
    }

    // click handlers
    menuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // toggle
        if (sideBar.classList.contains('open-sidebar')) closeMenu();
        else openMenu();
    });

    // close when clicking close icon
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeMenu();
        });
    }

    // close when clicking outside the sidebar (optional nicer UX)
    document.addEventListener('click', (e) => {
        if (!sideBar.classList.contains('open-sidebar')) return;
        // if clicked outside sidebar and not on the menuBtn
        if (!sideBar.contains(e.target) && !menuBtn.contains(e.target)) {
            closeMenu();
        }
    });

    // keyboard: Esc to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sideBar.classList.contains('open-sidebar')) {
            closeMenu();
        }
    });

    // a11y: enable keyboard activation on close icon if present
    if (closeBtn) {
        closeBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') closeMenu();
        });
    }
})();
(function mobileCategoryCloneFollower() {
    const mq = window.matchMedia("(max-width: 900px)");
    let clone = null;

    function clamp(v, min, max) {
        return Math.max(min, Math.min(max, v));
    }

    function ensureClone() {
        if (!clone) {
            clone = document.createElement("div");
            clone.className = "category-title clone";
            document.body.appendChild(clone);
        }
    }

    function update() {
        if (!mq.matches) {
            if (clone) clone.style.display = "none";
            return;
        }

        ensureClone();

        const sections = document.querySelectorAll(
            "#projectsGrid.categorized .category-section"
        );

        let active = null;
        let maxVisible = 0;

        sections.forEach(section => {
            const r = section.getBoundingClientRect();
            const visible =
                Math.min(window.innerHeight, r.bottom) -
                Math.max(0, r.top);

            if (visible > maxVisible) {
                maxVisible = visible;
                active = section;
            }
        });

        if (!active) {
            clone.style.display = "none";
            return;
        }

        const title = active.querySelector(".category-title");
        if (!title) return;

        clone.textContent = title.textContent.trim();
        clone.style.display = "block";

        const r = active.getBoundingClientRect();
        const center = window.innerHeight / 2;
        const y = clamp(center, r.top + 40, r.bottom - 40);

        clone.style.top = `${y}px`;
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
})();







