class SiteNavbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header class="topbar">
                <a class="brand" href="index.html" aria-label="Auto Limited">
                    <img class="brand-logo" src="assets/logo.png" alt="Auto Limited">
                </a>

                <button class="menu-toggle" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="mobileMenuPanel">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <div class="topbar-menu-panel" id="mobileMenuPanel">
                    <div class="menu-panel-head">
                        <a class="menu-panel-brand" href="index.html" aria-label="Auto Limited">
                            <img class="menu-panel-logo" src="assets/logo.png" alt="Auto Limited">
                        </a>
                    </div>

                    <nav class="main-nav" aria-label="Navegacion principal">
                        <a href="pre-approved.html" data-i18n="nav.requestCall">Pre-Approve</a>
                        <a href="inventory.html" data-i18n="nav.inventory">Inventory</a>
                        <a href="contact.html" data-i18n="nav.contactUs">Contact Us</a>
                    </nav>

                    <div class="menu-language">
                        <div class="language-switch language-switch-panel">
                            <button class="language-toggle" type="button" aria-haspopup="menu" aria-expanded="false" aria-label="Cambiar idioma">
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M12.9 15.1 10.4 12.6l.1-.1c1.8-2 3-4.4 3.7-6.9H17V4h-6V2H9v2H3v1.5h9.7a14 14 0 0 1-3.2 5.4 13.8 13.8 0 0 1-2.4-3.4H5.6a16.3 16.3 0 0 0 2.9 4.2L3.4 16.8l1.1 1.1L9.6 13l2.2 2.2.7-1.1ZM18.5 10h-1.5l-3.8 10h1.6l1-2.8h3.9l1 2.8h1.6l-3.8-10Zm-2.2 5.8 1.5-4.3 1.5 4.3h-3Z" />
                                </svg>
                                <span class="visually-hidden" data-i18n="nav.languageLabel">EN / ES</span>
                            </button>
                            <div class="language-menu" role="menu" hidden>
                                <button class="language-option" type="button" role="menuitem" data-lang-option="en">
                                    <span class="flag flag-us" aria-hidden="true"></span>
                                    <span class="language-option-label">
                                        <span class="language-option-code">EN</span>
                                        <span class="language-option-name" data-i18n="nav.english">English</span>
                                    </span>
                                </button>
                                <button class="language-option" type="button" role="menuitem" data-lang-option="es">
                                    <span class="flag flag-es" aria-hidden="true"></span>
                                    <span class="language-option-label">
                                        <span class="language-option-code">ES</span>
                                        <span class="language-option-name" data-i18n="nav.spanish">Spanish</span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="topbar-right topbar-right-mobile">
                        <a class="phone" href="tel:+12147623393">+1 (214)-762-3393</a>
                        <div class="menu-social">
                            <a class="icon-link" href="https://www.instagram.com/autolimited.texas/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Auto Limited Texas">
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M7.75 2h8.5C19.6 2 22 4.4 22 7.75v8.5C22 19.6 19.6 22 16.25 22h-8.5C4.4 22 2 19.6 2 16.25v-8.5C2 4.4 4.4 2 7.75 2Zm8.5 1.8h-8.5c-2.32 0-3.95 1.63-3.95 3.95v8.5c0 2.32 1.63 3.95 3.95 3.95h8.5c2.32 0 3.95-1.63 3.95-3.95v-8.5c0-2.32-1.63-3.95-3.95-3.95Zm-4.25 2.95a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5Zm0 1.8a3.45 3.45 0 1 0 0 6.9 3.45 3.45 0 0 0 0-6.9Zm5.55-2.4a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" />
                                </svg>
                            </a>
                            <a class="icon-link" href="https://www.facebook.com/search/top?q=Auto%20Limited%20Auto%20Sales.%20%7C%20Kennedale%20TX" target="_blank" rel="noopener noreferrer" aria-label="Facebook Auto Limited">
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M13.4 22v-8.6h2.9l.5-3.4h-3.4V7.8c0-1 .3-1.7 1.8-1.7h1.9V3a26 26 0 0 0-2.8-.1c-2.8 0-4.7 1.7-4.7 4.9V10H6.6v3.4h2.9V22h3.9Z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="topbar-right topbar-right-desktop">
                    <div class="language-switch language-switch-desktop">
                        <button class="language-toggle" type="button" aria-haspopup="menu" aria-expanded="false" aria-label="Cambiar idioma">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M12.9 15.1 10.4 12.6l.1-.1c1.8-2 3-4.4 3.7-6.9H17V4h-6V2H9v2H3v1.5h9.7a14 14 0 0 1-3.2 5.4 13.8 13.8 0 0 1-2.4-3.4H5.6a16.3 16.3 0 0 0 2.9 4.2L3.4 16.8l1.1 1.1L9.6 13l2.2 2.2.7-1.1ZM18.5 10h-1.5l-3.8 10h1.6l1-2.8h3.9l1 2.8h1.6l-3.8-10Zm-2.2 5.8 1.5-4.3 1.5 4.3h-3Z" />
                            </svg>
                            <span class="visually-hidden" data-i18n="nav.languageLabel">EN / ES</span>
                        </button>
                        <div class="language-menu" role="menu" hidden>
                            <button class="language-option" type="button" role="menuitem" data-lang-option="en">
                                <span class="flag flag-us" aria-hidden="true"></span>
                                <span class="language-option-label">
                                    <span class="language-option-code">EN</span>
                                    <span class="language-option-name" data-i18n="nav.english">English</span>
                                </span>
                            </button>
                            <button class="language-option" type="button" role="menuitem" data-lang-option="es">
                                <span class="flag flag-es" aria-hidden="true"></span>
                                <span class="language-option-label">
                                    <span class="language-option-code">ES</span>
                                    <span class="language-option-name" data-i18n="nav.spanish">Spanish</span>
                                </span>
                            </button>
                        </div>
                    </div>

                    <a class="icon-link" href="https://www.instagram.com/autolimited.texas/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Auto Limited Texas">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M7.75 2h8.5C19.6 2 22 4.4 22 7.75v8.5C22 19.6 19.6 22 16.25 22h-8.5C4.4 22 2 19.6 2 16.25v-8.5C2 4.4 4.4 2 7.75 2Zm8.5 1.8h-8.5c-2.32 0-3.95 1.63-3.95 3.95v8.5c0 2.32 1.63 3.95 3.95 3.95h8.5c2.32 0 3.95-1.63 3.95-3.95v-8.5c0-2.32-1.63-3.95-3.95-3.95Zm-4.25 2.95a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5Zm0 1.8a3.45 3.45 0 1 0 0 6.9 3.45 3.45 0 0 0 0-6.9Zm5.55-2.4a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" />
                        </svg>
                    </a>
                    <a class="icon-link" href="https://www.facebook.com/search/top?q=Auto%20Limited%20Auto%20Sales.%20%7C%20Kennedale%20TX" target="_blank" rel="noopener noreferrer" aria-label="Facebook Auto Limited">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M13.4 22v-8.6h2.9l.5-3.4h-3.4V7.8c0-1 .3-1.7 1.8-1.7h1.9V3a26 26 0 0 0-2.8-.1c-2.8 0-4.7 1.7-4.7 4.9V10H6.6v3.4h2.9V22h3.9Z" />
                        </svg>
                    </a>
                    <a class="phone" href="tel:+12147623393">+1 (214)-762-3393</a>
                </div>
            </header>

            <button class="mobile-menu-backdrop" type="button" aria-label="Cerrar menu"></button>
        `;

        if (window.AutoLimitedI18n && typeof window.AutoLimitedI18n.applyTranslations === "function") {
            window.AutoLimitedI18n.applyTranslations(this);
        }

        const languageSwitches = Array.from(this.querySelectorAll(".language-switch"));
        const languageToggles = Array.from(this.querySelectorAll(".language-toggle"));
        const languageMenus = Array.from(this.querySelectorAll(".language-menu"));
        const languageOptions = Array.from(this.querySelectorAll(".language-option"));
        const menuToggle = this.querySelector(".menu-toggle");
        const mobileMenuPanel = this.querySelector(".topbar-menu-panel");
        const mobileMenuBackdrop = this.querySelector(".mobile-menu-backdrop");
        const navLinks = Array.from(this.querySelectorAll(".topbar-menu-panel .main-nav a"));

        const closeMobileMenu = () => {
            if (!(menuToggle instanceof HTMLButtonElement) || !(mobileMenuPanel instanceof HTMLElement) || !(mobileMenuBackdrop instanceof HTMLElement)) {
                return;
            }
            menuToggle.setAttribute("aria-expanded", "false");
            mobileMenuPanel.classList.remove("is-open");
            mobileMenuBackdrop.classList.remove("is-open");
            document.body.classList.remove("menu-open");
        };

        const openMobileMenu = () => {
            if (!(menuToggle instanceof HTMLButtonElement) || !(mobileMenuPanel instanceof HTMLElement) || !(mobileMenuBackdrop instanceof HTMLElement)) {
                return;
            }
            menuToggle.setAttribute("aria-expanded", "true");
            mobileMenuPanel.classList.add("is-open");
            mobileMenuBackdrop.classList.add("is-open");
            document.body.classList.add("menu-open");
        };

        if (menuToggle instanceof HTMLButtonElement && mobileMenuPanel instanceof HTMLElement && mobileMenuBackdrop instanceof HTMLElement) {
            menuToggle.addEventListener("click", (event) => {
                event.preventDefault();
                if (mobileMenuPanel.classList.contains("is-open")) {
                    closeMobileMenu();
                    return;
                }
                openMobileMenu();
            });

            mobileMenuBackdrop.addEventListener("click", closeMobileMenu);

            navLinks.forEach((link) => {
                link.addEventListener("click", closeMobileMenu);
            });

            window.addEventListener("resize", () => {
                if (window.innerWidth > 760) {
                    closeMobileMenu();
                }
            });
        }

        const closeLanguageMenus = () => {
            languageMenus.forEach((menu) => {
                if (menu instanceof HTMLElement) {
                    menu.hidden = true;
                    menu.classList.remove("align-left", "align-right");
                }
            });

            languageToggles.forEach((toggle) => {
                if (toggle instanceof HTMLButtonElement) {
                    toggle.setAttribute("aria-expanded", "false");
                }
            });
        };

        const positionLanguageMenu = (menu, toggle) => {
            if (!(menu instanceof HTMLElement) || !(toggle instanceof HTMLElement)) {
                return;
            }

            menu.classList.remove("align-left", "align-right");

            const toggleRect = toggle.getBoundingClientRect();
            const prefersRight = toggleRect.left > window.innerWidth / 2;
            menu.classList.add(prefersRight ? "align-right" : "align-left");

            const menuRect = menu.getBoundingClientRect();
            if (menuRect.right > window.innerWidth - 8) {
                menu.classList.remove("align-left");
                menu.classList.add("align-right");
            }
            if (menuRect.left < 8) {
                menu.classList.remove("align-right");
                menu.classList.add("align-left");
            }
        };

        const syncLanguageState = () => {
            const currentLanguage =
                window.AutoLimitedI18n && typeof window.AutoLimitedI18n.getLanguage === "function"
                    ? window.AutoLimitedI18n.getLanguage()
                    : "en";

            languageOptions.forEach((option) => {
                const isActive = option.dataset.langOption === currentLanguage;
                option.classList.toggle("is-active", isActive);
                option.setAttribute("aria-current", isActive ? "true" : "false");
            });
        };

        languageToggles.forEach((toggle) => {
            toggle.addEventListener("click", (event) => {
                event.preventDefault();

                const switchElement = toggle.closest(".language-switch");
                const menu = switchElement ? switchElement.querySelector(".language-menu") : null;
                if (!(menu instanceof HTMLElement)) {
                    return;
                }

                const shouldOpen = menu.hidden;
                closeLanguageMenus();

                if (shouldOpen) {
                    menu.hidden = false;
                    toggle.setAttribute("aria-expanded", "true");
                    positionLanguageMenu(menu, toggle);
                }
            });
        });

        languageOptions.forEach((option) => {
            option.addEventListener("click", () => {
                const nextLanguage = option.dataset.langOption;
                if (
                    window.AutoLimitedI18n &&
                    typeof window.AutoLimitedI18n.setLanguage === "function" &&
                    (nextLanguage === "en" || nextLanguage === "es")
                ) {
                    window.AutoLimitedI18n.setLanguage(nextLanguage);
                }
                closeLanguageMenus();
            });
        });

        document.addEventListener("click", (event) => {
            const clickedInsideLanguageSwitch = languageSwitches.some((switchElement) =>
                switchElement instanceof HTMLElement && switchElement.contains(event.target)
            );

            if (!clickedInsideLanguageSwitch) {
                closeLanguageMenus();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeLanguageMenus();
                closeMobileMenu();
            }
        });

        window.addEventListener("resize", () => {
            closeLanguageMenus();
        });

        window.addEventListener("autolimited:languagechange", syncLanguageState);
        syncLanguageState();
    }
}

customElements.define("site-navbar", SiteNavbar);
