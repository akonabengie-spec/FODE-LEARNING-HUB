/* ==================================================
   FODE OFFLINE LEARNING HUB
   HOME PAGE
   File: js/home.js
================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /*
     * Make sure the central data file loaded first.
     */

    if (typeof FODE_DATA === "undefined") {

        console.error(
            "FODE_DATA could not be loaded."
        );

        return;
    }


    /* ==================================================
       GET ELEMENTS
    ================================================== */

    const gradesCount =
        document.getElementById("homeGradesCount");

    const subjectsCount =
        document.getElementById("homeSubjectsCount");

    const resourcesCount =
        document.getElementById("homeResourcesCount");

    const subjectsGrid =
        document.getElementById("homeSubjectsGrid");

    const recentGrid =
        document.getElementById("homeRecentResources");


    /* ==================================================
       GET GRADES
    ================================================== */

    const grades =
        Array.isArray(FODE_DATA.grades)
            ? FODE_DATA.grades
            : [];


    /* ==================================================
       COUNT GRADES
    ================================================== */

    if (gradesCount) {

        gradesCount.textContent =
            grades.length;

    }


    /* ==================================================
       GET ALL SUBJECTS
    ================================================== */

    let allSubjects = [];


    grades.forEach(function (grade) {

        if (
            Array.isArray(grade.subjects)
        ) {

            grade.subjects.forEach(function (subject) {

                const alreadyExists =
                    allSubjects.some(function (item) {

                        return item.id === subject.id;

                    });


                if (!alreadyExists) {

                    allSubjects.push(subject);

                }

            });

        }

    });


    /* ==================================================
       SUBJECT COUNT
    ================================================== */

    if (subjectsCount) {

        subjectsCount.textContent =
            allSubjects.length;

    }


    /* ==================================================
       COUNT PDF RESOURCES
    ================================================== */

    let totalResources = 0;


    grades.forEach(function (grade) {

        if (
            !Array.isArray(grade.subjects)
        ) {
            return;
        }


        grade.subjects.forEach(function (subject) {

            if (
                !Array.isArray(subject.units)
            ) {
                return;
            }


            subject.units.forEach(function (unit) {

                if (
                    Array.isArray(unit.resources)
                ) {

                    totalResources +=
                        unit.resources.length;

                }

            });

        });

    });


    if (resourcesCount) {

        resourcesCount.textContent =
            totalResources;

    }


    /* ==================================================
       DISPLAY SUBJECTS
    ================================================== */

    if (subjectsGrid) {

        if (allSubjects.length === 0) {

            subjectsGrid.innerHTML = `
                <div class="home-empty-card">

                    <div class="home-empty-icon">
                        📚
                    </div>

                    <h3>
                        No subjects available
                    </h3>

                    <p>
                        Subjects will appear here when they
                        are added to the central data file.
                    </p>

                </div>
            `;

        } else {

            /*
             * Show up to 6 subjects on the homepage.
             */

            const subjectsToShow =
                allSubjects.slice(0, 6);


            subjectsGrid.innerHTML =
                subjectsToShow.map(function (subject) {

                    return `

                        <a
                            href="grades.html"
                            class="home-subject-card"
                        >

                            <div class="home-subject-icon">
                                ${subject.icon || "📘"}
                            </div>

                            <div>

                                <h3>
                                    ${escapeHTML(subject.name)}
                                </h3>

                                <p>
                                    Explore resources
                                </p>

                            </div>

                            <span>
                                →
                            </span>

                        </a>

                    `;

                }).join("");

        }

    }


    /* ==================================================
       RECENT RESOURCES
    ================================================== */

    displayRecentResources();


    /* ==================================================
       HTML ESCAPE
    ================================================== */

    function escapeHTML(value) {

        const div =
            document.createElement("div");

        div.textContent =
            value || "";

        return div.innerHTML;

    }


    /* ==================================================
       RECENT RESOURCES FUNCTION
    ================================================== */

    function displayRecentResources() {

        if (!recentGrid) {
            return;
        }


        /*
         * Your Recent system may use different
         * localStorage keys depending on the
         * existing recent.js implementation.
         *
         * Check the commonly used keys.
         */

        const possibleKeys = [
            "fodeRecentResources",
            "fodeRecentlyOpened",
            "recentResources"
        ];


        let recentResources = [];


        for (
            let i = 0;
            i < possibleKeys.length;
            i++
        ) {

            const saved =
                localStorage.getItem(
                    possibleKeys[i]
                );


            if (!saved) {
                continue;
            }


            try {

                const parsed =
                    JSON.parse(saved);


                if (
                    Array.isArray(parsed)
                ) {

                    recentResources =
                        parsed;

                    break;

                }

            } catch (error) {

                console.warn(
                    "Could not read recent resources:",
                    error
                );

            }

        }


        /*
         * No recent resources.
         */

        if (
            !Array.isArray(recentResources) ||
            recentResources.length === 0
        ) {

            recentGrid.innerHTML = `

                <div class="home-empty-card">

                    <div class="home-empty-icon">
                        📖
                    </div>

                    <h3>
                        No recent resources yet
                    </h3>

                    <p>
                        Open a PDF resource and it will
                        appear here automatically.
                    </p>

                    <a
                        href="grades.html"
                        class="btn btn-primary"
                    >
                        Explore Resources
                    </a>

                </div>

            `;

            return;

        }


        /*
         * Show the latest 3 resources.
         */

        const latest =
            recentResources.slice(0, 3);


        recentGrid.innerHTML =
            latest.map(function (resource) {

                const title =
                    resource.title ||
                    resource.name ||
                    "PDF Resource";


                const url =
                    resource.url ||
                    resource.path ||
                    resource.file ||
                    "#";


                return `

                    <article
                        class="home-recent-card"
                    >

                        <div class="home-recent-icon">
                            📄
                        </div>

                        <div class="home-recent-content">

                            <h3>
                                ${escapeHTML(title)}
                            </h3>

                            <p>
                                PDF Learning Resource
                            </p>

                            <a
                                href="${encodeURI(url)}"
                                class="btn btn-primary"
                            >
                                Open PDF
                            </a>

                        </div>

                    </article>

                `;

            }).join("");

    }

});