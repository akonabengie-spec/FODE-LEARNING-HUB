/* ==================================================
   FODE OFFLINE LEARNING HUB
   SUBJECTS PAGE
   File: js/subjects.js
================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ----------------------------------------------
       CHECK CENTRAL DATA
    ---------------------------------------------- */

    if (typeof FODE_DATA === "undefined") {
        console.error("FODE_DATA could not be loaded.");
        return;
    }


    /* ----------------------------------------------
       GET URL PARAMETERS
    ---------------------------------------------- */

    const urlParams = new URLSearchParams(window.location.search);

    const selectedGrade = urlParams.get("grade");


    /* ----------------------------------------------
       GET PAGE ELEMENTS
    ---------------------------------------------- */

    const subjectsContainer = document.getElementById("subjectsContainer");

    const selectedGradeTitle = document.getElementById("selectedGradeTitle");

    const selectedGradeText = document.getElementById("selectedGradeText");


    /* ----------------------------------------------
       VALIDATE GRADE
    ---------------------------------------------- */

    if (!selectedGrade) {

        if (subjectsContainer) {
            subjectsContainer.innerHTML = `
                <div class="page-message error-message">
                    <p>Please select a grade first.</p>

                    <a href="grades.html" class="btn btn-primary">
                        Select Grade
                    </a>
                </div>
            `;
        }

        return;
    }


    /* ----------------------------------------------
       GET GRADE INFORMATION
    ---------------------------------------------- */

    const grade = getGradeById(selectedGrade);


    if (!grade) {

        if (subjectsContainer) {
            subjectsContainer.innerHTML = `
                <div class="page-message error-message">
                    <p>The selected grade could not be found.</p>

                    <a href="grades.html" class="btn btn-primary">
                        Back to Grades
                    </a>
                </div>
            `;
        }

        return;
    }


    /* ----------------------------------------------
       UPDATE PAGE TITLE
    ---------------------------------------------- */

    if (selectedGradeTitle) {
        selectedGradeTitle.textContent = grade.name + " Subjects";
    }


    if (selectedGradeText) {
        selectedGradeText.textContent =
            "Select a subject to view all available PDF resources.";
    }


    /* ----------------------------------------------
       GET SUBJECTS FOR SELECTED GRADE
    ---------------------------------------------- */

    const subjects = getSubjectsByGrade(selectedGrade);


    /* ----------------------------------------------
       CHECK FOR SUBJECTS
    ---------------------------------------------- */

    if (!subjectsContainer) {
        return;
    }


    if (!subjects || subjects.length === 0) {

        subjectsContainer.innerHTML = `
            <div class="page-message">
                <p>
                    No subjects are currently available for ${grade.name}.
                </p>
            </div>
        `;

        return;
    }


    /* ----------------------------------------------
       DISPLAY SUBJECT CARDS
    ---------------------------------------------- */

    subjectsContainer.innerHTML = subjects.map(function (subject) {

        return `
            <article class="subject-card">

                <div class="subject-icon">
                    ${subject.icon || "📘"}
                </div>

                <h2>
                    ${subject.name}
                </h2>

                <p>
                    View all available ${grade.name} ${subject.name} PDF resources.
                </p>

                <a
                    href="resources.html?grade=${encodeURIComponent(selectedGrade)}&subject=${encodeURIComponent(subject.id)}"
                    class="btn btn-primary"
                >
                    View PDFs
                </a>

            </article>
        `;

    }).join("");

});