const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let saldo = 1000;

let time1 = {
    nome: "",
    odi: ""
};

let time2 = {
    nome: "",
    odi: ""
};

const array1 = [
    "Manchester United", "Manchester City", "Liverpool", "Chelsea", "Arsenal",
    "Tottenham Hotspur", "Everton", "West Ham United", "Leicester City", "Newcastle United",
    "Wolverhampton Wanderers", "Southampton", "Crystal Palace", "Brighton & Hove Albion",
    "Burnley", "Sheffield United", "Aston Villa", "Fulham", "Leeds United", "Brentford",
    "Nottingham Forest", "Real Madrid", "Barcelona", "Atletico Madrid", "Sevilla",
    "Valencia", "Villarreal", "Real Sociedad", "Athletic Bilbao", "Real Betis",
    "Celta Vigo", "Juventus", "Inter Milan", "AC Milan", "Napoli", "Roma", "Lazio",
    "Atalanta", "Fiorentina", "Torino", "Bayern Munich", "Borussia Dortmund", "RB Leipzig",
    "Bayer Leverkusen", "Borussia Mönchengladbach", "VfL Wolfsburg", "Eintracht Frankfurt",
    "Paris Saint-Germain", "Lille", "Monaco"
];

const array2 = [
    "Lyon", "Marseille", "Rennes", "Ajax", "PSV Eindhoven", "Feyenoord", "Porto",
    "Benfica", "Sporting CP", "Flamengo", "Palmeiras", "Corinthians", "São Paulo",
    "Santos", "Grêmio", "Internacional", "Atlético Mineiro", "Fluminense", "Botafogo",
    "Boca Juniors", "River Plate", "Independiente", "Racing Club", "San Lorenzo",
    "Club América", "Chivas Guadalajara", "Tigres UANL", "Monterrey", "Al Ahly",
    "Zamalek", "Kaizer Chiefs", "Orlando Pirates", "Al Hilal", "Urawa Red Diamonds",
    "Jeonbuk Hyundai Motors", "Guangzhou Evergrande", "Lens", "Montpellier", "Nice",
    "Braga", "Vitoria Guimaraes", "Union Berlin", "Hertha Berlin", "Freiburg",
    "Hoffenheim", "Sassuolo", "Bologna", "Udinese", "Sampdoria", "Genoa"
];

function sortearTime1() {
    const timeum = array1[Math.floor(Math.random() * array1.length)];
    time1.nome = timeum;
    time1.odi = Math.floor(Math.random() * 100);
}

function sortearTime2() {
    let timedois;
    do {
        timedois = array2[Math.floor(Math.random() * array2.length)];
    } while (timedois === time1.nome);
    time2.nome = timedois;
    time2.odi = Math.floor(Math.random() * 100); 
}

function iniciar() {
    console.log(`Seu saldo atual é de: R$${saldo.toFixed(2)}`);
    console.log("Bem-vindo ao jogo de apostas em futebol!");
    rl.question("O que você deseja fazer?\n1 - Apostar\n2 - Sair\n", (resposta) => {
        if (resposta === "1") {
            sortearTime1();
            sortearTime2(); 
            fazerAposta();
        } else if (resposta === "2") {
            console.log(`Obrigado por jogar! Seu saldo final é de: R$${saldo.toFixed(2)}`);
            rl.close();
        } else {
            console.log("Opção inválida. Tente novamente.");
            iniciar();
        }
    });
}

function fazerAposta() {
    rl.question(`Quanto você deseja apostar? (Seu saldo atual é de: R$${saldo.toFixed(2)})\n`, (valor) => {
        const valorAposta = parseFloat(valor);
        if (isNaN(valorAposta) || valorAposta <= 0) {
            console.log("Valor inválido. Tente novamente.");
            fazerAposta();
        } else if (valorAposta > saldo) {
            console.log("Você não tem saldo suficiente para essa aposta. Tente novamente.");
            fazerAposta();
        } else {
            fazerAposta2(valorAposta);
        }
    });
}

function fazerAposta2(valorAposta) {
    console.log(`Time 1 - ${time1.nome} | Odd: ${time1.odi}`);
    console.log(`Time 2 - ${time2.nome} | Odd: ${time2.odi}`);

    rl.question(`Em qual time você deseja apostar? (Digite o nome do time: ${time1.nome} ou ${time2.nome})\n`, (resposta) => {
        const times = [time1.nome, time2.nome];

        if (!times.includes(resposta)) {
            console.log("Time inválido. Tente novamente.");
            fazerAposta2(valorAposta);
            return;
        }

        // Sorteia o ganhador
        const indiceGanhador = Math.floor(Math.random() * times.length);
        const ganhador = times[indiceGanhador];

        // Verifica se o usuário acertou
        if (resposta === ganhador) {
            const oddGanhador = ganhador === time1.nome ? parseFloat(time1.odi) : parseFloat(time2.odi);
            const ganho = valorAposta * oddGanhador;
            saldo += ganho;
            console.log(`Parabéns! ${ganhador} venceu! Você ganhou R$${ganho.toFixed(2)}.`);
        } else {
            saldo -= valorAposta;
            console.log(`Que pena! ${ganhador} venceu. Você perdeu R$${valorAposta.toFixed(2)}.`);
        }

        console.log(`Seu novo saldo é: R$${saldo.toFixed(2)}`);
        iniciar(); 
        
    });
}

iniciar();