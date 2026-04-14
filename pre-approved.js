const preapproveForm = document.getElementById("preapproveForm");
const ssnInput = document.getElementById("ssnInput");
const noSsnCheckbox = document.getElementById("noSsn");
const preapproveStatus = document.getElementById("preapproveStatus");
const confirmCredit = document.getElementById("confirmCredit");
const preapproveSubmitButton = preapproveForm ? preapproveForm.querySelector("button[type='submit']") : null;

let preapproveEmailInitialized = false;

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
    const serviceId = services.preapprove || config.serviceId;
    const recipientEmail = recipients.preapprove || config.recipientEmail;

    if (!config.publicKey || !serviceId || !templates.preapprove || !recipientEmail) {
        return null;
    }

    return {
        publicKey: String(config.publicKey),
        serviceId: String(serviceId),
        templateId: String(templates.preapprove),
        recipientEmail: String(recipientEmail)
    };
}

function ensurePreapproveEmailClient() {
    if (preapproveEmailInitialized) {
        return true;
    }

    const config = getEmailConfig();
    if (!config || !window.emailjs || typeof window.emailjs.init !== "function") {
        return false;
    }

    window.emailjs.init({ publicKey: config.publicKey });
    preapproveEmailInitialized = true;
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
    if (!preapproveSubmitButton) {
        return;
    }

    preapproveSubmitButton.disabled = isSubmitting;

    if (isSubmitting) {
        preapproveSubmitButton.dataset.previousText = preapproveSubmitButton.textContent || "";
        preapproveSubmitButton.textContent = i18nText("preapprove.sending", "Sending...");
        return;
    }

    const previousText = preapproveSubmitButton.dataset.previousText;
    if (previousText) {
        preapproveSubmitButton.textContent = previousText;
    }
}

function getFieldValue(name) {
    if (!preapproveForm) {
        return "";
    }

    const element = preapproveForm.elements.namedItem(name);
    if (!element || !("value" in element)) {
        return "";
    }

    return String(element.value || "").trim();
}

function getSelectText(name) {
    if (!preapproveForm) {
        return "";
    }

    const element = preapproveForm.elements.namedItem(name);
    if (!(element instanceof HTMLSelectElement)) {
        return getFieldValue(name);
    }

    const option = element.options[element.selectedIndex];
    return option ? String(option.textContent || "").trim() : "";
}

function buildPreapprovePayload() {
    const firstName = getFieldValue("firstName");
    const middleName = getFieldValue("middleName");
    const lastName = getFieldValue("lastName");
    const fullName = [firstName, middleName, lastName].filter(Boolean).join(" ").trim();
    const noSsn = Boolean(noSsnCheckbox && noSsnCheckbox.checked);
    const ssnValue = noSsn ? i18nText("preapprove.noSsn", "No SSN / ITIN") : getFieldValue("ssn");

    return {
        fullName,
        firstName,
        middleName,
        lastName,
        ssn: ssnValue,
        birthDate: getFieldValue("birthDate"),
        idType: getSelectText("idType"),
        idState: getFieldValue("idState"),
        idNumber: getFieldValue("idNumber"),
        street: getFieldValue("street"),
        city: getFieldValue("city"),
        state: getFieldValue("state"),
        zip: getFieldValue("zip"),
        residenceType: getSelectText("residenceType"),
        rentMortgage: getFieldValue("rentMortgage"),
        addressYears: getFieldValue("addressYears"),
        addressMonths: getFieldValue("addressMonths"),
        employmentType: getSelectText("employmentType"),
        employerName: getFieldValue("employerName"),
        employerPhone: getFieldValue("employerPhone"),
        jobYears: getFieldValue("jobYears"),
        jobMonths: getFieldValue("jobMonths"),
        incomeType: getSelectText("incomeType"),
        monthlyIncome: getFieldValue("monthlyIncome")
    };
}

