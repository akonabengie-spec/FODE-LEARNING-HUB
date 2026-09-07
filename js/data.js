/* =========================================================
   FODE OFFLINE LEARNING HUB
   CENTRAL DATA SYSTEM
   File: js/data.js

   Controls:
   - Website information
   - Grades
   - Subjects
   - Grade-specific subjects
   - Units / Modules
   - PDF resources
   - Helper functions

   IMPORTANT:
   PDF paths below are based on the actual PDF file list.
========================================================= */


/* =========================================================
   WEBSITE DATA
========================================================= */

const FODE_DATA = {

    website: {
        name: "FODE OFFLINE LEARNING HUB",
        shortName: "FODE Learning Hub",
        description:
            "An offline learning platform for accessing FODE learning resources, subjects, units, modules and PDF materials.",
        version: "2.0",
        offline: true
    },


    /* =====================================================
       GRADES
    ===================================================== */

    grades: [
        {
            id: "9",
            name: "Grade 9",
            description: "Access Grade 9 learning resources."
        },
        {
            id: "10",
            name: "Grade 10",
            description: "Access Grade 10 learning resources."
        },
        {
            id: "11",
            name: "Grade 11",
            description: "Access Grade 11 learning resources."
        },
        {
            id: "12",
            name: "Grade 12",
            description: "Access Grade 12 learning resources."
        }
    ],


    /* =====================================================
       SUBJECTS
    ===================================================== */

    subjects: [

        {
            id: "mathematics",
            name: "Mathematics",
            icon: "🔢",
            description: "Mathematics learning resources."
        },

        {
            id: "mathematics-general",
            name: "General Mathematics",
            icon: "📐",
            description: "General Mathematics learning resources."
        },

        {
            id: "mathematics-advanced",
            name: "Advanced Mathematics",
            icon: "📊",
            description: "Advanced Mathematics learning resources."
        },

        {
            id: "english",
            name: "English",
            icon: "📖",
            description: "English learning resources."
        },

        {
            id: "applied-english",
            name: "Applied English",
            icon: "📝",
            description: "Applied English learning resources."
        },

        {
            id: "science",
            name: "Science",
            icon: "🔬",
            description: "Science learning resources."
        },

        {
            id: "physics",
            name: "Physics",
            icon: "⚛️",
            description: "Physics learning resources."
        },

        {
            id: "chemistry",
            name: "Chemistry",
            icon: "🧪",
            description: "Chemistry learning resources."
        },

        {
            id: "biology",
            name: "Biology",
            icon: "🧬",
            description: "Biology learning resources."
        },

        {
            id: "ict",
            name: "ICT",
            icon: "💻",
            description: "Information and Communication Technology learning resources."
        },

        {
            id: "language-literature",
            name: "Language and Literature",
            icon: "📚",
            description: "Language and Literature learning resources."
        },

        {
            id: "personal-development",
            name: "Personal Development",
            icon: "🌱",
            description: "Personal Development learning resources."
        },

        {
            id: "social-science",
            name: "Social Science",
            icon: "🌍",
            description: "Social Science learning resources."
        },

        {
            id: "history",
            name: "History",
            icon: "🏛️",
            description: "History learning resources."
        },

        {
            id: "geography",
            name: "Geography",
            icon: "🗺️",
            description: "Geography learning resources."
        },

        {
            id: "business-studies",
            name: "Business Studies",
            icon: "💼",
            description: "Business Studies learning resources."
        },

        {
            id: "economics",
            name: "Economics",
            icon: "📈",
            description: "Economics learning resources."
        }
    ],


    /* =====================================================
       GRADE → SUBJECT RELATIONSHIP

       Only subjects listed here appear for that grade.
    ===================================================== */

    gradeSubjects: {

        "9": [
            "mathematics",
            "english",
            "science",
            "ict",
            "personal-development",
            "social-science",
            "business-studies"
        ],

        "10": [
            "mathematics",
            "english",
            "science",
            "ict",
            "personal-development",
            "social-science",
            "business-studies"
        ],

        "11": [
            "applied-english",
            "biology",
            "business-studies",
            "chemistry",
            "economics",
            "geography",
            "history",
            "ict",
            "language-literature",
            "mathematics-advanced",
            "mathematics-general",
            "personal-development",
            "physics"
        ],

        "12": [
            "applied-english",
            "biology",
            "business-studies",
            "chemistry",
            "economics",
            "geography",
            "history",
            "ict",
            "language-literature",
            "mathematics-advanced",
            "mathematics-general",
            "personal-development",
            "physics"
        ]
    },


    /* =====================================================
       STANDARD UNIT / MODULE IDs

       These IDs remain compatible with your existing pages.
    ===================================================== */

    units: [

        {
            id: "unit1",
            name: "Unit 1"
        },

        {
            id: "unit2",
            name: "Unit 2"
        },

        {
            id: "unit3",
            name: "Unit 3"
        },

        {
            id: "unit4",
            name: "Unit 4"
        },

        {
            id: "unit5",
            name: "Unit 5"
        },

        {
            id: "unit6",
            name: "Unit 6"
        },

        {
            id: "project1",
            name: "Project 1"
        },

        {
            id: "project2",
            name: "Project 2"
        },

        {
            id: "project3",
            name: "Project 3"
        },

        {
            id: "data-sheet1",
            name: "Data Sheet 1"
        },

        {
            id: "data-sheet2",
            name: "Data Sheet 2"
        },

        {
            id: "data-sheet3",
            name: "Data Sheet 3"
        },

        {
            id: "data-sheet4",
            name: "Data Sheet 4"
        },

        {
            id: "data-sheet5",
            name: "Data Sheet 5"
        }
    ],


    /* =====================================================
       PDF RESOURCES

       Resources are generated from the actual PDF list.
    ===================================================== */

    resources: [

        /* =================================================
           GRADE 9
        ================================================= */


        /* Grade 9 Business Studies */

        {
            id: "g9-business-studies-unit1",
            title: "Grade 9 Business Studies - Unit 1",
            grade: "9",
            subject: "business-studies",
            unit: "unit1",
            type: "PDF",
            file: "pdfs/grade-9/business-studies/unit-1/Grade.9.Business.Studies.Unit1.pdf"
        },

        {
            id: "g9-business-studies-unit2",
            title: "Grade 9 Business Studies - Unit 2",
            grade: "9",
            subject: "business-studies",
            unit: "unit2",
            type: "PDF",
            file: "pdfs/grade-9/business-studies/unit-2/Grade.9.Business.Studies.Unit2.pdf"
        },

        {
            id: "g9-business-studies-unit3",
            title: "Grade 9 Business Studies - Unit 3",
            grade: "9",
            subject: "business-studies",
            unit: "unit3",
            type: "PDF",
            file: "pdfs/grade-9/business-studies/unit-3/Grade.9.Business.Studies.Unit3.pdf"
        },

        {
            id: "g9-business-studies-unit4",
            title: "Grade 9 Business Studies - Unit 4",
            grade: "9",
            subject: "business-studies",
            unit: "unit4",
            type: "PDF",
            file: "pdfs/grade-9/business-studies/unit-4/Grade.9.Business.Studies.Unit4.pdf"
        },

        {
            id: "g9-business-studies-unit5",
            title: "Grade 9 Business Studies - Unit 5",
            grade: "9",
            subject: "business-studies",
            unit: "unit5",
            type: "PDF",
            file: "pdfs/grade-9/business-studies/unit-5/Grade.9.Business.Studies.Unit5.pdf"
        },

        {
            id: "g9-business-studies-unit6",
            title: "Grade 9 Business Studies - Unit 6",
            grade: "9",
            subject: "business-studies",
            unit: "unit6",
            type: "PDF",
            file: "pdfs/grade-9/business-studies/unit-6/Grade.9.Business.Studies.Unit6.pdf"
        },


        /* Grade 9 English */

        {
            id: "g9-english-unit1",
            title: "Grade 9 English - Unit 1",
            grade: "9",
            subject: "english",
            unit: "unit1",
            type: "PDF",
            file: "pdfs/grade-9/english/strand-1/G9.English.Language.Unit.1.1.1.pdf"
        },

        {
            id: "g9-english-unit2",
            title: "Grade 9 English - Unit 2",
            grade: "9",
            subject: "english",
            unit: "unit2",
            type: "PDF",
            file: "pdfs/grade-9/english/strand-2/G9.English.Language.Unit.2.pdf"
        },

        {
            id: "g9-english-unit3",
            title: "Grade 9 English - Unit 3",
            grade: "9",
            subject: "english",
            unit: "unit3",
            type: "PDF",
            file: "pdfs/grade-9/english/strand-3/G9.English.Language.Unit.3.pdf"
        },

        {
            id: "g9-english-unit4",
            title: "Grade 9 English - Unit 4",
            grade: "9",
            subject: "english",
            unit: "unit4",
            type: "PDF",
            file: "pdfs/grade-9/english/strand-4/G9.English.Language.Unit.4.1.1.pdf"
        },

        {
            id: "g9-english-unit5",
            title: "Grade 9 English - Unit 5",
            grade: "9",
            subject: "english",
            unit: "unit5",
            type: "PDF",
            file: "pdfs/grade-9/english/strand-5/G9.English.Language.Unit.5.1.1.pdf"
        },

        {
            id: "g9-english-unit6",
            title: "Grade 9 English - Unit 6",
            grade: "9",
            subject: "english",
            unit: "unit6",
            type: "PDF",
            file: "pdfs/grade-9/english/strand-6/G9.English.Language.Unit.6.pdf"
        },


        /* Grade 9 ICT */

        {
            id: "g9-ict-unit1",
            title: "Grade 9 ICT - Unit 1",
            grade: "9",
            subject: "ict",
            unit: "unit1",
            type: "PDF",
            file: "pdfs/grade-9/ict/unit-1/Grade9.Design.Technology.Unit.1.pdf"
        },

        {
            id: "g9-ict-unit2",
            title: "Grade 9 ICT - Unit 2",
            grade: "9",
            subject: "ict",
            unit: "unit2",
            type: "PDF",
            file: "pdfs/grade-9/ict/unit-2/Grade9.Design.Technology.Unit.2.pdf"
        },

        {
            id: "g9-ict-unit3",
            title: "Grade 9 ICT - Unit 3",
            grade: "9",
            subject: "ict",
            unit: "unit3",
            type: "PDF",
            file: "pdfs/grade-9/ict/unit-3/Grade9.Design.Technology.Unit.3.pdf"
        },

        {
            id: "g9-ict-unit4",
            title: "Grade 9 ICT - Unit 4",
            grade: "9",
            subject: "ict",
            unit: "unit4",
            type: "PDF",
            file: "pdfs/grade-9/ict/unit-4/Grade9.Design.Technology.Unit.4.pdf"
        },


        /* Grade 9 Mathematics */

        {
            id: "g9-mathematics-unit1",
            title: "Grade 9 Mathematics - Unit 1",
            grade: "9",
            subject: "mathematics",
            unit: "unit1",
            type: "PDF",
            file: "pdfs/grade-9/mathematics/unit-1/Gr9.Mathematics.U1.pdf.pdf"
        },

        {
            id: "g9-mathematics-unit2",
            title: "Grade 9 Mathematics - Unit 2",
            grade: "9",
            subject: "mathematics",
            unit: "unit2",
            type: "PDF",
            file: "pdfs/grade-9/mathematics/unit-2/Gr9.Mathematics.U2.pdf.pdf"
        },

        {
            id: "g9-mathematics-unit3",
            title: "Grade 9 Mathematics - Unit 3",
            grade: "9",
            subject: "mathematics",
            unit: "unit3",
            type: "PDF",
            file: "pdfs/grade-9/mathematics/unit-3/Gr9.Mathematics.U3.pdf.pdf"
        },

        {
            id: "g9-mathematics-unit4",
            title: "Grade 9 Mathematics - Unit 4",
            grade: "9",
            subject: "mathematics",
            unit: "unit4",
            type: "PDF",
            file: "pdfs/grade-9/mathematics/unit-4/Gr9.Mathematics.U4.pdf.pdf"
        },

        {
            id: "g9-mathematics-unit5",
            title: "Grade 9 Mathematics - Unit 5",
            grade: "9",
            subject: "mathematics",
            unit: "unit5",
            type: "PDF",
            file: "pdfs/grade-9/mathematics/unit-5/Gr9.Mathematics.U5.pdf.pdf"
        },

        {
            id: "g9-mathematics-unit6",
            title: "Grade 9 Mathematics - Unit 6",
            grade: "9",
            subject: "mathematics",
            unit: "unit6",
            type: "PDF",
            file: "pdfs/grade-9/mathematics/unit-6/Gr9.Mathematics.U6.pdf.pdf"
        },


        /* Grade 9 Personal Development */

        {
            id: "g9-personal-development-unit1",
            title: "Grade 9 Personal Development - Unit 1",
            grade: "9",
            subject: "personal-development",
            unit: "unit1",
            type: "PDF",
            file: "pdfs/grade-9/personal-development/unit-1/Gr9.Personal.Development.U1.pdf"
        },

        {
            id: "g9-personal-development-unit2",
            title: "Grade 9 Personal Development - Unit 2",
            grade: "9",
            subject: "personal-development",
            unit: "unit2",
            type: "PDF",
            file: "pdfs/grade-9/personal-development/unit-2/Gr9.Personal.Development.U2.pdf"
        },

        {
            id: "g9-personal-development-unit3",
            title: "Grade 9 Personal Development - Unit 3",
            grade: "9",
            subject: "personal-development",
            unit: "unit3",
            type: "PDF",
            file: "pdfs/grade-9/personal-development/unit-3/Gr9.Personal.Development.U3.pdf"
        },

        {
            id: "g9-personal-development-unit4",
            title: "Grade 9 Personal Development - Unit 4",
            grade: "9",
            subject: "personal-development",
            unit: "unit4",
            type: "PDF",
            file: "pdfs/grade-9/personal-development/unit-4/Gr9.Personal.Development.U4.pdf"
        },


        /* Grade 9 Science */

        {
            id: "g9-science-unit1",
            title: "Grade 9 Science - Unit 1",
            grade: "9",
            subject: "science",
            unit: "unit1",
            type: "PDF",
            file: "pdfs/grade-9/science/unit-1/Gr9.Working.Scientifically.U1.pdf"
        },

        {
            id: "g9-science-unit2",
            title: "Grade 9 Science - Unit 2",
            grade: "9",
            subject: "science",
            unit: "unit2",
            type: "PDF",
            file: "pdfs/grade-9/science/unit-2/Gr9.Ecology.U2.pdf"
        },

        {
            id: "g9-science-unit3",
            title: "Grade 9 Science - Unit 3",
            grade: "9",
            subject: "science",
            unit: "unit3",
            type: "PDF",
            file: "pdfs/grade-9/science/unit-3/Gr9.Our.Body.U3.pdf"
        },

        {
            id: "g9-science-unit4",
            title: "Grade 9 Science - Unit 4",
            grade: "9",
            subject: "science",
            unit: "unit4",
            type: "PDF",
            file: "pdfs/grade-9/science/unit-4/Gr9.Atoms.and.the.Periodic.Table.U4.pdf"
        },

        {
            id: "g9-science-unit5",
            title: "Grade 9 Science - Unit 5",
            grade: "9",
            subject: "science",
            unit: "unit5",
            type: "PDF",
            file: "pdfs/grade-9/science/unit-5/Gr9.Electricity.U5.pdf"
        },

        {
            id: "g9-science-unit6",
            title: "Grade 9 Science - Unit 6",
            grade: "9",
            subject: "science",
            unit: "unit6",
            type: "PDF",
            file: "pdfs/grade-9/science/unit-6/Gr9.Earth.and.Atmosphere.U6.pdf"
        },


        /* Grade 9 Social Science */

        {
            id: "g9-social-science-unit1",
            title: "Grade 9 Social Science - Unit 1",
            grade: "9",
            subject: "social-science",
            unit: "unit1",
            type: "PDF",
            file: "pdfs/grade-9/social-science/unit-1/GRADE.9.UNIT.1.pdf"
        },

        {
            id: "g9-social-science-unit2",
            title: "Grade 9 Social Science - Unit 2",
            grade: "9",
            subject: "social-science",
            unit: "unit2",
            type: "PDF",
            file: "pdfs/grade-9/social-science/unit-2/GRADE.9.UNIT.2.pdf"
        },

        {
            id: "g9-social-science-unit3",
            title: "Grade 9 Social Science - Unit 3",
            grade: "9",
            subject: "social-science",
            unit: "unit3",
            type: "PDF",
            file: "pdfs/grade-9/social-science/unit-3/GRADE.9.UNIT.3.pdf"
        },

        {
            id: "g9-social-science-unit4",
            title: "Grade 9 Social Science - Unit 4",
            grade: "9",
            subject: "social-science",
            unit: "unit4",
            type: "PDF",
            file: "pdfs/grade-9/social-science/unit-4/GRADE.9.UNIT.4.pdf"
        },

        {
            id: "g9-social-science-project1",
            title: "Grade 9 Social Science - Project 1",
            grade: "9",
            subject: "social-science",
            unit: "project1",
            type: "PDF",
            file: "pdfs/grade-9/social-science-projects/project-1/GRADE.9.PROJECT.1.pdf"
        },

        {
            id: "g9-social-science-project2",
            title: "Grade 9 Social Science - Project 2",
            grade: "9",
            subject: "social-science",
            unit: "project2",
            type: "PDF",
            file: "pdfs/grade-9/social-science-projects/project-2/GRADE.9.PROJECT.2.pdf"
        },


        /* =================================================
           GRADE 10
        ================================================= */


        /* Grade 10 Business Studies */

        {
            id: "g10-business-studies-unit1",
            title: "Grade 10 Business Studies - Unit 1",
            grade: "10",
            subject: "business-studies",
            unit: "unit1",
            type: "PDF",
            file: "pdfs/grade-10/business-studies/unit-1/Gr10.Business.Studies.U1.pdf"
        },

        {
            id: "g10-business-studies-unit2",
            title: "Grade 10 Business Studies - Unit 2",
            grade: "10",
            subject: "business-studies",
            unit: "unit2",
            type: "PDF",
            file: "pdfs/grade-10/business-studies/unit-2/Gr10.Business.Studies.U2.pdf"
        },

        {
            id: "g10-business-studies-unit3",
            title: "Grade 10 Business Studies - Unit 3",
            grade: "10",
            subject: "business-studies",
            unit: "unit3",
            type: "PDF",
            file: "pdfs/grade-10/business-studies/unit-3/Gr10.Business.Studies.U3.pdf"
        },

        {
            id: "g10-business-studies-unit4",
            title: "Grade 10 Business Studies - Unit 4",
            grade: "10",
            subject: "business-studies",
            unit: "unit4",
            type: "PDF",
            file: "pdfs/grade-10/business-studies/unit-4/Gr10.Business.Studies.U4.pdf"
        },

        {
            id: "g10-business-studies-unit5",
            title: "Grade 10 Business Studies - Unit 5",
            grade: "10",
            subject: "business-studies",
            unit: "unit5",
            type: "PDF",
            file: "pdfs/grade-10/business-studies/unit-5/Gr10.Business.Studies.U5.pdf"
        },

        {
            id: "g10-business-studies-unit6",
            title: "Grade 10 Business Studies - Unit 6",
            grade: "10",
            subject: "business-studies",
            unit: "unit6",
            type: "PDF",
            file: "pdfs/grade-10/business-studies/unit-6/Gr10.Business.Studies.U6.pdf"
        },


        /* Grade 10 English */

        {
            id: "g10-english-unit1",
            title: "Grade 10 English - Unit 1",
            grade: "10",
            subject: "english",
            unit: "unit1",
            type: "PDF",
            file: "pdfs/grade-10/english/strand-1/G10.English.Language.Unit.1.pdf"
        },

        {
            id: "g10-english-unit2",
            title: "Grade 10 English - Unit 2",
            grade: "10",
            subject: "english",
            unit: "unit2",
            type: "PDF",
            file: "pdfs/grade-10/english/strand-2/G10.English.Language.Unit.2.pdf"
        },

        {
            id: "g10-english-unit3",
            title: "Grade 10 English - Unit 3",
            grade: "10",
            subject: "english",
            unit: "unit3",
            type: "PDF",
            file: "pdfs/grade-10/english/strand-3/G10.English.Language.Unit.3.pdf"
        },

        {
            id: "g10-english-unit4",
            title: "Grade 10 English - Unit 4",
            grade: "10",
            subject: "english",
            unit: "unit4",
            type: "PDF",
            file: "pdfs/grade-10/english/strand-4/G10.English.Language.Unit.4.pdf"
        },

        {
            id: "g10-english-unit5",
            title: "Grade 10 English - Unit 5",
            grade: "10",
            subject: "english",
            unit: "unit5",
            type: "PDF",
            file: "pdfs/grade-10/english/strand-5/G10.English.Language.Unit.5.pdf"
        },


        /* Grade 10 ICT */

        {
            id: "g10-ict-unit1",
            title: "Grade 10 ICT - Unit 1",
            grade: "10",
            subject: "ict",
            unit: "unit1",
            type: "PDF",
            file: "pdfs/grade-10/ict/unit-1/Grade.10.Design.Technology.Unit.1.pdf"
        },

        {
            id: "g10-ict-unit2",
            title: "Grade 10 ICT - Unit 2",
            grade: "10",
            subject: "ict",
            unit: "unit2",
            type: "PDF",
            file: "pdfs/grade-10/ict/unit-2/Grade.10.Design.Technology.Unit.2.pdf"
        },

        {
            id: "g10-ict-unit3",
            title: "Grade 10 ICT - Unit 3",
            grade: "10",
            subject: "ict",
            unit: "unit3",
            type: "PDF",
            file: "pdfs/grade-10/ict/unit-3/Grade.10.Design.Technology.Unit.3.pdf"
        },

        {
            id: "g10-ict-unit4",
            title: "Grade 10 ICT - Unit 4",
            grade: "10",
            subject: "ict",
            unit: "unit4",
            type: "PDF",
            file: "pdfs/grade-10/ict/unit-4/Grade.10.Design.Technology.Unit.4.pdf"
        },


        /* Grade 10 Mathematics */

        {
            id: "g10-mathematics-unit1",
            title: "Grade 10 Mathematics - Unit 1",
            grade: "10",
            subject: "mathematics",
            unit: "unit1",
            type: "PDF",
            file: "pdfs/grade-10/mathematics/unit-1/Unit1 (1).pdf"
        },

        {
            id: "g10-mathematics-unit2",
            title: "Grade 10 Mathematics - Unit 2",
            grade: "10",
            subject: "mathematics",
            unit: "unit2",
            type: "PDF",
            file: "pdfs/grade-10/mathematics/unit-2/Unit2 (1).pdf"
        },

        {
            id: "g10-mathematics-unit3",
            title: "Grade 10 Mathematics - Unit 3",
            grade: "10",
            subject: "mathematics",
            unit: "unit3",
            type: "PDF",
            file: "pdfs/grade-10/mathematics/unit-3/Unit3 (1).pdf"
        },

        {
            id: "g10-mathematics-unit4",
            title: "Grade 10 Mathematics - Unit 4",
            grade: "10",
            subject: "mathematics",
            unit: "unit4",
            type: "PDF",
            file: "pdfs/grade-10/mathematics/unit-4/Unit4.pdf"
        },

        {
            id: "g10-mathematics-unit5",
            title: "Grade 10 Mathematics - Unit 5",
            grade: "10",
            subject: "mathematics",
            unit: "unit5",
            type: "PDF",
            file: "pdfs/grade-10/mathematics/unit-5/Unit5.pdf"
        },

        {
            id: "g10-mathematics-unit6",
            title: "Grade 10 Mathematics - Unit 6",
            grade: "10",
            subject: "mathematics",
            unit: "unit6",
            type: "PDF",
            file: "pdfs/grade-10/mathematics/unit-6/Unit6.pdf"
        },


        /* Grade 10 Personal Development */

        {
            id: "g10-personal-development-unit1",
            title: "Grade 10 Personal Development - Unit 1",
            grade: "10",
            subject: "personal-development",
            unit: "unit1",
            type: "PDF",
            file: "pdfs/grade-10/personal-development/unit-1/Gr10.Personal.Development.U1.pdf"
        },

        {
            id: "g10-personal-development-unit2",
            title: "Grade 10 Personal Development - Unit 2",
            grade: "10",
            subject: "personal-development",
            unit: "unit2",
            type: "PDF",
            file: "pdfs/grade-10/personal-development/unit-2/Gr10.Personal.Development.U2.pdf"
        },

        {
            id: "g10-personal-development-unit3",
            title: "Grade 10 Personal Development - Unit 3",
            grade: "10",
            subject: "personal-development",
            unit: "unit3",
            type: "PDF",
            file: "pdfs/grade-10/personal-development/unit-3/Gr10.Personal.Development.U3.pdf"
        },

        {
            id: "g10-personal-development-unit4",
            title: "Grade 10 Personal Development - Unit 4",
            grade: "10",
            subject: "personal-development",
            unit: "unit4",
            type: "PDF",
            file: "pdfs/grade-10/personal-development/unit-4/Gr10.Personal.Development.U4.pdf"
        },


        /* Grade 10 Science */

        {
            id: "g10-science-unit1",
            title: "Grade 10 Science - Unit 1",
            grade: "10",
            subject: "science",
            unit: "unit1",
            type: "PDF",
            file: "pdfs/grade-10/science/unit-1/Grade.10.Science.Unit1.1.pdf"
        },

        {
            id: "g10-science-unit2",
            title: "Grade 10 Science - Unit 2",
            grade: "10",
            subject: "science",
            unit: "unit2",
            type: "PDF",
            file: "pdfs/grade-10/science/unit-2/Grade.10.Science.Unit2.1.pdf"
        },

        {
            id: "g10-science-unit3",
            title: "Grade 10 Science - Unit 3",
            grade: "10",
            subject: "science",
            unit: "unit3",
            type: "PDF",
            file: "pdfs/grade-10/science/unit-3/Grade.10.Science.Unit3.pdf"
        },

        {
            id: "g10-science-unit4",
            title: "Grade 10 Science - Unit 4",
            grade: "10",
            subject: "science",
            unit: "unit4",
            type: "PDF",
            file: "pdfs/grade-10/science/unit-4/Grade.10.Science.Unit4.pdf"
        },

        {
            id: "g10-science-unit5",
            title: "Grade 10 Science - Unit 5",
            grade: "10",
            subject: "science",
            unit: "unit5",
            type: "PDF",
            file: "pdfs/grade-10/science/unit-5/Grade.10.Science.Unit5.pdf"
        },

        {
            id: "g10-science-unit6",
            title: "Grade 10 Science - Unit 6",
            grade: "10",
            subject: "science",
            unit: "unit6",
            type: "PDF",
            file: "pdfs/grade-10/science/unit-6/Grade.10.Science.Unit6.pdf"
        },


        /* Grade 10 Social Science */

        {
            id: "g10-social-science-unit1",
            title: "Grade 10 Social Science - Unit 1",
            grade: "10",
            subject: "social-science",
            unit: "unit1",
            type: "PDF",
            file: "pdfs/grade-10/social-science/unit-1/GRADE.10.UNIT1.pdf"
        },

        {
            id: "g10-social-science-unit2",
            title: "Grade 10 Social Science - Unit 2",
            grade: "10",
            subject: "social-science",
            unit: "unit2",
            type: "PDF",
            file: "pdfs/grade-10/social-science/unit-2/GRADE.10.UNIT2.pdf"
        },

        {
            id: "g10-social-science-unit3",
            title: "Grade 10 Social Science - Unit 3",
            grade: "10",
            subject: "social-science",
            unit: "unit3",
            type: "PDF",
            file: "pdfs/grade-10/social-science/unit-3/GRADE.10.UNIT3.pdf"
        },

        {
            id: "g10-social-science-project1",
            title: "Grade 10 Social Science - Project 1",
            grade: "10",
            subject: "social-science",
            unit: "project1",
            type: "PDF",
            file: "pdfs/grade-10/social-science-projects/project-1/GRADE.10.PROJECT1.pdf"
        },

        {
            id: "g10-social-science-project2",
            title: "Grade 10 Social Science - Project 2",
            grade: "10",
            subject: "social-science",
            unit: "project2",
            type: "PDF",
            file: "pdfs/grade-10/social-science-projects/project-2/GRADE.10.PROJECT2.pdf"
        },

        {
            id: "g10-social-science-project3",
            title: "Grade 10 Social Science - Project 3",
            grade: "10",
            subject: "social-science",
            unit: "project3",
            type: "PDF",
            file: "pdfs/grade-10/social-science-projects/project-3/GRADE.10.PROJECT3.pdf"
        },


        /* =================================================
           GRADE 11
        ================================================= */


        /* Grade 11 resources with 1–6 or 1–5 modules */

        {
            id: "g11-applied-english-unit1",
            title: "Grade 11 Applied English - Unit 1",
            grade: "11",
            subject: "applied-english",
            unit: "unit1",
            type: "PDF",
            file: "pdfs/grade-11/applied-english/unit-1/Gr11.APPLIED.ENGLISH.UNIT.11.1.pdf"
        },

        {
            id: "g11-applied-english-unit2",
            title: "Grade 11 Applied English - Unit 2",
            grade: "11",
            subject: "applied-english",
            unit: "unit2",
            type: "PDF",
            file: "pdfs/grade-11/applied-english/unit-2/Gr11.APPLIED.ENGLISH.UNIT.11.2.pdf"
        },

        {
            id: "g11-applied-english-unit3",
            title: "Grade 11 Applied English - Unit 3",
            grade: "11",
            subject: "applied-english",
            unit: "unit3",
            type: "PDF",
            file: "pdfs/grade-11/applied-english/unit-3/Gr11.APPLIED.ENGLISH.UNIT.11.3.pdf"
        },

        {
            id: "g11-applied-english-unit4",
            title: "Grade 11 Applied English - Unit 4",
            grade: "11",
            subject: "applied-english",
            unit: "unit4",
            type: "PDF",
            file: "pdfs/grade-11/applied-english/unit-4/Gr11.APPLIED.ENGLISH.UNIT.11.4.pdf"
        }
    ]
};


