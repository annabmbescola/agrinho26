
/* =========================================
   JAVASCRIPT - A LÓGICA E O CÉREBRO DO JOGO
=========================================
*/

// CRIA AS VARIÁVEIS INICIAIS DO JOGO: É COM ISSO QUE O JOGADOR COMEÇA A PARTIDA
let grana = 5000000;     
let sustenta = 50;       
let qtd_agua = 50;       
let qtd_prod = 50000;    
let num_fase = 0; // CONTROLA EM QUAL NÚMERO DE PERGUNTA O JOGADOR ESTÁ NAQUELE MOMENTO       

// LISTA COM OS ANOS QUE VÃO PASSAR DURANTE A SIMULAÇÃO (A CADA PERGUNTA, O ANO MUDA)
const lista_anos = [2025, 2027, 2029, 2031, 2033, 2035, 2037, 2039, 2041, 2043, 2045, 2047, 2048, 2049, 2050];

// BANCO DE DADOS DO JOGO: AQUI FICAM TODAS AS PERGUNTAS, O TEXTO DAS OPÇÕES E OS PONTOS QUE CADA ESCOLHA DÁ OU TIRA (D=DINHEIRO, S=SUSTENTABILIDADE, A=ÁGUA, P=PRODUÇÃO)
const perguntas_jogo = [
{
texto:"Você recebeu R$1.000.000 de crédito rural. Como você quer investir?",
op:[
{text:"Comprar mais terras e expandir a plantação", d:-1000000, s:+5, a:-10, p:+3000},
{text:"Investir na agricultura de precisão", d:-500000, s:+10, a:+15, p:+1500}
]
},

{
texto:"Um período de seca se aproxima. O que fazer?",
op:[
{text:"Construir um reservatório para armazenar e proteger a plantação", d:-300000, s:+15, a:+30, p:+2000},
{text:"Esperar pelas chuvas", d:0, s:-15, a:-25, p:-2500}
]
},

{
texto:"Um incêndio começou próximo da plantação.",
op:[
{text:"Pagar R$10.000 para contê-lo", d:-10000, s:+10, a:0, p:-500},
{text:"Deixar queimar", d:0, s:-40, a:-15, p:-3000}
]
},

{
texto:"Há uma área de floresta em sua propriedade que está lhe ocupando espaço.",
op:[
{text:"Remover somente o necessário para a nova contrução", d:-500000, s:+5, a:+5, p:+1000},
{text:"Desmatar a toda para ter mais espaço para algo inovador", d:+1200000, s:-45, a:-25, p:+5000}
]
},

{
texto:"Uma empresa te oferece energia solar em troca de uma parcela do seu terreno.",
op:[
{text:"Aceitar e instalar painéis", d:-100000, s:+30, a:+10, p:-1000},
{text:"Recusar a proposta", d:0, s:-10, a:0, p:0}
]
},

{
texto:"Uma infestação de pragas atacou a lavoura.",
op:[
{text:"Constatar o controle biológico", d:-300000, s:+20, a:+10, p:+2500},
{text:"Uso excessivo de químicos para acabar com as pragas", d:-100000, s:-30, a:-20, p:-1500}
]
},

{
texto:" Uma rede de supermercados quer comprar e vender seus produtos, desde que sejam certificados.",
op:[
{text:"Adequar a fazenda às exigências do comprador", d:+8000000, s:+25, a:-50, p:-5000},
{text:"Recusar a oferta", d:0, s:-10, a:0, p:0}
]
},

{
texto:"Uma nascente foi encontrada na sua propriedade.",
op:[
{text:"Proteger a nascente somente em prol da sustentabilidade", d:-300000, s:+60, a:+70, p:+2000},
{text:"Vender esse terreno para o governo contruir novas estradas e acabar com a nascente", d:+3000000, s:-70, a:-80, p:-4000}
]
},

{
texto:"Você possui crédito de carbono disponível.",
op:[
{text:"Resgatar mas perder R$5.000.000", d:-2000000, s:+25, a:+15, p:0},
{text:"Ignorar", d:0, s:-15, a:0, p:0}
]
},

{
texto:"Tecnologia de monitoramento por drones é a última tendência. Deseja adquirir?",
op:[
{text:"Investir", d:-1500000, s:+15, a:+10, p:+4000},
{text:"Não investir", d:0, s:-10, a:-10, p:0}
]
},

{
texto:"Uma onda de chuva extrema atingiu a região.",
op:[
{text:"Investir em drenagem", d:-2000000, s:+10, a:+20, p:+5000},
{text:"Não fazer nada", d:0, s:-30, a:-25, p:-4000}
]
},

{
texto:"Uma universidade oferece parceria tecnológica.",
op:[
{text:"Aceitar", d:-50000, s:+20, a:+10, p:+3000},
{text:"Recusar", d:0, s:0, a:0, p:0}
]
},

{
texto:"Pesquisas apontam que o plantio direto reduz a erosão.",
op:[
{text:"Implementar", d:-800000, s:+25, a:+15, p:+4000},
{text:"Continuar sistema antigo", d:+300000, s:-20, a:-10, p:0}
]
},

{
texto:"Você recebe uma proposta de exportação para outro país.",
op:[
{text:"Cumprir exigências ambientais e aceitar", d:+12000000, s:+35, a:+20, p:-8000},
{text:"Não exportar", d:0, s:-10, a:0, p:0}
]
},

{
texto:"O ano de 2050 chegou. Uma auditoria deve avaliar sua fazenda.",
op:[
{text:"Receber avaliação", d:0, s:0, a:0, p:0}
]
}

];

