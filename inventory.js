const vehicles = Array.isArray(window.AUTO_LIMITED_VEHICLES) ? window.AUTO_LIMITED_VEHICLES : [];

const STORAGE_VIEW_KEY = "inventoryViewMode";
const ITEMS_PER_PAGE = 9;

const cardsContainer = document.getElementById("inventoryCards");
const resultsCount = document.getElementById("resultsCount");
const noResults = document.getElementById("noResults");
const paginationContainer = document.getElementById("inventoryPagination");
const searchText = document.getElementById("searchText");
const yearFrom = document.getElementById("yearFrom");
const yearTo = document.getElementById("yearTo");
const priceMin = document.getElementById("priceMin");
const priceMax = document.getElementById("priceMax");
const mileageMin = document.getElementById("mileageMin");
const mileageMax = document.getElementById("mileageMax");
const clearFiltersBtn = document.getElementById("clearFiltersBtn");
const viewGridBtn = document.getElementById("viewGridBtn");
const viewListBtn = document.getElementById("viewListBtn");
const segmentButtons = Array.from(document.querySelectorAll(".segment-btn"));
const collapsibleFilterBlocks = Array.from(document.querySelectorAll(".filter-block:not(.filter-block-search)"));

let selectedSegment = "all";
let viewMode = localStorage.getItem(STORAGE_VIEW_KEY) === "list" ? "list" : "grid";
let currentPage = 1;

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

function getCheckedValues(filterName) {
    return Array.from(document.querySelectorAll(`.filter-check[data-filter="${filterName}"]:checked`)).map(
        (checkbox) => checkbox.value
    );
}

function parseNumeric(value) {
    if (value === "") {
        return null;
    }
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
}