/* =========================================================
   ADD REMAINING RESOURCES AUTOMATICALLY

   This section adds the Grade 11 Biology through Grade 12
   Physics resources from the actual uploaded PDF list.
========================================================= */

function addSequentialResources(
    grade,
    subject,
    count,
    folderType,
    fileNames,
    titlePrefix
) {

    for (let number = 1; number <= count; number++) {

        const fileName = fileNames[number - 1];

        FODE_DATA.resources.push({

            id:
                "g" +
                grade +
                "-" +
                subject +
                "-unit" +
                number,

            title:
                titlePrefix +
                " - " +
                (
                    folderType === "module"
                        ? "Module "
                        : "Unit "
                ) +
                number,

            grade: String(grade),

            subject: subject,

            unit: "unit" + number,

            type: "PDF",

            file:
                "pdfs/grade-" +
                grade +
                "/" +
                subject +
                "/" +
                folderType +
                "-" +
                number +
                "/" +
                fileName
        });
    }
}


/* Grade 11 */

addSequentialResources(
    11,
    "biology",
    6,
    "module",
    [
        "Grade.11.Biology.Module1.pdf",
        "Grade.11.Biology.Module2.pdf",
        "Grade.11.Biology.Module3.pdf",
        "Grade.11.Biology.Module4.pdf",
        "Grade.11.Biology.Module5.pdf",
        "Grade.11.Biology.Module6.pdf"
    ],
    "Grade 11 Biology"
);

