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
