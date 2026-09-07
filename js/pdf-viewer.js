/* =========================================================
   FODE OFFLINE LEARNING HUB
   NATIVE PDF VIEWER
   File: js/pdf-viewer.js

   IMPORTANT:
   - NO PDF.js
   - Uses browser's built-in PDF viewer
   - Uses central js/data.js
========================================================= */


document.addEventListener("DOMContentLoaded", function () {

    console.log("FODE Native PDF Viewer starting...");


    /* =====================================================
       GET HTML ELEMENTS
    ===================================================== */

    const pdfFrame =
        document.getElementById("pdfFrame");

    const resourceTitle =
        document.getElementById("resourceTitle");

    const resourceDetails =
        document.getElementById("resourceDetails");

    const loading =
        document.getElementById("loading");

    const errorBox =
        document.getElementById("errorBox");

    const errorMessage =
        document.getElementById("errorMessage");

    const retryButton =
        document.getElementById("retryButton");

    const openPdfButton =
        document.getElementById("openPdfButton");


    /* =====================================================
       CHECK ELEMENTS
    ===================================================== */

    if (!pdfFrame) {

        console.error(
            "PDF frame was not found."
        );

        return;
    }


    /* =====================================================
       GET RESOURCE ID FROM URL
       
       Example:
       pdf-viewer.html?id=g9-social-science-unit1
    ===================================================== */

    const urlParams =
        new URLSearchParams(
            window.location.search
        );

    const resourceId =
        urlParams.get("id");


    console.log(
        "PDF Resource ID:",
        resourceId
    );


    /* =====================================================
       CHECK RESOURCE ID
    ===================================================== */

    if (!resourceId) {

        showError(
            "No PDF resource was selected."
        );

        return;
    }


    /* =====================================================
       CHECK CENTRAL DATA
    ===================================================== */

    if (
        typeof FODE_DATA === "undefined"
    ) {

        console.error(
            "FODE_DATA is undefined."
        );

        showError(
            "The central data file could not be loaded."
        );

        return;
    }


    /* =====================================================
       FIND RESOURCE
    ===================================================== */

    const resource =
        getResourceById(resourceId);


    console.log(
        "Found resource:",
        resource
    );


    /* =====================================================
       RESOURCE NOT FOUND
    ===================================================== */

    if (!resource) {

        showError(
            "The requested PDF resource could not be found in data.js."
        );

        return;
    }


    /* =====================================================
       DISPLAY RESOURCE INFORMATION
    ===================================================== */

    if (resourceTitle) {

        resourceTitle.textContent =
            resource.title ||
            "PDF Resource";

    }


    if (resourceDetails) {

        resourceDetails.textContent =
            "Grade " +
            resource.grade +
            " • " +
            getSubjectName(resource.subject) +
            " • " +
            getUnitName(resource.unit);

    }


    /* =====================================================
       GET PDF PATH
    ===================================================== */

    const pdfPath =
        resource.file;


    console.log(
        "PDF URL:",
        pdfPath
    );


    /* =====================================================
       CHECK PDF PATH
    ===================================================== */

    if (!pdfPath) {

        showError(
            "No PDF file path is defined for this resource."
        );

        return;
    }


    /* =====================================================
       SAVE RECENT RESOURCE
    ===================================================== */

    saveRecentlyOpened(resource);


    /* =====================================================
       LOAD PDF
    ===================================================== */

    loadPDF(pdfPath);


    /* =====================================================
       OPEN PDF BUTTON
    ===================================================== */

    if (openPdfButton) {

        openPdfButton.addEventListener(
            "click",
            function () {

                window.open(
                    pdfPath,
                    "_blank"
                );

            }
        );

    }


    /* =====================================================
       RETRY BUTTON
    ===================================================== */

    if (retryButton) {

        retryButton.addEventListener(
            "click",
            function () {

                loadPDF(pdfPath);

            }
        );

    }


    /* =====================================================
       LOAD PDF FUNCTION
    ===================================================== */

    function loadPDF(path) {

        console.log(
            "Loading PDF:",
            path
        );


        /* Show loading */

        if (loading) {

            loading.style.display =
                "flex";

        }


        /* Hide error */

        if (errorBox) {

            errorBox.style.display =
                "none";

        }


        /* Clear previous PDF */

        pdfFrame.src = "";


        /*
           Small delay makes the loading
           screen appear correctly.
        */

        setTimeout(function () {

            /*
               Browser native PDF viewer.
               
               NO PDF.js required.
            */

            pdfFrame.src =
                encodeURI(path);


        }, 100);


        /* =================================================
           PDF FRAME LOAD EVENT
        ================================================= */

        pdfFrame.onload =
            function () {

                console.log(
                    "PDF iframe loaded successfully."
                );


                if (loading) {

                    loading.style.display =
                        "none";

                }

            };


        /* =================================================
           PDF FRAME ERROR
        ================================================= */

        pdfFrame.onerror =
            function () {

                console.error(
                    "Failed to load PDF:",
                    path
                );

                showError(
                    "The PDF file could not be opened. Check that the file path and filename in data.js exactly match the PDF in the pdfs folder."
                );

            };

    }


    /* =====================================================
       SHOW ERROR
    ===================================================== */

    function showError(message) {

        console.error(
            "PDF Viewer Error:",
            message
        );


        if (loading) {

            loading.style.display =
                "none";

        }


        if (pdfFrame) {

            pdfFrame.style.display =
                "none";

        }


        if (errorMessage) {

            errorMessage.textContent =
                message;

        }


        if (errorBox) {

            errorBox.style.display =
                "flex";

        }

    }


    /* =====================================================
       SAVE RECENTLY OPENED RESOURCE
    ===================================================== */

    function saveRecentlyOpened(resource) {

        try {

            let recent =
                JSON.parse(
                    localStorage.getItem(
                        "fodeRecentlyOpened"
                    )
                ) || [];


            /* Remove duplicate */

            recent =
                recent.filter(
                    function (item) {

                        return item.id !==
                            resource.id;

                    }
                );


            /* Add newest item first */

            recent.unshift({

                id: resource.id,

                title: resource.title,

                grade: resource.grade,

                subject: resource.subject,

                unit: resource.unit,

                file: resource.file,

                openedAt:
                    new Date().toISOString()

            });


            /* Keep last 20 */

            recent =
                recent.slice(0, 20);


            localStorage.setItem(
                "fodeRecentlyOpened",
                JSON.stringify(recent)
            );


            console.log(
                "Recently opened resource saved."
            );

        }

        catch (error) {

            console.warn(
                "Could not save recent resource:",
                error
            );

        }

    }


    /* =====================================================
       GET SUBJECT NAME
    ===================================================== */

    function getSubjectName(subjectId) {

        if (
            typeof getSubjectById !==
            "function"
        ) {

            return subjectId;
        }


        const subject =
            getSubjectById(subjectId);


        if (subject) {

            return subject.name;

        }


        return subjectId;

    }


});