// FUNÇÃO QUE LIGA E DESLIGA O MODO ESCURO ADICIONANDO UMA CLASSE NO BODY E MUDANDO O TEXTO DO BOTÃO LÁ NO TOPO
function toggleModoEscuro() {
    document.body.classList.toggle("dark-theme");
    let btn = document.getElementById("btn_modo_escuro");
    
    if(document.body.classList.contains("dark-theme")) {
        btn.innerText = "☀️ Modo Claro";
    } else {
        btn.innerText = "🌙 Modo Escuro";
    }
}
    
// FUNÇÃO QUE DÁ O START NO JOGO: TIRA O DISPLAY NONE DA CAIXA, ATUALIZA OS PONTOS NA TELA E PUXA A PRIMEIRA PERGUNTA
function comecarJogo() {
    document.getElementById("caixa_jogo").style.display = "block";
    recarregarPainel();          
    mostrarProximaPergunta();   
}

// FUNÇÃO QUE MUDA A COR DA BARRINHA DE ACORDO COM A PONTUAÇÃO (VERDE CLARO SE TIVER BEM, VERDE ESCURO SE TIVER MAL)
function atualizarCorBarra(elemento, valor) {
    if (valor >= 60) {
        elemento.style.background = "linear-gradient(90deg, #388e3c, #66bb6a)";
    } else if (valor >= 30) {
        elemento.style.background = "linear-gradient(90deg, #7cb342, #9ccc65)";
    } else {
        elemento.style.background = "linear-gradient(90deg, #33691e, #558b2f)";
    }
}

// FUNÇÃO QUE PEGA OS NÚMEROS DAS VARIÁVEIS LÁ EM CIMA E ESCREVE NA TELA (NO HTML) PARA O JOGADOR VER EM TEMPO REAL
function recarregarPainel() {
    document.getElementById("txt_grana").innerText = grana.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    document.getElementById("txt_agua").textContent = qtd_agua + "%";
    document.getElementById("txt_sustenta").textContent = sustenta + "%";
    document.getElementById("txt_prod").innerText = qtd_prod.toLocaleString("pt-BR");

    let barraSus = document.getElementById("barra_sus");
    let barraAgua = document.getElementById("barra_agua");
    let barraProd = document.getElementById("barra_prod");

    barraSus.style.width = sustenta + "%";
    barraAgua.style.width = qtd_agua + "%";
    
    let limite_prod = qtd_prod / 1000;
    if(limite_prod > 100) limite_prod = 100; 
    if(limite_prod < 0) limite_prod = 0;      
    barraProd.style.width = limite_prod + "%";

    atualizarCorBarra(barraSus, sustenta);
    atualizarCorBarra(barraAgua, qtd_agua);
    atualizarCorBarra(barraProd, limite_prod);
}

