/* ==================================================
   FODE OFFLINE LEARNING HUB
   Units Page
   File: js/units.js

   IMPORTANT:
   - data.js must load before this file.
   - Grade and subject are read from URL parameters.
   - The selected subject must belong to the selected grade.
   - Units come from the central data system.
================================================== */


/* ==================================================
   WAIT FOR PAGE TO LOAD
================================================== */

document.addEventListener("DOMContentLoaded", function () {

    initializeUnitsPage();

});


/* ==================================================
   INITIALIZE UNITS PAGE
================================================== */

function initializeUnitsPage() {

    const unitsContainer =
        document.getElementById("unitsContainer");


    if (!unitsContainer) {
        return;
    }


    /*
       Check that the central data system exists.
    */

    if (typeof FODE_DATA === "undefined") {

        showUnitsMessage(
            "Unable to load learning data. Please check js/data.js.",
            true
        );

        return;
    }


    /*
       Get grade and subject from the URL.

       Example:
       units.html?grade=11&subject=physics
    */

    const urlParameters =
        new URLSearchParams(window.location.search);


    const selectedGrade =
        urlParameters.get("grade");


    const selectedSubject =
        urlParameters.get("subject");


    /*
       Make sure both values exist.
    */

    if (!selectedGrade || !selectedSubject) {

        showUnitsMessage(
            "Please select a grade and subject first.",
            true
        );

        return;
    }


    /*
       Find and validate the grade.
    */

    const grade =
        getGradeForUnits(selectedGrade);


    if (!grade) {

        showUnitsMessage(
            "The selected grade could not be found.",
            true
        );

        return;
    }


    /*
       Find and validate the subject.
    */

    const subject =
        getSubjectForUnits(selectedSubject);


    if (!subject) {

        showUnitsMessage(
            "The selected subject could not be found.",
            true
        );

        return;
    }


    /*
       Confirm that this subject belongs
       to the selected grade.
    */

    const availableSubjects =
        getSubjectsForSelectedGrade(
            selectedGrade
        );


    const subjectIsAvailable =
        availableSubjects.some(function (availableSubject) {

            return String(availableSubject.id) ===
                String(selectedSubject);

        });


    if (!subjectIsAvailable) {

        showUnitsMessage(
            `${subject.name} is not available for ${grade.name}.`,
            true
        );

        return;
    }


    /*
       Update page information.
    */

    updateUnitsPageInformation(
        grade,
        subject
    );


    /*
       Get units from the central data system.
    */

    const units =
        getUnitsForSubject(
            selectedGrade,
            selectedSubject
        );


    /*
       Check whether units exist.
    */

    if (
        !Array.isArray(units) ||
        units.length === 0
    ) {

        showUnitsMessage(
            `No units are currently available for ${subject.name}.`,
            false
        );

        return;
    }


    /*
       Generate the unit cards.
    */

    generateUnitCards(
        units,
        selectedGrade,
        selectedSubject,
        unitsContainer
    );

}


/* ==================================================
   GET GRADE
================================================== */

function getGradeForUnits(gradeId) {

    if (
        typeof FODE_DATA.getGradeById === "function"
    ) {

        return FODE_DATA.getGradeById(
            gradeId
        );

    }


    if (!Array.isArray(FODE_DATA.grades)) {
        return null;
    }


    return FODE_DATA.grades.find(
        function (grade) {

            return String(grade.id) ===
                String(gradeId);

        }
    ) || null;

}


/* ==================================================
   GET SUBJECT
================================================== */

function getSubjectForUnits(subjectId) {

    if (
        typeof FODE_DATA.getSubjectById === "function"
    ) {

        return FODE_DATA.getSubjectById(
            subjectId
        );

    }


    if (!Array.isArray(FODE_DATA.subjects)) {
        return null;
    }


    return FODE_DATA.subjects.find(
        function (subject) {

            return String(subject.id) ===
                String(subjectId);

        }
    ) || null;

}


/* ==================================================
   GET SUBJECTS FOR SELECTED GRADE
================================================== */

function getSubjectsForSelectedGrade(gradeId) {

    if (
        typeof FODE_DATA.getSubjectsForGrade === "function"
    ) {

        return FODE_DATA.getSubjectsForGrade(
            gradeId
        );

    }


    if (!Array.isArray(FODE_DATA.subjects)) {
        return [];
    }


    return FODE_DATA.subjects.filter(
        function (subject) {

            if (!Array.isArray(subject.grades)) {
                return false;
            }


            return subject.grades.includes(
                String(gradeId)
            );

        }
    );

}


/* ==================================================
   GET UNITS FOR SUBJECT

   Uses the helper function from data.js.

   Preferred data.js helper:

   getUnitsForSubject(gradeId, subjectId)

   If your units are the same across grades,
   data.js can simply return the six units
   assigned to the subject.
================================================== */

