const vehicles = Array.isArray(window.AUTO_LIMITED_VEHICLES) ? window.AUTO_LIMITED_VEHICLES : [];

const detailImage = document.getElementById("detailImage");
const detailTitle = document.getElementById("detailTitle");
const detailMeta = document.getElementById("detailMeta");
const detailCash = document.getElementById("detailCash");
const detailCashLine1 = document.getElementById("detailCashLine1");
const detailCashLine2 = document.getElementById("detailCashLine2");
const detailFinanceBox = document.getElementById("detailFinanceBox");
const detailFinanced = document.getElementById("detailFinanced");
const detailFinancedLabel = document.getElementById("detailFinancedLabel");
const detailFinanceBottom = document.getElementById("detailFinanceBottom");
const detailOnly = document.getElementById("detailOnly");
const detailDownPrice = document.getElementById("detailDownPrice");
const detailDown = document.getElementById("detailDown");
const detailSpecsGrid = document.getElementById("detailSpecsGrid");
const detailHighlights = document.getElementById("detailHighlights");
const similarGrid = document.getElementById("similarGrid");

const thumbsTrack = document.getElementById("thumbsTrack");
const thumbsPrev = document.getElementById("thumbsPrev");
const thumbsNext = document.getElementById("thumbsNext");

const galleryPrev = document.querySelector(".details-left .nav-btn.prev");
const galleryNext = document.querySelector(".details-left .nav-btn.next");

let galleryImages = [];
let galleryIndex = 0;
let thumbsStartIndex = 0;
let hasRenderedGallery = false;
let imageSwapTimerId = null;
let thumbsTransitionTimerId = null;
let pendingThumbDirection = 0;

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

function getNumberLocale() {
    return getCurrentLanguage() === "es" ? "es-US" : "en-US";
}

function localizeBody(value) {
    const body = String(value || "");
    const language = getCurrentLanguage();

    if (language === "es") {
        if (body === "Truck") {
            return "Camioneta";
        }
        return body;
    }

    if (body === "Camioneta") {
        return "Truck";
    }

    return body;
}

