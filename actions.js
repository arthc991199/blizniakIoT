// Logowanie ładowania pliku
console.log("Plik actions.js został załadowany.");

// Obsługa wyboru akcji
function handleAction(action) {
    if (actionTaken) return;

    const incident = incidents[currentIncidentIndex];
    const result = incident.actions[action];

    // Wyświetlenie feedbacku po wybraniu akcji
    document.getElementById('result-message').textContent = `${result.feedback} (MITRE: ${result.mitre})`;

    // Natychmiastowa zmiana kolorów przycisków
    updateButtonColors(action, result.score);

    // Zaktualizowanie punktów
    score += result.score;
    updateScore();
    actionTaken = true; 

    // Zapisanie decyzji do historii
    decisionHistory.push({
        incident: incident.description,
        action: result.short,
        feedback: result.feedback,
        points: result.score,
        mitre: result.mitre
    });

    // Pokaż przycisk „Kolejny incydent”
    document.getElementById('next-incident').style.display = 'block';
}

// Funkcja aktualizująca wynik
function updateScore() {
    document.getElementById('score').textContent = "Punkty: " + score;
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
