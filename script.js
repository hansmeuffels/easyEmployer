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

// Generate random employer name
function generateEmployerName() {
    return getRandomItem(funnyEmployerNames);
}

// Generate random employee name
function generateEmployeeName() {
    return getRandomItem(funnyEmployeeNames);
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
    
    // Display result
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h3>✅ Employer Created Successfully!</h3>
        <p><strong>Access Token:</strong> ${accessToken.substring(0, 10)}${accessToken.length > 10 ? '...' : ''}</p>
        <p><strong>Employer Name:</strong> ${employerName}</p>
        <p><strong>Employee Name:</strong> ${employeeName}</p>
    `;
    resultDiv.classList.remove('hidden');
    
    // Scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    document.getElementById('employerForm').addEventListener('submit', handleSubmit);
});
