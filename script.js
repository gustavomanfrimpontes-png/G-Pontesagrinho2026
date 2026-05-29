javascript// ==========================================
// SCRIPT.JS - Agro Forte, Futuro Sustentável
// ==========================================

// Estado inicial da fazenda
const fazenda = {
    recursos: {
        agua: 100, // % de qualidade/disponibilidade
        solo: 100, // % de fertilidade
        energia: 100, // % de eficiência limpa
        capital: 500, // Moedas para investir
    },
    ano: 1,
    pontuacao: 0,
    modoAtivo: "convencional" // Alterna entre convencional e sustentavel
};

// --- AÇÕES DO JOGADOR ---

function adotarPraticaSustentavel(tipo) {
    if (tipo === "solar" && fazenda.recursos.capital >= 200) {
        fazenda.recursos.energia += 30;
        fazenda.recursos.capital -= 200;
        fazenda.recursos.solo += 10; // Menos poluição
        fazenda.pontuacao += 50;
        console.log("Painéis solares instalados! Energia limpa garantida.");
    } else if (tipo === "plantioDireto" && fazenda.recursos.capital >= 100) {
        fazenda.recursos.solo += 40; // Evita erosão
        fazenda.recursos.agua += 20; // Conservação hídrica
        fazenda.recursos.capital -= 100;
        fazenda.pontuacao += 40;
        console.log("Plantio Direto aplicado com sucesso.");
    } else if (tipo === "bioInsumos" && fazenda.recursos.capital >= 50) {
        fazenda.recursos.solo += 25;
        fazenda.recursos.agua -= 10; // Reduz contaminação
        fazenda.recursos.capital -= 50;
        fazenda.pontuacao += 30;
        console.log("Uso de bioinsumos iniciado para proteger o solo.");
    } else {
        console.log("Capital insuficiente ou ação inválida!");
    }
    limitarValores();
    verificarFimDeJogo();
}

function venderSafra() {
    // Lucro baseado na saúde do solo e da água
    let lucroBase = 100;
    let multiplicadorSustentabilidade = (fazenda.recursos.solo + fazenda.recursos.agua) / 200;
    let lucroFinal = Math.floor(lucroBase * multiplicadorSustentabilidade);

    fazenda.recursos.capital += lucroFinal;
    fazenda.pontuacao += 20;
    
    console.log(`Safra vendida! Lucro de R$${lucroFinal}.`);
    avancarAno();
}

function avancarAno() {
    fazenda.ano++;
    
    // Eventos climáticos ou ambientais que afetam os recursos a cada ano
    fazenda.recursos.agua -= 15;
    fazenda.recursos.solo -= 15;
    
    console.log(`Ano ${fazenda.ano} iniciado.`);
    limitarValores();
    verificarFimDeJogo();
}

// --- REGRAS DO JOGO ---

function limitarValores() {
    // Garante que nenhum recurso passe de 100% ou caia abaixo de 0%
    for (const recurso in fazenda.recursos) {
        if (fazenda.recursos[recurso] > 100) fazenda.recursos[recurso] = 100;
        if (fazenda.recursos[recurso] < 0) fazenda.recursos[recurso] = 0;
    }
}

function verificarFimDeJogo() {
    // Condições de Game Over
    if (fazenda.recursos.agua <= 0) {
        console.log("GAME OVER: Os recursos hídricos da fazenda esgotaram! Falha no sistema.");
        resetarJogo();
    } else if (fazenda.recursos.solo <= 0) {
        console.log("GAME OVER: O solo foi totalmente degradado por exaustão.");
        resetarJogo();
    } else if (fazenda.recursos.capital <= 0) {
        console.log("GAME OVER: Falência. A fazenda não tem mais capital para operar.");
        resetarJogo();
    }
}

function resetarJogo() {
    console.log("Reiniciando sua jornada sustentável...");
    fazenda.recursos.agua = 100;
    fazenda.recursos.solo = 100;
    fazenda.recursos.energia = 100;
    fazenda.recursos.capital = 500;
    fazenda.ano = 1;
    fazenda.pontuacao = 0;
}

// --- EXEMPLO DE SIMULAÇÃO (TESTE NO CONSOLE) ---
console.log("--- BEM-VINDO AO AGRO FORTE E FUTURO SUSTENTÁVEL ---");
adotarPraticaSustentavel("solar");
adotarPraticaSustentavel("plantioDireto");
venderSafra();
