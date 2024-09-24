let score = 0;
let currentIncidentIndex = 0;
const totalIncidents = 10;
let incidentUsed = [];
let actionTaken = false;  // Flaga, aby zapobiec wielokrotnemu liczeniu punktów

// Losuje incydenty, aby nie powtarzały się
function getRandomIncident() {
    if (incidentUsed.length === totalIncidents) {
        showSummary();
        return null;
    }

    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * incidents.length);
    } while (incidentUsed.includes(randomIndex));

    incidentUsed.push(randomIndex);
    return incidents[randomIndex];
}

// Funkcja startowa gry
function startGame() {
    document.getElementById('start-game').style.display = 'none';  // Ukrycie przycisku Start
    document.getElementById('status').style.display = 'flex';      // Pokazanie statusu
    document.getElementById('incident-area').style.display = 'block';  // Pokazanie obszaru incydentów
    document.getElementById('result-area').style.display = 'block';    // Pokazanie feedbacku
    document.getElementById('restart').style.display = 'block';        // Pokazanie przycisku Restart

    generateIncident();  // Rozpoczęcie gry od pierwszego incydentu
}

function generateIncident() {
    const incident = getRandomIncident();
    if (!incident) return;

    document.getElementById('incident-description').textContent = incident.description;

    // Ustawiamy opisy przycisków
    document.getElementById('action1').textContent = incident.actions.action1.short;
    document.getElementById('action2').textContent = incident.actions.action2.short;
    document.getElementById('action3').textContent = incident.actions.action3.short;
    document.getElementById('action4').textContent = incident.actions.action4.short;
    document.getElementById('action5').textContent = incident.actions.action5.short;

    // Ukrywamy przycisk „Kolejny incydent” dopóki użytkownik nie podejmie decyzji
    document.getElementById('next-incident').style.display = 'none';

    // Ukrywamy feedback z poprzedniego pytania
    document.getElementById('result-message').textContent = '';  // Ukrywanie feedbacku

    actionTaken = false;  // Resetujemy flagę po nowym incydencie

    // Aktualizujemy numer incydentu
    document.getElementById('incident-progress').textContent = `Incydent: ${incidentUsed.length} z ${totalIncidents}`;
}

function handleAction(action) {
    if (actionTaken) return;  // Sprawdzamy, czy użytkownik już podjął decyzję

    const incident = incidents[incidentUsed[incidentUsed.length - 1]];  // Ostatni wybrany incydent
    const result = incident.actions[action];

    // Wyświetlenie feedbacku po wybraniu akcji
    document.getElementById('result-message').textContent = `${result.feedback} (MITRE: ${result.mitre})`;

    // Zaktualizowanie punktów
    score += result.score;
    updateScore();
    actionTaken = true;  // Flaga ustawiona na true, aby zablokować wielokrotne liczenie punktów

    // Po wybraniu akcji, pokaż przycisk „Kolejny incydent”
    document.getElementById('next-incident').style.display = 'block';
}

function updateScore() {
    document.getElementById('score').textContent = "Punkty: " + score;
}

function nextIncident() {
    currentIncidentIndex++;
    if (currentIncidentIndex >= totalIncidents) {
        showSummary();  // Jeśli wszystkie incydenty zostały ukończone, pokaż ekran podsumowania
    } else {
        generateIncident();  // Ładujemy kolejny incydent
    }
}

function showSummary() {
    document.getElementById('incident-area').style.display = 'none'; // Ukrywamy obszar incydentów
    document.getElementById('result-area').style.display = 'none'; // Ukrywamy feedback
    document.getElementById('next-incident').style.display = 'none'; // Ukrywamy przycisk „Kolejny incydent”
    document.getElementById('status').style.display = 'none'; // Ukrywamy status punktów

    document.getElementById('summary').style.display = 'block'; // Pokazujemy ekran podsumowania
    document.getElementById('final-score').textContent = "Twój wynik: " + score; // Wyświetlamy końcowy wynik
}

function restartGame() {
    score = 0;
    currentIncidentIndex = 0;
    incidentUsed = [];
    document.getElementById('summary').style.display = 'none'; // Ukryj ekran podsumowania
    updateScore();
    generateIncident();
}
