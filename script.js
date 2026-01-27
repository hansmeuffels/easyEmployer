// Funny employer names
const funnyEmployerNames = [
    "Widgets & Whatsits Inc.",
    "The Procrastination Corporation",
    "Nap Time Enterprises",
    "Coffee Addicts Anonymous LLC",
    "Ctrl+Alt+Delete Solutions",
    "404 Industries Not Found",
    "The Rubber Duck Debugging Co.",
    "Infinite Loop Studios",
    "Segmentation Fault Systems",
    "Binary Banana Bonanza",
    "Quantum Quokka Quarries",
    "Caffeinated Coding Collective",
    "Stack Overflow Survivors Inc.",
    "Chaos Monkey Management",
    "The Bug Factory",
    "Syntax Error Syndicate",
    "Merge Conflict Mediation Services",
    "Git Gud Technologies",
    "Legacy Code Archeology Ltd.",
    "Technical Debt Collectors"
];

// Funny employee names
const funnyEmployeeNames = [
    "Bob Loblaw",
    "Anita Job",
    "Justin Time",
    "Paige Turner",
    "Al Dente",
    "Barb Dwyer",
    "Terry Bull",
    "Ella Vator",
    "Chris P. Bacon",
    "Neil Down",
    "Will Power",
    "Bea O'Problem",
    "Iona Carr",
    "Art Vandelay",
    "Hugh Jass",
    "Anna Conda",
    "Pete Zahut",
    "Sue Flay",
    "Jack Pott",
    "Robin Banks"
];

// Get a random item from an array
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Generate random employer name (different from current)
function generateEmployerName() {
    const currentName = document.getElementById('employerName').value;
    let newName;
    do {
        newName = getRandomItem(funnyEmployerNames);
    } while (newName === currentName && funnyEmployerNames.length > 1);
    return newName;
}

// Generate random employee name (different from current)
function generateEmployeeName() {
    const currentName = document.getElementById('employeeName').value;
    let newName;
    do {
        newName = getRandomItem(funnyEmployeeNames);
    } while (newName === currentName && funnyEmployeeNames.length > 1);
    return newName;
}

// Regenerate employer name
function regenerateEmployerName() {
    document.getElementById('employerName').value = generateEmployerName();
}

// Regenerate employee name
function regenerateEmployeeName() {
    document.getElementById('employeeName').value = generateEmployeeName();
}

// Initialize form with random names on page load
function initializeForm() {
    document.getElementById('employerName').value = generateEmployerName();
    document.getElementById('employeeName').value = generateEmployeeName();
}

// Handle form submission
function handleSubmit(event) {
    event.preventDefault();
    
    const accessToken = document.getElementById('accessToken').value;
    const employerName = document.getElementById('employerName').value;
    const employeeName = document.getElementById('employeeName').value;
    
    // Display result (using safe DOM methods to prevent XSS)
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = ''; // Clear previous content safely
    
    const heading = document.createElement('h3');
    heading.textContent = '✅ Employer Created Successfully!';
    
    const tokenPara = document.createElement('p');
    tokenPara.textContent = 'Access token has been securely received.';
    
    const employerPara = document.createElement('p');
    const employerStrong = document.createElement('strong');
    employerStrong.textContent = 'Employer Name: ';
    employerPara.appendChild(employerStrong);
    const employerText = document.createTextNode(employerName);
    employerPara.appendChild(employerText);
    
    const employeePara = document.createElement('p');
    const employeeStrong = document.createElement('strong');
    employeeStrong.textContent = 'Employee Name: ';
    employeePara.appendChild(employeeStrong);
    const employeeText = document.createTextNode(employeeName);
    employeePara.appendChild(employeeText);
    
    resultDiv.appendChild(heading);
    resultDiv.appendChild(tokenPara);
    resultDiv.appendChild(employerPara);
    resultDiv.appendChild(employeePara);
    resultDiv.classList.remove('hidden');
    
    // Scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    
    // Add event listeners
    document.getElementById('employerForm').addEventListener('submit', handleSubmit);
    document.getElementById('regenerateEmployer').addEventListener('click', regenerateEmployerName);
    document.getElementById('regenerateEmployee').addEventListener('click', regenerateEmployeeName);
});
