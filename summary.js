// Logowanie ładowania pliku
console.log("Plik summary.js został załadowany.");

function showSummary() {
    console.log("Wywołanie funkcji showSummary");

    // Ukrywanie sekcji z incydentami
    document.getElementById('incident-area').style.display = 'none';
    document.getElementById('result-area').style.display = 'none';
    document.getElementById('status').style.display = 'none';
    document.getElementById('next-incident').style.display = 'none';

    console.log("Elementy sprawdzone:");
    console.log("final-score: ", document.getElementById('final-score'));
    console.log("total-games: ", document.getElementById('total-games'));
    console.log("average-score: ", document.getElementById('average-score'));
    console.log("last-four-hours: ", document.getElementById('last-four-hours'));
    console.log("decision-history: ", document.getElementById('decision-history'));
    console.log("summary: ", document.getElementById('summary'));
    console.log("restart: ", document.getElementById('restart'));

    // Wyświetlanie ekranu podsumowania
    document.getElementById('summary').style.display = 'block';
    document.getElementById('final-score').textContent = `Twój wynik: ${score}`;
    document.getElementById('total-games').textContent = `Łączna liczba gier: ${totalGames}`;
    document.getElementById('average-score').textContent = `Średni wynik: ${totalScore}`;
    document.getElementById('last-four-hours').textContent = `Średni wynik (ostatnie 4 godziny): ${totalScore}`;

    // Wypełnianie historii decyzji
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
console,console.log(actionTaken, incidents);
