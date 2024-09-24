let score = 0;
let timer;
let timeLeft = 30; // limit czasowy na decyzję

const incidents = [
    {
        description: "Atak DDoS: Duży ruch na serwerze! Co robisz?",
        actions: {
            action1: "Blokujesz podejrzane IP",
            action2: "Ignorujesz",
            action3: "Zwiększasz przepustowość serwera",
            action4: "Kontaktujesz się z dostawcą usług sieciowych",
            action5: "Zarządzasz regułami zapory ogniowej"
        },
        results: {
            action1: { result: "Serwer działa poprawnie, blokada działa!", score: 10 },
            action2: { result: "Serwer przeciążony, klienci tracą dostęp!", score: -10 },
            action3: { result: "Koszty wzrosły, ale serwer funkcjonuje.", score: 5 },
            action4: { result: "Dostawca sieci pomaga zablokować atak.", score: 8 },
            action5: { result: "Zapora ogniowa skutecznie odfiltrowała ruch.", score: 12 }
        }
    },
    {
        description: "Phishing: Wykryto podejrzane e-maile w systemie!",
        actions: {
            action1: "Kasujesz wszystkie podejrzane wiadomości",
            action2: "Informujesz użytkowników",
            action3: "Wprowadzasz szkolenie o phishingu",
            action4: "Czekasz na więcej informacji",
            action5: "Monitorujesz aktywność użytkowników"
        },
        results: {
            action1: { result: "Wiadomości usunięte, problem zażegnany!", score: 10 },
            action2: { result: "Użytkownicy zaczynają kasować wiadomości, ale trwa to długo.", score: 5 },
            action3: { result: "Szkolenie poprawia świadomość, ale problem nie zniknął od razu.", score: 7 },
            action4: { result: "Czekanie spowodowało wyciek danych!", score: -15 },
            action5: { result: "Monitorowanie pomogło złapać nieautoryzowane działania.", score: 8 }
        }
    },
    {
        description: "Włamanie na serwer: Zauważono nieautoryzowany dostęp!",
        actions: {
            action1: "Izolujesz serwer",
            action2: "Przeglądasz logi",
            action3: "Restartujesz system",
            action4: "Zgłaszasz problem zespołowi ds. bezpieczeństwa",
            action5: "Uruchamiasz narzędzie do wykrywania złośliwego oprogramowania"
        },
        results: {
            action1: { result: "Serwer izolowany, włamanie zatrzymane!", score: 12 },
            action2: { result: "Logi ujawniły zagrożenie, ale włamywacz wciąż aktywny.", score: 5 },
            action3: { result: "Restart nie pomógł, włamywacz wciąż ma dostęp!", score: -10 },
            action4: { result: "Zespół ds. bezpieczeństwa pomaga w naprawie.", score: 8 },
            action5: { result: "Złośliwe oprogramowanie wykryte i usunięte.", score: 10 }
        }
    }
];

function generateIncident() {
    const randomIncident = incidents[Math.floor(Math.random() * incidents.length)];
    document.getElementById('incident-description').textContent = randomIncident.description;
    document.getElementById('actions').dataset.currentIncident = JSON.stringify(randomIncident);
    document.getElementById('result-message').textContent = "Czekam na twoją decyzję...";
    
    // Reset timera
    timeLeft = 30;
    updateTimer();
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById('result-message').textContent = "Czas się skończył! Straciłeś punkty.";
            score -= 5;
            updateScore();
        }
    }, 1000);
}

function handleAction(action) {
    clearInterval(timer); // Zatrzymujemy timer po podjęciu decyzji
    const incident = JSON.parse(document.getElementById('actions').dataset.currentIncident);
    const result = incident.results[action];
    document.getElementById('result-message').textContent = result.result;
    score += result.score;
    updateScore();
}

function updateScore() {
    document.getElementById('score').textContent = "Punkty: " + score;
}

function updateTimer() {
    document.getElementById('timer').textContent = "Czas: " + timeLeft;
}
