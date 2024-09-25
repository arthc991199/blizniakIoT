let score = 0;
let currentIncidentIndex = 0;
const totalIncidents = 10;
let incidentUsed = [];
let actionTaken = false;  // Flaga, aby zapobiec wielokrotnemu liczeniu punktów
let timeLeft = 30;
let timer;
let decisionHistory = [];

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

// Funkcja generująca incydent
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

    // Uruchom timer
    startTimer();
}

// Funkcja timeru
function startTimer() {
    timeLeft = 30;
    document.getElementById('timer').textContent = `Czas: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = `Czas: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeout();
        }
    }, 1000);
}

// Funkcja, która obsługuje brak odpowiedzi w czasie
function handleTimeout() {
    document.getElementById('result-message').textContent = "Czas się skończył! Straciłeś 5 punktów.";
    score -= 5;
    updateScore();
    document.getElementById('next-incident').style.display = 'block';
}

// Funkcja obsługująca wybór akcji
function handleAction(action) {
    if (actionTaken) return;  // Sprawdzamy, czy użytkownik już podjął decyzję

    clearInterval(timer);  // Zatrzymujemy timer po podjęciu decyzji
    const incident = incidents[incidentUsed[incidentUsed.length - 1]];  // Ostatni wybrany incydent
    const result = incident.actions[action];

    // Wyświetlenie feedbacku po wybraniu akcji
    document.getElementById('result-message').textContent = `${result.feedback} (MITRE: ${result.mitre})`;

    // Zaktualizowanie punktów
    score += result.score;
    updateScore();
    actionTaken = true;  // Flaga ustawiona na true, aby zablokować wielokrotne liczenie punktów

    // Zapis do historii decyzji
    decisionHistory.push({
        incident: incident.description,
        action: result.short,
        score: result.score,
        feedback: result.feedback
    });

    // Po wybraniu akcji, pokaż przycisk „Kolejny incydent”
    document.getElementById('next-incident').style.display = 'block';
}

// Funkcja aktualizująca wynik
function updateScore() {
    document.getElementById('score').textContent = "Punkty: " + score;
}

// Funkcja obsługująca przejście do kolejnego incydentu
function nextIncident() {
    currentIncidentIndex++;
    if (currentIncidentIndex >= totalIncidents) {
        showSummary();  // Jeśli wszystkie incydenty zostały ukończone, pokaż ekran podsumowania
    } else {
        generateIncident();  // Ładujemy kolejny incydent
    }
}

// Funkcja obsługująca podpowiedzi
function showHint() {
    if (actionTaken) return;  // Użytkownik nie może użyć podpowiedzi po podjęciu decyzji
    const incident = incidents[incidentUsed[incidentUsed.length - 1]];
    document.getElementById('result-message').textContent = `Podpowiedź: Najlepsze działanie to: ${incident.actions.action1.short}`;
    score -= 3;  // Odejmujemy punkty za skorzystanie z podpowiedzi
    updateScore();
}
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
let gameResults = JSON.parse(localStorage.getItem('gameResults')) || [];
const fourHoursInMillis = 4 * 60 * 60 * 1000;
let totalGames = JSON.parse(localStorage.getItem('totalGames')) || 0;

// Licznik gier
totalGames++;
localStorage.setItem('totalGames', JSON.stringify(totalGames));

// Funkcja wyświetlania ekranu podsumowania po zakończeniu gry
function showSummary() {
    document.getElementById('incident-area').style.display = 'none'; // Ukrywamy obszar incydentów
    document.getElementById('result-area').style.display = 'none'; // Ukrywamy feedback
    document.getElementById('next-incident').style.display = 'none'; // Ukrywamy przycisk „Kolejny incydent”
    document.getElementById('status').style.display = 'none'; // Ukrywamy status punktów

    document.getElementById('summary').style.display = 'block'; // Pokazujemy ekran podsumowania
    document.getElementById('final-score').textContent = "Twój wynik: " + score; // Wyświetlamy końcowy wynik

    // Wyświetlenie historii decyzji
    const historyHtml = decisionHistory.map(item => {
        return `<p><strong>Incydent:</strong> ${item.incident}<br>
                <strong>Akcja:</strong> ${item.action} (${item.score} punktów)<br>
                <strong>Feedback:</strong> ${item.feedback}</p>`;
    }).join("");
    document.getElementById('decision-history').innerHTML = historyHtml;

    // Sprawdzenie, czy użytkownik zdobył perfekcyjny wynik
    if (score === totalIncidents * 20) {
        document.getElementById('summary').innerHTML += "<p>Gratulacje! Osiągnąłeś perfekcyjny wynik i zdobyłeś dodatkowe 50 punktów!</p>";
        score += 50;
    }

    // Zapis wyniku do rankingu
    saveScore();

    // Wyświetlenie rankingu
    showLeaderboard();

    // Obliczanie średnich wyników
    updateGameResults();
    calculateAverages();
}

// Funkcja zapisująca wynik do lokalnej pamięci
function saveScore() {
    leaderboard.push(score);
    leaderboard.sort((a, b) => b - a);
    leaderboard = leaderboard.slice(0, 5);  // Tylko top 5 wyników
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

// Funkcja wyświetlająca ranking (Top 5 wyników)
function showLeaderboard() {
    const leaderboardHtml = leaderboard.map((score, index) => `<p>${index + 1}. Wynik: ${score} punktów</p>`).join("");
    document.getElementById('leaderboard').innerHTML = leaderboardHtml;
}

// Zapis wyników z czasem zakończenia gry
function updateGameResults() {
    const currentTime = new Date().getTime();
    gameResults.push({ score, time: currentTime });
    localStorage.setItem('gameResults', JSON.stringify(gameResults));
}

// Funkcja obliczająca średnie wyniki (od początku oraz z ostatnich 4 godzin)
function calculateAverages() {
    const currentTime = new Date().getTime();

    // Średnia z wszystkich gier
    const totalSum = gameResults.reduce((acc, game) => acc + game.score, 0);
    const totalAvg = totalSum / gameResults.length;

    // Filtruj wyniki z ostatnich 4 godzin
    const last4hResults = gameResults.filter(game => currentTime - game.time <= fourHoursInMillis);
    const last4hSum = last4hResults.reduce((acc, game) => acc + game.score, 0);
    const last4hAvg = last4hResults.length ? last4hSum / last4hResults.length : 0;

    // Wyświetlenie średnich wyników
    document.getElementById('total-avg-score').textContent = `Średni wynik (od początku): ${totalAvg.toFixed(2)}`;
    document.getElementById('last4h-avg-score').textContent = `Średni wynik (ostatnie 4 godziny): ${last4hAvg.toFixed(2)}`;
    document.getElementById('total-games').textContent = `Łączna liczba gier: ${totalGames}`;
}

// Funkcja restartująca grę
function restartGame() {
    score = 0;
    currentIncidentIndex = 0;
    incidentUsed = [];
    decisionHistory = [];
    document.getElementById('summary').style.display = 'none'; // Ukryj ekran podsumowania
    updateScore();
    generateIncident();
}
