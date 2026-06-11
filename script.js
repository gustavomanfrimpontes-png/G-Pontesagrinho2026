// Banco de dados de cenários baseados no Agrinho moderno
const gameEvents = [
    {
        id: 1,
        text: "Sua propriedade precisa combater uma praga de lagartas na lavoura de milho. O que você faz?",
        choices: [
            {
                text: "Aplicar defensivos químicos pesados imediatamente de forma generalizada.",
                economy: +20,
                environment: -25
            },
            {
                text: "Adotar o Manejo Integrado de Pragas (MIP) e usar controle biológico (vespas inimigas naturais).",
                economy: -10,
                environment: +25
            }
        ]
    },
    {
        id: 2,
        text: "Chegou o momento de preparar o solo para a próxima safra de soja. Qual técnica utilizar?",
        choices: [
            {
                text: "Realizar a aração convencional revirando a terra para limpar rápido o terreno.",
                economy: +15,
                environment: -20
            },
            {
                text: "Implementar o Sistema de Plantio Direto na palha, preservando a umidade e microrganismos do solo.",
                economy: +5,
                environment: +20
            }
        ]
    },
    {
        id: 3,
        text: "A conta de energia elétrica dos sistemas de irrigação da fazenda está muito alta. Como resolver?",
        choices: [
            {
                text: "Reduzir as horas de irrigação para economizar, mesmo arriscando perder um pouco de produtividade.",
                economy: -15,
                environment: +10
            },
            {
                text: "Investir em painéis de energia solar fotovoltaica e sensores inteligentes de umidade no solo.",
                economy: -25,
                environment: +35
            }
        ]
    },
    {
        id: 4,
        text: "Uma área de Mata Ciliar (beira de rio) dentro da sua propriedade está degradada. O fiscal ambiental visitará a região.",
        choices: [
            {
                text: "Ignorar a mata e focar em expandir a área de pastagem para o gado lucrar mais rápido.",
                economy: +25,
                environment: -30
            },
            {
                text: "Isolar a área do gado e plantar mudas de árvores nativas para recompor a Área de Preservação Permanente (APP).",
                economy: -15,
                environment: +30
            }
        ]
    },
    {
        id: 5,
        text: "Pequenos produtores vizinhos propuseram criar uma cooperativa local para vender alimentos orgânicos certificados.",
        choices: [
            {
                text: "Recusar e continuar focado em monocultura de larga escala independente.",
                economy: +15,
                environment: -10
            },
            {
                text: "Entrar na cooperativa, diversificar a produção com agroecologia e agregar valor ao produto sustentável.",
                economy: +20,
                environment: +20
            }
        ]
    }
];

// Estado do Jogo
let economy = 50;
let environment = 50;
let currentTurn = 0;

// Elementos do DOM
const barEconomy = document.getElementById('bar-economy');
const barEnvironment = document.getElementById('bar-environment');
const txtEconomy = document.getElementById('txt-economy');
const txtEnvironment = document.getElementById('txt-environment');
const eventDescription = document.getElementById('event-description');
const choicesContainer = document.getElementById('choices-container');
const turnIndicator = document.getElementById('turn-indicator');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalText = document.
