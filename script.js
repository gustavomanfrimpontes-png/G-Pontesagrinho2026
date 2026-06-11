// Estado Inicial do Jogo
let gameState = {
    money: 1200,
    water: 80,
    soil: 80,
    energy: 70,
    turn: 1
};

// Banco de Dados de Eventos do Jogo (Complexidade de Decisões)
const eventsPool = [
    {
        title: "Infestação de Pragas na Lavoura",
        description: "Uma nuvem de insetos ameaça destruir sua plantação principal de soja. O que você fará?",
        choices: [
            {
                text: "Usar defensivos químicos pesados (Rápido e barato)",
                effect: { money: -100, soil: -25, water: -15, energy: 0 },
                log: "Você salvou a safra, mas o solo e os lençóis freáticos foram severamente contaminados."
            },
            {
                text: "Implementar Manejo Integrado de Pragas - MIP (Biológico)",
                effect: { money: -300, soil: 10, water: 0, energy: -10 },
                log: "Investimento alto em tecnologia biológica! Insetos controlados e solo fortalecido."
            }
        ]
    },
    {
        title: "Período de Estiagem Extrema",
        description: "Previsão de semanas sem chuva na região do Agrinho. A água da propriedade está ameaçada.",
        choices: [
            {
                text: "Manter irrigação tradicional por aspersão contínua",
                effect: { money: -50, water: -35, soil: 0, energy: -15 },
                log: "Muita água foi desperdiçada por evaporação. Seus reservatórios caíram drasticamente."
            },
            {
                text: "Instalar sistema de Irrigação por Gotejamento Inteligente",
                effect: { money: -500, water: -5, soil: 5, energy: 5 },
                log: "Gasto financeiro alto, mas a economia de água e energia foi excelente!"
            }
        ]
    },
    {
        title: "Matriz Energética da Fazenda",
        description: "Os custos com eletricidade convencional da rede estão subindo e poluindo.",
        choices: [
            {
                text: "Continuar usando a rede elétrica padrão e geradores a diesel",
                effect: { money: -200, water: 0, soil: -5, energy: -10 },
                log: "Gastos contínuos com combustível fóssil prejudicam as finanças e o ar."
            },
            {
                text: "Instalar Painéis Solares e Biogás de dejetos animais",
                effect: { money: -600, water: 0, soil: 10, energy: 40 },
                log: "Sua fazenda agora produz energia limpa! Autossuficiência conquistada."
            }
        ]
    },
    {
        title: "Logística e Distribuição",
        description: "Momento de escoar a produção da colheita para as cooperativas.",
        choices: [
            {
                text: "Vender diretamente para grandes indústrias sem selo verde",
                effect: { money: 400, water: 0, soil: 0, energy: -10 },
                log: "Venda rápida e lucro bruto garantido."
            },
            {
                text: "Obter certificação de Agro Sustentável e vender com bônus",
                effect: { money: 650, water: -5, soil: -5, energy: -5 },
                log: "O mercado internacional pagou muito mais pelo seu produto sustentável!"
            }
        ]
    },
    {
        title: "Desgaste Nutricional do Solo",
        description: "A terra está perdendo força após sucessivos plantios da mesma cultura.",
        choices: [
            {
                text: "Abusar de fertilizantes sintéticos NPK para forçar o crescimento",
                effect: { money: -150, soil: -20, water: -10, energy: 0 },
                log: "A planta cresceu, mas a microbiota do solo foi destruída."
            },
            {
                text: "Fazer Rotação de Culturas com leguminosas (Fixação Natural de N)",
                effect: { money: -50, soil: 25, water: 5, energy: 0 },
                log: "Prática perfeita de Agro Forte! Solo nutrido naturalmente para as próximas gerações."
            }
        ]
    }
];

