let score = 0;
let currentIncidentIndex = 0;
const totalIncidents = 10;
let actionTaken = false;
let decisionHistory = [];

// Losowanie incydentu
function getRandomIncident() {
    return incidents[currentIncidentIndex]; // Poprawka: Zamiast losowania, bierzemy incydenty po kolei
}

// Start gry
function startGame() {
    score = 0; // Resetowanie wyniku
    currentIncidentIndex = 0; // Ustaw początkowy indeks incydentu
    actionTaken = false; // Resetowanie stanu decyzji

    // Ukryj niepotrzebne elementy i pokaż interfejs gry
    document.getElementById('start-game').style.display = 'none';
    document.getElementById('theme-selection').style.display = 'block';
    document.getElementById('status').style.display = 'flex';
    document.getElementById('incident-area').style.display = 'block';
    document.getElementById('result-area').style.display = 'block';
    document.getElementById('restart').style.display = 'block';

    decisionHistory = []; // Resetowanie historii decyzji
    generateIncident();  // Rozpocznij grę, generując pierwszy incydent
}

// Generowanie incydentu
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

    resetButtonColors(); // Resetowanie przycisków
    actionTaken = false; // Reset flagi

    document.getElementById('incident-progress').textContent = `Incydent: ${currentIncidentIndex + 1} z ${totalIncidents}`;
    document.getElementById('next-incident').style.display = 'none'; // Ukryj przycisk "Kolejny incydent" do momentu wyboru akcji
}

// Funkcja obsługi wyboru akcji
function handleAction(action) {
    if (actionTaken) return; // Sprawdzamy, czy użytkownik już podjął decyzję

    const incident = getRandomIncident();  // Pobranie aktualnego incydentu
    const result = incident.actions[action];

    // Wyświetlenie feedbacku po wybraniu akcji
    document.getElementById('result-message').textContent = `${result.feedback} (MITRE: ${result.mitre})`;

    // Zmieniamy kolory przycisków
    updateButtonColors(action, result.score);

    // Zaktualizowanie punktów
    score += result.score;
    updateScore();

    // Zapisujemy decyzję użytkownika do historii
    decisionHistory.push({
        incident: incident.description,
        action: result.short,
        feedback: result.feedback,
        mitre: result.mitre
    });

    actionTaken = true;  // Ustawiamy flagę, aby zablokować wielokrotne liczenie punktów
    document.getElementById('next-incident').style.display = 'block'; // Pokaż przycisk "Kolejny incydent"
}

// Resetowanie kolorów przycisków
function resetButtonColors() {
    const buttons = ['action1', 'action2', 'action3', 'action4', 'action5'];
    buttons.forEach(button => {
        document.getElementById(button).classList.remove('correct', 'wrong', 'disabled');
        document.getElementById(button).classList.add('enabled'); // Powrót do koloru niebieskiego
    });
}

// Zmieniamy kolory przycisków po wyborze akcji
function updateButtonColors(selectedAction, score) {
    const buttons = ['action1', 'action2', 'action3', 'action4', 'action5'];
    buttons.forEach(button => {
        if (button === selectedAction) {
            document.getElementById(button).classList.add(score > 0 ? 'correct' : 'wrong');
        } else {
            document.getElementById(button).classList.add('disabled');
        }
    });
}

// Przejście do kolejnego incydentu
function nextIncident() {
    currentIncidentIndex++;
    if (currentIncidentIndex >= totalIncidents) {
        showSummary();  // Jeśli wszystkie incydenty zostały ukończone, pokaż ekran podsumowania
    } else {
        generateIncident();  // Ładujemy kolejny incydent
    }
}

// Wyświetlenie ekranu podsumowania
function showSummary() {
    // Ukrycie elementów gry
    document.getElementById('incident-area').style.display = 'none';
    document.getElementById('result-area').style.display = 'none';
    document.getElementById('next-incident').style.display = 'none';
    document.getElementById('status').style.display = 'none';

    // Wyświetlenie ekranu podsumowania
    document.getElementById('summary').style.display = 'block';
    document.getElementById('final-score').textContent = "Twój wynik: " + score;

    // Wypełnianie podsumowania szczegółami decyzji użytkownika
    const decisionHistoryHtml = decisionHistory.map((decision, index) => {
        return `<p><strong>Incydent ${index + 1}:</strong> <span style="color:black;">${decision.incident}</span><br>
            <strong>Wybrana akcja:</strong> <span style="color:blue;">${decision.action}</span><br>
            <strong>Feedback:</strong> <span style="color:gray;">${decision.feedback}</span><br>
            <strong>Technika defensywna:</strong> <span style="color:green;">${decision.mitre}</span></p>`;
    }).join("");

    document.getElementById('decision-history').innerHTML = decisionHistoryHtml;
}

// Restart gry
function restartGame() {
    // Resetowanie wyniku i liczników
    score = 0;
    currentIncidentIndex = 0;
    actionTaken = false;
    decisionHistory = []; // Czyszczenie historii decyzji

    // Ukrywanie ekranu podsumowania
    document.getElementById('summary').style.display = 'none';

    // Przywracanie elementów gry
    document.getElementById('incident-area').style.display = 'block';
    document.getElementById('result-area').style.display = 'block';
    document.getElementById('status').style.display = 'flex';
    document.getElementById('restart').style.display = 'block';
    
    updateScore(); // Aktualizacja wyniku na ekranie
    generateIncident(); // Rozpoczęcie nowej gry
}

// Funkcja aktualizująca wynik
function updateScore() {
    document.getElementById('score').textContent = "Punkty: " + score;
}
