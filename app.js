const video1 = document.getElementById('projectVideo1');
const video2 = document.getElementById('projectVideo2');
const video3 = document.getElementById('projectVideo3');
const video4 = document.getElementById('projectVideo4');
const video5 = document.getElementById('projectVideo5');
const video6 = document.getElementById('projectVideo6');

const hoverSign = document.querySelector(".hover-sign");

// sidebar elements //
const sideBar = document.querySelector('.sidebar');
const menu = document.querySelector('.menu-icon');
const close = document.querySelector('.close-icon');

const videoList = [video1, video2, video3, video4, video5, video6];

videoList.forEach(function(video){
    video.addEventListener('mouseover', function(){
        video.play();
        hoverSign.classList.add("active");
    })
    video.addEventListener('mouseout', function(){
        video.pause();
        hoverSign.classList.remove("active");
    })
})

// sidebar elements //
menu.addEventListener("click", function(){
    sideBar.classList.remove("close-sidebar")
    sideBar.classList.add("open-sidebar")
})

close.addEventListener("click", function(){
    sideBar.classList.remove("open-sidebar")
    sideBar.classList.add("close-sidebar")
})

    (function moveRightCategoryBlocks() {
        const mq = window.matchMedia("(max-width: 900px)");

        function clamp(v, min, max) {
            return Math.max(min, Math.min(max, v));
        }

        function update() {
            if (!mq.matches) return;

            const sections = document.querySelectorAll(
                "#projectsGrid.categorized .category-section"
            );

            let activeSection = null;
            let maxVisible = 0;

            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const visible =
                    Math.min(window.innerHeight, rect.bottom) -
                    Math.max(0, rect.top);

                if (visible > maxVisible) {
                    maxVisible = visible;
                    activeSection = section;
                }
            });

            document.querySelectorAll(".category-side-label").forEach(label => {
                label.style.opacity = "0";
            });

            if (!activeSection) return;

            const label = activeSection.querySelector(".category-side-label");
            if (!label) return;

            const rect = activeSection.getBoundingClientRect();
            const viewportCenter = window.innerHeight / 2;

            const minY = rect.top + 40;
            const maxY = rect.bottom - 40;

            const y = clamp(viewportCenter, minY, maxY);

            label.style.top = `${Math.round(y)}px`;
            label.style.opacity = "1";
        }

        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        update();
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



    (function(){
  // CONFIG
  const requireClass = true; // true = nur <img class="zoomable"> reagieren; false = auto-detect images in article
        const autoSelector = '.project-content, article, main, .project-page'; // used if requireClass=false

        // Create overlay if missing
        let overlay = document.querySelector('.img-lightbox-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
        overlay.className = 'img-lightbox-overlay';
        overlay.innerHTML = '<div class="img-lightbox-inner" role="dialog" aria-modal="true" tabindex="-1"><img alt="" /><div class="img-lightbox-caption" aria-hidden="true"></div></div>';
        document.body.appendChild(overlay);
  }

        const inner = overlay.querySelector('.img-lightbox-inner');
        const overlayImg = overlay.querySelector('img');
        const captionEl = overlay.querySelector('.img-lightbox-caption');
        let lastScrollY = 0;

        function openLightboxFromImg(imgEl) {
    const src = imgEl.dataset.fullsrc || imgEl.src;
        const caption = imgEl.dataset.caption || imgEl.alt || imgEl.title || '';
        overlayImg.src = src;
        overlayImg.alt = imgEl.alt || imgEl.title || '';
        captionEl.textContent = caption;
        captionEl.style.display = caption ? 'block' : 'none';

        // lock scroll
        lastScrollY = window.scrollY || window.pageYOffset;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${lastScrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';

        overlay.classList.add('visible');
        inner.focus();
  }

        function closeLightbox() {
            overlay.classList.remove('visible');
        // restore scroll
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        window.scrollTo(0, lastScrollY || 0);
    // clear image src after transition
    setTimeout(()=> overlayImg.src = '', 250);
  }

        // Click delegation for images (works even if images are added later)
        document.addEventListener('click', function(e){
    // If overlay visible and click outside inner => close
    if (overlay.classList.contains('visible')) {
      if (!inner.contains(e.target)) {closeLightbox(); return; }
        // If clicking on image or inner, close too (toggle)
        if (e.target === overlayImg || inner.contains(e.target)) {closeLightbox(); return; }
    }

        // else, check if clicked an image to open
        let img = e.target.closest('img');
        if (!img) return;
        if (requireClass) {
      if (!img.classList.contains('zoomable')) return;
    } else {
      // optional: ensure image is inside content area
      if (!img.closest(autoSelector)) return;
    }

        // Prevent links etc
        e.preventDefault();
        e.stopPropagation();
        openLightboxFromImg(img);
  }, true); // use capture true to catch before other handlers

        // ESC to close
        document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && overlay.classList.contains('visible')) closeLightbox();
  });

        // accessibility: clicking middle mouse/button? handled by click above

        // expose for debug
        window.__simpleLightbox = {open: openLightboxFromImg, close: closeLightbox, overlay };

        // auto-enable for existing images if requireClass==false (optional)
        if (!requireClass) {
            document.querySelectorAll(autoSelector + ' img').forEach(img => {
                img.classList.add('zoomable');
            });
  }
})();



