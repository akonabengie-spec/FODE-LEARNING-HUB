/* ==================================================
   FODE OFFLINE LEARNING HUB
   GRADES PAGE
   File: js/grades.js

   Grade cards are generated from js/data.js
================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ----------------------------------------------
       CHECK CENTRAL DATA
    ---------------------------------------------- */

    if (typeof FODE_DATA === "undefined") {
        console.error("FODE_DATA could not be loaded.");

        const gradesContainer =
            document.getElementById("gradesContainer");

        if (gradesContainer) {
            gradesContainer.innerHTML = `
                <div class="page-message error-message">
                    <p>
                        Unable to load the grade data.
                    </p>
                </div>
            `;
        }

        return;
    }


    /* ----------------------------------------------
       GET GRADES CONTAINER
    ---------------------------------------------- */

    const gradesContainer =
        document.getElementById("gradesContainer");


    if (!gradesContainer) {
        console.error(
            "The gradesContainer element could not be found."
        );

        return;
    }


    /* ----------------------------------------------
       GET GRADES FROM CENTRAL DATA
    ---------------------------------------------- */

    const grades =
        Array.isArray(FODE_DATA.grades)
            ? FODE_DATA.grades
            : [];


    /* ----------------------------------------------
       CHECK FOR GRADES
    ---------------------------------------------- */

    if (grades.length === 0) {

        gradesContainer.innerHTML = `
            <div class="page-message">
                <p>
                    No grades are currently available.
                </p>
            </div>
        `;

        return;
    }


    /* ----------------------------------------------
       DISPLAY GRADE CARDS
    ---------------------------------------------- */

    gradesContainer.innerHTML = grades.map(
        function (grade) {

            return `
                <article class="grade-card">

                    <div class="grade-icon">
                        🎓
                    </div>

                    <h2>
                        ${grade.name}
                    </h2>

                    <p>
                        Browse subjects and PDF learning resources
                        for ${grade.name}.
                    </p>

                    <a
                        href="subjects.html?grade=${encodeURIComponent(grade.id)}"
                        class="btn btn-primary"
                    >
                        Select ${grade.name}
                    </a>

                </article>
            `;

        }
    ).join("");


    /* ----------------------------------------------
       SAVE SELECTED GRADE

       When a grade is clicked, save its ID
       in localStorage for convenience.
    ---------------------------------------------- */

    const gradeLinks =
        gradesContainer.querySelectorAll(
            ".grade-card a"
        );


    gradeLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    const url =
                        link.getAttribute("href");


                    if (!url) {
                        return;
                    }


                    const urlParts =
                        url.split("?");


                    if (urlParts.length < 2) {
                        return;
                    }


                    const params =
                        new URLSearchParams(
                            urlParts[1]
                        );


                    const grade =
                        params.get("grade");


                    if (grade) {

                        try {

                            localStorage.setItem(
                                "fodeSelectedGrade",
                                grade
                            );

                        } catch (error) {

                            console.error(
                                "Unable to save selected grade:",
                                error
                            );

                        }

                    }

                }
            );

        }
    );

});