function buildPreapproveEmailHtml(data) {
    return `
        <div style="font-family:Arial,Helvetica,sans-serif;background:#f5f7fb;padding:22px;color:#12223b;">
            <div style="max-width:820px;margin:0 auto;background:#ffffff;border:1px solid #dce6f3;border-radius:14px;overflow:hidden;">
                <div style="background:linear-gradient(180deg,#2f8ee8 0%,#1e73d8 100%);padding:18px 22px;color:#ffffff;">
                    <h2 style="margin:0;font-size:22px;letter-spacing:.4px;">New Pre-Approval Application</h2>
                    <p style="margin:6px 0 0;font-size:13px;opacity:.95;">Auto Limited Website</p>
                </div>
                <div style="padding:20px 22px;">
                    <h3 style="margin:0 0 8px;color:#1b4f88;font-size:15px;text-transform:uppercase;">Personal Information</h3>
                    <table style="width:100%;border-collapse:collapse;margin-bottom:14px;">
                        <tr><td style="padding:8px 0;border-bottom:1px solid #eef3fb;font-size:13px;color:#5b6b84;width:220px;">Full Name</td><td style="padding:8px 0;border-bottom:1px solid #eef3fb;font-size:14px;font-weight:700;">${escapeHtml(data.fullName)}</td></tr>
                        <tr><td style="padding:8px 0;border-bottom:1px solid #eef3fb;font-size:13px;color:#5b6b84;">SSN / ITIN</td><td style="padding:8px 0;border-bottom:1px solid #eef3fb;font-size:14px;font-weight:700;">${escapeHtml(data.ssn)}</td></tr>
                        <tr><td style="padding:8px 0;border-bottom:1px solid #eef3fb;font-size:13px;color:#5b6b84;">Date of Birth</td><td style="padding:8px 0;border-bottom:1px solid #eef3fb;font-size:14px;font-weight:700;">${escapeHtml(data.birthDate)}</td></tr>
                        <tr><td style="padding:8px 0;border-bottom:1px solid #eef3fb;font-size:13px;color:#5b6b84;">ID Type</td><td style="padding:8px 0;border-bottom:1px solid #eef3fb;font-size:14px;font-weight:700;">${escapeHtml(data.idType)}</td></tr>
                        <tr><td style="padding:8px 0;border-bottom:1px solid #eef3fb;font-size:13px;color:#5b6b84;">ID State</td><td style="padding:8px 0;border-bottom:1px solid #eef3fb;font-size:14px;font-weight:700;">${escapeHtml(data.idState)}</td></tr>
                        <tr><td style="padding:8px 0;font-size:13px;color:#5b6b84;">ID Number</td><td style="padding:8px 0;font-size:14px;font-weight:700;">${escapeHtml(data.idNumber)}</td></tr>
                    </table>

                    <h3 style="margin:0 0 8px;color:#1b4f88;font-size:15px;text-transform:uppercase;">Residence Information</h3>
                    <table style="width:100%;border-collapse:collapse;margin-bottom:14px;">
                        <tr><td style="padding:8px 0;border-bottom:1px solid #eef3fb;font-size:13px;color:#5b6b84;width:220px;">Address</td><td style="padding:8px 0;border-bottom:1px solid #eef3fb;font-size:14px;font-weight:700;">${escapeHtml(`${data.street}, ${data.city}, ${data.state} ${data.zip}`)}</td></tr>
                        <tr><td style="padding:8px 0;border-bottom:1px solid #eef3fb;font-size:13px;color:#5b6b84;">Residence Type</td><td style="padding:8px 0;border-bottom:1px solid #eef3fb;font-size:14px;font-weight:700;">${escapeHtml(data.residenceType)}</td></tr>
                        <tr><td style="padding:8px 0;border-bottom:1px solid #eef3fb;font-size:13px;color:#5b6b84;">Rent / Mortgage</td><td style="padding:8px 0;border-bottom:1px solid #eef3fb;font-size:14px;font-weight:700;">${escapeHtml(data.rentMortgage)}</td></tr>
                        <tr><td style="padding:8px 0;font-size:13px;color:#5b6b84;">Length At Address</td><td style="padding:8px 0;font-size:14px;font-weight:700;">${escapeHtml(`${data.addressYears} years ${data.addressMonths} months`)}</td></tr>
                    </table>

                    <h3 style="margin:0 0 8px;color:#1b4f88;font-size:15px;text-transform:uppercase;">Employment & Income</h3>
                    <table style="width:100%;border-collapse:collapse;">
                        <tr><td style="padding:8px 0;border-bottom:1px solid #eef3fb;font-size:13px;color:#5b6b84;width:220px;">Employment Type</td><td style="padding:8px 0;border-bottom:1px solid #eef3fb;font-size:14px;font-weight:700;">${escapeHtml(data.employmentType)}</td></tr>
                        <tr><td style="padding:8px 0;border-bottom:1px solid #eef3fb;font-size:13px;color:#5b6b84;">Employer</td><td style="padding:8px 0;border-bottom:1px solid #eef3fb;font-size:14px;font-weight:700;">${escapeHtml(data.employerName)} (${escapeHtml(data.employerPhone)})</td></tr>
                        <tr><td style="padding:8px 0;border-bottom:1px solid #eef3fb;font-size:13px;color:#5b6b84;">Length At Job</td><td style="padding:8px 0;border-bottom:1px solid #eef3fb;font-size:14px;font-weight:700;">${escapeHtml(`${data.jobYears} years ${data.jobMonths} months`)}</td></tr>
                        <tr><td style="padding:8px 0;border-bottom:1px solid #eef3fb;font-size:13px;color:#5b6b84;">Income Type</td><td style="padding:8px 0;border-bottom:1px solid #eef3fb;font-size:14px;font-weight:700;">${escapeHtml(data.incomeType)}</td></tr>
                        <tr><td style="padding:8px 0;font-size:13px;color:#5b6b84;">Monthly Income</td><td style="padding:8px 0;font-size:14px;font-weight:700;">${escapeHtml(data.monthlyIncome)}</td></tr>
                    </table>
                </div>
            </div>
        </div>
    `;
}

