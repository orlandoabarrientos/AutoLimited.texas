class SiteFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="site-footer-wrap" aria-label="Informacion de contacto y enlaces">
                <div class="site-footer">
                    <div class="site-footer-brand">
                        <img src="assets/logo footer.png" alt="Auto Limited">
                    </div>

                    <div class="site-footer-column">
                        <h3 data-i18n="footer.quickLinks">Quick Links__</h3>
                        <ul>
                            <li><a href="contact.html" data-i18n="footer.contactUs">CONTACT US</a></li>
                            <li><a href="inventory.html" data-i18n="footer.inventory">INVENTORY</a></li>
                            <li><a href="pre-approved.html" data-i18n="footer.requestCall">PRE-APPROVAL</a></li>
                        </ul>
                    </div>

                    <div class="site-footer-column">
                        <h3 data-i18n="footer.alliances">Alliances__</h3>
                        <ul>
                            <li>IC Partners Towing</li>
                            <li>Global Auto Mechanic shop</li>
                            <li>Elite Auto Collision</li>
                        </ul>
                    </div>

                    <div class="site-footer-column site-footer-contact">
                        <h3 data-i18n="footer.contactDetails">Contact Details__</h3>
                        <p><strong data-i18n="footer.addressLabel">Address:</strong> <span data-i18n="footer.addressValue">7414 Mansfield Hwy. Ste 204. Kennedale, Texas 76060</span></p>
                        <p><strong data-i18n="footer.emailLabel">E-mail:</strong> office@autolimitedusa.com</p>
                        <p><strong data-i18n="footer.phoneLabel">Phone:</strong> 214-762-3393 / 786-685-9893</p>
                        <p><strong data-i18n="footer.hoursLabel">Business Hours:</strong> <span data-i18n="footer.hoursValue">Monday to Saturday 10:00 am - 7:00 pm</span></p>
                        <ul class="site-footer-social">
                            <li><a href="https://www.instagram.com/autolimited.texas/" target="_blank" rel="noopener noreferrer">Instagram @autolimited.texas</a></li>
                            <li><a href="https://www.instagram.com/autolimited.cml/" target="_blank" rel="noopener noreferrer">Instagram @autolimited.cml</a></li>
                            <li><a href="https://www.facebook.com/search/top?q=Auto%20Limited%20Auto%20Sales.%20%7C%20Kennedale%20TX" target="_blank" rel="noopener noreferrer">Facebook Auto Limited Auto Sales</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        `;

        if (window.AutoLimitedI18n && typeof window.AutoLimitedI18n.applyTranslations === "function") {
            window.AutoLimitedI18n.applyTranslations(this);
        }
    }
}

customElements.define("site-footer", SiteFooter);
