document.addEventListener(
    "DOMContentLoaded",
    () => {

        /* =========================================
           MOBILE MENU
        ========================================= */

        const menuButton =
            document.querySelector(
                ".mobile-menu-button"
            );

        const navLinks =
            document.querySelector(
                ".nav-links"
            );


        if (
            menuButton &&
            navLinks
        ) {

            menuButton.addEventListener(
                "click",
                () => {

                    navLinks.classList.toggle(
                        "open"
                    );


                    const isOpen =
                        navLinks.classList.contains(
                            "open"
                        );


                    menuButton.setAttribute(
                        "aria-expanded",
                        isOpen
                    );

                }
            );

        }


        /* =========================================
           DARK MODE
        ========================================= */

        const themeButton =
            document.querySelector(
                "#themeToggle"
            );


        const savedTheme =
            localStorage.getItem(
                "fodeTheme"
            );


        if (
            savedTheme === "dark"
        ) {

            document.body.classList.add(
                "dark-mode"
            );

        }


        updateThemeIcon();


        if (themeButton) {

            themeButton.addEventListener(
                "click",
                () => {

                    document.body.classList.toggle(
                        "dark-mode"
                    );


                    const darkMode =
                        document.body.classList.contains(
                            "dark-mode"
                        );


                    localStorage.setItem(
                        "fodeTheme",
                        darkMode
                            ? "dark"
                            : "light"
                    );


                    updateThemeIcon();

                }
            );

        }


        function updateThemeIcon() {

            if (!themeButton) {
                return;
            }


            const darkMode =
                document.body.classList.contains(
                    "dark-mode"
                );


            themeButton.textContent =
                darkMode
                    ? "☀️"
                    : "🌙";


            themeButton.setAttribute(
                "aria-label",
                darkMode
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            );

        }


        /* =========================================
           ACTIVE NAVIGATION
        ========================================= */

        const currentPage =
            window.location.pathname
                .split("/")
                .pop() ||
            "index.html";


        document
            .querySelectorAll(
                ".nav-links a"
            )
            .forEach(
                link => {

                    const href =
                        link
                            .getAttribute(
                                "href"
                            );


                    if (
                        href ===
                        currentPage
                    ) {

                        link.classList.add(
                            "active"
                        );

                    }

                }
            );

    }
);
/* =========================================================
   OFFLINE APP REGISTRATION
========================================================= */


if (
    "serviceWorker" in navigator
) {

    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker
                .register(
                    "sw.js"
                )
                .then(
                    registration => {

                        console.log(
                            "FODE Offline Service Worker registered:",
                            registration.scope
                        );

                    }
                )
                .catch(
                    error => {

                        console.error(
                            "Service Worker registration failed:",
                            error
                        );

                    }
                );

        }
    );

}