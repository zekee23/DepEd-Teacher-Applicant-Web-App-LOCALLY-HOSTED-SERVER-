// Helper functions
function handlePositionChange() {
    const positionSelect = document.getElementById('positionApplied');
    const otherWrapper = document.getElementById('otherPositionWrapper');
    
    if (positionSelect.value === 'Other') {
        otherWrapper.style.display = 'block';
    } else {
        otherWrapper.style.display = 'none';
    }
}

function getSelectedPosition() {
    const positionSelect = document.getElementById('positionApplied');
    const otherPosition = document.getElementById('otherPosition');
    
    if (positionSelect.value === 'Other') {
        return otherPosition.value || 'Other Position';
    }
    return positionSelect.value;
}

function calculateIncrement(actualLevel, standardLevel) {
    if (!actualLevel || !standardLevel) return 0;
    return Math.max(actualLevel - standardLevel, 0);
}

function calculateExperienceScore(increment) {
    if (increment === "") return "";
    if (increment >= 10) return 10;
    if (increment >= 8) return 8;
    if (increment >= 6) return 6;
    if (increment >= 4) return 4;
    if (increment >= 2) return 2;
    return 0;
}

function calculateTrainingLevel(hours) {
    if (hours === "" || hours === 0) return 1;
    return Math.min(Math.floor(hours / 8) + 1, 31);
}

// Score calculation
function calculateScores() {
    const inputs = {
        educationLevel: parseInt(document.getElementById('educationLevel').value) || 6,
        trainingHours: parseFloat(document.getElementById('trainingHours').value) || 0,
        experienceYears: parseInt(document.getElementById('experienceYears').value) || 0,
        letExamType: document.getElementById('letExamType').value || 'LET',
        letRating: parseFloat(document.getElementById('letRating').value) || 0,
        demoTeachingRating: parseFloat(document.getElementById('demoTeachingRating').value) || 0,
        trfRating: parseFloat(document.getElementById('trfRating').value) || 0
    };

    // Calculate scores
    const educationIncrement = calculateIncrement(inputs.educationLevel, 6);
    const educationScore = calculateExperienceScore(educationIncrement);
    
    const trainingLevel = calculateTrainingLevel(inputs.trainingHours);
    const trainingIncrement = calculateIncrement(trainingLevel, 1);
    const trainingScore = calculateExperienceScore(trainingIncrement);
    
    const experienceIncrement = calculateIncrement(inputs.experienceYears, 1);
    const experienceScore = calculateExperienceScore(experienceIncrement);
    
    const letScore = inputs.letRating === "" || inputs.letRating === 0 ? 0 : Math.max(0, Math.min(10, inputs.letRating * 0.1));
    const ppstCoiScore = (inputs.demoTeachingRating / 30) * 35;
    const ppstNcoiScore = Math.min((inputs.trfRating / 20) * 25, 25);
    const totalScore = educationScore + trainingScore + experienceScore + letScore + ppstCoiScore + ppstNcoiScore;

    // Update displays
    const scoreElements = {
        educationScore, trainingScore, experienceScore, letScore, ppstCoiScore, ppstNcoiScore, totalScore
    };
    
    Object.entries(scoreElements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value.toFixed(3);
    });

    // Update breakdown
    const breakdownElements = {
        breakdownEducation: educationScore,
        breakdownTraining: trainingScore,
        breakdownExperience: experienceScore,
        breakdownLET: letScore,
        breakdownCOI: ppstCoiScore,
        breakdownNCOI: ppstNcoiScore
    };
    
    Object.entries(breakdownElements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value.toFixed(3);
    });
}

// Print functionality
function generatePrint() {
    calculateScores();
    populatePrintDocument();
    triggerPrint();
}

function populatePrintDocument() {
    const applicantData = {
        printApplicantName: document.getElementById('applicantName').value || '_________________',
        printApplicationCode: document.getElementById('applicationCode').value || '_________________',
        printPositionApplied: getSelectedPosition() || '_________________',
        printSDO: document.getElementById('schoolDivision').value || '_________________',
        printContactNum: document.getElementById('contactNumber').value || '_________________',
        printJobGroupLevel: document.getElementById('jobGroup').value || '_________________'
    };

    // Update applicant info
    Object.entries(applicantData).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    });

    // Update attestation text
    const positionText = document.getElementById('printPositionText');
    const divisionText = document.getElementById('printDivisionText');
    if (positionText) positionText.textContent = applicantData.printPositionApplied;
    if (divisionText) divisionText.textContent = applicantData.printSDO;

    // Populate score details
    populateScoreDetails();
    
    // Set current date
    const today = new Date();
    const dateElement = document.getElementById('printSignatureDate');
    if (dateElement) {
        dateElement.textContent = today.toLocaleDateString('en-US', { 
            year: 'numeric', month: 'long', day: 'numeric' 
        });
    }
}