// FUNÇÃO DE SORTE/AZAR: SORTEIA UM NÚMERO DE 0 A 4 E GERA UM EVENTO ALEATÓRIO (COMO CHUVA OU MULTA) QUE AFETA OS PONTOS
function rolarEventoAleatorio() {
    let dado = Math.floor(Math.random() * 5); 
    let msg = "";

    if (dado === 0) {
        msg = "🌧️ Chuvas na medida certa favoreceram a produção!";
        qtd_prod += 10;
        grana += 100000;
    } else if (dado === 1) {
        msg = "☀️ Clima estável favoreceu a lavoura nesta rodada.";
        qtd_prod += 5000;
        grana += 50000;
    } else if (dado === 2) {
        msg = "📈 O mercado está ótimo! Alta no preço dos grãos.";
        grana += 150000;
    } else if (dado === 3) {
        msg = "🐝 Polinizadores aumentaram a biodiversidade e a produtividade.";
        sustenta += 10;
    } else if (dado === 4) {
        msg = "⚠️ Fiscalização ambiental na região!";
        if (sustenta < 40) {
            msg += " Você foi multado por falta de práticas ecológicas!";
            grana -= 500000;
        } else {
            msg += " Tudo certo por aqui, parabéns pela gestão!";
        }
    }

    if (sustenta > 100) sustenta = 100;
    if (sustenta < 0) sustenta = 0;
    if (qtd_agua > 100) qtd_agua = 100;
    if (qtd_agua < 0) qtd_agua = 0;

    document.getElementById("alerta_evento").innerHTML = msg;
    recarregarPainel(); 
}

// FUNÇÃO QUE VIGIA O DINHEIRO: SE FICAR NEGATIVO EM QUALQUER RODADA, ESCONDE O JOGO, MOSTRA A TELA DE FALÊNCIA E ENCERRA A SIMULAÇÃO
function checarFalencia() {
    if (grana < 0) {
        document.getElementById("texto_pergunta").style.display = "none";
        document.getElementById("caixa_opcoes").style.display = "none";
        document.getElementById("alerta_evento").style.display = "none";
        
        document.getElementById("tela_falencia").style.display = "block";
        return true; 
    }
    return false; 
}

// O CORAÇÃO DO JOGO: PEGA A PRÓXIMA PERGUNTA DO BANCO DE DADOS, MOSTRA NA TELA, CRIA OS BOTÕES DE OPÇÃO E CALCULA OS PONTOS QUANDO O JOGADOR CLICA
function mostrarProximaPergunta() {
    if (num_fase >= perguntas_jogo.length) {
        encerrarSimulacao();
        return;
    }

    document.getElementById("txt_ano").innerText = "📅 Ano: " + lista_anos[num_fase];
    
    rolarEventoAleatorio(); 

    if (checarFalencia()) return;

    let dados_pergunta = perguntas_jogo[num_fase];
    
    document.getElementById("texto_pergunta").innerText = dados_pergunta.texto; 

    let div_opcoes = document.getElementById("caixa_opcoes");
    div_opcoes.innerHTML = "";

    dados_pergunta.op.forEach(item => {
        let botao = document.createElement("div"); 
        botao.classList.add("opcao");             
        botao.innerText = item.text;                

        botao.onclick = function() {
            grana += item.d; 
            sustenta += item.s;
            qtd_agua += item.a;
            qtd_prod += item.p;

            if (sustenta > 100) sustenta = 100;
            if (sustenta < 0) sustenta = 0;
            if (qtd_agua > 100) qtd_agua = 100;
            if (qtd_agua < 0) qtd_agua = 0;

            recarregarPainel(); 

            if (checarFalencia()) return;

            setTimeout(function() {
                num_fase++;                
                mostrarProximaPergunta();  
            }, 300);
        };

        div_opcoes.appendChild(botao);
    });
}

