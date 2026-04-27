const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactStatus");
const contactSubmitButton = contactForm ? contactForm.querySelector("button[type='submit']") : null;

let contactEmailInitialized = false;

function i18nText(key, fallback) {
    if (window.AutoLimitedI18n && typeof window.AutoLimitedI18n.t === "function") {
        return window.AutoLimitedI18n.t(key, fallback);
    }
    return fallback;
}

function getCurrentLanguage() {
    if (window.AutoLimitedI18n && typeof window.AutoLimitedI18n.getLanguage === "function") {
        return window.AutoLimitedI18n.getLanguage();
    }
    return "en";
}

function getEmailConfig() {
    const config = window.AutoLimitedEmailConfig;
    if (!config || typeof config !== "object") {
        return null;
    }

    const templates = config.templates || {};
    const services = config.services || {};
    const recipients = config.recipients || {};
    const serviceId = services.contact || config.serviceId;
    const recipientEmail = recipients.contact || config.recipientEmail;

    if (!config.publicKey || !serviceId || !templates.contact || !recipientEmail) {
        return null;
    }

    return {
        publicKey: String(config.publicKey),
        serviceId: String(serviceId),
        templateId: String(templates.contact),
        recipientEmail: String(recipientEmail)
    };
}

function ensureContactEmailClient() {
    if (contactEmailInitialized) {
        return true;
    }

    const config = getEmailConfig();
    if (!config || !window.emailjs || typeof window.emailjs.init !== "function") {
        return false;
    }

    window.emailjs.init({ publicKey: config.publicKey });
    contactEmailInitialized = true;
    return true;
}

