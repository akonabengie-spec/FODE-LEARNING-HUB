/* ==================================================
   FODE OFFLINE LEARNING HUB
   Shared JavaScript
   File: js/script.js

   IMPORTANT:
   - data.js must load before this file.
   - This file contains shared website functionality.
   - Grade, subject, unit, and PDF data remain in data.js.
================================================== */


/* ==================================================
   CHECK CENTRAL DATA SYSTEM
================================================== */

if (typeof FODE_DATA === "undefined") {
    console.error(
        "FODE_DATA was not found. Make sure js/data.js loads before js/script.js."
    );
} else {

    document.addEventListener("DOMContentLoaded", function () {

        initializeWebsite();

    });

}


/* ==================================================
   INITIALIZE WEBSITE
================================================== */

function initializeWebsite() {

    updateWebsiteInformation();

    setupMobileNavigation();

    generateHomeGradePreview();

    updateFooterYear();

}


/* ==================================================
   UPDATE WEBSITE INFORMATION
   Reads information from data.js
================================================== */

function updateWebsiteInformation() {

    if (
        typeof FODE_DATA === "undefined" ||
        !FODE_DATA.website
    ) {
        return;
    }


    const website = FODE_DATA.website;


    /* Website name */

    const siteName = document.getElementById("siteName");

    if (siteName && website.name) {
        siteName.textContent = website.name;
    }


    /* Hero title */

    const heroTitle = document.getElementById("heroTitle");

    if (heroTitle && website.name) {
        heroTitle.textContent = website.name;
    }


    /* Hero description */

    const heroDescription =
        document.getElementById("heroDescription");

    if (heroDescription && website.description) {
        heroDescription.textContent =
            website.description;
    }


    /* Footer website name */

    const footerSiteName =
        document.getElementById("footerSiteName");

    if (footerSiteName && website.name) {
        footerSiteName.textContent =
            website.name;
    }


    /* Website logo */

    const siteLogo =
        document.getElementById("siteLogo");

    if (
        siteLogo &&
        website.logo
    ) {
        siteLogo.src = website.logo;
    }


    /* Browser page title */

    if (website.name) {
        document.title = website.name;
    }

}


/* ==================================================
   MOBILE NAVIGATION
================================================== */

function setupMobileNavigation() {

    const menuToggle =
        document.getElementById("menuToggle");

    const mainNav =
        document.getElementById("mainNav");


    if (!menuToggle || !mainNav) {
        return;
    }


    menuToggle.addEventListener("click", function () {

        mainNav.classList.toggle("show");


        const menuIsOpen =
            mainNav.classList.contains("show");


        menuToggle.setAttribute(
            "aria-expanded",
            menuIsOpen
        );


        if (menuIsOpen) {
            menuToggle.textContent = "✕";
        } else {
            menuToggle.textContent = "☰";
        }

    });


    /*
       Close mobile navigation
       after clicking a navigation link.
    */

    const navLinks =
        mainNav.querySelectorAll("a");


    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            mainNav.classList.remove("show");

            menuToggle.textContent = "☰";

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* ==================================================
   HOME PAGE GRADE PREVIEW
   Generates grade cards from data.js
================================================== */

function generateHomeGradePreview() {

    const gradesPreview =
        document.getElementById("gradesPreview");


    /*
       If this element does not exist,
       the current page is not index.html.
    */

    if (!gradesPreview) {
        return;
    }


    /*
       Check if grades exist in the
       central data system.
    */

    if (
        typeof FODE_DATA === "undefined" ||
        !Array.isArray(FODE_DATA.grades)
    ) {

        gradesPreview.innerHTML = `
            <p class="empty-message">
                Grade information is not available.
            </p>
        `;

        return;
    }


    /*
       Clear existing content.
    */

    gradesPreview.innerHTML = "";


    /*
       Generate one card for each grade.
    */

    FODE_DATA.grades.forEach(function (grade) {

        const gradeCard =
            document.createElement("a");


        gradeCard.className =
            "grade-preview-card";


        /*
           The grade ID is passed
           through the URL.

           Example:
           subjects.html?grade=11
        */

        gradeCard.href =
            `subjects.html?grade=${encodeURIComponent(grade.id)}`;


        gradeCard.innerHTML = `

            <div class="grade-preview-number">

                ${escapeHTML(
                    grade.name || `Grade ${grade.id}`
                )}

            </div>


            <div class="grade-preview-content">

                <h3>
                    ${escapeHTML(
                        grade.name || `Grade ${grade.id}`
                    )}
                </h3>

                <p>
                    Explore available subjects,
                    units and PDF learning resources.
                </p>

                <span class="grade-preview-link">
                    View Subjects →
                </span>

            </div>

        `;


        gradesPreview.appendChild(
            gradeCard
        );

    });

}


/* ==================================================
   FOOTER YEAR
================================================== */

function updateFooterYear() {

    const currentYear =
        document.getElementById("currentYear");


    if (!currentYear) {
        return;
    }


    currentYear.textContent =
        new Date().getFullYear();

}


/* ==================================================
   HELPER FUNCTION
   ESCAPE HTML

   Used when displaying data dynamically.
================================================== */

function escapeHTML(value) {

    const text =
        String(value ?? "");


    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}
/* ==================================================
   FODE OFFLINE LEARNING HUB
   SERVICE WORKER REGISTRATION
================================================== */

if ("serviceWorker" in navigator) {

    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker
                .register("./sw.js")
                .then(registration => {

                    console.log(
                        "Service Worker registered successfully:",
                        registration.scope
                    );

                })
                .catch(error => {

                    console.error(
                        "Service Worker registration failed:",
                        error
                    );

                });

        }
    );

}