(function() {
    var style = document.createElement('style');
    style.textContent = `
        body {
            margin: 0;
            padding: 0;
            overflow-x: hidden;
        }
        #page-transition-overlay {
            position: fixed;
            top: 0;
            right: 0;
            width: 100%;
            height: 100%;
            background-color: black;
            transform: translateX(100%);
            transition: transform 0.3s ease-in-out;
            z-index: 9999;
        }
        .transitioning {
            transform: translateX(0) !important;
        }
    `;
    document.head.appendChild(style);

    var overlay = document.createElement('div');
    overlay.id = 'page-transition-overlay';
    document.body.appendChild(overlay);

    function initPageTransitions() {
        const links = document.querySelectorAll('a');

        links.forEach(link => {
            link.addEventListener('click', function (e) {
                if (this.hostname === window.location.hostname && !this.hash) {
                    e.preventDefault();
                    const href = this.getAttribute('href');
                    overlay.classList.add('transitioning');
                    setTimeout(() => {
                        window.location.href = href;
                    }, 300);
                }
            });
        });

        const logo = document.getElementById("logo");
        if (logo) {
            logo.addEventListener("click", function() {
                window.location.href = "index.html";
            });
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initPageTransitions);
    } else {
        initPageTransitions();
    }
})();
