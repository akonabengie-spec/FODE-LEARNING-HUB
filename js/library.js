/* ==================================================
   FODE OFFLINE LEARNING HUB
   LIBRARY PAGE
   File: js/library.js

   FILTERING RULE:

   All Grades
   → Show all PDF resources

   Selected Grade
   → Show only PDFs for that grade

   Selected Grade + Selected Subject
   → Show only PDFs matching BOTH the selected
     grade AND selected subject

   Search works only within the currently
   filtered resources.

   Central data source:
   js/data.js
================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ==============================================
       GET PAGE ELEMENTS
    ============================================== */

    const resourceSearch =
        document.getElementById("resourceSearch");

    const gradeSelect =
        document.getElementById("gradeSelect");

    const subjectSelect =
        document.getElementById("subjectSelect");

    const clearFiltersButton =
        document.getElementById("clearFiltersButton");

    const librarySummary =
        document.getElementById("librarySummary");

    const libraryResources =
        document.getElementById("libraryResources");

    const libraryMessage =
        document.getElementById("libraryMessage");


    /* ==============================================
       SHOW ERROR MESSAGE
    ============================================== */

    function showError(message) {

        console.error(message);

        if (librarySummary) {

            librarySummary.textContent =
                "Unable to load resources.";

        }

        if (libraryResources) {

            libraryResources.innerHTML = "";

        }

        if (libraryMessage) {

            libraryMessage.innerHTML = `
                <div class="error-message">
                    <p>${message}</p>
                </div>
            `;

        }

    }


    /* ==============================================
       CHECK CENTRAL DATA
    ============================================== */

    if (typeof FODE_DATA === "undefined") {

        showError(
            "Central data could not be loaded. Please check js/data.js."
        );

        return;

    }


    if (!Array.isArray(FODE_DATA.grades)) {

        showError(
            "Grade data is missing from js/data.js."
        );

        return;

    }


    if (!Array.isArray(FODE_DATA.subjects)) {

        showError(
            "Subject data is missing from js/data.js."
        );

        return;

    }


    if (!Array.isArray(FODE_DATA.resources)) {

        showError(
            "PDF resource data is missing from js/data.js."
        );

        return;

    }


    /* ==============================================
       CHECK REQUIRED PAGE ELEMENTS
    ============================================== */

    if (
        !resourceSearch ||
        !gradeSelect ||
        !subjectSelect ||
        !clearFiltersButton ||
        !librarySummary ||
        !libraryResources ||
        !libraryMessage
    ) {

        showError(
            "One or more Library page elements could not be found."
        );

        return;

    }


    /* ==============================================
       GET GRADE
    ============================================== */

    function getGrade(gradeId) {

        if (
            typeof getGradeById === "function"
        ) {

            return getGradeById(
                String(gradeId)
            );

        }


        return FODE_DATA.grades.find(
            function (grade) {

                return (
                    String(grade.id) ===
                    String(gradeId)
                );

            }
        );

    }


    /* ==============================================
       GET SUBJECT
    ============================================== */

    function getSubject(subjectId) {

        if (
            typeof getSubjectById === "function"
        ) {

            return getSubjectById(
                subjectId
            );

        }


        return FODE_DATA.subjects.find(
            function (subject) {

                return (
                    subject.id ===
                    subjectId
                );

            }
        );

    }


    /* ==============================================
       GET UNIT
    ============================================== */

    function getUnit(unitId) {

        if (
            typeof getUnitById === "function"
        ) {

            return getUnitById(unitId);

        }


        if (!Array.isArray(FODE_DATA.units)) {

            return null;

        }


        return FODE_DATA.units.find(
            function (unit) {

                return (
                    unit.id === unitId
                );

            }
        );

    }


    /* ==============================================
       LOAD GRADES
    ============================================== */

    function loadGrades() {

        gradeSelect.innerHTML = "";

        const allGradesOption =
            document.createElement("option");

        allGradesOption.value = "";

        allGradesOption.textContent =
            "All Grades";

        gradeSelect.appendChild(
            allGradesOption
        );


        FODE_DATA.grades.forEach(
            function (grade) {

                const option =
                    document.createElement("option");

                option.value =
                    String(grade.id);

                option.textContent =
                    grade.name;

                gradeSelect.appendChild(
                    option
                );

            }
        );

    }


    /* ==============================================
       RESET SUBJECT DROPDOWN
    ============================================== */

    function resetSubjects() {

        subjectSelect.innerHTML = `
            <option value="">
                Select a grade first
            </option>
        `;

        subjectSelect.value = "";

        subjectSelect.disabled = true;

    }


    /* ==============================================
       LOAD SUBJECTS FOR SELECTED GRADE
    ============================================== */

    function loadSubjects(selectedGrade) {

        resetSubjects();


        if (!selectedGrade) {

            return;

        }


        let subjects = [];


        /* ------------------------------------------
           USE CENTRAL HELPER FUNCTION
        ------------------------------------------ */

        if (
            typeof getSubjectsByGrade === "function"
        ) {

            subjects =
                getSubjectsByGrade(
                    selectedGrade
                );

        }


        /* ------------------------------------------
           FALLBACK TO gradeSubjects IN data.js
        ------------------------------------------ */

        else if (
            FODE_DATA.gradeSubjects &&
            FODE_DATA.gradeSubjects[
                String(selectedGrade)
            ]
        ) {

            const subjectIds =
                FODE_DATA.gradeSubjects[
                    String(selectedGrade)
                ];


            subjects =
                FODE_DATA.subjects.filter(
                    function (subject) {

                        return subjectIds.includes(
                            subject.id
                        );

                    }
                );

        }


        /* ------------------------------------------
           NO SUBJECTS AVAILABLE
        ------------------------------------------ */

        if (
            !Array.isArray(subjects) ||
            subjects.length === 0
        ) {

            subjectSelect.innerHTML = `
                <option value="">
                    No subjects available
                </option>
            `;

            subjectSelect.disabled = true;

            return;

        }


        /* ------------------------------------------
           ADD ALL SUBJECTS OPTION
        ------------------------------------------ */

        subjectSelect.innerHTML = `
            <option value="">
                All Subjects
            </option>
        `;


        /* ------------------------------------------
           ADD ONLY SUBJECTS FOR SELECTED GRADE
        ------------------------------------------ */

        subjects.forEach(
            function (subject) {

                const option =
                    document.createElement("option");

                option.value =
                    subject.id;

                option.textContent =
                    subject.name;

                subjectSelect.appendChild(
                    option
                );

            }
        );


        subjectSelect.disabled = false;

    }


    /* ==============================================
       GET FILTERED RESOURCES
    ============================================== */

    function getFilteredResources() {

        const selectedGrade =
            String(gradeSelect.value);

        const selectedSubject =
            subjectSelect.value;

        const searchTerm =
            resourceSearch.value
                .trim()
                .toLowerCase();


        /*
         * Start with every resource from data.js.
         */

        let filteredResources =
            FODE_DATA.resources.slice();


        /* ------------------------------------------
           FILTER BY GRADE
        ------------------------------------------ */

        if (selectedGrade) {

            filteredResources =
                filteredResources.filter(
                    function (resource) {

                        return (
                            String(resource.grade) ===
                            selectedGrade
                        );

                    }
                );

        }


        /* ------------------------------------------
           FILTER BY SUBJECT

           IMPORTANT:

           This happens after grade filtering.

           Therefore:

           Grade 9
           +
           Mathematics

           will only return resources where:

           resource.grade === "9"

           AND

           resource.subject === "mathematics"
        ------------------------------------------ */

        if (selectedSubject) {

            filteredResources =
                filteredResources.filter(
                    function (resource) {

                        return (
                            String(resource.subject) ===
                            String(selectedSubject)
                        );

                    }
                );

        }


        /* ------------------------------------------
           SEARCH WITHIN CURRENT FILTER RESULTS
        ------------------------------------------ */

        if (searchTerm) {

            filteredResources =
                filteredResources.filter(
                    function (resource) {

                        const title =
                            String(
                                resource.title || ""
                            ).toLowerCase();


                        const type =
                            String(
                                resource.type || ""
                            ).toLowerCase();


                        const grade =
                            getGrade(
                                resource.grade
                            );


                        const subject =
                            getSubject(
                                resource.subject
                            );


                        const unit =
                            getUnit(
                                resource.unit
                            );


                        const gradeName =
                            grade
                                ? String(
                                    grade.name
                                ).toLowerCase()
                                : "";


                        const subjectName =
                            subject
                                ? String(
                                    subject.name
                                ).toLowerCase()
                                : "";


                        const unitName =
                            unit
                                ? String(
                                    unit.name
                                ).toLowerCase()
                                : String(
                                    resource.unit || ""
                                ).toLowerCase();


                        return (

                            title.includes(
                                searchTerm
                            ) ||

                            type.includes(
                                searchTerm
                            ) ||

                            gradeName.includes(
                                searchTerm
                            ) ||

                            subjectName.includes(
                                searchTerm
                            ) ||

                            unitName.includes(
                                searchTerm
                            )

                        );

                    }
                );

        }


        return filteredResources;

    }


    /* ==============================================
       GET UNIT NAME
    ============================================== */

    function getUnitName(unitId) {

        const unit =
            getUnit(unitId);


        if (
            unit &&
            unit.name
        ) {

            return unit.name;

        }


        if (!unitId) {

            return "General";

        }


        return String(unitId).replace(
            /^unit/i,
            "Unit "
        );

    }


    /* ==============================================
       FAVOURITES SYSTEM
    ============================================== */

    function getFavouriteIds() {

        try {

            const favourites =
                JSON.parse(
                    localStorage.getItem(
                        "fodeFavouriteResources"
                    )
                );


            return Array.isArray(
                favourites
            )
                ? favourites
                : [];

        } catch (error) {

            return [];

        }

    }


    function saveFavouriteIds(favourites) {

        localStorage.setItem(
            "fodeFavouriteResources",
            JSON.stringify(favourites)
        );

    }


    function toggleFavourite(resourceId) {

        let favourites =
            getFavouriteIds();


        if (
            favourites.includes(
                resourceId
            )
        ) {

            favourites =
                favourites.filter(
                    function (id) {

                        return id !== resourceId;

                    }
                );

        } else {

            favourites.push(
                resourceId
            );

        }


        saveFavouriteIds(
            favourites
        );

    }


    /* ==============================================
       UPDATE FAVOURITE BUTTONS
    ============================================== */

    function updateFavouriteButtons() {

        const favourites =
            getFavouriteIds();


        const buttons =
            libraryResources.querySelectorAll(
                ".favourite-button"
            );


        buttons.forEach(
            function (button) {

                const resourceId =
                    button.dataset.resourceId;


                const isFavourite =
                    favourites.includes(
                        resourceId
                    );


                button.textContent =
                    isFavourite
                        ? "★"
                        : "☆";


                button.classList.toggle(
                    "is-favourite",
                    isFavourite
                );

            }
        );

    }


    /* ==============================================
       DISPLAY RESOURCES
    ============================================== */

    function displayResources() {

        const filteredResources =
            getFilteredResources();


        const selectedGrade =
            gradeSelect.value;

        const selectedSubject =
            subjectSelect.value;


        const grade =
            selectedGrade
                ? getGrade(
                    selectedGrade
                )
                : null;


        const subject =
            selectedSubject
                ? getSubject(
                    selectedSubject
                )
                : null;


        /* ------------------------------------------
           CLEAR OLD MESSAGE
        ------------------------------------------ */

        libraryMessage.innerHTML = "";


        /* ------------------------------------------
           UPDATE SUMMARY
        ------------------------------------------ */

        let filterDescription =
            "all grades";


        if (grade) {

            filterDescription =
                grade.name;

        }


        if (subject) {

            filterDescription +=
                " → " +
                subject.name;

        }


        if (
            filteredResources.length === 1
        ) {

            librarySummary.textContent =
                `1 PDF resource found for ${filterDescription}.`;

        } else {

            librarySummary.textContent =
                `${filteredResources.length} PDF resources found for ${filterDescription}.`;

        }


        /* ------------------------------------------
           NO RESOURCES FOUND
        ------------------------------------------ */

        if (
            filteredResources.length === 0
        ) {

            libraryResources.innerHTML = "";


            let message =
                "No PDF resources were found.";


            if (
                grade &&
                subject
            ) {

                message =
                    `No PDF resources are available for ` +
                    `${grade.name} ${subject.name}.`;

            }

            else if (grade) {

                message =
                    `No PDF resources are available for ` +
                    `${grade.name}.`;

            }


            libraryMessage.innerHTML = `
                <div class="page-message">
                    <p>${message}</p>
                </div>
            `;

            return;

        }


        /* ------------------------------------------
           CREATE RESOURCE CARDS
        ------------------------------------------ */

        libraryResources.innerHTML =
            filteredResources.map(
                function (resource) {

                    const resourceGrade =
                        getGrade(
                            resource.grade
                        );


                    const resourceSubject =
                        getSubject(
                            resource.subject
                        );


                    const unitName =
                        getUnitName(
                            resource.unit
                        );


                    return `
                        <article class="resource-card">

                            <div class="resource-card-icon">
                                📄
                            </div>


                            <div class="resource-card-content">

                                <span class="resource-type">
                                    ${resource.type || "PDF"}
                                </span>


                                <h2>
                                    ${resource.title}
                                </h2>


                                <div class="resource-meta">

                                    <span>
                                        ${
                                            resourceGrade
                                                ? resourceGrade.name
                                                : resource.grade
                                        }
                                    </span>

                                    <span>
                                        ${
                                            resourceSubject
                                                ? resourceSubject.name
                                                : resource.subject
                                        }
                                    </span>

                                    <span>
                                        ${unitName}
                                    </span>

                                </div>


                                <div class="resource-card-actions">

                                    <a
                                        href="pdf-viewer.html?id=${encodeURIComponent(resource.id)}"
                                        class="btn btn-primary"
                                    >
                                        Open PDF
                                    </a>


                                    <button
                                        type="button"
                                        class="favourite-button"
                                        data-resource-id="${resource.id}"
                                        title="Add to favourites"
                                    >
                                        ☆
                                    </button>

                                </div>

                            </div>

                        </article>
                    `;

                }
            ).join("");


        updateFavouriteButtons();


        /* ------------------------------------------
           FAVOURITE BUTTON EVENTS
        ------------------------------------------ */

        const favouriteButtons =
            libraryResources.querySelectorAll(
                ".favourite-button"
            );


        favouriteButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        toggleFavourite(
                            button.dataset.resourceId
                        );

                        updateFavouriteButtons();

                    }
                );

            }
        );

    }


    /* ==============================================
       GRADE CHANGE
    ============================================== */

    gradeSelect.addEventListener(
        "change",
        function () {

            const selectedGrade =
                gradeSelect.value;


            /*
             * Clear the current search.
             */

            resourceSearch.value = "";


            /*
             * Load only subjects belonging
             * to the selected grade.
             */

            loadSubjects(
                selectedGrade
            );


            /*
             * Show only PDFs for that grade.
             */

            displayResources();

        }
    );


    /* ==============================================
       SUBJECT CHANGE
    ============================================== */

    subjectSelect.addEventListener(
        "change",
        function () {

            resourceSearch.value = "";


            /*
             * Apply:

             * selected grade
             * AND
             * selected subject
             */

            displayResources();

        }
    );


    /* ==============================================
       SEARCH INPUT
    ============================================== */

    resourceSearch.addEventListener(
        "input",
        function () {

            displayResources();

        }
    );


    /* ==============================================
       CLEAR FILTERS
    ============================================== */

    clearFiltersButton.addEventListener(
        "click",
        function () {

            resourceSearch.value = "";

            gradeSelect.value = "";

            resetSubjects();

            displayResources();

        }
    );


    /* ==============================================
       INITIALISE LIBRARY
    ============================================== */

    loadGrades();

    resetSubjects();

    displayResources();

});