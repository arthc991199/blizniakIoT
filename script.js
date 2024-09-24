const incidents = [
    {
        description: "Atak DDoS: Duży ruch na serwerze! Co robisz?",
        actions: {
            action1: "Blokujesz podejrzane IP",
            action2: "Ignorujesz",
            action3: "Wysyłasz ostrzeżenie"
        },
        results: {
            action1: "Serwer działa poprawnie, blokada działa!",
            action2: "Serwer przeciążony, klienci tracą dostęp!",
            action3: "Ostrzeżenie nic nie pomogło, serwer wciąż przeciążony!"
        }
    },
    {
        description: "Phishing: Wykryto podejrzane e-maile w systemie!",
        actions: {
            action1: "Kasujesz wszystkie podejrzane wiadomości",
            action2: "Informujesz użytkowników",
            action3: "Czekasz na więcej informacji"
        },
        results: {
            action1: "Wiadomości usunięte, problem zażegnany!",
            action2: "Użytkownicy zaczynają kasować podejrzane wiadomości, ale trwa to długo.",
            action3: "Czekanie spowodowało wyciek danych!"
        }
    },
    {
        description: "Włamanie na serwer: Zauważono nieautoryzowany dostęp!",
        actions: {
            action1: "Izolujesz serwer",
            action2: "Przeglądasz logi",
            action3: "Restartujesz system"
        },
        results: {
            action1: "Serwer izolowany, włamanie zatrzymane!",
            action2: "Logi ujawniły zagrożenie, ale wciąż aktywne!",
            action3: "Restart nie pomógł, włamywacz wciąż ma dostęp!"
        }
    }
];

function generateIncident() {
    const randomIncident = incidents[Math.floor(Math.random() * incidents.length)];
    document.getElementById('incident-description').textContent = randomIncident.description;
    document.getElementById('actions').dataset.currentIncident = JSON.stringify(randomIncident);
    document.getElementById('result-message').textContent = "Czekam na twoją decyzję...";
}

function handleAction(action) {
    const incident = JSON.parse(document.getElementById('actions').dataset.currentIncident);
    const result = incident.results[action];
    document.getElementById('result-message').textContent = result;
}
