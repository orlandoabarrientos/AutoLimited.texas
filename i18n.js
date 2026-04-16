(() => {
    const STORAGE_KEY = "autoLimitedLanguage";
    const DEFAULT_LANGUAGE = "en";
    const SUPPORTED_LANGUAGES = ["en", "es"];

    const translations = {
        en: {
            "index.pageTitle": "Auto Limited",
            "nav.requestCall": "Pre-Approval",
            "nav.inventory": "Inventory",
            "nav.contactUs": "Contact Us",
            "nav.languageLabel": "EN / ES",
            "nav.english": "English",
            "nav.spanish": "Spanish",

            "footer.quickLinks": "Quick Links__",
            "footer.contactUs": "CONTACT US",
            "footer.inventory": "INVENTORY",
            "footer.requestCall": "PRE-APPROVAL",
            "footer.alliances": "Alliances__",
            "footer.contactDetails": "Contact Details__",
            "footer.addressLabel": "Address:",
            "footer.addressValue": "7414 Mansfield Hwy. Ste 204. Kennedale, Texas 76060",
            "footer.emailLabel": "E-mail:",
            "footer.phoneLabel": "Phone:",
            "footer.hoursLabel": "Business Hours:",
            "footer.hoursValue": "Monday to Saturday 10:00 am - 7:00 pm",

            "index.heroTitle": "ARE YOU READY?",
            "index.heroSubtitle": "FINANCE OPTION AVAILABLE",
            "index.heroCta": "Get Pre-Approval",
            "index.salesTitle": "YOUR WAY TO DRIVE",
            "index.reviewsTitle": "reviews",
            "index.salesCashTitle": "CASH DEALS",
            "index.salesCashText": "We offer excellent cash prices and handle the full process for you. It includes vehicle registration, plates, and state taxes. We take care of all paperwork so you do not have to worry. Your vehicle can be ready to drive the same day.",
            "index.salesBankTitle": "BANK FINANCING",
            "index.salesBankText": "We have partnerships with great banks to help you buy your vehicle with competitive options that fit your budget. We help you get a good rate and comfortable monthly payments. This financing can also help you build or improve your credit.",
            "index.salesInHouseTitle": "BUY HERE, PAY HERE (IN-HOUSE FINANCING)",
            "index.salesInHouseText": "No credit? No problem. We can help. We offer in-house financing on selected vehicles with few requirements and a fast process. We handle all paperwork, and with your ID you can drive out the same day.",

            "contact.pageTitle": "Auto Limited | Contact",
            "contact.heroTitle": "CONTACT & REQUEST A CALL",
            "contact.heroSubtitle": "Experience the Auto Limited difference. Let us assist you.",
            "contact.formTitle": "Request a Call",
            "contact.fullName": "Full Name",
            "contact.phone": "Phone Number",
            "contact.email": "Email Address",
            "contact.preferredTime": "Preferred Contact Time",
            "contact.vehicleInterest": "Vehicle Interest",
            "contact.vehicleInterestPlaceholder": "Vehicle Interest",
            "contact.vehicleBoxTruck": "Box Truck",
            "contact.vehicleCargoVan": "Cargo Van",
            "contact.vehiclePickup": "Pickup Truck",
            "contact.vehicleSedan": "Sedan",
            "contact.vehicleSuv": "SUV",
            "contact.vehicleOther": "Other",
            "contact.submit": "Submit Request",
            "contact.detailsTitle": "Contact Details",
            "contact.addressLabel": "Address",
            "contact.addressValue": "7414 Mansfield Hwy. Ste 204. Kennedale, Texas 76060",
            "contact.phonesLabel": "Phones",
            "contact.emailLabel": "Email",
            "contact.facebookPage": "Facebook Page",
            "contact.openMap": "Open in Google Maps",
            "contact.errorRequired": "Please complete all required fields.",
            "contact.errorSend": "Unable to send right now. Please try again in a few minutes.",
            "contact.sending": "Sending...",
            "contact.success": "Request submitted successfully. We will contact you soon.",

            "preapprove.pageTitle": "Auto Limited | Pre-Approval",
            "preapprove.title": "PRE APPROVAL / APPLY HERE",
            "preapprove.personalTitle": "Personal Information",
            "preapprove.residenceTitle": "Residence Information",
            "preapprove.employmentTitle": "Employment Information",
            "preapprove.incomeTitle": "Income Information",
            "preapprove.firstName": "First Name",
            "preapprove.middleName": "Middle Name",
            "preapprove.lastName": "Last Name",
            "preapprove.ssn": "SSN/ITIN",
            "preapprove.noSsn": "No SSN / ITIN",
            "preapprove.dob": "Date of Birth",
            "preapprove.idType": "ID Type",
            "preapprove.idState": "ID State",
            "preapprove.idCountry": "ID Country",
            "preapprove.idNumber": "ID Number",
            "preapprove.street": "Street",
            "preapprove.city": "City",
            "preapprove.state": "State",
            "preapprove.zip": "Zip",
            "preapprove.residenceType": "Residence Type",
            "preapprove.rentMortgage": "Rent/Mortgage",
            "preapprove.lengthAtAddress": "Length At Address",
            "preapprove.years": "years",
            "preapprove.months": "months",
            "preapprove.idOptionDefault": "Select",
            "preapprove.idOptionLicense": "US Driver's License",
            "preapprove.idOptionPassport": "US Passport",
            "preapprove.idOptionCard": "US ID Card",
            "preapprove.idOptionForeign": "Foreign ID",
            "preapprove.idHelp": "Foreign ID can include Passport, Consular ID, or employment authorization.",
            "preapprove.residenceOptionDefault": "Select",
            "preapprove.residenceOptionRent": "Rent",
            "preapprove.residenceOptionOwn": "Own Outright",
            "preapprove.residenceOptionOther": "Other",
            "preapprove.residenceOptionMortgage": "Mortgage",
            "preapprove.residenceOptionFamily": "Family",
            "preapprove.residenceOptionMilitary": "Military",
            "preapprove.employmentType": "Employment Type",
            "preapprove.employerName": "Employer Name",
            "preapprove.employerPhone": "Employer Phone",
            "preapprove.lengthAtJob": "Length At Job",
            "preapprove.employmentOptionDefault": "Select",
            "preapprove.employmentOptionFull": "Employed - FullTime",
            "preapprove.employmentOptionPart": "Employed - PartTime",
            "preapprove.employmentOptionTemp": "Temporary/Seasonal",
            "preapprove.employmentOptionMilitary": "Active Military",
            "preapprove.employmentOptionRetired": "SSI/Retired",
            "preapprove.employmentOptionSelf": "Self Employed",
            "preapprove.employmentOptionUnemployed": "Unemployed",
            "preapprove.incomeType": "Income Type",
            "preapprove.monthlyIncome": "Monthly Income",
            "preapprove.incomeOptionDefault": "Select",
            "preapprove.incomeOptionW2": "W2",
            "preapprove.incomeOptionSelf": "Self Employed",
            "preapprove.incomeOptionBusiness": "Self Employed Business",
            "preapprove.incomeOptionTurbo": "Turbo Pass",
            "preapprove.incomeOptionFixed": "Fixed Income",
            "preapprove.incomeOptionCash": "Cash Income",
            "preapprove.incomeOptionMilitary": "Military",
            "preapprove.vehicleInterest": "Vehicle of interest",
            "preapprove.vehicleInterestPlaceholder": "Select a vehicle",
            "preapprove.confirm": "Confirm all above is correct and acknowledge you have signed credit app",
            "preapprove.submit": "Submit Application",
            "preapprove.success": "Application submitted successfully. We will contact you soon.",
            "preapprove.errorSend": "Unable to send right now. Please try again in a few minutes.",
            "preapprove.sending": "Sending...",
            "preapprove.errorRequired": "This field is required.",
            "preapprove.errorConfirm": "You must confirm before submitting.",
            "preapprove.errorReview": "Please complete all required fields.",

            "inventory.pageTitle": "Auto Limited | Inventory",
            "inventory.refineSearch": "REFINE YOUR SEARCH",
            "inventory.searchLabel": "Search",
            "inventory.searchPlaceholder": "Search by text",
            "inventory.filterMake": "Make",
            "inventory.filterModel": "Model",
            "inventory.filterBody": "Body",
            "inventory.filterYear": "Year",
            "inventory.filterPrice": "Price",
            "inventory.filterMileage": "Mileage",
            "inventory.filterFuelType": "Fuel Type",
            "inventory.fuelDiesel": "Diesel",
            "inventory.fuelGasoline": "Gasoline",
            "inventory.yearFrom": "From",
            "inventory.yearTo": "To",
            "inventory.min": "Min",
            "inventory.max": "Max",
            "inventory.clearFilters": "Clear filters",
            "inventory.segmentAll": "All Vehicles",
            "inventory.segmentCommercial": "Commercial Vehicles",
            "inventory.segmentPassenger": "Passenger Vehicles",
            "inventory.gridViewAria": "Grid view",
            "inventory.gridViewTitle": "Grid view",
            "inventory.listViewAria": "List view",
            "inventory.listViewTitle": "List view",
            "inventory.noResults": "No vehicles found with those filters.",
            "inventory.resultSingular": "result",
            "inventory.resultPlural": "results",
            "inventory.viewDetails": "View details",
            "inventory.mileageUnit": "MI",

            "vehicle.selection": "Auto Limited Selection",
            "vehicle.pageTitle": "Auto Limited | Vehicle Details",
            "vehicle.priceLabel": "Price",
            "vehicle.preApproval": "Pre-Approval",
            "vehicle.features": "Features",
            "vehicle.highlights": "Highlights",
            "vehicle.similarVehicles": "SIMILAR VEHICLES",
            "vehicle.notFound": "Vehicle not found",
            "vehicle.cashPrice": "Cash Price",
            "vehicle.listedPrice": "Listed price",
            "vehicle.body": "Body",
            "vehicle.year": "Year",
            "vehicle.mileage": "Mileage",
            "vehicle.transmission": "Transmission",
            "vehicle.engine": "Engine",
            "vehicle.fuelType": "Fuel type",
            "vehicle.transmissionDefault": "Automatic",
            "vehicle.contactForPrice": "Contact us",
            "vehicle.cashWord": "Cash",
            "vehicle.priceWord": "Price",
            "vehicle.financedWord": "Financed",
            "vehicle.onlyWord": "only",
            "vehicle.fromWord": "from",
            "vehicle.downPaymentWord": "Down Payment",
            "vehicle.soldLabel": "SOLD",
            "vehicle.highlightFallback1": "Inspected unit",
            "vehicle.highlightFallback2": "Ready for delivery",
            "vehicle.highlightFallback3": "Financing available"
        },
        es: {
            "index.pageTitle": "Auto Limited",
            "nav.requestCall": "Pre-Aprobacion",
            "nav.inventory": "Inventario",
            "nav.contactUs": "Contactanos",
            "nav.languageLabel": "EN / ES",
            "nav.english": "Ingles",
            "nav.spanish": "Espanol",

            "footer.quickLinks": "Enlaces Rapidos__",
            "footer.contactUs": "CONTACTANOS",
            "footer.inventory": "INVENTARIO",
            "footer.requestCall": "PRE-APROBACION",
            "footer.alliances": "Alianzas__",
            "footer.contactDetails": "Datos de Contacto__",
            "footer.addressLabel": "Direccion:",
            "footer.addressValue": "7414 Mansfield Hwy. Ste 204. Kennedale, Texas 76060",
            "footer.emailLabel": "Correo:",
            "footer.phoneLabel": "Telefono:",
            "footer.hoursLabel": "Horario:",
            "footer.hoursValue": "Lunes a Sabado 10:00 am - 7:00 pm",

            "index.heroTitle": "ESTAS LISTO?",
            "index.heroSubtitle": "OPCION DE FINANCIAMIENTO DISPONIBLE",
            "index.heroCta": "Pre-Aprobacion",
            "index.salesTitle": "TIPOS DE VENTA",
            "index.reviewsTitle": "reviews",
            "index.salesCashTitle": "VENTAS AL CONTADO - CASH DEALS",
            "index.salesCashText": "Ofrecemos excelentes precios en compras de contado y nos encargamos de todo el proceso por ti. Incluye registro del vehiculo, placas y taxes requeridos por el estado. Nos ocupamos de todo el papeleo para que no tengas que preocuparte por nada. Tu vehiculo estara listo para manejar el mismo dia.",
            "index.salesBankTitle": "BANK FINANCING - FINANCIAMIENTO BANCARIO",
            "index.salesBankText": "Contamos con alianzas con excelentes bancos para ayudarte a comprar tu vehiculo con opciones competitivas que se ajustan a tu presupuesto. Te ayudamos a conseguir un buen rate y estructurar pagos comodos. Ademas, este tipo de financiamiento te permite construir o mejorar tu credito.",
            "index.salesInHouseTitle": "BUY HERE, PAY HERE (IN-HOUSE FINANCING) - FINANCIAMIENTO EN CASA",
            "index.salesInHouseText": "Si no tienes credito, no hay problema. Nosotros te ayudamos. Ofrecemos opciones de financiamiento en casa en vehiculos seleccionados, con pocos requisitos y un proceso rapido. Nos encargamos de todo el papeleo y con solo tu ID puedes salir manejando el mismo dia.",

            "contact.pageTitle": "Auto Limited | Contacto",
            "contact.heroTitle": "CONTACTO Y SOLICITUD DE LLAMADA",
            "contact.heroSubtitle": "Vive la diferencia de Auto Limited. Estamos para ayudarte.",
            "contact.formTitle": "Solicitar Llamada",
            "contact.fullName": "Nombre Completo",
            "contact.phone": "Numero de Telefono",
            "contact.email": "Correo Electronico",
            "contact.preferredTime": "Horario Preferido de Contacto",
            "contact.vehicleInterest": "Interes de Vehiculo",
            "contact.vehicleInterestPlaceholder": "Interes de Vehiculo",
            "contact.vehicleBoxTruck": "Box Truck",
            "contact.vehicleCargoVan": "Cargo Van",
            "contact.vehiclePickup": "Pickup",
            "contact.vehicleSedan": "Sedan",
            "contact.vehicleSuv": "SUV",
            "contact.vehicleOther": "Otro",
            "contact.submit": "Enviar Solicitud",
            "contact.detailsTitle": "Detalles de Contacto",
            "contact.addressLabel": "Direccion",
            "contact.addressValue": "7414 Mansfield Hwy. Ste 204. Kennedale, Texas 76060",
            "contact.phonesLabel": "Telefonos",
            "contact.emailLabel": "Correo",
            "contact.facebookPage": "Pagina de Facebook",
            "contact.openMap": "Abrir en Google Maps",
            "contact.errorRequired": "Completa todos los campos obligatorios.",
            "contact.errorSend": "No se pudo enviar en este momento. Intentalo de nuevo en unos minutos.",
            "contact.sending": "Enviando...",
            "contact.success": "Solicitud enviada correctamente. Te contactaremos pronto.",

            "preapprove.pageTitle": "Auto Limited | Pre-Aprobacion",
            "preapprove.title": "PRE APROBACION / APLICA AQUI",
            "preapprove.personalTitle": "Informacion Personal",
            "preapprove.residenceTitle": "Informacion de Residencia",
            "preapprove.employmentTitle": "Informacion Laboral",
            "preapprove.incomeTitle": "Informacion de Ingresos",
            "preapprove.firstName": "Primer Nombre",
            "preapprove.middleName": "Segundo Nombre",
            "preapprove.lastName": "Apellido",
            "preapprove.ssn": "SSN/ITIN",
            "preapprove.noSsn": "No tengo SSN / ITIN",
            "preapprove.dob": "Fecha de Nacimiento",
            "preapprove.idType": "Tipo de ID",
            "preapprove.idState": "Estado de ID",
            "preapprove.idCountry": "Pais de ID",
            "preapprove.idNumber": "Numero de ID",
            "preapprove.street": "Direccion",
            "preapprove.city": "Ciudad",
            "preapprove.state": "Estado",
            "preapprove.zip": "Zip",
            "preapprove.residenceType": "Tipo de Residencia",
            "preapprove.rentMortgage": "Renta/Hipoteca",
            "preapprove.lengthAtAddress": "Tiempo en Direccion",
            "preapprove.years": "anos",
            "preapprove.months": "meses",
            "preapprove.idOptionDefault": "Seleccionar",
            "preapprove.idOptionLicense": "Licencia de Conducir USA",
            "preapprove.idOptionPassport": "Pasaporte USA",
            "preapprove.idOptionCard": "ID de USA",
            "preapprove.idOptionForeign": "ID Extranjero",
            "preapprove.idHelp": "ID extranjero puede ser Pasaporte, Consular ID o autorizacion de empleo.",
            "preapprove.residenceOptionDefault": "Seleccionar",
            "preapprove.residenceOptionRent": "Renta",
            "preapprove.residenceOptionOwn": "Casa Pagada",
            "preapprove.residenceOptionOther": "Otro",
            "preapprove.residenceOptionMortgage": "Hipoteca",
            "preapprove.residenceOptionFamily": "Familia",
            "preapprove.residenceOptionMilitary": "Militar",
            "preapprove.employmentType": "Tipo de Empleo",
            "preapprove.employerName": "Nombre del Empleador",
            "preapprove.employerPhone": "Telefono del Empleador",
            "preapprove.lengthAtJob": "Tiempo en Empleo",
            "preapprove.employmentOptionDefault": "Seleccionar",
            "preapprove.employmentOptionFull": "Empleado - Tiempo Completo",
            "preapprove.employmentOptionPart": "Empleado - Medio Tiempo",
            "preapprove.employmentOptionTemp": "Temporal/Estacional",
            "preapprove.employmentOptionMilitary": "Militar Activo",
            "preapprove.employmentOptionRetired": "SSI/Retirado",
            "preapprove.employmentOptionSelf": "Autoempleado",
            "preapprove.employmentOptionUnemployed": "Desempleado",
            "preapprove.incomeType": "Tipo de Ingreso",
            "preapprove.monthlyIncome": "Ingreso Mensual",
            "preapprove.incomeOptionDefault": "Seleccionar",
            "preapprove.incomeOptionW2": "W2",
            "preapprove.incomeOptionSelf": "Autoempleado",
            "preapprove.incomeOptionBusiness": "Negocio Propio",
            "preapprove.incomeOptionTurbo": "Turbo Pass",
            "preapprove.incomeOptionFixed": "Ingreso Fijo",
            "preapprove.incomeOptionCash": "Ingreso en Efectivo",
            "preapprove.incomeOptionMilitary": "Militar",
            "preapprove.vehicleInterest": "Carro de interes",
            "preapprove.vehicleInterestPlaceholder": "Selecciona un carro",
            "preapprove.confirm": "Confirmo que toda la informacion anterior es correcta y reconozco que he firmado la solicitud de credito",
            "preapprove.submit": "Enviar Solicitud",
            "preapprove.success": "Solicitud enviada correctamente. Te contactaremos pronto.",
            "preapprove.errorSend": "No se pudo enviar en este momento. Intentalo de nuevo en unos minutos.",
            "preapprove.sending": "Enviando...",
            "preapprove.errorRequired": "Este campo es obligatorio.",
            "preapprove.errorConfirm": "Debes confirmar antes de enviar.",
            "preapprove.errorReview": "Completa todos los campos obligatorios.",

            "inventory.pageTitle": "Auto Limited | Inventario",
            "inventory.refineSearch": "AFINA TU BUSQUEDA",
            "inventory.searchLabel": "Busqueda",
            "inventory.searchPlaceholder": "Buscar por texto",
            "inventory.filterMake": "Marca",
            "inventory.filterModel": "Modelo",
            "inventory.filterBody": "Carroceria",
            "inventory.filterYear": "Ano",
            "inventory.filterPrice": "Precio",
            "inventory.filterMileage": "Millaje",
            "inventory.filterFuelType": "Tipo de combustible",
            "inventory.fuelDiesel": "Diesel",
            "inventory.fuelGasoline": "Gasolina",
            "inventory.yearFrom": "Desde",
            "inventory.yearTo": "Hasta",
            "inventory.min": "Min",
            "inventory.max": "Max",
            "inventory.clearFilters": "Limpiar filtros",
            "inventory.segmentAll": "Todos los vehiculos",
            "inventory.segmentCommercial": "Vehiculos comerciales",
            "inventory.segmentPassenger": "Vehiculos de pasajeros",
            "inventory.gridViewAria": "Vista cuadricula",
            "inventory.gridViewTitle": "Vista cuadricula",
            "inventory.listViewAria": "Vista en lista",
            "inventory.listViewTitle": "Vista en lista",
            "inventory.noResults": "No se encontraron vehiculos con esos filtros.",
            "inventory.resultSingular": "resultado",
            "inventory.resultPlural": "resultados",
            "inventory.viewDetails": "Ver mas detalles",
            "inventory.mileageUnit": "MI",

            "vehicle.selection": "Seleccion Auto Limited",
            "vehicle.pageTitle": "Auto Limited | Detalle de Vehiculo",
            "vehicle.priceLabel": "Precio",
            "vehicle.preApproval": "Pre-Aprobacion",
            "vehicle.features": "Caracteristicas",
            "vehicle.highlights": "Destacados",
            "vehicle.similarVehicles": "VEHICULOS SIMILARES",
            "vehicle.notFound": "Vehiculo no encontrado",
            "vehicle.cashPrice": "Precio de contado",
            "vehicle.listedPrice": "Precio publicado",
            "vehicle.body": "Carroceria",
            "vehicle.year": "Ano",
            "vehicle.mileage": "Millaje",
            "vehicle.transmission": "Transmision",
            "vehicle.engine": "Motor",
            "vehicle.fuelType": "Tipo de combustible",
            "vehicle.transmissionDefault": "Automatico",
            "vehicle.contactForPrice": "Consultar",
            "vehicle.cashWord": "Cash",
            "vehicle.priceWord": "Price",
            "vehicle.financedWord": "Financiado",
            "vehicle.onlyWord": "solo",
            "vehicle.fromWord": "desde",
            "vehicle.downPaymentWord": "Down Payment",
            "vehicle.soldLabel": "VENDIDO",
            "vehicle.highlightFallback1": "Unidad revisada",
            "vehicle.highlightFallback2": "Lista para entrega",
            "vehicle.highlightFallback3": "Financiamiento disponible"
        }
    };

    function isValidLanguage(language) {
        return SUPPORTED_LANGUAGES.includes(language);
    }

    function readStoredLanguage() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return isValidLanguage(stored) ? stored : DEFAULT_LANGUAGE;
        } catch {
            return DEFAULT_LANGUAGE;
        }
    }

    let currentLanguage = readStoredLanguage();

    function t(key, fallback = "") {
        const currentDictionary = translations[currentLanguage] || translations[DEFAULT_LANGUAGE];
        const defaultDictionary = translations[DEFAULT_LANGUAGE];

        if (Object.prototype.hasOwnProperty.call(currentDictionary, key)) {
            return currentDictionary[key];
        }

        if (Object.prototype.hasOwnProperty.call(defaultDictionary, key)) {
            return defaultDictionary[key];
        }

        return fallback || key;
    }

    function applyTranslations(root = document) {
        if (!root) {
            return;
        }

        root.querySelectorAll("[data-i18n]").forEach((element) => {
            const key = element.dataset.i18n;
            element.textContent = t(key, element.textContent || "");
        });

        root.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
            const key = element.dataset.i18nPlaceholder;
            element.setAttribute("placeholder", t(key, element.getAttribute("placeholder") || ""));
        });

        root.querySelectorAll("[data-i18n-title]").forEach((element) => {
            const key = element.dataset.i18nTitle;
            element.setAttribute("title", t(key, element.getAttribute("title") || ""));
        });

        root.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
            const key = element.dataset.i18nAriaLabel;
            element.setAttribute("aria-label", t(key, element.getAttribute("aria-label") || ""));
        });

        document.documentElement.lang = currentLanguage;
    }

    function emitLanguageChange() {
        window.dispatchEvent(
            new CustomEvent("autolimited:languagechange", {
                detail: { language: currentLanguage }
            })
        );
    }

    function setLanguage(language) {
        if (!isValidLanguage(language) || language === currentLanguage) {
            return;
        }

        currentLanguage = language;

        try {
            localStorage.setItem(STORAGE_KEY, currentLanguage);
        } catch { }

        applyTranslations(document);
        emitLanguageChange();
    }

    function getLanguage() {
        return currentLanguage;
    }

    window.AutoLimitedI18n = {
        t,
        setLanguage,
        getLanguage,
        applyTranslations
    };

    function initializeI18n() {
        applyTranslations(document);
        emitLanguageChange();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeI18n, { once: true });
    } else {
        initializeI18n();
    }
})();