addSequentialResources(
    11,
    "business-studies",
    4,
    "module",
    [
        "Gr11.Business.Studies.M1.pdf",
        "Gr11.Business.Studies.M2.pdf",
        "Gr11.Business.Studies.M3.pdf",
        "Gr11.Business.Studies.M4.pdf"
    ],
    "Grade 11 Business Studies"
);

addSequentialResources(
    11,
    "chemistry",
    6,
    "module",
    [
        "Gr11.Chemistry.M1.pdf",
        "Gr11.Chemistry.M2.pdf",
        "Gr11.Chemistry.M3.pdf",
        "Gr11.Chemistry.M4.pdf",
        "Gr11.Chemistry.M5.pdf",
        "Gr11.Chemistry.M6.pdf"
    ],
    "Grade 11 Chemistry"
);

addSequentialResources(
    11,
    "economics",
    3,
    "module",
    [
        "GRADE.11.MODULE.1.pdf",
        "GRADE.11.MODULE.2.pdf",
        "GRADE.11.MODULE.3.pdf"
    ],
    "Grade 11 Economics"
);

addSequentialResources(
    11,
    "geography",
    4,
    "unit",
    [
        "GRADE.11.UNIT1.pdf",
        "GRADE.11.UNIT2.pdf",
        "GRADE.11.UNIT3.pdf",
        "GRADE.11.UNIT4.pdf"
    ],
    "Grade 11 Geography"
);

