/* =========================================
   JAVASCRIPT - A LÓGICA E O CÉREBRO DO JOGO
========================================= */

let grana = 5000000;     
let sustenta = 50;       
let qtd_agua = 50;       
let qtd_prod = 50000;    
let num_fase = 0; 

const lista_anos = [2025, 2027, 2029, 2031, 2033, 2035, 2037, 2039, 2041, 2043, 2045, 2047, 2048, 2049, 2050];

const perguntas_jogo = [
    // ... COLE TODAS AS SUAS PERGUNTAS AQUI ...
];

function toggleModoEscuro() {
    document.body.classList.toggle("dark-theme");
    let btn = document.getElementById("btn_modo_escuro");
    
    if(document.body.classList.contains("dark-theme")) {
        btn.innerText = "☀️ Modo Claro";
    } else {
        btn.innerText = "🌙 Modo Escuro";
    }
}

// ... COLE TODAS AS SUAS OUTRAS FUNÇÕES (comecarJogo, atualizarCorBarra, etc) AQUI ...

function encerrarSimulacao() {
    // ... Código final da sua função ...
    fim.innerHTML = mensagem_final + "<hr style='margin:20px 0; border:0; border-top:2px solid #81c784;'>" +
        "<p style='margin:10px 0; font-size: 1.2rem;'><b>💰 Saldo Final:</b> " + grana.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) + "</p>" +
        "<p style='margin:10px 0; font-size: 1.2rem;'><b>🌱 Sustentabilidade:</b> " + sustenta + "%</p>" +
        "<p style='margin:10px 0; font-size: 1.2rem;'><b>💧 Nível de Água:</b> " + qtd_agua + "%</p>" +
        "<p style='margin:10px 0; font-size: 1.2rem;'><b>🚜 Volume de Produção:</b> " + qtd_prod.toLocaleString("pt-BR") + "</p>" +
        "<h3 style='margin-top:20px; text-align: center; border: none;'>Missão Concluída: Ano 2050</h3>";
}
