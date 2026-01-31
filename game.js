let score = 0;
let currentIncidentIndex = 0;
const totalIncidents = 10;
let totalGames = 0; 
let totalScore = 0; 
let actionTaken = false;
let decisionHistory = []; 

// Logowanie ładowania pliku
console.log("Plik game.js został załadowany.");

// Funkcja losująca incydent
function getRandomIncident() {
    const randomIndex = Math.floor(Math.random() * incidents.length);  // Losowy index
    return incidents[randomIndex];  // Zwracanie losowego incydentu z tablicy incidents
}

// Start gry
function startGame() {
    console.log("Gra wystartowała");
    document.getElementById('start-game').style.display = 'none';  
    document.getElementById('status').style.display = 'flex';      
    document.getElementById('incident-area').style.display = 'block';  
    generateIncident();  
}

// Generowanie incydentu
function generateIncident() {
    if (currentIncidentIndex >= totalIncidents) {
        console.log("Koniec incydentów, wywołanie funkcji showSummary");
        showSummary();
        return;
    }

    console.log(`Generowanie incydentu numer: ${currentIncidentIndex + 1}`);
    const incident = getRandomIncident(); // Pobranie losowego incydentu
    document.getElementById('incident-description').textContent = incident.description;

    document.getElementById('action1').textContent = incident.actions.action1.short;
    document.getElementById('action2').textContent = incident.actions.action2.short;
    document.getElementById('action3').textContent = incident.actions.action3.short;
    document.getElementById('action4').textContent = incident.actions.action4.short;
    document.getElementById('action5').textContent = incident.actions.action5.short;

    // Ukrywanie przycisku „Kolejny incydent” po każdym incydencie
    document.getElementById('next-incident').style.display = 'none';
    actionTaken = false;

    document.getElementById('incident-progress').textContent = `Incydent: ${currentIncidentIndex + 1} z ${totalIncidents}`;
}

// Przejście do kolejnego incydentu
function nextIncident() {
    console.log(`Przechodzenie do kolejnego incydentu: ${currentIncidentIndex + 1}`);
    
    currentIncidentIndex++;
    if (currentIncidentIndex >= totalIncidents) {
        showSummary();  // Pokaż podsumowanie po ostatnim incydencie
    } else {
        generateIncident();  // Ładujemy kolejny incydent
    }
}

// Inicjalizacja gry po wczytaniu całej strony
window.onload = function() {
    console.log("Cały DOM został załadowany");
    startGame();
};