// Funções do Jogo
function updateUI() {
    // Atualizar números e barras
    document.getElementById("stat-money").innerText = gameState.money;
    document.getElementById("bar-water").style.width = Math.min(100, Math.max(0, gameState.water)) + "%";
    document.getElementById("bar-soil").style.width = Math.min(100, Math.max(0, gameState.soil)) + "%";
    document.getElementById("bar-energy").style.width = Math.min(100, Math.max(0, gameState.energy)) + "%";
    document.getElementById("current-turn").innerText = gameState.turn;

    // Verificar condições de derrota ou vitória
    checkGameOver();
}

function addLog(text, isBad = false) {
    const logBox = document.getElementById("log-messages");
    const p = document.createElement("p");
    p.className = isBad ? "bad-msg" : "system-msg";
    p.innerText = `[Turno ${gameState.turn}] ${text}`;
    logBox.insertBefore(p, logBox.firstChild); // Adiciona no topo do log
}

function loadEvent() {
    // Escolhe um evento aleatório do pool
    const randomIndex = Math.floor(Math.random() * eventsPool.length);
    const currentEvent = eventsPool[randomIndex];

    document.getElementById("event-title").innerText = currentEvent.title;
    document.getElementById("event-description").innerText = currentEvent.description;

    const buttonArea = document.getElementById("action-buttons");
    buttonArea.innerHTML = ""; // Limpa escolhas anteriores

    // Cria os botões dinamicamente com base nas opções do evento
    currentEvent.choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.className = "choice-btn";
        btn.innerText = choice.text;
        btn.onclick = () => handleChoice(choice);
        buttonArea.appendChild(btn);
    });
}

function handleChoice(choice) {
    // Aplicar efeitos colaterais na fazenda
    gameState.money += choice.effect.money;
    gameState.water += choice.effect.water;
    gameState.soil += choice.effect.soil;
    gameState.energy += choice.effect.energy;

    // Adicionar mensagem explicativa ao Diário
    addLog(choice.log, (choice.effect.soil < 0 || choice.effect.water < 0));

    // Avançar Turno
    gameState.turn += 1;

    // Pequeno bônus de produção passiva por turno se a fazenda estiver saudável
    if (gameState.soil > 50 && gameState.water > 50) {
        gameState.money += 100;
        addLog("Bônus: Sua terra saudável rendeu +100 moedas nesta rodada.");
    }

    updateUI();
    if (!document.getElementById("game-over-screen").classList.contains("hidden")) return;
    loadEvent();
}

function checkGameOver() {
    let lost = false;
    let reason = "";

    if (gameState.money <= -200) {
        lost = true;
        reason = "Sua fazenda faliu! O investimento incorreto drenou seus recursos financeiros.";
    } else if (gameState.water <= 0) {
        lost = true;
        reason = "Crise Hídrica Total! Sem água, a produção parou e a região secou.";
    } else if (gameState.soil <= 0) {
        lost = true;
        reason = "Solo Desértico e Infértil! O uso excessivo de químicos matou a terra.";
    } else if (gameState.energy <= 0) {
        lost = true;
        reason = "Apagão Energético! Seus maquinários pararam por falta de fontes sustentáveis.";
    } else if (gameState.turn > 10) { // Condição de vitória por sustentabilidade
        document.getElementById("game-over-title").innerText = "🏆 Vitória Sustentável!";
        document.getElementById("game-over-reason").innerText = `Parabéns! Você alcançou o Turno 10 mantendo o Agro Forte e o Futuro Sustentável com ${gameState.money} moedas em caixa!`;
        document.getElementById("game-over-screen").classList.remove("hidden");
        return;
    }

    if (lost) {
        document.getElementById("game-over-title").innerText = "Game Over 🌾";
        document.getElementById("game-over-reason").innerText = reason;
        document.getElementById("game-over-screen").classList.remove("hidden");
    }
}

// Inicialização do Jogo ao abrir a página
window.onload = () => {
    updateUI();
    loadEvent();
};
