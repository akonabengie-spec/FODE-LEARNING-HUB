/* ==================================================
   FODE OFFLINE LEARNING HUB
   RECENTLY OPENED PAGE
   File: js/recent.js

   This file:

   1. Reads recently opened resources from localStorage.
   2. Matches resource IDs with the central data.js file.
   3. Displays the most recently opened PDFs first.
   4. Shows when each resource was opened.
   5. Allows students to open a resource again.
   6. Allows the recent history to be cleared.
================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ==============================================
       GET PAGE ELEMENTS
    ============================================== */

    const recentSummary =
        document.getElementById("recentSummary");

    const recentContainer =
        document.getElementById("recentContainer");

    const recentMessage =
        document.getElementById("recentMessage");

    const clearRecentButton =
        document.getElementById("clearRecentButton");


    /* ==============================================
       CHECK REQUIRED ELEMENTS
    ============================================== */

    if (
        !recentSummary ||
        !recentContainer ||
        !recentMessage ||
        !clearRecentButton
    ) {

        console.error(
            "Recently Opened page elements could not be found."
        );

        return;

    }


    /* ==============================================
       CHECK CENTRAL DATA
    ============================================== */

    if (typeof FODE_DATA === "undefined") {

        recentSummary.textContent = "";

        recentMessage.innerHTML = `
            <div class="error-message">
                <p>
                    The central data system could not be loaded.
                </p>

                <a
                    href="library.html"
                    class="btn btn-primary"
                >
                    Go to Library
                </a>
            </div>
        `;

        clearRecentButton.hidden = true;

        return;

    }


    /* ==============================================
       GET RECENT RESOURCES
    ============================================== */

    function getRecentResources() {

        const storageKey =
            "fodeRecentResources";

        try {

            const savedRecent =
                localStorage.getItem(
                    storageKey
                );


            if (!savedRecent) {

                return [];

            }


            const recentResources =
                JSON.parse(
                    savedRecent
                );


            if (
                !Array.isArray(
                    recentResources
                )
            ) {

                return [];

            }


            /*
             * Support both:

             * Old format:
             * ["resource-id"]

             * Current format:
             * [
             *   {
             *      id: "resource-id",
             *      openedAt: "..."
             *   }
             * ]
             */

            return recentResources.map(
                function (item) {

                    if (
                        typeof item === "string"
                    ) {

                        return {

                            id: item,

                            openedAt: null

                        };

                    }


                    if (
                        typeof item === "object" &&
                        item !== null &&
                        item.id
                    ) {

                        return {

                            id: item.id,

                            openedAt:
                                item.openedAt || null

                        };

                    }


                    return null;

                }
            ).filter(
                function (item) {

                    return item !== null;

                }
            );

        } catch (error) {

            console.error(
                "Unable to read recently opened resources.",
                error
            );

            return [];

        }

    }


    /* ==============================================
       CLEAR RECENT HISTORY
    ============================================== */

    function clearRecentHistory() {

        try {

            localStorage.removeItem(
                "fodeRecentResources"
            );

        } catch (error) {

            console.error(
                "Unable to clear recently opened resources.",
                error
            );

        }


        renderRecentResources();

    }


    /* ==============================================
       FIND RESOURCE BY ID
    ============================================== */

    function findResource(resourceId) {

        /*
         * Use the helper function from data.js
         * when available.
         */

        if (
            typeof getResourceById === "function"
        ) {

            const resource =
                getResourceById(
                    resourceId
                );


            if (resource) {

                return resource;

            }

        }


        /*
         * Fallback search.
         */

        if (
            Array.isArray(
                FODE_DATA.resources
            )
        ) {

            return FODE_DATA.resources.find(
                function (resource) {

                    return (
                        String(resource.id) ===
                        String(resourceId)
                    );

                }
            );

        }


        return null;

    }


    /* ==============================================
       GET GRADE NAME
    ============================================== */

    function getGradeName(gradeId) {

        if (
            typeof getGradeById === "function"
        ) {

            const grade =
                getGradeById(
                    String(gradeId)
                );


            if (grade) {

                return grade.name;

            }

        }


        return "Grade " + gradeId;

    }


    /* ==============================================
       GET SUBJECT NAME
    ============================================== */

    function getSubjectName(subjectId) {

        if (
            typeof getSubjectById === "function"
        ) {

            const subject =
                getSubjectById(
                    subjectId
                );


            if (subject) {

                return subject.name;

            }

        }


        if (
            Array.isArray(
                FODE_DATA.subjects
            )
        ) {

            const subject =
                FODE_DATA.subjects.find(
                    function (item) {

                        return (
                            item.id === subjectId
                        );

                    }
                );


            if (subject) {

                return subject.name;

            }

        }


        return subjectId || "Unknown Subject";

    }


    /* ==============================================
       GET UNIT NAME
    ============================================== */

    function getUnitName(unitId) {

        if (!unitId) {

            return "General";

        }


        /*
         * Try data.js helper first.
         */

        if (
            typeof getUnitById === "function"
        ) {

            const unit =
                getUnitById(
                    unitId
                );


            if (unit) {

                return unit.name;

            }

        }


        /*
         * Fallback formatting.
         */

        const unitNumber =
            String(unitId).replace(
                /^unit/i,
                ""
            );


        if (unitNumber) {

            return "Unit " + unitNumber;

        }


        return unitId;

    }


    /* ==============================================
       FORMAT OPENED TIME
    ============================================== */

    function formatOpenedTime(openedAt) {

        if (!openedAt) {

            return "Opened recently";

        }


        const openedDate =
            new Date(openedAt);


        /*
         * Check for invalid date.
         */

        if (
            Number.isNaN(
                openedDate.getTime()
            )
        ) {

            return "Opened recently";

        }


        const now =
            new Date();


        const difference =
            now.getTime() -
            openedDate.getTime();


        const seconds =
            Math.floor(
                difference / 1000
            );


        const minutes =
            Math.floor(
                seconds / 60
            );


        const hours =
            Math.floor(
                minutes / 60
            );


        const days =
            Math.floor(
                hours / 24
            );


        /*
         * Future timestamps.
         */

        if (difference < 0) {

            return "Opened recently";

        }


        if (seconds < 60) {

            return "Opened just now";

        }


        if (minutes < 60) {

            return (
                "Opened " +
                minutes +
                (
                    minutes === 1
                        ? " minute ago"
                        : " minutes ago"
                )
            );

        }


        if (hours < 24) {

            return (
                "Opened " +
                hours +
                (
                    hours === 1
                        ? " hour ago"
                        : " hours ago"
                )
            );

        }


        if (days < 7) {

            return (
                "Opened " +
                days +
                (
                    days === 1
                        ? " day ago"
                        : " days ago"
                )
            );

        }


        return (
            "Opened " +
            openedDate.toLocaleDateString()
        );

    }


    /* ==============================================
       RENDER RECENT RESOURCES
    ============================================== */

    function renderRecentResources() {

        const recentItems =
            getRecentResources();


        /*
         * Clear old content.
         */

        recentContainer.innerHTML = "";

        recentMessage.innerHTML = "";


        /* ------------------------------------------
           NO RECENT RESOURCES
        ------------------------------------------ */

        if (
            recentItems.length === 0
        ) {

            recentSummary.textContent =
                "You have not opened any resources yet.";


            clearRecentButton.hidden = true;


            recentMessage.innerHTML = `
                <div class="page-message">

                    <p>
                        Open a PDF resource and it will
                        appear here for quick access.
                    </p>

                    <a
                        href="library.html"
                        class="btn btn-primary"
                    >
                        Browse PDF Library
                    </a>

                </div>
            `;

            return;

        }


        /*
         * Show clear button.
         */

        clearRecentButton.hidden = false;


        /* ------------------------------------------
           MATCH RECENT ITEMS WITH data.js
        ------------------------------------------ */

        const validRecentResources =
            recentItems.map(
                function (recentItem) {

                    const resource =
                        findResource(
                            recentItem.id
                        );


                    if (!resource) {

                        return null;

                    }


                    return {

                        resource: resource,

                        openedAt:
                            recentItem.openedAt

                    };

                }
            ).filter(
                function (item) {

                    return item !== null;

                }
            );


        /* ------------------------------------------
           NO VALID RESOURCES
        ------------------------------------------ */

        if (
            validRecentResources.length === 0
        ) {

            recentSummary.textContent =
                "No valid recently opened resources were found.";


            recentMessage.innerHTML = `
                <div class="page-message">

                    <p>
                        The resources in your recent history
                        are no longer available in data.js.
                    </p>

                    <a
                        href="library.html"
                        class="btn btn-primary"
                    >
                        Browse PDF Library
                    </a>

                </div>
            `;

            return;

        }


        /* ------------------------------------------
           UPDATE SUMMARY
        ------------------------------------------ */

        const resourceCount =
            validRecentResources.length;


        recentSummary.textContent =
            resourceCount +
            (
                resourceCount === 1
                    ? " recently opened resource"
                    : " recently opened resources"
            );


        /* ------------------------------------------
           CREATE RESOURCE CARDS
        ------------------------------------------ */

        recentContainer.innerHTML =
            validRecentResources.map(
                function (item) {

                    const resource =
                        item.resource;


                    const gradeName =
                        getGradeName(
                            resource.grade
                        );


                    const subjectName =
                        getSubjectName(
                            resource.subject
                        );


                    const unitName =
                        getUnitName(
                            resource.unit
                        );


                    const openedTime =
                        formatOpenedTime(
                            item.openedAt
                        );


                    return `

                        <article class="resource-card">


                            <div class="resource-card-top">

                                <span class="resource-type">

                                    ${resource.type || "PDF"}

                                </span>


                                <span class="recent-time">

                                    ${openedTime}

                                </span>

                            </div>



                            <div class="resource-icon">

                                📄

                            </div>



                            <h2>

                                ${resource.title}

                            </h2>



                            <div class="resource-meta">

                                <span>

                                    ${gradeName}

                                </span>

                                <span>

                                    ${subjectName}

                                </span>

                                <span>

                                    ${unitName}

                                </span>

                            </div>



                            <a
                                href="pdf-viewer.html?id=${encodeURIComponent(resource.id)}"
                                class="btn btn-primary"
                            >

                                Continue Reading

                            </a>


                        </article>

                    `;

                }
            ).join("");

    }


    /* ==============================================
       CLEAR BUTTON EVENT
    ============================================== */

    clearRecentButton.addEventListener(
        "click",
        function () {

            const confirmed =
                window.confirm(
                    "Clear all recently opened resources?"
                );


            if (confirmed) {

                clearRecentHistory();

            }

        }
    );


    /* ==============================================
       INITIAL RENDER
    ============================================== */

    renderRecentResources();

});