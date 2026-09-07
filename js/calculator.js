/* =========================================================
   FODE OFFLINE LEARNING HUB
   SCIENTIFIC CALCULATOR
   File: js/calculator.js

   Features:
   - Basic arithmetic
   - sin / cos / tan
   - DEG / RAD / GRAD
   - log / ln
   - Square root
   - x² / x³
   - x⁻¹
   - π
   - EXP
   - Absolute value
   - Negative numbers
   - Ans
   - M+ / M- / RCL
   - DEL
   - AC
   - Keyboard support
   - SHIFT
   - Fully offline
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       DISPLAY ELEMENTS
    ===================================================== */

    const displayExpression =
        document.getElementById("displayExpression");

    const displayResult =
        document.getElementById("displayResult");

    const angleIndicator =
        document.getElementById("angleIndicator");

    const shiftIndicator =
        document.getElementById("shiftIndicator");

    const memoryIndicator =
        document.getElementById("memoryIndicator");


    /* =====================================================
       BUTTONS
    ===================================================== */

    const clearBtn =
        document.getElementById("clearBtn");

    const deleteBtn =
        document.getElementById("deleteBtn");

    const equalsBtn =
        document.getElementById("equalsBtn");

    const shiftBtn =
        document.getElementById("shiftBtn");

    const alphaBtn =
        document.getElementById("alphaBtn");

    const modeBtn =
        document.getElementById("modeBtn");

    const onBtn =
        document.getElementById("onBtn");

    const degreeBtn =
        document.getElementById("degreeBtn");

    const radianBtn =
        document.getElementById("radianBtn");

    const gradianBtn =
        document.getElementById("gradianBtn");


    /* =====================================================
       CALCULATOR STATE
    ===================================================== */

    let expression = "";

    let result = "0";

    let answer = 0;

    let memory = 0;

    let angleMode = "DEG";

    let shiftActive = false;

    let calculatorOn = true;

    let justCalculated = false;


    /* =====================================================
       DISPLAY
    ===================================================== */

    function updateDisplay() {

        if (!calculatorOn) {

            displayExpression.textContent = "";

            displayResult.textContent = "";

            angleIndicator.textContent = "";

            shiftIndicator.textContent = "";

            memoryIndicator.textContent = "";

            return;
        }


        displayExpression.textContent =
            expression || "0";

        displayResult.textContent =
            result || "0";


        angleIndicator.textContent =
            angleMode;


        shiftIndicator.textContent =
            shiftActive ? "SHIFT" : "";


        memoryIndicator.textContent =
            memory !== 0 ? "M" : "";
    }


    /* =====================================================
       FORMAT NUMBER
    ===================================================== */

    function formatNumber(value) {

        if (!Number.isFinite(value)) {
            return "Math Error";
        }


        if (Math.abs(value) < 1e-12) {
            value = 0;
        }


        if (
            Math.abs(value) >= 1e12 ||
            (
                Math.abs(value) > 0 &&
                Math.abs(value) < 1e-9
            )
        ) {

            return value.toExponential(10)
                .replace(/\.?0+e/, "e");
        }


        return Number(
            value.toPrecision(12)
        ).toString();
    }


    /* =====================================================
       CLEAR
    ===================================================== */

    function clearCalculator() {

        expression = "";

        result = "0";

        justCalculated = false;

        updateDisplay();
    }


    /* =====================================================
       DELETE
    ===================================================== */

    function deleteLast() {

        if (!calculatorOn) return;

        if (justCalculated) {

            expression = "";

            result = "0";

            justCalculated = false;

            updateDisplay();

            return;
        }


        expression =
            expression.slice(0, -1);


        if (expression === "") {
            result = "0";
        }


        updateDisplay();
    }


    /* =====================================================
       APPEND TEXT
    ===================================================== */

    function appendValue(value) {

        if (!calculatorOn) return;


        if (justCalculated) {

            if (
                /^[0-9.]$/.test(value) ||
                value === "π" ||
                value === "("
            ) {

                expression = "";

            } else {

                expression = result
                    .replace(/Math\./g, "");

            }

            justCalculated = false;
        }


        expression += value;

        updateDisplay();
    }


    /* =====================================================
       DEG / RAD / GRAD
    ===================================================== */

    function toRadians(value) {

        if (angleMode === "DEG") {

            return value * Math.PI / 180;

        }


        if (angleMode === "GRAD") {

            return value * Math.PI / 200;

        }


        return value;
    }


    function fromRadians(value) {

        if (angleMode === "DEG") {

            return value * 180 / Math.PI;

        }


        if (angleMode === "GRAD") {

            return value * 200 / Math.PI;

        }


        return value;
    }


    /* =====================================================
       SCIENTIFIC FUNCTIONS
    ===================================================== */

    function applyFunction(functionName) {

        if (!calculatorOn) return;


        let value;


        /* If there is an existing expression,
           calculate it first. */

        if (expression.trim() !== "") {

            value = calculateExpression(
                expression
            );

        } else {

            value = answer;

        }


        if (!Number.isFinite(value)) {

            result = "Math Error";

            updateDisplay();

            return;
        }


        let calculated;


        switch (functionName) {


            /* =============================================
               SQUARE
            ============================================= */

            case "power2":

                calculated =
                    Math.pow(value, 2);

                break;


            /* =============================================
               CUBE
            ============================================= */

            case "power3":

                calculated =
                    Math.pow(value, 3);

                break;


            /* =============================================
               SQUARE ROOT
            ============================================= */

            case "sqrt":

                if (value < 0) {

                    result = "Math Error";

                    updateDisplay();

                    return;
                }

                calculated =
                    Math.sqrt(value);

                break;


            /* =============================================
               INVERSE
            ============================================= */

            case "inverse":

                if (value === 0) {

                    result = "Math Error";

                    updateDisplay();

                    return;
                }

                calculated =
                    1 / value;

                break;


            /* =============================================
               LOG BASE 10
            ============================================= */

            case "log":

                if (value <= 0) {

                    result = "Math Error";

                    updateDisplay();

                    return;
                }

                calculated =
                    Math.log10(value);

                break;


            /* =============================================
               NATURAL LOG
            ============================================= */

            case "ln":

                if (value <= 0) {

                    result = "Math Error";

                    updateDisplay();

                    return;
                }

                calculated =
                    Math.log(value);

                break;


            /* =============================================
               SINE
            ============================================= */

            case "sin":

                calculated =
                    Math.sin(
                        toRadians(value)
                    );

                break;


            /* =============================================
               COSINE
            ============================================= */

            case "cos":

                calculated =
                    Math.cos(
                        toRadians(value)
                    );

                break;


            /* =============================================
               TANGENT
            ============================================= */

            case "tan":

                calculated =
                    Math.tan(
                        toRadians(value)
                    );

                break;


            /* =============================================
               ABSOLUTE VALUE
            ============================================= */

            case "abs":

                calculated =
                    Math.abs(value);

                break;


            /* =============================================
               NEGATIVE
            ============================================= */

            case "negate":

                calculated =
                    -value;

                break;


            /* =============================================
               SHIFT FUNCTIONS
            ============================================= */

            case "asin":

                calculated =
                    fromRadians(
                        Math.asin(value)
                    );

                break;


            case "acos":

                calculated =
                    fromRadians(
                        Math.acos(value)
                    );

                break;


            case "atan":

                calculated =
                    fromRadians(
                        Math.atan(value)
                    );

                break;


            default:

                return;
        }


        answer = calculated;

        result =
            formatNumber(calculated);

        expression =
            formatNumber(calculated);

        justCalculated = true;

        updateDisplay();
    }


    /* =====================================================
       CALCULATE EXPRESSION
    ===================================================== */

    function calculateExpression(input) {

        if (!input) {
            return 0;
        }


        let exp = input;


        /* =============================================
           Convert calculator symbols
        ============================================= */

        exp = exp
            .replace(/×/g, "*")
            .replace(/÷/g, "/")
            .replace(/−/g, "-")
            .replace(/π/g, "PI")
            .replace(/EXP/g, "e")
            .replace(/\^/g, "**");


        /* =============================================
           Handle implicit multiplication

           Examples:

           2π → 2*PI
           2(3) → 2*(3)
           (2)3 → (2)*3
        ============================================= */

        exp = exp.replace(
            /(\d|\))(?=PI|\()/g,
            "$1*"
        );


        exp = exp.replace(
            /(PI|\))(?=\d)/g,
            "$1*"
        );


        /* =============================================
           Protect against unwanted characters
        ============================================= */

        if (
            !/^[0-9+\-*/().%\sA-Za-z_]*$/.test(exp)
        ) {

            throw new Error("Invalid expression");
        }


        /* =============================================
           Replace PI
        ============================================= */

        exp = exp.replace(
            /\bPI\b/g,
            "Math.PI"
        );


        /* =============================================
           Replace percentages

           50% → 50/100
        ============================================= */

        exp = exp.replace(
            /(\d+(?:\.\d+)?)%/g,
            "($1/100)"
        );


        /* =============================================
           Evaluate expression

           The expression has already been restricted
           to calculator characters.
        ============================================= */

        const calculation =
            Function(
                '"use strict"; return (' +
                exp +
                ')'
            )();


        if (
            typeof calculation !== "number" ||
            !Number.isFinite(calculation)
        ) {

            throw new Error("Math Error");
        }


        return calculation;
    }


    /* =====================================================
       EQUALS
    ===================================================== */

    function calculate() {

        if (!calculatorOn) return;


        if (!expression.trim()) {

            result =
                formatNumber(answer);

            updateDisplay();

            return;
        }


        try {

            const calculated =
                calculateExpression(
                    expression
                );


            answer =
                calculated;


            result =
                formatNumber(
                    calculated
                );


            justCalculated = true;


        } catch (error) {

            result = "Math Error";

            justCalculated = true;
        }


        updateDisplay();
    }


    /* =====================================================
       FRACTION
    ===================================================== */

    function fractionFunction() {

        if (!calculatorOn) return;


        /*
           Converts the current expression into:

           (expression)/

           Example:

           1.5 → (1.5)/
        */

        if (expression) {

            expression =
                "(" +
                expression +
                ")/";

        } else {

            expression = "1/";
        }


        result = "0";

        justCalculated = false;

        updateDisplay();
    }


    /* =====================================================
       PI
    ===================================================== */

    function insertPi() {

        appendValue("π");
    }


    /* =====================================================
       EXP
    ===================================================== */

    function insertExp() {

        if (!calculatorOn) return;


        expression += "EXP";

        updateDisplay();
    }


    /* =====================================================
       ANSWER
    ===================================================== */

    function insertAnswer() {

        if (!calculatorOn) return;


        if (justCalculated) {

            expression = "";

            justCalculated = false;
        }


        expression +=
            formatNumber(answer);

        updateDisplay();
    }


    /* =====================================================
       MEMORY
    ===================================================== */

    function memoryStore() {

        if (!calculatorOn) return;


        let value;


        try {

            value =
                expression
                    ? calculateExpression(expression)
                    : answer;

        } catch {

            value = answer;
        }


        if (Number.isFinite(value)) {

            memory = value;

        }


        updateDisplay();
    }


    function memoryRecall() {

        if (!calculatorOn) return;


        appendValue(
            formatNumber(memory)
        );
    }


    function memoryPlus() {

        if (!calculatorOn) return;


        let value;


        try {

            value =
                expression
                    ? calculateExpression(expression)
                    : answer;

        } catch {

            value = answer;
        }


        if (Number.isFinite(value)) {

            memory += value;

        }


        updateDisplay();
    }


    function memoryMinus() {

        if (!calculatorOn) return;


        let value;


        try {

            value =
                expression
                    ? calculateExpression(expression)
                    : answer;

        } catch {

            value = answer;
        }


        if (Number.isFinite(value)) {

            memory -= value;

        }


        updateDisplay();
    }


    /* =====================================================
       ENGINEERING NOTATION
    ===================================================== */

    function engineeringNotation() {

        if (!calculatorOn) return;


        let value;


        try {

            value =
                expression
                    ? calculateExpression(expression)
                    : answer;

        } catch {

            value = answer;
        }


        if (!Number.isFinite(value)) {

            result = "Math Error";

            updateDisplay();

            return;
        }


        if (value === 0) {

            result = "0";

            updateDisplay();

            return;
        }


        const exponent =
            Math.floor(
                Math.log10(
                    Math.abs(value)
                ) / 3
            ) * 3;


        const coefficient =
            value /
            Math.pow(10, exponent);


        result =
            coefficient
                .toPrecision(10)
                .replace(/\.?0+$/, "") +
            " × 10^" +
            exponent;


        answer = value;

        justCalculated = true;

        updateDisplay();
    }


    /* =====================================================
       SHIFT
    ===================================================== */

    function toggleShift() {

        if (!calculatorOn) return;


        shiftActive =
            !shiftActive;


        shiftBtn.classList.toggle(
            "shift-active",
            shiftActive
        );


        updateDisplay();
    }


    /* =====================================================
       SHIFT FUNCTION
    ===================================================== */

    function useShiftFunction(action) {

        if (!shiftActive) {

            return false;
        }


        switch (action) {

            case "sin":

                applyFunction("asin");

                break;


            case "cos":

                applyFunction("acos");

                break;


            case "tan":

                applyFunction("atan");

                break;


            case "power2":

                applyFunction("sqrt");

                break;


            case "power3":

                applyFunction("power3");

                break;


            case "log":

                /*
                   10^x
                */

                let value =
                    expression
                        ? calculateExpression(expression)
                        : answer;


                answer =
                    Math.pow(10, value);

                result =
                    formatNumber(answer);

                expression =
                    formatNumber(answer);

                justCalculated = true;

                updateDisplay();

                break;


            case "ln":

                /*
                   e^x
                */

                let lnValue =
                    expression
                        ? calculateExpression(expression)
                        : answer;


                answer =
                    Math.exp(lnValue);

                result =
                    formatNumber(answer);

                expression =
                    formatNumber(answer);

                justCalculated = true;

                updateDisplay();

                break;


            default:

                return false;
        }


        shiftActive = false;

        shiftBtn.classList.remove(
            "shift-active"
        );

        updateDisplay();

        return true;
    }


    /* =====================================================
       BUTTON ACTION HANDLER
    ===================================================== */

    function handleAction(action) {

        if (!calculatorOn) return;


        /* SHIFT */

        if (action === "shift") {

            toggleShift();

            return;
        }


        /* Scientific functions */

        if (
            [
                "power2",
                "power3",
                "sqrt",
                "inverse",
                "log",
                "ln",
                "sin",
                "cos",
                "tan",
                "abs",
                "negate"
            ].includes(action)
        ) {

            if (
                useShiftFunction(action)
            ) {

                return;
            }


            applyFunction(action);

            return;
        }


        /* π */

        if (action === "pi") {

            insertPi();

            return;
        }


        /* EXP */

        if (action === "exp") {

            insertExp();

            return;
        }


        /* Ans */

        if (action === "ans") {

            insertAnswer();

            return;
        }


        /* Fraction */

        if (action === "fraction") {

            fractionFunction();

            return;
        }


        /* Engineering */

        if (action === "eng") {

            engineeringNotation();

            return;
        }


        /* Memory */

        if (action === "memoryStore") {

            memoryStore();

            return;
        }


        if (action === "memoryRecall") {

            memoryRecall();

            return;
        }


        if (action === "mplus") {

            memoryPlus();

            return;
        }


        if (action === "mminus") {

            memoryMinus();

            return;
        }
    }


    /* =====================================================
       DATA-VALUE BUTTONS
    ===================================================== */

    const valueButtons =
        document.querySelectorAll(
            "[data-value]"
        );


    valueButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    appendValue(
                        button.dataset.value
                    );

                }
            );

        }
    );


    /* =====================================================
       ACTION BUTTONS
    ===================================================== */

    const actionButtons =
        document.querySelectorAll(
            "[data-action]"
        );


    actionButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    handleAction(
                        button.dataset.action
                    );

                }
            );

        }
    );


    /* =====================================================
       CLEAR BUTTON
    ===================================================== */

    if (clearBtn) {

        clearBtn.addEventListener(
            "click",
            clearCalculator
        );
    }


    /* =====================================================
       DELETE BUTTON
    ===================================================== */

    if (deleteBtn) {

        deleteBtn.addEventListener(
            "click",
            deleteLast
        );
    }


    /* =====================================================
       EQUALS BUTTON
    ===================================================== */

    if (equalsBtn) {

        equalsBtn.addEventListener(
            "click",
            calculate
        );
    }


    /* =====================================================
       SHIFT BUTTON
    ===================================================== */

    if (shiftBtn) {

        shiftBtn.addEventListener(
            "click",
            toggleShift
        );
    }


    /* =====================================================
       DEGREE MODE
    ===================================================== */

    if (degreeBtn) {

        degreeBtn.addEventListener(
            "click",
            function () {

                angleMode = "DEG";

                degreeBtn.classList.add(
                    "active"
                );

                radianBtn.classList.remove(
                    "active"
                );

                gradianBtn.classList.remove(
                    "active"
                );

                updateDisplay();
            }
        );
    }


    /* =====================================================
       RADIAN MODE
    ===================================================== */

    if (radianBtn) {

        radianBtn.addEventListener(
            "click",
            function () {

                angleMode = "RAD";

                degreeBtn.classList.remove(
                    "active"
                );

                radianBtn.classList.add(
                    "active"
                );

                gradianBtn.classList.remove(
                    "active"
                );

                updateDisplay();
            }
        );
    }


    /* =====================================================
       GRADIAN MODE
    ===================================================== */

    if (gradianBtn) {

        gradianBtn.addEventListener(
            "click",
            function () {

                angleMode = "GRAD";

                degreeBtn.classList.remove(
                    "active"
                );

                radianBtn.classList.remove(
                    "active"
                );

                gradianBtn.classList.add(
                    "active"
                );

                updateDisplay();
            }
        );
    }


    /* =====================================================
       MODE BUTTON
    ===================================================== */

    if (modeBtn) {

        modeBtn.addEventListener(
            "click",
            function () {

                if (angleMode === "DEG") {

                    angleMode = "RAD";

                } else if (
                    angleMode === "RAD"
                ) {

                    angleMode = "GRAD";

                } else {

                    angleMode = "DEG";
                }


                degreeBtn.classList.toggle(
                    "active",
                    angleMode === "DEG"
                );


                radianBtn.classList.toggle(
                    "active",
                    angleMode === "RAD"
                );


                gradianBtn.classList.toggle(
                    "active",
                    angleMode === "GRAD"
                );


                updateDisplay();
            }
        );
    }


    /* =====================================================
       ALPHA BUTTON
    ===================================================== */

    if (alphaBtn) {

        alphaBtn.addEventListener(
            "click",
            function () {

                /*
                   ALPHA is provided as a calculator-style
                   control. It can be expanded later for
                   variable storage.
                */

                if (!calculatorOn) return;


                displayExpression.textContent =
                    "ALPHA";

                setTimeout(
                    updateDisplay,
                    600
                );
            }
        );
    }


    /* =====================================================
       ON BUTTON
    ===================================================== */

    if (onBtn) {

        onBtn.addEventListener(
            "click",
            function () {

                calculatorOn =
                    !calculatorOn;


                if (calculatorOn) {

                    expression = "";

                    result = "0";

                    shiftActive = false;

                    shiftBtn.classList.remove(
                        "shift-active"
                    );

                }


                updateDisplay();
            }
        );
    }


    /* =====================================================
       KEYBOARD SUPPORT
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (!calculatorOn) {

                if (
                    event.key === "Enter"
                ) {

                    calculatorOn = true;

                    updateDisplay();
                }

                return;
            }


            const key =
                event.key;


            /* Numbers */

            if (
                /^[0-9]$/.test(key)
            ) {

                appendValue(key);

                return;
            }


            /* Decimal */

            if (key === ".") {

                appendValue(".");

                return;
            }


            /* Operators */

            if (key === "+") {

                appendValue("+");

                return;
            }


            if (key === "-") {

                appendValue("−");

                return;
            }


            if (key === "*") {

                appendValue("×");

                return;
            }


            if (key === "/") {

                appendValue("÷");

                return;
            }


            /* Parentheses */

            if (key === "(") {

                appendValue("(");

                return;
            }


            if (key === ")") {

                appendValue(")");

                return;
            }


            /* Enter */

            if (
                key === "Enter" ||
                key === "="
            ) {

                event.preventDefault();

                calculate();

                return;
            }


            /* Backspace */

            if (
                key === "Backspace"
            ) {

                deleteLast();

                return;
            }


            /* Escape */

            if (
                key === "Escape"
            ) {

                clearCalculator();

                return;
            }


            /* π */

            if (
                key.toLowerCase() === "p"
            ) {

                insertPi();

                return;
            }


            /* S = SHIFT */

            if (
                key.toLowerCase() === "s"
            ) {

                toggleShift();

                return;
            }


            /* Scientific shortcuts */

            if (
                key.toLowerCase() === "r"
            ) {

                applyFunction("sqrt");

                return;
            }


            if (
                key.toLowerCase() === "l"
            ) {

                applyFunction("log");

                return;
            }
        }
    );


    /* =====================================================
       START CALCULATOR
    ===================================================== */

    updateDisplay();


    console.log(
        "FODE Scientific Calculator loaded successfully."
    );

});