function escapeHtml(value) {
    return String(value || "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function setSubmittingState(isSubmitting) {
    if (!contactSubmitButton) {
        return;
    }

    contactSubmitButton.disabled = isSubmitting;

    if (isSubmitting) {
        contactSubmitButton.dataset.previousText = contactSubmitButton.textContent || "";
        contactSubmitButton.textContent = i18nText("contact.sending", "Sending...");
        return;
    }

    const previousText = contactSubmitButton.dataset.previousText;
    if (previousText) {
        contactSubmitButton.textContent = previousText;
    }
}

function getSelectLabel(selectElement) {
    if (!selectElement) {
        return "";
    }

    const option = selectElement.options[selectElement.selectedIndex];
    return option ? (option.textContent || "").trim() : "";
}

function buildContactEmailHtml(data) {
    return `
        <div style="font-family:Arial,Helvetica,sans-serif;background:#f5f7fb;padding:22px;color:#12223b;">
            <div style="max-width:700px;margin:0 auto;background:#ffffff;border:1px solid #dce6f3;border-radius:14px;overflow:hidden;">
                <div style="background:linear-gradient(180deg,#2f8ee8 0%,#1e73d8 100%);padding:18px 22px;color:#ffffff;">
                    <h2 style="margin:0;font-size:22px;letter-spacing:.4px;">New Contact Request</h2>
                    <p style="margin:6px 0 0;font-size:13px;opacity:.95;">Auto Limited Website</p>
                </div>
                <div style="padding:20px 22px;">
                    <table style="width:100%;border-collapse:collapse;">
                        <tr>
                            <td style="padding:10px 0;border-bottom:1px solid #eef3fb;font-size:13px;color:#5b6b84;width:180px;">Full Name</td>
                            <td style="padding:10px 0;border-bottom:1px solid #eef3fb;font-size:15px;font-weight:700;">${escapeHtml(data.fullName)}</td>
                        </tr>
                        <tr>
                            <td style="padding:10px 0;border-bottom:1px solid #eef3fb;font-size:13px;color:#5b6b84;">Phone</td>
                            <td style="padding:10px 0;border-bottom:1px solid #eef3fb;font-size:15px;font-weight:700;">${escapeHtml(data.phone)}</td>
                        </tr>
                        <tr>
                            <td style="padding:10px 0;border-bottom:1px solid #eef3fb;font-size:13px;color:#5b6b84;">Email</td>
                            <td style="padding:10px 0;border-bottom:1px solid #eef3fb;font-size:15px;font-weight:700;">${escapeHtml(data.email)}</td>
                        </tr>
                        <tr>
                            <td style="padding:10px 0;border-bottom:1px solid #eef3fb;font-size:13px;color:#5b6b84;">Preferred Contact Time</td>
                            <td style="padding:10px 0;border-bottom:1px solid #eef3fb;font-size:15px;font-weight:700;">${escapeHtml(data.preferredTime)}</td>
                        </tr>
                        <tr>
                            <td style="padding:10px 0;font-size:13px;color:#5b6b84;">Vehicle Interest</td>
                            <td style="padding:10px 0;font-size:15px;font-weight:700;">${escapeHtml(data.vehicleInterest)}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    `;
}

async function sendContactEmail(data) {
    const config = getEmailConfig();
    if (!config || !window.emailjs || typeof window.emailjs.send !== "function") {
        throw new Error("email-config-missing");
    }

    const submittedAt = new Date().toLocaleString(getCurrentLanguage() === "es" ? "es-US" : "en-US");

    const params = {
        to_email: config.recipientEmail,
        reply_to: data.email,
        form_type: "Contact Us",
        subject: `Contact Request | ${data.fullName}`,
        submitted_at: submittedAt,
        full_name: data.fullName,
        phone: data.phone,
        email: data.email,
        preferred_time: data.preferredTime,
        vehicle_interest: data.vehicleInterest,
        message_html: buildContactEmailHtml(data)
    };

    await window.emailjs.send(config.serviceId, config.templateId, params);
}

function setStatus(messageKey, fallback, isError) {
    if (!contactStatus) {
        return;
    }

    contactStatus.hidden = false;
    contactStatus.dataset.statusKey = messageKey;
    contactStatus.dataset.statusFallback = fallback;
    contactStatus.textContent = i18nText(messageKey, fallback);
    contactStatus.classList.toggle("is-error", Boolean(isError));
}

function clearStatus() {
    if (!contactStatus) {
        return;
    }

    contactStatus.hidden = true;
    delete contactStatus.dataset.statusKey;
    delete contactStatus.dataset.statusFallback;
    contactStatus.textContent = "";
    contactStatus.classList.remove("is-error");
}

if (contactForm) {
    const fields = Array.from(contactForm.querySelectorAll("input, select"));

    fields.forEach((field) => {
        const eventName = field.tagName === "SELECT" ? "change" : "input";
        field.addEventListener(eventName, () => {
            if ((field.value || "").toString().trim() !== "") {
                field.classList.remove("is-invalid");
            }
            clearStatus();
        });
    });

    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        clearStatus();

        let hasErrors = false;

        fields.forEach((field) => {
            const value = (field.value || "").toString().trim();
            const isInvalid = field.hasAttribute("required") && value === "";
            field.classList.toggle("is-invalid", isInvalid);
            if (isInvalid && !hasErrors) {
                field.focus();
                hasErrors = true;
            }
        });

        if (hasErrors) {
            setStatus("contact.errorRequired", "Please complete all required fields.", true);
            return;
        }

        if (!ensureContactEmailClient()) {
            setStatus("contact.errorSend", "Unable to send right now. Please try again in a few minutes.", true);
            return;
        }

        const vehicleInterestSelect = contactForm.querySelector("#contactVehicleInterest");
        const payload = {
            fullName: (contactForm.querySelector("#contactFullName")?.value || "").trim(),
            phone: (contactForm.querySelector("#contactPhone")?.value || "").trim(),
            email: (contactForm.querySelector("#contactEmail")?.value || "").trim(),
            preferredTime: (contactForm.querySelector("#contactPreferredTime")?.value || "").trim(),
            vehicleInterest: getSelectLabel(vehicleInterestSelect)
        };

        setSubmittingState(true);

        try {
            await sendContactEmail(payload);
        } catch {
            setSubmittingState(false);
            setStatus("contact.errorSend", "Unable to send right now. Please try again in a few minutes.", true);
            return;
        }

        setSubmittingState(false);

        contactForm.reset();
        setStatus("contact.success", "Request submitted successfully. We will contact you soon.", false);
    });
}

window.addEventListener("autolimited:languagechange", () => {
    if (!contactStatus || contactStatus.hidden) {
        return;
    }

    if (contactSubmitButton && contactSubmitButton.disabled) {
        contactSubmitButton.textContent = i18nText("contact.sending", "Sending...");
    }

    const statusKey = contactStatus.dataset.statusKey;
    const fallback = contactStatus.dataset.statusFallback || "";
    if (statusKey) {
        contactStatus.textContent = i18nText(statusKey, fallback);
    }
});