// FUNÇÃO FINAL: QUANDO O ANO CHEGA A 2050 (FIM DO ARRAY), ELA AVALIA AS VARIÁVEIS E ENTREGA UM FINAL E UMA MENSAGEM DIFERENTE BASEADA NO DESEMPENHO
function encerrarSimulacao() {
    let mensagem_final = "";

    if (sustenta <= 30 && qtd_agua <= 30 && qtd_prod <= 40000) {
        mensagem_final = "<h2 style='color: #2e7d32; border: none;'>Agro em Colapso</h2><p><strong>O fracasso da simulação.</strong> Sustentabilidade baixa, água baixa, produção baixa. O sistema não se sustentou ao longo do tempo.</p>";
    } 
    else if (qtd_agua <= 35) {
        mensagem_final = "<h2 style='color: #43a047; border: none;'>Agro em Estresse Hídrico</h2><p><strong>O alerta.</strong> Água muito baixa e produção instável. A falta de gestão de recursos hídricos comprometeu tudo.</p>";
    } 
    else if (sustenta >= 80 && grana <= 5000000) {
        mensagem_final = "<h2 style='color: #388e3c; border: none;'>Agro Conservador Ambiental</h2><p><strong>O protetor.</strong> Sustentabilidade muito alta, mas com baixa expansão econômica. Você protegeu o meio ambiente, mas cresceu pouco.</p>";
    } 
    else if (grana >= 8000000 && sustenta < 50) {
        mensagem_final = "<h2 style='color: #66bb6a; border: none;'>Agro Expansivo</h2><p><strong>Crescimento acima de tudo.</strong> Você acumulou muito dinheiro, mas a sustentabilidade ficou baixa. Cresceu rápido, mas com um alto custo ambiental.</p>";
    } 
    else if (qtd_prod >= 60000 && qtd_agua >= 50 && sustenta >= 40 && sustenta < 70) {
        mensagem_final = "<h2 style='color: #1b5e20; border: none;'>Agro Tecnológico</h2><p><strong>O inovador.</strong> Alta produção, boa reserva de água e sustentabilidade média/boa. Você usou a tecnologia para compensar os impactos ambientais.</p>";
    } 
    else if (sustenta >= 70 && qtd_agua >= 60 && qtd_prod >= 50000 && grana >= 5000000) {
        mensagem_final = "<h2 style='color: #0a331a; border: none;'>Agro Sustentável de Referência</h2><p><strong>O ideal do jogo.</strong> Alta sustentabilidade, água preservada, boa produção e lucro saudável. Você construiu um modelo de agro equilibrado e duradouro!</p>";
    } 
    else {
        mensagem_final = "<h2 style='color: #4caf50; border: none;'>Agro Equilibrado</h2><p><strong>O seguro.</strong> Tudo em níveis médios. Você não arriscou demais, mas também não se destacou.</p>";
    }

    document.getElementById("texto_pergunta").style.display = "none";
    document.getElementById("caixa_opcoes").style.display = "none";
    document.getElementById("alerta_evento").style.display = "none";

    let fim = document.getElementById("fim_jogo");
    fim.style.display = "block";
    
    fim.innerHTML = mensagem_final + "<hr style='margin:20px 0; border:0; border-top:2px solid #81c784;'>" +
        "<p style='margin:10px 0; font-size: 1.2rem;'><b>💰 Saldo Final:</b> " + grana.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) + "</p>" +
        "<p style='margin:10px 0; font-size: 1.2rem;'><b>🌱 Sustentabilidade:</b> " + sustenta + "%</p>" +
        "<p style='margin:10px 0; font-size: 1.2rem;'><b>💧 Nível de Água:</b> " + qtd_agua + "%</p>" +
        "<p style='margin:10px 0; font-size: 1.2rem;'><b>🚜 Volume de Produção:</b> " + qtd_prod.toLocaleString("pt-BR") + "</p>" +
        "<h3 style='margin-top:20px; text-align: center; border: none;'>Missão Concluída: Ano 2050</h3>";
}