function populateScoreDetails() {
    const inputs = {
        educationLevel: parseInt(document.getElementById('educationLevel').value) || 6,
        trainingHours: parseFloat(document.getElementById('trainingHours').value) || 0,
        experienceYears: parseInt(document.getElementById('experienceYears').value) || 0,
        letRating: parseFloat(document.getElementById('letRating').value) || 0,
        demoTeachingRating: parseFloat(document.getElementById('demoTeachingRating').value) || 0,
        trfRating: parseFloat(document.getElementById('trfRating').value) || 0
    };

    // Education details
    const educationTexts = {
        1: 'Can read and write', 2: 'Elementary Graduate', 3: 'Completed Junior High School (K to 12) / High School Level (Old Curriculum)',
        4: 'Senior High School Graduate (K to 12) / High School Graduate (Old Curriculum) / <2 years College',
        5: 'Completed 2 years in College / >2 years College, < Bachelor\'s Degree', 6: 'Bachelor\'s degree (QS)',
        7: '6 Units earned towards the completion of a Master\'s Degree', 8: '9 Units earned towards the completion of a Master\'s Degree',
        9: '12 Units earned towards the completion of a Master\'s Degree', 10: '15 Units earned towards the completion of a Master\'s Degree',
        11: '18 Units earned towards the completion of a Master\'s Degree', 12: '21 Units earned towards the completion of a Master\'s Degree',
        13: '24 Units earned towards the completion of a Master\'s Degree', 14: '27 Units earned towards the completion of a Master\'s Degree',
        15: '30 Units earned towards the completion of a Master\'s Degree', 16: '33 Units earned towards the completion of a Master\'s Degree',
        17: '36 Units earned towards the completion of a Master\'s Degree', 18: '39 Units earned towards the completion of a Master\'s Degree',
        19: '42 Units earned towards the completion of a Master\'s Degree', 20: 'Complete Academic Requirements (CAR) towards a Master\'s Degree',
        21: 'Master\'s Degree', 22: '3 Units earned towards the completion of a Doctorate', 23: '6 Units earned towards the completion of a Doctorate',
        24: '9 Units earned towards the completion of a Doctorate,', 25: '12 Units earned towards the completion of a Doctorate',
        26: '15 Units earned towards the completion of a Doctorate', 27: '18 Units earned towards the completion of a Doctorate',
        28: '21 Units earned towards the completion of a Doctorate', 29: '24 Units earned towards the completion of a Doctorate',
        30: 'Complete Academic Requirements (CAR) towards a Doctorate', 31: 'Doctorate'
    };

    const experienceTexts = {
        1: 'None to < 6 months', 2: '6 months to < 1 year', 3: '1 year to < 1 year 6 months',
        4: '1 year 6 months to < 2 years', 5: '2 years to < 2 years 6 months', 6: '2 years 6 months to < 3 years',
        7: '3 years to < 3 years 6 months', 8: '3 years 6 months to < 4 years', 9: '4 years to < 4 years 6 months',
        10: '4 years 6 months to < 5 years', 11: '5 years to < 5 years 6 months', 12: '5 years 6 months to < 6 years',
        13: '6 years to < 6 years 6 months', 14: '6 years 6 months to < 7 years', 15: '7 years to < 7 years 6 months',
        16: '7 years 6 months to < 8 years', 17: '8 years to < 8 years 6 months', 18: '8 years 6 months to < 9 years',
        19: '9 years to < 9 years 6 months', 20: '9 years 6 months to < 10 years', 21: '10 years to < 10 years 6 months',
        22: '10 years 6 months to < 11 years', 23: '11 years to < 11 years 6 months', 24: '11 years 6 months to < 12 years',
        25: '12 years to < 12 years 6 months', 26: '12 years 6 months to < 13 years', 27: '13 years to < 13 years 6 months',
        28: '13 years 6 months to < 14 years', 29: '14 years to < 14 years 6 months', 30: '14 years 6 months to < 15 years',
        31: '15 years or more'
    };

    // Update print fields
    const printFields = {
        printEducationDetails: educationTexts[inputs.educationLevel] || 'Bachelor\'s Degree (QS)',
        printEducationComp: `Increment ${calculateIncrement(inputs.educationLevel, 6)}`,
        printEducationScore: document.getElementById('educationScore')?.textContent || '0.000',
        
        printTrainingDetails: `${inputs.trainingHours} hours of training`,
        printTrainingComp: `Increment ${calculateIncrement(calculateTrainingLevel(inputs.trainingHours), 1)}`,
        printTrainingScore: document.getElementById('trainingScore')?.textContent || '0.000',
        
        printExperienceDetails: experienceTexts[inputs.experienceYears] || 'None to < 6 months',
        printExperienceComp: `Increment ${calculateIncrement(inputs.experienceYears, 1)}`,
        printExperienceScore: document.getElementById('experienceScore')?.textContent || '0.000',
        
        printLETDetails: `${inputs.letExamType} Rating: ${inputs.letRating}`,
        printLETComp: `${inputs.letRating} * 0.1`,
        printLETScore: document.getElementById('letScore')?.textContent || '0.000',
        
        printPPSTCOIDetails: `Demonstration Teaching Rating: ${inputs.demoTeachingRating}`,
        printPPSTCOIComp: `(${inputs.demoTeachingRating}/30)*35`,
        printPPSTCOIScore: document.getElementById('ppstCoiScore')?.textContent || '0.000',
        
        printPPSTNCOIDetails: `TRF Rating: ${inputs.trfRating}`,
        printPPSTNCOIComp: `(${inputs.trfRating}/20)*25`,
        printPPSTNCOIScore: document.getElementById('ppstNcoiScore')?.textContent || '0.000',
        
        printTotalScore: document.getElementById('totalScore')?.textContent || '0.000'
    };

    Object.entries(printFields).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    });
}