addSequentialResources(
    11,
    "history",
    4,
    "module",
    [
        "GR.11.HISTORY.M1.pdf",
        "GR.11.HISTORY.M2.pdf",
        "GR.11.HISTORY.M3.pdf",
        "GR.11.HISTORY.M4.pdf"
    ],
    "Grade 11 History"
);

addSequentialResources(
    11,
    "ict",
    5,
    "module",
    [
        "Gr11.ICT.M1.pdf",
        "Gr11.ICT.M2.pdf",
        "Gr11.ICT.M3.pdf",
        "Gr11.ICT.M4.pdf",
        "Gr11.ICT.M5.pdf"
    ],
    "Grade 11 ICT"
);

addSequentialResources(
    11,
    "language-literature",
    4,
    "unit",
    [
        "Gr11.Language.Literature.Unit.1.pdf",
        "Gr11.Language.Literature.Unit.2.pdf",
        "Gr11.Language.Literature.Unit.3.pdf",
        "Gr11.Language.Literature.Unit.4.pdf"
    ],
    "Grade 11 Language and Literature"
);

addSequentialResources(
    11,
    "mathematics-advanced",
    4,
    "unit",
    [
        "Gr11.Advanced.Mathematics.M1.pdf",
        "Gr11.Advanced.Mathematics.M2.pdf",
        "Gr11.Advanced.Mathematics.M3.pdf",
        "Gr11.Advanced.Mathematics.M4.pdf"
    ],
    "Grade 11 Advanced Mathematics"
);

