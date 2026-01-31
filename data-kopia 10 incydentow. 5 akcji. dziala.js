const incidents = [
    // ... (existing incidents)
    {
        description: "Wykryto malware na stacji roboczej (T1059)",
        actions: {
            action1: {
                short: "Odłącz od sieci",
                feedback: "Odłączenie stacji roboczej zapobiega rozprzestrzenianiu się malware. (T1059 Command and Scripting Interpreter)",
                mitre: "M1030 Network Segmentation",
                score: 20
            },
            action2: {
                short: "Skanuj antywirusem",
                feedback: "Skanowanie może wykryć i usunąć malware. (T1518 Software Discovery)",
                mitre: "M1049 Anti-Malware",
                score: 15
            },
            action3: {
                short: "Zignoruj",
                feedback: "Ignorowanie może prowadzić do dalszych infekcji. (T1562 Impair Defenses)",
                mitre: "M1029 Impact",
                score: -20
            },
            action4: {
                short: "Zgłoś incydent",
                feedback: "Zgłoszenie pozwala na podjęcie odpowiednich działań. (T1070 Indicator Removal on Host)",
                mitre: "M1053 Data Backup",
                score: 10
            },
            action5: {
                short: "Restartuj komputer",
                feedback: "Restart może nie usunąć malware i pozwolić mu działać dalej. (T1547 Boot or Logon Autostart Execution)",
                mitre: "M1042 Disable or Remove Feature or Program",
                score: -10
            }
        }
    },
    {
        description: "Wykryto podejrzany ruch sieciowy (T1040)",
        actions: {
            action1: {
                short: "Monitoruj ruch",
                feedback: "Monitorowanie pozwala na zidentyfikowanie źródła. (T1040 Network Sniffing)",
                mitre: "M1018 User Account Management",
                score: 10
            },
            action2: {
                short: "Blokuj IP",
                feedback: "Blokowanie IP może zatrzymać nieautoryzowany dostęp. (T1102 Web Service)",
                mitre: "M1037 Network Intrusion Prevention",
                score: 15
            },
            action3: {
                short: "Zignoruj",
                feedback: "Ignorowanie może prowadzić do naruszenia bezpieczeństwa. (T1562 Impair Defenses)",
                mitre: "M1029 Impact",
                score: -15
            },
            action4: {
                short: "Analizuj sieć",
                feedback: "Analiza pozwala na głębsze zrozumienie zagrożenia. (T1049 System Network Connections Discovery)",
                mitre: "M1028 Network Segmentation",
                score: 15
            },
            action5: {
                short: "Odłącz sieć",
                feedback: "Odłączenie sieci może zakłócić działalność. (T1489 Service Stop)",
                mitre: "M1038 Limit Access to Resource Over Network",
                score: -5
            }
        }
    },
    {
        description: "Nieautoryzowana próba dostępu do bazy danych (T1078)",
        actions: {
            action1: {
                short: "Blokuj konto",
                feedback: "Blokada konta zapobiega dalszym próbom. (T1078 Valid Accounts)",
                mitre: "M1017 User Training",
                score: 20
            },
            action2: {
                short: "Zmień hasła",
                feedback: "Zmiana haseł zwiększa bezpieczeństwo. (T1110 Brute Force)",
                mitre: "M1027 Password Policies",
                score: 15
            },
            action3: {
                short: "Monitoruj aktywność",
                feedback: "Monitorowanie może wykryć kolejne próby. (T1057 Process Discovery)",
                mitre: "M1040 Behavior Prevention on Endpoint",
                score: 10
            },
            action4: {
                short: "Zignoruj",
                feedback: "Ignorowanie może prowadzić do wycieku danych. (T1562 Impair Defenses)",
                mitre: "M1029 Impact",
                score: -20
            },
            action5: {
                short: "Zwiększ logowanie",
                feedback: "Więcej logów pozwala na lepszą analizę. (T1059 Command and Scripting Interpreter)",
                mitre: "M1049 Logging",
                score: 5
            }
        }
    },
    {
        description: "Pracownik zgubił służbowy laptop (T1531)",
        actions: {
            action1: {
                short: "Zdalnie wyczyść",
                feedback: "Usunięcie danych zapobiega ich użyciu. (T1531 Account Access Removal)",
                mitre: "M0910 Remove or Disable Accounts",
                score: 20
            },
            action2: {
                short: "Zgłoś incydent",
                feedback: "Zgłoszenie pozwala na podjęcie kroków. (T1070 Indicator Removal on Host)",
                mitre: "M1053 Data Backup",
                score: 15
            },
            action3: {
                short: "Zignoruj",
                feedback: "Ignorowanie naraża dane na ryzyko. (T1562 Impair Defenses)",
                mitre: "M1029 Impact",
                score: -20
            },
            action4: {
                short: "Zmień hasła",
                feedback: "Zmiana haseł zabezpiecza konta. (T1110 Brute Force)",
                mitre: "M1027 Password Policies",
                score: 10
            },
            action5: {
                short: "Uruchom śledzenie",
                feedback: "Śledzenie może pomóc w odzyskaniu. (T1027 Obfuscated Files or Information)",
                mitre: "M1040 Behavior Prevention on Endpoint",
                score: 5
            }
        }
    },
    {
        description: "Atak ransomware na serwer plików (T1486)",
        actions: {
            action1: {
                short: "Odłącz serwer",
                feedback: "Odłączenie zapobiega rozprzestrzenianiu. (T1486 Data Encrypted for Impact)",
                mitre: "M1030 Network Segmentation",
                score: 20
            },
            action2: {
                short: "Przywróć kopię",
                feedback: "Przywrócenie danych minimalizuje wpływ. (T1490 Inhibit System Recovery)",
                mitre: "M1053 Data Backup",
                score: 15
            },
            action3: {
                short: "Zapłać okup",
                feedback: "Płacenie okupu nie gwarantuje odzyskania danych. (T1489 Service Stop)",
                mitre: "M1029 Impact",
                score: -20
            },
            action4: {
                short: "Zgłoś atak",
                feedback: "Zgłoszenie pomaga w ściganiu. (T1485 Data Destruction)",
                mitre: "M1054 Reporting",
                score: 10
            },
            action5: {
                short: "Analizuj przyczynę",
                feedback: "Analiza pomaga zapobiec przyszłym atakom. (T1589 Gather Victim Identity Information)",
                mitre: "M1047 Audit",
                score: 10
            }
        }
    },
    {
        description: "Wykryto podatność typu zero-day (T1190)",
        actions: {
            action1: {
                short: "Obejście tymczasowe",
                feedback: "Obejście zabezpiecza system. (T1190 Exploit Public-Facing Application)",
                mitre: "M1044 Restrict Library Loading",
                score: 15
            },
            action2: {
                short: "Wyłącz usługi",
                feedback: "Wyłączenie eliminuje ryzyko. (T1489 Service Stop)",
                mitre: "M1038 Limit Access to Resource Over Network",
                score: 10
            },
            action3: {
                short: "Zignoruj problem",
                feedback: "Ignorowanie naraża system na ataki. (T1562 Impair Defenses)",
                mitre: "M1029 Impact",
                score: -20
            },
            action4: {
                short: "Skontaktuj się z dostawcą",
                feedback: "Informowanie przyspiesza poprawkę. (T1592 Gather Victim Network Information)",
                mitre: "M1055 Security Updates",
                score: 10
            },
            action5: {
                short: "Monitoruj systemy",
                feedback: "Monitorowanie wykrywa próby ataku. (T1057 Process Discovery)",
                mitre: "M1040 Behavior Prevention on Endpoint",
                score: 10
            }
        }
    },
    {
        description: "Wykryto atak SQL Injection (T1190)",
        actions: {
            action1: {
                short: "Waliduj dane",
                feedback: "Walidacja zapobiega wstrzyknięciu kodu. (T1190 Exploit Public-Facing Application)",
                mitre: "M1050 Input Validation",
                score: 20
            },
            action2: {
                short: "Aktualizuj WAF",
                feedback: "Aktualizacja WAF blokuje ataki. (T1190 Exploit Public-Facing Application)",
                mitre: "M1037 Network Intrusion Prevention",
                score: 15
            },
            action3: {
                short: "Zignoruj atak",
                feedback: "Ignorowanie może prowadzić do wycieku danych. (T1562 Impair Defenses)",
                mitre: "M1029 Impact",
                score: -20
            },
            action4: {
                short: "Monitoruj logi",
                feedback: "Monitorowanie pomaga zidentyfikować źródło. (T1057 Process Discovery)",
                mitre: "M1040 Behavior Prevention on Endpoint",
                score: 10
            },
            action5: {
                short: "Testy penetracyjne",
                feedback: "Testy wykrywają inne podatności. (T1595 Active Scanning)",
                mitre: "M1047 Audit",
                score: 5
            }
        }
    },
    {
        description: "Pracownik uzyskał nieautoryzowany dostęp do danych (T1078)",
        actions: {
            action1: {
                short: "Ogranicz uprawnienia",
                feedback: "Ograniczenie zapobiega naruszeniom. (T1078 Valid Accounts)",
                mitre: "M1026 Privileged Account Management",
                score: 20
            },
            action2: {
                short: "Audyt bezpieczeństwa",
                feedback: "Audyt identyfikuje luki. (T1592 Gather Victim Network Information)",
                mitre: "M1047 Audit",
                score: 15
            },
            action3: {
                short: "Zignoruj incydent",
                feedback: "Ignorowanie może prowadzić do naruszeń. (T1562 Impair Defenses)",
                mitre: "M1029 Impact",
                score: -20
            },
            action4: {
                short: "Postępowanie dyscyplinarne",
                feedback: "Dyscyplina zapobiega przyszłym naruszeniom. (T1485 Data Destruction)",
                mitre: "M1054 Reporting",
                score: 10
            },
            action5: {
                short: "Monitoruj użytkownika",
                feedback: "Monitorowanie wykrywa nieautoryzowane działania. (T1057 Process Discovery)",
                mitre: "M1040 Behavior Prevention on Endpoint",
                score: 10
            }
        }
    },
    {
        description: "Zgłoszono próbę socjotechniki (T1566)",
        actions: {
            action1: {
                short: "Szkolenie",
                feedback: "Szkolenie zwiększa świadomość. (T1566 Phishing)",
                mitre: "M1017 User Training",
                score: 15
            },
            action2: {
                short: "Zgłoś incydent",
                feedback: "Zgłoszenie pozwala na działania. (T1598 Phishing for Information)",
                mitre: "M1054 Reporting",
                score: 10
            },
            action3: {
                short: "Zignoruj raport",
                feedback: "Ignorowanie zwiększa ryzyko ataków. (T1562 Impair Defenses)",
                mitre: "M1029 Impact",
                score: -15
            },
            action4: {
                short: "Aktualizuj polityki",
                feedback: "Aktualizacja wzmacnia zabezpieczenia. (T1484 Domain Policy Modification)",
                mitre: "M1031 Least Privilege",
                score: 10
            },
            action5: {
                short: "Monitoruj komunikację",
                feedback: "Monitorowanie wykrywa podejrzane działania. (T1059 Command and Scripting Interpreter)",
                mitre: "M1040 Behavior Prevention on Endpoint",
                score: 5
            }
        }
    },
    {
        description: "Podejrzane logowanie z zagranicy (T1078)",
        actions: {
            action1: {
                short: "Resetuj hasło",
                feedback: "Zmiana hasła zabezpiecza konto. (T1110 Brute Force)",
                mitre: "M1027 Password Policies",
                score: 15
            },
            action2: {
                short: "Blokuj konto",
                feedback: "Blokada zapobiega dostępowi. (T1078 Valid Accounts)",
                mitre: "M1032 Multi-factor Authentication",
                score: 20
            },
            action3: {
                short: "Włącz 2FA",
                feedback: "2FA zwiększa bezpieczeństwo. (T1556 Modify Authentication Process)",
                mitre: "M1032 Multi-factor Authentication",
                score: 15
            },
            action4: {
                short: "Zignoruj alert",
                feedback: "Ignorowanie może prowadzić do kompromitacji. (T1562 Impair Defenses)",
                mitre: "M1029 Impact",
                score: -20
            },
            action5: {
                short: "Monitoruj konto",
                feedback: "Monitorowanie wykrywa podejrzane działania. (T1057 Process Discovery)",
                mitre: "M1040 Behavior Prevention on Endpoint",
                score: 10
            }
        }
    }
];