function formatPrice(value) {
    return new Intl.NumberFormat(getNumberLocale(), {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(value);
}

function formatMileage(value) {
    return `${value.toLocaleString(getNumberLocale())} ${i18nText("inventory.mileageUnit", "MI")}`;
}

function getCardTitle(vehicle) {
    const rawTitle = String(vehicle.title || "").trim();
    const withoutYear = rawTitle.replace(/^\d{4}\s+/, "").trim();
    return withoutYear || rawTitle;
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function extractCurrencyToken(source) {
    const match = String(source || "").match(/\$\s?[\d,]+/);
    return match ? match[0].replace(/\s+/g, "") : "";
}

function parseCardDownText(downText) {
    const raw = String(downText || "").trim();
    if (!raw) {
        return {
            hasValue: false,
            text: ""
        };
    }

    const price = extractCurrencyToken(raw);
    if (!price) {
        return {
            hasValue: true,
            text: raw
        };
    }

    const onlyWord = i18nText("vehicle.onlyWord", "only");
    const fromWord = i18nText("vehicle.fromWord", "from");
    const downLabel = i18nText("vehicle.downPaymentWord", "Down Payment");
    const qualifier = /\b(from|desde)\b/i.test(raw) ? fromWord : onlyWord;

    const cleaned = raw
        .replace(price, " ")
        .replace(/\b(from|desde|only|solo)\b/gi, " ")
        .replace(/[,:\-]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    const normalized = cleaned.toLowerCase();
    const label = !cleaned || /\b(down|payment|enganche)\b/.test(normalized)
        ? downLabel
        : cleaned;

    return {
        hasValue: true,
        text: `${qualifier} ${price} ${label}`.replace(/\s+/g, " ").trim()
    };
}

function parseCardFinancedText(vehicle) {
    const raw = String(vehicle.financedText || "").trim();
    if (!raw) {
        return "";
    }

    const price = extractCurrencyToken(raw);
    if (price) {
        return raw;
    }

    const fallbackPrice =
        typeof vehicle.price === "number" && Number.isFinite(vehicle.price)
            ? formatPrice(vehicle.price)
            : extractCurrencyToken(vehicle.cashText || "");

    const financedWord = i18nText("vehicle.financedWord", "Financed");
    return fallbackPrice ? `${fallbackPrice} ${financedWord}` : financedWord;
}

function getCardFinancingHtml(vehicle) {
    const financedText = parseCardFinancedText(vehicle);
    const downText = String(vehicle.downText || "").trim();

    if (!financedText) {
        return "";
    }

    const downInfo = parseCardDownText(downText);
    const downHtml = downInfo.hasValue
        ? `<p class="inventory-card-finance-down">${escapeHtml(downInfo.text)}</p>`
        : "";

    return `
      <div class="inventory-card-finance">
        <p class="inventory-card-finance-main">${escapeHtml(financedText)}</p>
        ${downHtml}
      </div>
    `;
}

function updateViewButtons() {
    viewGridBtn.classList.toggle("is-active", viewMode === "grid");
    viewListBtn.classList.toggle("is-active", viewMode === "list");
}

function updateSegmentButtons() {
    segmentButtons.forEach((button) => {
        button.classList.toggle("is-active", button.dataset.segment === selectedSegment);
    });
}

function setViewMode(nextMode) {
    viewMode = nextMode;
    localStorage.setItem(STORAGE_VIEW_KEY, viewMode);
    cardsContainer.classList.toggle("list-view", viewMode === "list");
    updateViewButtons();
}

function updateFilterBlockState(block, isOpen) {
    const icon = block.querySelector(".filter-head .material-symbols-outlined");
    block.classList.toggle("is-open", isOpen);
    if (icon) {
        icon.textContent = isOpen ? "expand_less" : "expand_more";
    }
}

function initFilterPanels() {
    collapsibleFilterBlocks.forEach((block) => {
        const head = block.querySelector(".filter-head");
        const body = block.querySelector(".filter-body");
        if (!head || !body) {
            return;
        }
        updateFilterBlockState(block, false);
        head.addEventListener("click", () => {
            updateFilterBlockState(block, !block.classList.contains("is-open"));
        });
    });
}

function renderPagination(totalItems, totalPages) {
    if (!paginationContainer) {
        return;
    }

    if (totalItems <= ITEMS_PER_PAGE || totalPages <= 1) {
        paginationContainer.hidden = true;
        paginationContainer.innerHTML = "";
        return;
    }

    paginationContainer.hidden = false;
    const parts = [];
    parts.push(`<button class="page-btn" data-page="${currentPage - 1}" ${currentPage === 1 ? "disabled" : ""} type="button">&lsaquo;</button>`);
    for (let page = 1; page <= totalPages; page += 1) {
        parts.push(`<button class="page-btn ${page === currentPage ? "is-active" : ""}" data-page="${page}" type="button">${page}</button>`);
    }
    parts.push(`<button class="page-btn" data-page="${currentPage + 1}" ${currentPage === totalPages ? "disabled" : ""} type="button">&rsaquo;</button>`);
    paginationContainer.innerHTML = parts.join("");

    Array.from(paginationContainer.querySelectorAll(".page-btn[data-page]")).forEach((button) => {
        button.addEventListener("click", () => {
            const nextPage = Number(button.dataset.page);
            if (!Number.isFinite(nextPage) || nextPage < 1 || nextPage > totalPages || nextPage === currentPage) {
                return;
            }
            currentPage = nextPage;
            renderInventory();
        });
    });
}

function createCard(vehicle) {
    const cardTitle = getCardTitle(vehicle);
    const financingHtml = getCardFinancingHtml(vehicle);

    return `
    <article class="inventory-card">
      <div class="inventory-card-media">
        <img src="${vehicle.image}" alt="${vehicle.title}">
      </div>
      <div class="inventory-card-body">
        <div class="inventory-card-top">
                    <h3>${cardTitle}</h3>
          <span class="inventory-card-price">${formatPrice(vehicle.price)}</span>
        </div>
                ${financingHtml}
        <div class="inventory-card-meta">
          <span>${vehicle.year}</span>
                    <span>${localizeBody(vehicle.body)}</span>
                    <span>${localizeFuel(vehicle.fuel)}</span>
          <span>${formatMileage(vehicle.mileage)}</span>
        </div>
        <p class="inventory-card-engine">${vehicle.engine}</p>
                <a class="inventory-card-btn" href="vehicle-details.html?id=${encodeURIComponent(vehicle.id)}">${i18nText("inventory.viewDetails", "View details")}</a>
      </div>
    </article>
  `;
}

function vehicleMatches(vehicle) {
    if (selectedSegment !== "all" && vehicle.segment !== selectedSegment) {
        return false;
    }

    const search = searchText.value.trim().toLowerCase();
    if (search) {
        const content = [vehicle.title, vehicle.make, vehicle.model, vehicle.body, vehicle.fuel]
            .join(" ")
            .toLowerCase();
        if (!content.includes(search)) {
            return false;
        }
    }

    const makes = getCheckedValues("make");
    if (makes.length > 0 && !makes.includes(vehicle.make)) {
        return false;
    }

    const models = getCheckedValues("model");
    if (models.length > 0 && !models.some((model) => vehicle.model.toLowerCase().includes(model.toLowerCase()))) {
        return false;
    }

    const bodies = getCheckedValues("body");
    if (bodies.length > 0 && !bodies.includes(vehicle.body)) {
        return false;
    }

    const fuels = getCheckedValues("fuel");
    if (fuels.length > 0 && !fuels.includes(vehicle.fuel)) {
        return false;
    }

    const minYear = parseNumeric(yearFrom.value);
    const maxYear = parseNumeric(yearTo.value);
    if (minYear !== null && vehicle.year < minYear) {
        return false;
    }
    if (maxYear !== null && vehicle.year > maxYear) {
        return false;
    }

    const minPrice = parseNumeric(priceMin.value);
    const maxPrice = parseNumeric(priceMax.value);
    if (minPrice !== null && vehicle.price < minPrice) {
        return false;
    }
    if (maxPrice !== null && vehicle.price > maxPrice) {
        return false;
    }

    const minMileage = parseNumeric(mileageMin.value);
    const maxMileage = parseNumeric(mileageMax.value);
    if (minMileage !== null && vehicle.mileage < minMileage) {
        return false;
    }
    if (maxMileage !== null && vehicle.mileage > maxMileage) {
        return false;
    }

    return true;
}

function renderInventory() {
    const filteredVehicles = vehicles.filter(vehicleMatches);
    const totalResults = filteredVehicles.length;
    const totalPages = Math.max(1, Math.ceil(totalResults / ITEMS_PER_PAGE));
    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    const pageStart = (currentPage - 1) * ITEMS_PER_PAGE;
    const pageEnd = pageStart + ITEMS_PER_PAGE;
    const pageVehicles = filteredVehicles.slice(pageStart, pageEnd);

    cardsContainer.innerHTML = pageVehicles.map(createCard).join("");
    noResults.hidden = totalResults > 0;
    const resultWord = totalResults === 1
        ? i18nText("inventory.resultSingular", "result")
        : i18nText("inventory.resultPlural", "results");
    resultsCount.textContent = `${totalResults} ${resultWord}`;
    cardsContainer.classList.toggle("list-view", viewMode === "list");
    renderPagination(totalResults, totalPages);
}

function applyFiltersFromFirstPage() {
    currentPage = 1;
    renderInventory();
}

function clearFilters() {
    document.querySelectorAll(".filter-check").forEach((checkbox) => {
        checkbox.checked = false;
    });
    searchText.value = "";
    yearFrom.value = "";
    yearTo.value = "";
    priceMin.value = "";
    priceMax.value = "";
    mileageMin.value = "";
    mileageMax.value = "";
    selectedSegment = "all";
    updateSegmentButtons();
    applyFiltersFromFirstPage();
}

function bindEvents() {
    document.querySelectorAll(".filter-check").forEach((checkbox) => {
        checkbox.addEventListener("change", applyFiltersFromFirstPage);
    });

    searchText.addEventListener("input", applyFiltersFromFirstPage);
    yearFrom.addEventListener("change", () => {
        if (yearFrom.value && yearTo.value && Number(yearFrom.value) > Number(yearTo.value)) {
            yearTo.value = yearFrom.value;
        }
        applyFiltersFromFirstPage();
    });
    yearTo.addEventListener("change", () => {
        if (yearFrom.value && yearTo.value && Number(yearTo.value) < Number(yearFrom.value)) {
            yearFrom.value = yearTo.value;
        }
        applyFiltersFromFirstPage();
    });

    [priceMin, priceMax, mileageMin, mileageMax].forEach((input) => {
        input.addEventListener("input", applyFiltersFromFirstPage);
    });

    clearFiltersBtn.addEventListener("click", clearFilters);

    segmentButtons.forEach((button) => {
        button.addEventListener("click", () => {
            selectedSegment = button.dataset.segment;
            updateSegmentButtons();
            applyFiltersFromFirstPage();
        });
    });

    viewGridBtn.addEventListener("click", () => {
        setViewMode("grid");
    });

    viewListBtn.addEventListener("click", () => {
        setViewMode("list");
    });
}

function initInventory() {
    if (!cardsContainer) {
        return;
    }

    initFilterPanels();
    updateSegmentButtons();
    setViewMode(viewMode);
    bindEvents();
    renderInventory();

    window.addEventListener("autolimited:languagechange", () => {
        renderInventory();
    });
}

initInventory();
