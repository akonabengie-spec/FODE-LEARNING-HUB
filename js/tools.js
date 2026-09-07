/* =========================================================
   FODE OFFLINE LEARNING HUB
   TOOLS
========================================================= */


/* =========================================================
   CALCULATOR
========================================================= */

const calculatorDisplay =
    document.getElementById(
        "calculatorDisplay"
    );


function openCalculator() {

    const modal =
        document.getElementById(
            "calculatorModal"
        );

    if (modal) {

        modal.style.display =
            "flex";

    }

}


function closeCalculator() {

    const modal =
        document.getElementById(
            "calculatorModal"
        );

    if (modal) {

        modal.style.display =
            "none";

    }

}


function calculatorInput(
    value
) {

    if (!calculatorDisplay) {

        return;

    }


    if (
        calculatorDisplay.value ===
        "0"
    ) {

        calculatorDisplay.value =
            value;

    } else {

        calculatorDisplay.value +=
            value;

    }

}


function calculatorClear() {

    if (!calculatorDisplay) {

        return;

    }


    calculatorDisplay.value =
        "0";

}


function calculatorCalculate() {

    if (!calculatorDisplay) {

        return;

    }


    try {

        const expression =
            calculatorDisplay.value;


        /*
            Only allow calculator characters.
        */

        if (
            !/^[0-9+\-*/().\s]+$/
                .test(expression)
        ) {

            calculatorDisplay.value =
                "Error";

            return;

        }


        const result =
            Function(
                `"use strict"; return (${expression})`
            )();


        if (
            !Number.isFinite(result)
        ) {

            calculatorDisplay.value =
                "Error";

            return;

        }


        calculatorDisplay.value =
            String(result);

    }

    catch {

        calculatorDisplay.value =
            "Error";

    }

}


/* =========================================================
   COMING SOON
========================================================= */

function showComingSoon(
    toolName
) {

    alert(
        `${toolName} will be available in a future update.`
    );

}


/* =========================================================
   KEYBOARD SUPPORT
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            !calculatorDisplay
        ) {

            return;

        }


        const allowed =
            "0123456789+-*/().";


        if (
            allowed.includes(
                event.key
            )
        ) {

            calculatorInput(
                event.key
            );

        }


        if (
            event.key ===
            "Enter"
        ) {

            calculatorCalculate();

        }


        if (
            event.key ===
            "Escape"
        ) {

            closeCalculator();

        }

    }
);