async function sendPreapproveEmail(data) {
    const config = getEmailConfig();
    if (!config || !window.emailjs || typeof window.emailjs.send !== "function") {
        throw new Error("email-config-missing");
    }

    const submittedAt = new Date().toLocaleString(getCurrentLanguage() === "es" ? "es-US" : "en-US");
    const params = {
        to_email: config.recipientEmail,
        form_type: "Pre-Approved",
        subject: `Pre-Approval Application | ${data.fullName}`,
        submitted_at: submittedAt,
        applicant_name: data.fullName,
        first_name: data.firstName,
        middle_name: data.middleName,
        last_name: data.lastName,
        ssn: data.ssn,
        birth_date: data.birthDate,
        id_type: data.idType,
        id_state: data.idState,
        id_number: data.idNumber,
        street: data.street,
        city: data.city,
        state: data.state,
        zip: data.zip,
        residence_type: data.residenceType,
        rent_mortgage: data.rentMortgage,
        address_years: data.addressYears,
        address_months: data.addressMonths,
        employment_type: data.employmentType,
        employer_name: data.employerName,
        employer_phone: data.employerPhone,
        job_years: data.jobYears,
        job_months: data.jobMonths,
        income_type: data.incomeType,
        monthly_income: data.monthlyIncome,
        message_html: buildPreapproveEmailHtml(data)
    };

    await window.emailjs.send(config.serviceId, config.templateId, params);
}

function syncSsnState() {
    if (!ssnInput || !noSsnCheckbox) {
        return;
    }

    const noSsn = noSsnCheckbox.checked;
    ssnInput.disabled = noSsn;
    ssnInput.required = !noSsn;
    if (noSsn) {
        ssnInput.value = "";
    }

    if (noSsn) {
        clearFieldError(ssnInput);
        return;
    }

    if ((ssnInput.value || "").trim() === "") {
        clearFieldError(ssnInput);
        return;
    }

    validateField(ssnInput);
}

function getFieldContainer(field) {
    if (!field) {
        return null;
    }
    if (field.id === "confirmCredit") {
        return field.closest(".confirm-row");
    }
    return field.closest(".form-field");
}

function getErrorMessageKey(field) {
    if (field && field.id === "confirmCredit") {
        return "preapprove.errorConfirm";
    }
    return "preapprove.errorRequired";
}

function setFieldError(field, errorKey, fallbackMessage) {
    const container = getFieldContainer(field);
    if (!container) {
        return;
    }

    container.classList.add("is-invalid");

    let errorElement = container.querySelector(".field-error");
    if (!errorElement) {
        errorElement = document.createElement("small");
        errorElement.className = "field-error";
        container.appendChild(errorElement);
    }

    errorElement.dataset.errorKey = errorKey;
    errorElement.textContent = i18nText(errorKey, fallbackMessage);
}