addSequentialResources(
    11,
    "mathematics-general",
    5,
    "unit",
    [
        "Gr11.General.Mathematics.M1.pdf",
        "Gr11.General.Mathematics.M2.pdf",
        "Gr11.General.Mathematics.M3.pdf",
        "Gr11.General.Mathematics.M4.pdf",
        "Gr11.General.Mathematics.M5.pdf"
    ],
    "Grade 11 General Mathematics"
);

addSequentialResources(
    11,
    "personal-development",
    4,
    "unit",
    [
        "Gr11.Personal.Development.U1.pdf",
        "Gr11.Personal.Development.U2.pdf",
        "Gr11.Personal.Development.U3.pdf",
        "Gr11.Personal.Development.U4.pdf"
    ],
    "Grade 11 Personal Development"
);

addSequentialResources(
    11,
    "physics",
    6,
    "module",
    [
        "Grade.11.Physics.Module1.pdf",
        "Grade.11.Physics.Module2.pdf",
        "Grade.11.Physics.Module3.pdf",
        "Grade.11.Physics.Module4.pdf",
        "Grade.11.Physics.Module5.pdf",
        "Grade.11.Physics.Module6.pdf"
    ],
    "Grade 11 Physics"
);


/* Grade 12 */

addSequentialResources(
    12,
    "biology",
    4,
    "module",
    [
        "Grade.12.Biology.Module1.pdf",
        "Grade.12.Biology.Module2.pdf",
        "Grade.12.Biology.Module3.pdf",
        "Grade.12.Biology.Module4.pdf"
    ],
    "Grade 12 Biology"
);