function triggerPrint() {
    try {
        window.print();
    } catch (e) {
        console.log('Print failed, trying alternative method');
        try {
            document.execCommand('print', false, null);
        } catch (e2) {
            console.log('Using iframe fallback method');
            const iframe = document.createElement('iframe');
            iframe.style.position = 'absolute';
            iframe.style.left = '-9999px';
            iframe.style.top = '-9999px';
            document.body.appendChild(iframe);
            
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            iframeDoc.open();
            iframeDoc.write(document.documentElement.outerHTML);
            iframeDoc.close();
            
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
            
            setTimeout(() => {
                document.body.removeChild(iframe);
            }, 1000);
        }
    }
}

// Utility functions
function backToDashboard() {
    document.body.classList.remove('print-preview');
    window.scrollTo(0, 0);
}

function downloadDocument() {
    calculateScores();
    populatePrintDocument();
    
    // Create a temporary container for the document
    const printContent = document.querySelector('.print-document-content').innerHTML;
    
    // Create HTML document
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>HRMPSB Evaluation - ${document.getElementById('printApplicantName').textContent}</title>
    <style>
        body {
            font-family: 'Times New Roman', serif;
            margin: 0;
            padding: 20px;
            background: white;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 10px;
        }
        th, td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
        }
        th {
            background: #d3d3d3;
            font-weight: bold;
            text-align: center;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .no-print {
            display: none;
        }
        @media print {
            body { margin: 0; padding: 10px; }
        }
    </style>
</head>
<body>
    ${printContent}
</body>
</html>`;
    
    // Create blob and download
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const applicantName = document.getElementById('printApplicantName').textContent || 'Applicant';
    const fileName = `HRMPSB_Evaluation_${applicantName.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.html`;
    
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
    
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.textContent = '✅ Document downloaded successfully!';
    successMsg.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #28a745;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 10000;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    document.body.appendChild(successMsg);
    
    setTimeout(() => {
        document.body.removeChild(successMsg);
    }, 3000);
}

function resetForm() {
    if (confirm('Are you sure you want to reset the form? All data will be cleared.')) {
        document.querySelectorAll('input').forEach(input => {
            if (input.type === 'number') {
                input.value = 0;
            } else {
                input.value = '';
            }
        });
        document.getElementById('positionApplied').value = 'TEACHER I';
        document.getElementById('otherPosition').value = '';
        document.getElementById('otherPositionWrapper').style.display = 'none';
        document.getElementById('educationLevel').value = '6';
        document.getElementById('experienceYears').value = '1';
        document.getElementById('letExamType').value = 'LET';
        calculateScores();
    }
}

// Input validation
function validateAndSanitizeInput(input) {
    const id = input.id;
    let value = parseFloat(input.value) || 0;
    let sanitizedValue = value;
    
    const validationRules = {
        trainingHours: { min: 0, max: 1000 },
        letRating: { min: 0, max: 100 },
        demoTeachingRating: { min: 0, max: 30 },
        trfRating: { min: 0, max: 20 }
    };
    
    if (validationRules[id]) {
        const { min, max } = validationRules[id];
        sanitizedValue = Math.max(min, Math.min(max, value));
    }
    
    if (sanitizedValue !== value) {
        input.value = sanitizedValue;
    }
    
    return sanitizedValue;
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Auto-calculate on input change
    document.querySelectorAll('input, select').forEach(element => {
        element.addEventListener('input', calculateScores);
        element.addEventListener('change', calculateScores);
    });

    // Input validation for number inputs
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('focus', () => input.select());
        input.addEventListener('click', () => input.select());
        input.addEventListener('input', () => validateAndSanitizeInput(input));
        input.addEventListener('change', () => validateAndSanitizeInput(input));
        input.addEventListener('blur', () => validateAndSanitizeInput(input));
    });

    // Initial calculation
    calculateScores();
});