function localizeFuel(value) {
    const fuel = String(value || "");
    const language = getCurrentLanguage();

    if (language === "es") {
        if (fuel === "Gasoline") {
            return "Gasolina";
        }
        return fuel;
    }

    if (fuel === "Gasolina") {
        return "Gasoline";
    }

    return fuel;
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function formatMileage(value) {
    return `${Number(value || 0).toLocaleString(getNumberLocale())} ${i18nText("inventory.mileageUnit", "MI")}`;
}

function formatCurrency(value) {
    return new Intl.NumberFormat(getNumberLocale(), {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(Number(value || 0));
}

function extractCashDisplay(vehicle) {
    if (typeof vehicle.price === "number" && !Number.isNaN(vehicle.price)) {
        return formatCurrency(vehicle.price);
    }

    const source = String(vehicle.cashText || "");
    const match = source.match(/\$[\d,]+/);
    if (match) {
        return match[0];
    }

    return i18nText("vehicle.contactForPrice", "Contact us");
}

function extractCurrencyToken(source) {
    const match = String(source || "").match(/\$\s?[\d,]+/);
    return match ? match[0].replace(/\s+/g, "") : "";
}

function parseFinancedText(financedText, fallbackPriceText = "") {
    const raw = String(financedText || "").trim();
    const fallbackPrice = extractCurrencyToken(fallbackPriceText);

    if (!raw) {
        return {
            price: "",
            label: i18nText("vehicle.financedWord", "Financed")
        };
    }

    const price = extractCurrencyToken(raw);
    const fallbackLabel = i18nText("vehicle.financedWord", "Financed");

    if (!price) {
        return {
            price: fallbackPrice,
            label: fallbackLabel
        };
    }

    const label = raw.replace(price, "").trim().replace(/^[-,:\s]+|[-,:\s]+$/g, "");
    return {
        price,
        label: label || fallbackLabel
    };
}

function parseDownText(downText) {
    const raw = String(downText || "").trim();
    const fallbackLabel = i18nText("vehicle.downPaymentWord", "Down Payment");
    const onlyWord = i18nText("vehicle.onlyWord", "only");
    const fromWord = i18nText("vehicle.fromWord", "from");

    if (!raw) {
        return {
            hasValue: false,
            qualifier: onlyWord,
            price: "",
            label: fallbackLabel
        };
    }

    const price = extractCurrencyToken(raw);
    const hasFromQualifier = /\b(from|desde)\b/i.test(raw);
    const qualifier = hasFromQualifier ? fromWord : onlyWord;

    if (!price) {
        return {
            hasValue: true,
            qualifier,
            price: "",
            label: raw
        };
    }

    const cleaned = raw
        .replace(price, " ")
        .replace(/\b(from|desde|only|solo)\b/gi, " ")
        .replace(/[,:\-]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    const normalized = cleaned.toLowerCase();
    const shouldUseFallbackLabel = !cleaned || /\b(down|payment|enganche)\b/.test(normalized);

    return {
        hasValue: true,
        qualifier,
        price,
        label: shouldUseFallbackLabel ? fallbackLabel : cleaned
    };
}

function getSimilarVehicles(vehicle, limit = 3) {
    return vehicles
        .filter((candidate) => candidate.id !== vehicle.id)
        .map((candidate) => {
            let score = 0;

            if (candidate.segment && vehicle.segment && candidate.segment === vehicle.segment) {
                score += 100;
            }

            if (candidate.body && vehicle.body && candidate.body === vehicle.body) {
                score += 40;
            }

            if (candidate.make && vehicle.make && candidate.make === vehicle.make) {
                score += 20;
            }

            if (candidate.model && vehicle.model && candidate.model === vehicle.model) {
                score += 10;
            }

            if (typeof candidate.year === "number" && typeof vehicle.year === "number") {
                score -= Math.abs(candidate.year - vehicle.year);
            }

            if (typeof candidate.price === "number" && typeof vehicle.price === "number") {
                score -= Math.abs(candidate.price - vehicle.price) / 1000;
            }

            return { candidate, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map((entry) => entry.candidate);
}

function renderSimilarVehicles(vehicle) {
    if (!similarGrid) {
        return;
    }

    if (!vehicle) {
        similarGrid.innerHTML = "";
        return;
    }

    const similarVehicles = getSimilarVehicles(vehicle, 3);

    similarGrid.innerHTML = similarVehicles
        .map((item) => {
            const href = `vehicle-details.html?id=${encodeURIComponent(item.id)}`;
            const title = escapeHtml(item.title || "Vehicle");
            const price = escapeHtml(extractCashDisplay(item));
            const image = String(item.image || "assets/hero.png");

            return `
                <a class="similar-card" href="${href}">
                    <img src="${image}" alt="${title}" loading="lazy" />
                    <h4>${title}</h4>
                    <p>${price}</p>
                </a>
            `;
        })
        .join("");
}

function getVehicleGallerySources(vehicle) {
    const orderedKeys = Object.keys(vehicle)
        .filter((key) => /^image\d+$/.test(key))
        .sort((a, b) => Number(a.slice(5)) - Number(b.slice(5)));

    const candidates = [vehicle.image, ...orderedKeys.map((key) => vehicle[key])];
    if (Array.isArray(vehicle.images)) {
        candidates.push(...vehicle.images);
    }

    const unique = [];
    const seen = new Set();
    candidates.forEach((item) => {
        const src = String(item || "").trim();
        if (!src || seen.has(src)) {
            return;
        }
        seen.add(src);
        unique.push(src);
    });

    return unique;
}

function buildGallery(vehicle) {
    const maybeGallery = getVehicleGallerySources(vehicle);

    galleryImages = maybeGallery.length ? maybeGallery : ["assets/hero.png"];

    galleryIndex = 0;
    thumbsStartIndex = 0;
    hasRenderedGallery = false;
}

function getVisibleThumbCount() {
    return window.matchMedia("(max-width: 680px)").matches ? 3 : 4;
}

function getVisibleThumbIndices() {
    const total = galleryImages.length;
    if (!total) {
        return [];
    }

    const visibleCount = Math.min(getVisibleThumbCount(), total);
    const indices = [];
    for (let i = 0; i < visibleCount; i += 1) {
        indices.push((thumbsStartIndex + i) % total);
    }
    return indices;
}

function keepActiveThumbVisible() {
    const visible = getVisibleThumbIndices();
    if (!visible.length || visible.includes(galleryIndex)) {
        return;
    }
    thumbsStartIndex = galleryIndex;
}

function renderThumbs(animate = false, direction = 0) {
    if (!thumbsTrack) {
        return;
    }

    if (animate) {
        thumbsTrack.classList.add("is-transitioning");
        if (thumbsTransitionTimerId) {
            window.clearTimeout(thumbsTransitionTimerId);
        }
    }

    const visibleIndices = getVisibleThumbIndices();

    thumbsTrack.innerHTML = visibleIndices
        .map(
            (index) => `
                <button class="thumb ${index === galleryIndex ? "active" : ""}" type="button" data-index="${index}" aria-label="Vista ${index + 1}">
                    <img src="${galleryImages[index]}" alt="Vista ${index + 1}" loading="lazy" />
                </button>
            `
        )
        .join("");

    const canRotate = galleryImages.length > visibleIndices.length;
    if (thumbsPrev) {
        thumbsPrev.disabled = !canRotate;
    }
    if (thumbsNext) {
        thumbsNext.disabled = !canRotate;
    }

    if (animate) {
        const slideOffset = direction === 0 ? 0 : direction > 0 ? 18 : -18;
        const items = Array.from(thumbsTrack.querySelectorAll(".thumb"));

        items.forEach((item, index) => {
            if (!(item instanceof HTMLElement) || typeof item.animate !== "function") {
                return;
            }

            const fromTransform = slideOffset === 0 ? "translateX(0) scale(0.98)" : `translateX(${slideOffset}px) scale(0.96)`;

            item.animate(
                [
                    { opacity: 0, transform: fromTransform },
                    { opacity: 1, transform: "translateX(0) scale(1)" }
                ],
                {
                    duration: 260,
                    delay: index * 24,
                    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                    fill: "both"
                }
            );
        });

        thumbsTransitionTimerId = window.setTimeout(() => {
            thumbsTrack.classList.remove("is-transitioning");
            thumbsTransitionTimerId = null;
        }, 320);
    }
}

function setMainImage(src, alt, animate) {
    if (!detailImage) {
        return;
    }

    const currentSrc = detailImage.getAttribute("src") || "";

    if (!animate || !currentSrc || currentSrc === src) {
        if (imageSwapTimerId) {
            window.clearTimeout(imageSwapTimerId);
            imageSwapTimerId = null;
        }
        detailImage.classList.remove("is-fading-out");
        detailImage.classList.add("is-fading-in");
        detailImage.src = src;
        detailImage.alt = alt;
        return;
    }

    detailImage.classList.remove("is-fading-in");
    detailImage.classList.add("is-fading-out");

    if (imageSwapTimerId) {
        window.clearTimeout(imageSwapTimerId);
    }

    imageSwapTimerId = window.setTimeout(() => {
        detailImage.src = src;
        detailImage.alt = alt;
        detailImage.classList.remove("is-fading-out");
        detailImage.classList.add("is-fading-in");
        imageSwapTimerId = null;
    }, 120);
}

function renderGallery() {
    if (!galleryImages.length) {
        return;
    }

    const shouldAnimate = hasRenderedGallery;
    const previousThumbStart = thumbsStartIndex;
    const nextImage = galleryImages[galleryIndex];
    const nextAlt = detailTitle && detailTitle.textContent ? detailTitle.textContent : "Vehiculo";

    setMainImage(nextImage, nextAlt, shouldAnimate);
    keepActiveThumbVisible();

    const shouldAnimateThumbs = shouldAnimate && previousThumbStart !== thumbsStartIndex;
    renderThumbs(shouldAnimateThumbs, pendingThumbDirection);

    pendingThumbDirection = 0;
    hasRenderedGallery = true;
}

function moveGallery(step) {
    if (!galleryImages.length) {
        return;
    }

    pendingThumbDirection = step;
    galleryIndex = (galleryIndex + step + galleryImages.length) % galleryImages.length;
    renderGallery();
}

function getVehicleSpecs(vehicle) {
    return [
        { icon: "fa-solid fa-car", label: i18nText("vehicle.body", "Body"), value: localizeBody(vehicle.body || "N/A") },
        { icon: "fa-solid fa-calendar-days", label: i18nText("vehicle.year", "Year"), value: vehicle.year ? String(vehicle.year) : "N/A" },
        { icon: "fa-solid fa-road", label: i18nText("vehicle.mileage", "Mileage"), value: vehicle.mileageText || formatMileage(vehicle.mileage) },
        { icon: "fa-solid fa-gears", label: i18nText("vehicle.transmission", "Transmission"), value: vehicle.transmission || i18nText("vehicle.transmissionDefault", "Automatic") },
        { icon: "fa-solid fa-gauge-high", label: i18nText("vehicle.engine", "Engine"), value: vehicle.engine || "N/A" },
        { icon: "fa-solid fa-gas-pump", label: i18nText("vehicle.fuelType", "Fuel type"), value: localizeFuel(vehicle.fuel || "N/A") }
    ];
}

function getVehicleFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) {
        return vehicles[0] || null;
    }
    const selected = vehicles.find((vehicle) => vehicle.id === id);
    return selected || vehicles[0] || null;
}

function renderVehicle(vehicle) {
    if (!vehicle) {
        if (detailTitle) {
            detailTitle.textContent = i18nText("vehicle.notFound", "Vehicle not found");
        }
        if (detailMeta) {
            detailMeta.textContent = "";
        }
        if (detailCash) {
            detailCash.textContent = "";
        }
        if (detailCashLine1) {
            detailCashLine1.textContent = i18nText("vehicle.cashWord", "Cash");
        }
        if (detailCashLine2) {
            detailCashLine2.textContent = i18nText("vehicle.priceWord", "Price");
        }
        if (detailFinanceBox) {
            detailFinanceBox.hidden = true;
        }
        if (detailFinanced) {
            detailFinanced.textContent = "";
        }
        if (detailFinancedLabel) {
            detailFinancedLabel.textContent = i18nText("vehicle.financedWord", "Financed");
        }
        if (detailFinanceBottom) {
            detailFinanceBottom.hidden = true;
        }
        if (detailOnly) {
            detailOnly.textContent = i18nText("vehicle.onlyWord", "only");
        }
        if (detailDownPrice) {
            detailDownPrice.textContent = "";
        }
        if (detailDown) {
            detailDown.textContent = "";
        }
        if (detailSpecsGrid) {
            detailSpecsGrid.innerHTML = "";
        }
        if (detailHighlights) {
            detailHighlights.innerHTML = "";
        }
        if (detailImage) {
            detailImage.src = "assets/hero.png";
            detailImage.alt = "Auto Limited";
        }
        renderSimilarVehicles(null);
        return;
    }

    document.title = `Auto Limited | ${vehicle.title}`;

    const title = vehicle.detailTitle || vehicle.title;
    const cashDisplay = extractCashDisplay(vehicle);
    const mileage = vehicle.mileageText || formatMileage(vehicle.mileage);
    const metaLine = [vehicle.year, mileage].filter(Boolean).join(" • ");

    if (detailTitle) {
        detailTitle.textContent = title;
    }

    if (detailMeta) {
        detailMeta.textContent = metaLine;
    }

    if (detailCash) {
        detailCash.textContent = cashDisplay;
    }

    if (detailCashLine1) {
        detailCashLine1.textContent = i18nText("vehicle.cashWord", "Cash");
    }

    if (detailCashLine2) {
        detailCashLine2.textContent = i18nText("vehicle.priceWord", "Price");
    }

    const financedText = String(vehicle.financedText || "").trim();
    const downText = String(vehicle.downText || "").trim();
    const financedInfo = parseFinancedText(financedText, cashDisplay);
    const downInfo = parseDownText(downText);

    if (detailFinanceBox) {
        detailFinanceBox.hidden = !financedText;
    }

    if (detailFinanced) {
        detailFinanced.textContent = financedInfo.price;
    }

    if (detailFinancedLabel) {
        detailFinancedLabel.textContent = financedInfo.label;
    }

    if (detailFinanceBottom) {
        detailFinanceBottom.hidden = !downInfo.hasValue;
    }

    if (detailOnly) {
        detailOnly.textContent = downInfo.qualifier;
    }

    if (detailDownPrice) {
        detailDownPrice.textContent = downInfo.price;
    }

    if (detailDown) {
        detailDown.textContent = downInfo.label;
    }

    if (detailSpecsGrid) {
        const specs = getVehicleSpecs(vehicle);
        detailSpecsGrid.innerHTML = specs
            .map(
                (item) =>
                    `<article class="spec-item"><span class="spec-icon"><i class="${item.icon}" aria-hidden="true"></i></span><span class="spec-label">${escapeHtml(item.label)}</span><strong class="spec-value">${escapeHtml(item.value)}</strong></article>`
            )
            .join("");
    }

    if (detailHighlights) {
        const rawHighlights = Array.isArray(vehicle.highlights) ? vehicle.highlights.filter(Boolean) : [];
        const highlights = rawHighlights.length
            ? rawHighlights.slice(0, 6)
            : [
                vehicle.specsText || i18nText("vehicle.highlightFallback1", "Inspected unit"),
                i18nText("vehicle.highlightFallback2", "Ready for delivery"),
                i18nText("vehicle.highlightFallback3", "Financing available")
            ];

        detailHighlights.innerHTML = highlights
            .map((item) => `<span class="highlight-pill"><i class="fa-solid fa-check"></i>${escapeHtml(item)}</span>`)
            .join("");
    }

    buildGallery(vehicle);
    renderGallery();
    renderSimilarVehicles(vehicle);
}

if (galleryPrev) {
    galleryPrev.addEventListener("click", () => moveGallery(-1));
}

if (galleryNext) {
    galleryNext.addEventListener("click", () => moveGallery(1));
}

if (thumbsTrack) {
    thumbsTrack.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof Element)) {
            return;
        }

        const button = target.closest(".thumb");
        if (!(button instanceof HTMLElement)) {
            return;
        }

        const index = Number(button.dataset.index);
        if (!Number.isFinite(index) || index < 0 || index >= galleryImages.length) {
            return;
        }

        pendingThumbDirection = index >= galleryIndex ? 1 : -1;
        galleryIndex = index;
        renderGallery();
    });
}

function scrollThumbs(step) {
    if (!galleryImages.length) {
        return;
    }

    thumbsStartIndex = (thumbsStartIndex + step + galleryImages.length) % galleryImages.length;
    renderThumbs(true, step);
}

if (thumbsPrev) {
    thumbsPrev.addEventListener("click", () => scrollThumbs(-1));
}

if (thumbsNext) {
    thumbsNext.addEventListener("click", () => scrollThumbs(1));
}

window.addEventListener("resize", () => {
    renderThumbs(false, 0);
});

renderVehicle(getVehicleFromQuery());

window.addEventListener("autolimited:languagechange", () => {
    renderVehicle(getVehicleFromQuery());
});