addSequentialResources(
    12,
    "business-studies",
    4,
    "module",
    [
        "Gr12.Business.Studies.M1.pdf",
        "Gr12.Business.Studies.M2.pdf",
        "Gr12.Business.Studies.M3.pdf",
        "Gr12.Business.Studies.M4.pdf"
    ],
    "Grade 12 Business Studies"
);

addSequentialResources(
    12,
    "chemistry",
    5,
    "module",
    [
        "Gr12.Chemistry.M1.pdf",
        "Gr12.Chemistry.M2.pdf",
        "Gr12.Chemistry.M3.pdf",
        "Gr12.Chemistry.M4.pdf",
        "Gr12.Chemistry.M5.pdf"
    ],
    "Grade 12 Chemistry"
);

addSequentialResources(
    12,
    "economics",
    3,
    "module",
    [
        "GRADE.12.MODULE1.pdf",
        "GRADE.12.MODULE2.pdf",
        "GRADE.12.MODULE3.pdf"
    ],
    "Grade 12 Economics"
);

addSequentialResources(
    12,
    "geography",
    3,
    "unit",
    [
        "GRADE.12.UNIT1.pdf",
        "GRADE.12.UNIT2.pdf",
        "GRADE.12.UNIT3.pdf"
    ],
    "Grade 12 Geography"
);

