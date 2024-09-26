let score = 0;
let currentIncidentIndex = 0;
const totalIncidents = 10;
let actionTaken = false; // Flaga, aby zapobiec wielokrotnemu liczeniu punktów
let decisionHistory = [];
let totalGames = 0;  // Liczba gier
let totalScore = 0;  // Suma punktów ze wszystkich gier

// Start gry
function startGame() {
    document.getElementById('start-game').style.display = 'none';  // Ukrycie przycisku Start
    document.getElementById('status').style.display = 'flex';      // Pokazanie statusu
    document.getElementById('incident-area').style.display = 'block';  // Pokazanie obszaru incydentów
    generateIncident();  // Rozpoczęcie gry od pierwszego incydentu
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

    // Ukrywamy przycisk „Kolejny incydent” dopóki użytkownik nie podejmie decyzji
    document.getElementById('next-incident').style.display = 'none';

    actionTaken = false;  // Resetujemy flagę po nowym incydencie
    // Aktualizujemy numer incydentu
    document.getElementById('incident-progress').textContent = `Incydent: ${currentIncidentIndex + 1} z ${totalIncidents}`;
}

// Obsługa wyboru akcji
function handleAction(action) {
    if (actionTaken) return;  // Sprawdzamy, czy użytkownik już podjął decyzję

    const incident = incidents[currentIncidentIndex];  // Pobranie aktualnego incydentu
    const result = incident.actions[action];

    // Wyświetlenie feedbacku po wybraniu akcji
    document.getElementById('result-message').textContent = `${result.feedback} (MITRE: ${result.mitre})`;

    // Zapisanie decyzji użytkownika do historii
    decisionHistory.push({
        incident: incident.description,
        action: result.short,
        feedback: result.feedback,
        mitre: result.mitre
    });

    // Natychmiastowa zmiana kolorów przycisków
    updateButtonColors(action, result.score);

    // Zaktualizowanie punktów
    score += result.score;

    // Dodanie bonusu za wynik powyżej 100
    if (score >= 100) {
        document.getElementById('result-message').innerHTML += "<br><strong>Bonus!</strong> Otrzymujesz dodatkowe 20 punktów za przekroczenie 100 punktów.";
        score += 20;  // Bonus 20 punktów
    }

    updateScore();
    actionTaken = true;  // Flaga ustawiona na true, aby zablokować wielokrotne liczenie punktów

    // Pokaż przycisk „Kolejny incydent” bez opóźnienia
    document.getElementById('next-incident').style.display = 'block';
}

// Zmieniamy kolory przycisków po wyborze akcji
function updateButtonColors(selectedAction, score) {
    const buttons = ['action1', 'action2', 'action3', 'action4', 'action5'];
    buttons.forEach(button => {
        if (button === selectedAction) {
            // Wybrany przycisk zmienia kolor w zależności od poprawności odpowiedzi
            document.getElementById(button).classList.add(score > 0 ? 'correct' : 'wrong');
        } else {
            // Pozostałe przyciski stają się szare (nieaktywne)
            document.getElementById(button).classList.add('disabled');
        }
    });
}

// Funkcja aktualizująca wynik
function updateScore() {
    document.getElementById('score').textContent = "Punkty: " + score;
}

// Przejście do kolejnego incydentu
function nextIncident() {
    // Resetujemy kolory przycisków na niebieskie
    const buttons = ['action1', 'action2', 'action3', 'action4', 'action5'];
    buttons.forEach(button => {
        document.getElementById(button).classList.remove('correct', 'wrong', 'disabled');
        document.getElementById(button).classList.add('enabled');
    });

    currentIncidentIndex++;
    if (currentIncidentIndex >= totalIncidents) {
        showSummary();  // Jeśli wszystkie incydenty zostały ukończone, pokaż ekran podsumowania
    } else {
        generateIncident();  // Ładujemy kolejny incydent
    }
}

// Wyświetlenie ekranu podsumowania
function showSummary() {
    // Ukrywamy sekcje z incydentami
    document.getElementById('incident-area').style.display = 'none';
    document.getElementById('result-area').style.display = 'none';
    document.getElementById('next-incident').style.display = 'none';
    document.getElementById('status').style.display = 'none';

    // Zwiększamy liczbę gier i sumujemy wyniki
    totalGames++;
    totalScore += score;
    const averageScore = (totalScore / totalGames).toFixed(2);  // Obliczenie średniego wyniku

    // Wyświetlenie podsumowania
    document.getElementById('summary').style.display = 'block';
    document.getElementById('final-score').textContent = "Twój wynik: " + score;
    document.getElementById('total-games').textContent = "Łączna liczba gier: " + totalGames;
    document.getElementById('average-score').textContent = "Średni wynik: " + averageScore;

    // Wypełnianie podsumowania szczegółami decyzji
    const decisionHistoryHtml = decisionHistory.map((decision, index) => {
        return `<p><strong>Incydent ${index + 1}:</strong> <span style="color:black;">${decision.incident}</span><br>
            <strong>Wybrana akcja:</strong> <span style="color:blue;">${decision.action}</span><br>
            <strong>Feedback:</strong> <span style="color:gray;">${decision.feedback}</span><br>
            <strong>Technika defensywna:</strong> <span style="color:green;">${decision.mitre}</span></p>`;
    }).join("");
    document.getElementById('decision-history').innerHTML = decisionHistoryHtml;

    // Wyświetlenie przycisku "Nowa gra"
    document.getElementById('restart').style.display = 'block';
}

// Restartowanie gry
function restartGame() {
    // Resetowanie wyników i stanu gry
    score = 0;
    currentIncidentIndex = 0;
    actionTaken = false;
    decisionHistory = [];

    // Ukrywanie ekranu podsumowania i przywracanie elementów gry
    document.getElementById('summary').style.display = 'none';
    document.getElementById('restart').style.display = 'none';
    document.getElementById('next-incident').style.display = 'none';
    
    // Przywracanie widoczności obszaru incydentów i statusu
    document.getElementById('incident-area').style.display = 'block';
    document.getElementById('result-area').style.display = 'block';
    document.getElementById('status').style.display = 'flex';

    // Resetowanie wiadomości zwrotnej
    document.getElementById('result-message').textContent = 'Twoje decyzje pojawią się tutaj...';

    // Resetowanie przycisków akcji
    const buttons = ['action1', 'action2', 'action3', 'action4', 'action5'];
    buttons.forEach(button => {
        document.getElementById(button).classList.remove('correct', 'wrong', 'disabled');
        document.getElementById(button).classList.add('enabled');
    });

    updateScore();
    generateIncident();  // Rozpocznij nową grę
}
console.log("Plik game.js został załadowany.");