function getUnitsForSubject(
    gradeId,
    subjectId
) {

    if (
        typeof FODE_DATA.getUnitsForSubject === "function"
    ) {

        return FODE_DATA.getUnitsForSubject(
            gradeId,
            subjectId
        );

    }


    /*
       Fallback for a central units array.

       Expected structure:

       {
           id: "unit1",
           name: "Unit 1",
           subject: "physics"
       }
    */

    if (!Array.isArray(FODE_DATA.units)) {
        return [];
    }


    return FODE_DATA.units.filter(
        function (unit) {

            return String(unit.subject) ===
                String(subjectId);

        }
    );

}


/* ==================================================
   UPDATE PAGE INFORMATION
================================================== */

function updateUnitsPageInformation(
    grade,
    subject
) {

    const unitsTitle =
        document.getElementById("unitsTitle");

    const unitsDescription =
        document.getElementById("unitsDescription");

    const breadcrumbSubject =
        document.getElementById("breadcrumbSubject");

    const subjectsBreadcrumbLink =
        document.getElementById("subjectsBreadcrumbLink");

    const changeSubjectButton =
        document.getElementById("changeSubjectButton");


    /*
       Main page title.
    */

    if (unitsTitle) {

        unitsTitle.textContent =
            `${subject.name} Units`;

    }


    /*
       Page description.
    */

    if (unitsDescription) {

        unitsDescription.textContent =
            `Select a unit from ${grade.name} ${subject.name} to view available PDF learning resources.`;

    }


    /*
       Breadcrumb.
    */

    if (breadcrumbSubject) {

        breadcrumbSubject.textContent =
            subject.name;

    }


    /*
       Keep the grade when going back
       to the subjects page.
    */

    const subjectsPageURL =
        `subjects.html?grade=${encodeURIComponent(grade.id)}`;


    if (subjectsBreadcrumbLink) {

        subjectsBreadcrumbLink.href =
            subjectsPageURL;

    }


    if (changeSubjectButton) {

        changeSubjectButton.href =
            subjectsPageURL;

    }


    /*
       Browser title.
    */

    document.title =
        `${subject.name} Units | ${grade.name} | FODE Offline Learning Hub`;

}


/* ==================================================
   GENERATE UNIT CARDS
================================================== */

function generateUnitCards(
    units,
    selectedGrade,
    selectedSubject,
    container
) {

    /*
       Clear previous content.
    */

    container.innerHTML = "";


    /*
       Generate cards dynamically.
    */

    units.forEach(function (unit) {

        if (
            !unit ||
            !unit.id
        ) {
            return;
        }


        const unitName =
            unit.name || unit.title || unit.id;


        const unitDescription =
            unit.description ||
            `View PDF resources for ${unitName}.`;


        const unitCard =
            document.createElement("a");


        unitCard.className =
            "unit-card";


        /*
           Pass grade, subject and unit
           to resources.html.

           Example:
           resources.html?grade=11&subject=physics&unit=unit1
        */

        unitCard.href =
            `resources.html?grade=${encodeURIComponent(selectedGrade)}&subject=${encodeURIComponent(selectedSubject)}&unit=${encodeURIComponent(unit.id)}`;


        unitCard.setAttribute(
            "aria-label",
            `View resources for ${unitName}`
        );


        unitCard.innerHTML = `

            <div class="unit-card-number">

                ${escapeUnitHTML(
                    getUnitNumber(unit)
                )}

            </div>


            <div class="unit-card-content">

                <h2>

                    ${escapeUnitHTML(unitName)}

                </h2>


                <p>

                    ${escapeUnitHTML(unitDescription)}

                </p>


                <span class="unit-card-action">

                    View Resources →

                </span>

            </div>

        `;


        container.appendChild(
            unitCard
        );

    });


    /*
       Check that valid cards were created.
    */

    if (container.children.length === 0) {

        showUnitsMessage(
            "No valid unit information was found.",
            true
        );

    }

}


/* ==================================================
   GET UNIT NUMBER
================================================== */

function getUnitNumber(unit) {

    /*
       If data.js provides a number,
       use it.
    */

    if (
        unit.number !== undefined &&
        unit.number !== null
    ) {

        return unit.number;

    }


    /*
       Extract the number from IDs such as:
       unit1
       unit2
       unit3
    */

    const match =
        String(unit.id).match(/\d+/);


    if (match) {

        return match[0];

    }


    /*
       Final fallback.
    */

    return "Unit";

}


/* ==================================================
   DISPLAY PAGE MESSAGE
================================================== */

function showUnitsMessage(
    message,
    isError
) {

    const unitsMessage =
        document.getElementById("unitsMessage");


    if (!unitsMessage) {
        return;
    }


    unitsMessage.textContent =
        message;


    if (isError) {

        unitsMessage.classList.add(
            "error-message"
        );

    } else {

        unitsMessage.classList.remove(
            "error-message"
        );

    }

}


/* ==================================================
   HELPER: ESCAPE HTML
================================================== */

function escapeUnitHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}