addSequentialResources(
    12,
    "history",
    3,
    "module",
    [
        "GR 12.HISTORY.UNIT1.pdf",
        "GR 12.HISTORY.UNIT2.pdf",
        "GR 12.HISTORY.UNIT3.pdf"
    ],
    "Grade 12 History"
);

addSequentialResources(
    12,
    "ict",
    5,
    "module",
    [
        "Gr12.ICT.M1.pdf",
        "Gr12.ICT.M2.pdf",
        "Gr12.ICT.M3.pdf",
        "Gr12.ICT.M4.pdf",
        "Gr12.ICT.M5.pdf"
    ],
    "Grade 12 ICT"
);

addSequentialResources(
    12,
    "language-literature",
    4,
    "unit",
    [
        "Gr12.Language.Litrature.Unit.1.pdf",
        "Gr12.Language.Litrature.Unit.2.pdf",
        "Gr12.Language.Litrature.Unit.3.pdf",
        "Gr12.Language.Litrature.Unit.4.pdf"
    ],
    "Grade 12 Language and Literature"
);

addSequentialResources(
    12,
    "mathematics-advanced",
    3,
    "unit",
    [
        "Unit1.pdf",
        "Unit2.pdf",
        "Unit3.pdf"
    ],
    "Grade 12 Advanced Mathematics"
);

addSequentialResources(
    12,
    "mathematics-general",
    5,
    "unit",
    [
        "Unit1 (2).pdf",
        "Unit2 (2).pdf",
        "Unit3 (2).pdf",
        "Unit4 (1).pdf",
        "Unit5 (1).pdf"
    ],
    "Grade 12 General Mathematics"
);

addSequentialResources(
    12,
    "personal-development",
    3,
    "unit",
    [
        "Gr12.Personal.Development.U1.pdf",
        "Gr12.Personal.Development.U2.pdf",
        "Gr12.Personal.Development.U3.pdf"
    ],
    "Grade 12 Personal Development"
);

addSequentialResources(
    12,
    "physics",
    5,
    "module",
    [
        "Grade.12.Physics.Module1.pdf",
        "Grade.12.Physics.Module2.pdf",
        "Grade.12.Physics.Module3.pdf",
        "Grade.12.Physics.Module4.pdf",
        "Grade.12.Physics.Module5.pdf"
    ],
    "Grade 12 Physics"
);


/* =========================================================
   GRADE 12 APPLIED ENGLISH

   Only Unit 1 and Unit 3 currently exist in the uploaded
   PDF list, so only those are included.
========================================================= */

FODE_DATA.resources.push(

    {
        id: "g12-applied-english-unit1",
        title: "Grade 12 Applied English - Unit 1",
        grade: "12",
        subject: "applied-english",
        unit: "unit1",
        type: "PDF",
        file: "pdfs/grade-12/applied-english/unit-1/G12.APPLIED.ENGLISH.UNIT.12.1.pdf"
    },

    {
        id: "g12-applied-english-unit3",
        title: "Grade 12 Applied English - Unit 3",
        grade: "12",
        subject: "applied-english",
        unit: "unit3",
        type: "PDF",
        file: "pdfs/grade-12/applied-english/unit-3/G12 APPLIED ENGLISH UNIT 12.3.1.pdf"
    }
);


/* =========================================================
   GRADE 12 CHEMISTRY DATA SHEETS
========================================================= */

