/* ==================================================
   FODE OFFLINE LEARNING HUB
   FAVOURITES PAGE
   File: js/favourites.js

   This file:

   1. Gets favourite resource IDs from localStorage.
   2. Finds the actual resources in data.js.
   3. Displays favourite PDF resource cards.
   4. Allows a resource to be removed from favourites.
   5. Opens the correct PDF viewer.
================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ==============================================
       GET PAGE ELEMENTS
    ============================================== */

    const favouritesSummary =
        document.getElementById("favouritesSummary");

    const favouritesContainer =
        document.getElementById("favouritesContainer");

    const favouritesMessage =
        document.getElementById("favouritesMessage");


    /* ==============================================
       CHECK REQUIRED ELEMENTS
    ============================================== */

    if (
        !favouritesSummary ||
        !favouritesContainer ||
        !favouritesMessage
    ) {

        console.error(
            "Favourites page elements could not be found."
        );

        return;

    }


    /* ==============================================
       CHECK CENTRAL DATA
    ============================================== */

    if (typeof FODE_DATA === "undefined") {

        favouritesSummary.textContent = "";

        favouritesMessage.innerHTML = `
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

        return;

    }


    /* ==============================================
       GET FAVOURITES FROM LOCAL STORAGE
    ============================================== */

    function getFavouriteIds() {

        const storageKey =
            "fodeFavouriteResources";

        try {

            const savedFavourites =
                localStorage.getItem(
                    storageKey
                );


            if (!savedFavourites) {

                return [];

            }


            const favourites =
                JSON.parse(
                    savedFavourites
                );


            if (!Array.isArray(favourites)) {

                return [];

            }


            /*
             * Make sure all stored values
             * are resource IDs.
             */

            return favourites.map(
                function (item) {

                    if (
                        typeof item === "object" &&
                        item !== null
                    ) {

                        return item.id;

                    }

                    return item;

                }
            ).filter(
                function (id) {

                    return id !== null &&
                        id !== undefined &&
                        id !== "";

                }
            );

        } catch (error) {

            console.error(
                "Unable to read favourite resources.",
                error
            );

            return [];

        }

    }


    /* ==============================================
       SAVE FAVOURITES
    ============================================== */

    function saveFavouriteIds(favourites) {

        try {

            localStorage.setItem(
                "fodeFavouriteResources",
                JSON.stringify(
                    favourites
                )
            );

        } catch (error) {

            console.error(
                "Unable to save favourite resources.",
                error
            );

        }

    }


    /* ==============================================
       GET RESOURCE BY ID
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
                            item.id ===
                            subjectId
                        );

                    }
                );

            if (subject) {

                return subject.name;

            }

        }


        return subjectId;

    }


    /* ==============================================
       GET UNIT NAME
    ============================================== */

    function getUnitName(unitId) {

        if (!unitId) {

            return "General";

        }


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


        return String(unitId).replace(
            /^unit/i,
            "Unit "
        );

    }


    /* ==============================================
       REMOVE FAVOURITE
    ============================================== */

    function removeFavourite(resourceId) {

        let favourites =
            getFavouriteIds();


        favourites =
            favourites.filter(
                function (id) {

                    return (
                        String(id) !==
                        String(resourceId)
                    );

                }
            );


        saveFavouriteIds(
            favourites
        );


        renderFavourites();

    }


    /* ==============================================
       RENDER FAVOURITES
    ============================================== */

    function renderFavourites() {

        const favouriteIds =
            getFavouriteIds();


        /*
         * Clear previous content.
         */

        favouritesContainer.innerHTML = "";

        favouritesMessage.innerHTML = "";


        /* ------------------------------------------
           NO FAVOURITES
        ------------------------------------------ */

        if (
            favouriteIds.length === 0
        ) {

            favouritesSummary.textContent =
                "You have no favourite resources yet.";


            favouritesMessage.innerHTML = `
                <div class="page-message">

                    <p>
                        Save resources as favourites to
                        quickly access them here.
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
           GET RESOURCES FROM data.js
        ------------------------------------------ */

        const favouriteResources =
            favouriteIds.map(
                function (resourceId) {

                    return findResource(
                        resourceId
                    );

                }
            ).filter(
                function (resource) {

                    return resource !== null;

                }
            );


        /* ------------------------------------------
           CHECK VALID RESOURCES
        ------------------------------------------ */

        if (
            favouriteResources.length === 0
        ) {

            favouritesSummary.textContent =
                "No valid favourite resources were found.";


            favouritesMessage.innerHTML = `
                <div class="page-message">

                    <p>
                        Your saved favourites are no longer
                        available in the current data system.
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
            favouriteResources.length;


        favouritesSummary.textContent =
            resourceCount +
            (
                resourceCount === 1
                    ? " favourite resource"
                    : " favourite resources"
            );


        /* ------------------------------------------
           CREATE RESOURCE CARDS
        ------------------------------------------ */

        favouritesContainer.innerHTML =
            favouriteResources.map(
                function (resource) {

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


                    return `

                        <article class="resource-card">


                            <div class="resource-card-top">

                                <span class="resource-type">

                                    ${resource.type || "PDF"}

                                </span>


                                <button
                                    type="button"
                                    class="favourite-toggle is-favourite"
                                    data-resource-id="${resource.id}"
                                    aria-label="Remove from favourites"
                                    title="Remove from favourites"
                                >
                                    ★
                                </button>

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

                                Open PDF

                            </a>


                        </article>

                    `;

                }
            ).join("");


        /* ------------------------------------------
           REMOVE BUTTON EVENTS
        ------------------------------------------ */

        const removeButtons =
            favouritesContainer.querySelectorAll(
                ".favourite-toggle"
            );


        removeButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const resourceId =
                            button.dataset.resourceId;


                        if (resourceId) {

                            removeFavourite(
                                resourceId
                            );

                        }

                    }
                );

            }
        );

    }


    /* ==============================================
       INITIAL RENDER
    ============================================== */

    renderFavourites();

});