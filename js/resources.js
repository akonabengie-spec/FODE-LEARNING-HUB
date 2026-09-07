/* ==================================================
   FODE OFFLINE LEARNING HUB
   RESOURCES PAGE
   File: js/resources.js

   RULE:
   Selected Grade
   +
   Selected Subject
   =
   ONLY matching PDF resources

   Uses js/data.js as the central data source.
================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ----------------------------------------------
       GET PAGE ELEMENTS
    ---------------------------------------------- */

    const resourcesContainer =
        document.getElementById("resourcesContainer");

    const resourcesTitle =
        document.getElementById("resourcesTitle");

    const resourcesDescription =
        document.getElementById("resourcesDescription");

    const resourcesSummary =
        document.getElementById("resourcesSummary");

    const breadcrumbGrade =
        document.getElementById("breadcrumbGrade");

    const breadcrumbSubject =
        document.getElementById("breadcrumbSubject");

    const resourcesNavigation =
        document.getElementById("resourcesNavigation");


    /* ----------------------------------------------
       DISPLAY ERROR
    ---------------------------------------------- */

    function showError(message) {

        console.error(message);

        if (resourcesSummary) {
            resourcesSummary.textContent =
                "Unable to load resources.";
        }

        if (resourcesContainer) {
            resourcesContainer.innerHTML = `
                <div class="page-message error-message">
                    <p>${message}</p>
                </div>
            `;
        }

    }


    /* ----------------------------------------------
       CHECK CENTRAL DATA
    ---------------------------------------------- */

    if (typeof FODE_DATA === "undefined") {

        showError(
            "Central data could not be loaded."
        );

        return;

    }


    /* ----------------------------------------------
       GET URL PARAMETERS
    ---------------------------------------------- */

    const urlParams =
        new URLSearchParams(window.location.search);

    const selectedGrade =
        urlParams.get("grade");

    const selectedSubject =
        urlParams.get("subject");


    /* ----------------------------------------------
       VALIDATE PARAMETERS
    ---------------------------------------------- */

    if (!selectedGrade || !selectedSubject) {

        showError(
            "Please select a grade and subject first."
        );

        return;

    }


    /* ----------------------------------------------
       GET GRADE FROM data.js
    ---------------------------------------------- */

    const grade =
        getGradeById(selectedGrade);


    if (!grade) {

        showError(
            "The selected grade could not be found."
        );

        return;

    }


    /* ----------------------------------------------
       GET SUBJECT FROM data.js
    ---------------------------------------------- */

    const subject =
        getSubjectById(selectedSubject);


    if (!subject) {

        showError(
            "The selected subject could not be found."
        );

        return;

    }


    /* ----------------------------------------------
       CHECK THAT SUBJECT BELONGS TO GRADE

       IMPORTANT:

       Uses the correct central system:

       FODE_DATA.gradeSubjects

       Example:

       Grade 9
       → Mathematics

       Grade 11
       → Advanced Mathematics
    ---------------------------------------------- */

    if (
        !isSubjectAvailableForGrade(
            selectedGrade,
            selectedSubject
        )
    ) {

        showError(
            `${subject.name} is not available for ${grade.name}.`
        );

        return;

    }


    /* ----------------------------------------------
       FILTER RESOURCES

       This uses the helper from data.js:

       getResourcesByGradeAndSubject()

       The helper applies BOTH rules:

       resource.grade === selectedGrade

       AND

       resource.subject === selectedSubject
    ---------------------------------------------- */

    const resources =
        getResourcesByGradeAndSubject(
            selectedGrade,
            selectedSubject
        );


    /* ----------------------------------------------
       UPDATE PAGE TITLE
    ---------------------------------------------- */

    if (resourcesTitle) {

        resourcesTitle.textContent =
            `${grade.name} ${subject.name} Resources`;

    }


    if (resourcesDescription) {

        resourcesDescription.textContent =
            `Browse PDF resources for ${grade.name} ${subject.name}.`;

    }


    if (breadcrumbGrade) {

        breadcrumbGrade.textContent =
            grade.name;

    }


    if (breadcrumbSubject) {

        breadcrumbSubject.textContent =
            subject.name;

    }


    /* ----------------------------------------------
       UPDATE RESOURCE SUMMARY
    ---------------------------------------------- */

    if (resourcesSummary) {

        if (resources.length === 0) {

            resourcesSummary.textContent =
                `No PDF resources found for ${grade.name} ${subject.name}.`;

        } else if (resources.length === 1) {

            resourcesSummary.textContent =
                `1 PDF resource found for ${grade.name} ${subject.name}.`;

        } else {

            resourcesSummary.textContent =
                `${resources.length} PDF resources found for ${grade.name} ${subject.name}.`;

        }

    }


    /* ----------------------------------------------
       CHECK RESOURCES CONTAINER
    ---------------------------------------------- */

    if (!resourcesContainer) {

        console.error(
            "resourcesContainer was not found."
        );

        return;

    }


    /* ----------------------------------------------
       NO RESOURCES
    ---------------------------------------------- */

    if (resources.length === 0) {

        resourcesContainer.innerHTML = `
            <div class="page-message">

                <p>
                    No PDF resources are currently available
                    for ${grade.name} ${subject.name}.
                </p>

            </div>
        `;

        return;

    }


    /* ----------------------------------------------
       DISPLAY FILTERED RESOURCES
    ---------------------------------------------- */

    resourcesContainer.innerHTML =
        resources.map(function (resource) {

            const unit =
                getUnitById(resource.unit);

            const unitName =
                unit
                    ? unit.name
                    : resource.unit;


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
                                ${grade.name}
                            </span>

                            <span>
                                ${subject.name}
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

        }).join("");


    /* ----------------------------------------------
       UPDATE BACK NAVIGATION
    ---------------------------------------------- */

    if (resourcesNavigation) {

        resourcesNavigation.innerHTML = `

            <a
                href="subjects.html?grade=${encodeURIComponent(selectedGrade)}"
                class="btn btn-secondary"
            >
                Back to ${grade.name} Subjects
            </a>

            <a
                href="library.html"
                class="btn btn-primary"
            >
                Open Library
            </a>

        `;

    }

});