FODE_DATA.resources.push(

    {
        id: "g12-chemistry-data-sheet1",
        title: "Grade 12 Chemistry - Data Sheet 1",
        grade: "12",
        subject: "chemistry",
        unit: "data-sheet1",
        type: "Data Sheet PDF",
        file: "pdfs/grade-12/chemistry/data-sheet-1/Gr12.Chemistry.Data.Sheet.M1.pdf"
    },

    {
        id: "g12-chemistry-data-sheet2",
        title: "Grade 12 Chemistry - Data Sheet 2",
        grade: "12",
        subject: "chemistry",
        unit: "data-sheet2",
        type: "Data Sheet PDF",
        file: "pdfs/grade-12/chemistry/data-sheet-2/Gr12.Chemistry.Data.Sheet.M2.pdf"
    },

    {
        id: "g12-chemistry-data-sheet3",
        title: "Grade 12 Chemistry - Data Sheet 3",
        grade: "12",
        subject: "chemistry",
        unit: "data-sheet3",
        type: "Data Sheet PDF",
        file: "pdfs/grade-12/chemistry/data-sheet-3/Gr12.Chemistry.Data.Sheet.M3.pdf"
    },

    {
        id: "g12-chemistry-data-sheet4",
        title: "Grade 12 Chemistry - Data Sheet 4",
        grade: "12",
        subject: "chemistry",
        unit: "data-sheet4",
        type: "Data Sheet PDF",
        file: "pdfs/grade-12/chemistry/data-sheet-4/Gr12.Chemistry.Data.Sheet.M4.pdf"
    },

    {
        id: "g12-chemistry-data-sheet5",
        title: "Grade 12 Chemistry - Data Sheet 5",
        grade: "12",
        subject: "chemistry",
        unit: "data-sheet5",
        type: "Data Sheet PDF",
        file: "pdfs/grade-12/chemistry/data-sheet-5/Gr12.Chemistry.Data.Sheet.M5.pdf"
    }
);


/* =========================================================
   HELPER FUNCTIONS
========================================================= */


/* Get all grades */

function getGrades() {
    return FODE_DATA.grades;
}


/* Get grade by ID */

function getGradeById(gradeId) {

    return FODE_DATA.grades.find(function (grade) {

        return String(grade.id) ===
            String(gradeId);

    });

}


/* Get all subjects */

function getAllSubjects() {
    return FODE_DATA.subjects;
}


/* Get subject by ID */

function getSubjectById(subjectId) {

    return FODE_DATA.subjects.find(function (subject) {

        return subject.id === subjectId;

    });

}


/* Get subjects available for a grade */

function getSubjectsByGrade(gradeId) {

    const grade =
        String(gradeId);

    const subjectIds =
        FODE_DATA.gradeSubjects[grade] || [];

    return FODE_DATA.subjects.filter(
        function (subject) {

            return subjectIds.includes(
                subject.id
            );

        }
    );

}


/* Check subject belongs to grade */

function isSubjectAvailableForGrade(
    gradeId,
    subjectId
) {

    const grade =
        String(gradeId);

    const subjectIds =
        FODE_DATA.gradeSubjects[grade] || [];

    return subjectIds.includes(
        subjectId
    );

}


/* Get all standard units */

function getUnits() {
    return FODE_DATA.units;
}


/* Get unit by ID */

function getUnitById(unitId) {

    return FODE_DATA.units.find(
        function (unit) {

            return unit.id === unitId;

        }
    );

}


/* Get readable unit name */

function getUnitName(unitId) {

    const unit =
        getUnitById(unitId);

    if (unit) {
        return unit.name;
    }

    return unitId || "General";

}


/* Get all resources */

function getAllResources() {
    return FODE_DATA.resources;
}


/* Get resource by ID */

function getResourceById(resourceId) {

    return FODE_DATA.resources.find(
        function (resource) {

            return resource.id === resourceId;

        }
    );

}


/* Get resources by grade */

function getResourcesByGrade(gradeId) {

    return FODE_DATA.resources.filter(
        function (resource) {

            return String(resource.grade) ===
                String(gradeId);

        }
    );

}


/* Get resources by grade + subject */

function getResourcesByGradeAndSubject(
    gradeId,
    subjectId
) {

    return FODE_DATA.resources.filter(
        function (resource) {

            return (

                String(resource.grade) ===
                    String(gradeId)

                &&

                resource.subject ===
                    subjectId

            );

        }
    );

}


/* Alias for compatibility */

function getResourcesByGradeAndSubjectId(
    gradeId,
    subjectId
) {

    return getResourcesByGradeAndSubject(
        gradeId,
        subjectId
    );

}


/* Get resources by grade + subject + unit */

function getResourcesByGradeSubjectAndUnit(
    gradeId,
    subjectId,
    unitId
) {

    return FODE_DATA.resources.filter(
        function (resource) {

            return (

                String(resource.grade) ===
                    String(gradeId)

                &&

                resource.subject ===
                    subjectId

                &&

                resource.unit ===
                    unitId

            );

        }
    );

}


/* Get actual units available for a grade + subject */

function getUnitsByGradeAndSubject(
    gradeId,
    subjectId
) {

    const resources =
        getResourcesByGradeAndSubject(
            gradeId,
            subjectId
        );

    const unitIds =
        [];

    resources.forEach(
        function (resource) {

            if (
                resource.unit &&
                !unitIds.includes(resource.unit)
            ) {

                unitIds.push(
                    resource.unit
                );

            }

        }
    );

    return unitIds.map(
        function (unitId) {

            return {

                id: unitId,

                name:
                    getUnitName(unitId)

            };

        }
    );

}


/* Get number of resources */

function getResourceCount(
    gradeId,
    subjectId
) {

    if (!gradeId) {

        return FODE_DATA.resources.length;

    }

    if (!subjectId) {

        return getResourcesByGrade(
            gradeId
        ).length;

    }

    return getResourcesByGradeAndSubject(
        gradeId,
        subjectId
    ).length;

}