function clearFieldError(field) {
    const container = getFieldContainer(field);
    if (!container) {
        return;
    }

    container.classList.remove("is-invalid");
    const errorElement = container.querySelector(".field-error");
    if (errorElement) {
        errorElement.remove();
    }
}

function isFieldRequired(field) {
    return field.hasAttribute("required") && !field.disabled;
}

function isFieldFilled(field) {
    if (field.type === "checkbox") {
        return field.checked;
    }

    const value = typeof field.value === "string" ? field.value.trim() : field.value;
    return value !== "" && value !== null && value !== undefined;
}

function validateField(field) {
    if (!field) {
        return true;
    }

    if (!isFieldRequired(field)) {
        clearFieldError(field);
        return true;
    }

    const valid = isFieldFilled(field);
    if (valid) {
        clearFieldError(field);
        return true;
    }

    setFieldError(field, getErrorMessageKey(field), "This field is required.");
    return false;
}

function validateFormVisual() {
    if (!preapproveForm) {
        return true;
    }

    const fields = Array.from(preapproveForm.querySelectorAll("input, select, textarea"));
    const invalidFields = fields.filter((field) => !validateField(field));

    if (invalidFields.length > 0) {
        invalidFields[0].focus();
        return false;
    }

    return true;
}

function clearStatus() {
    if (!preapproveStatus) {
        return;
    }
    preapproveStatus.hidden = true;
    delete preapproveStatus.dataset.statusKey;
    delete preapproveStatus.dataset.statusFallback;
    preapproveStatus.classList.remove("is-error");
    preapproveStatus.textContent = "";
}

function showStatus(key, fallback, isError) {
    if (!preapproveStatus) {
        return;
    }

    preapproveStatus.hidden = false;
    preapproveStatus.dataset.statusKey = key;
    preapproveStatus.dataset.statusFallback = fallback;
    preapproveStatus.textContent = i18nText(key, fallback);
    preapproveStatus.classList.toggle("is-error", Boolean(isError));
}

function refreshErrorTranslations() {
    if (!preapproveForm) {
        return;
    }

    preapproveForm.querySelectorAll(".field-error").forEach((errorElement) => {
        const key = errorElement.dataset.errorKey;
        if (!key) {
            return;
        }
        errorElement.textContent = i18nText(key, errorElement.textContent || "");
    });
}

if (noSsnCheckbox) {
    noSsnCheckbox.addEventListener("change", syncSsnState);
}

if (preapproveForm) {
    preapproveForm.querySelectorAll("input, select, textarea").forEach((field) => {
        const runValidation = () => {
            validateField(field);
            clearStatus();
        };

        if (field.tagName === "SELECT" || field.type === "checkbox") {
            field.addEventListener("change", runValidation);
            return;
        }

        field.addEventListener("input", runValidation);
        field.addEventListener("change", runValidation);
    });

    preapproveForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        clearStatus();

        if (!validateFormVisual()) {
            showStatus("preapprove.errorReview", "Please complete all required fields.", true);
            return;
        }

        if (!ensurePreapproveEmailClient()) {
            showStatus("preapprove.errorSend", "Unable to send right now. Please try again in a few minutes.", true);
            return;
        }

        const payload = buildPreapprovePayload();

        setSubmittingState(true);

        try {
            await sendPreapproveEmail(payload);
        } catch {
            setSubmittingState(false);
            showStatus("preapprove.errorSend", "Unable to send right now. Please try again in a few minutes.", true);
            return;
        }

        setSubmittingState(false);

        showStatus("preapprove.success", "Application submitted successfully.", false);

        preapproveForm.reset();
        syncSsnState();
        if (confirmCredit) {
            clearFieldError(confirmCredit);
        }
    });
}

window.addEventListener("autolimited:languagechange", () => {
    refreshErrorTranslations();

    if (preapproveSubmitButton && preapproveSubmitButton.disabled) {
        preapproveSubmitButton.textContent = i18nText("preapprove.sending", "Sending...");
    }

    if (preapproveStatus && !preapproveStatus.hidden) {
        const statusKey = preapproveStatus.dataset.statusKey;
        const fallback = preapproveStatus.dataset.statusFallback || "";
        if (statusKey) {
            preapproveStatus.textContent = i18nText(statusKey, fallback);
        }
    }
});

syncSsnState();
