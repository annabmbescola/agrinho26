# 🌾 Simulador Agrônomo: Qual será o seu perfil no agro?

**Projeto desenvolvido para o Concurso Agrinho 2026**
**Autoria:** Anna B. M.

---

## 🎯 Objetivo do Projeto
O **Simulador Agrônomo** é uma aplicação interativa (jogo de escolhas) que coloca o usuário na pele de um gestor rural. O grande objetivo é mostrar, de forma prática e lúdica, que as decisões tomadas no campo têm impactos diretos no meio ambiente, na disponibilidade hídrica e na sustentabilidade do negócio a longo prazo. A meta do jogador é sobreviver no mercado até o ano de 2050, gerenciando o caixa financeiro e os recursos naturais sem levar a fazenda à falência ou ao colapso ambiental.

## 📖 Justificativa e Alinhamento com o Tema
**Tema Agrinho:** *"Agro forte, futuro sustentável: equilíbrio entre produção e meio ambiente"*

O projeto responde diretamente ao tema provando que a dicotomia entre "produzir" e "preservar" é uma ilusão. O agro só se mantém forte se o futuro for sustentável. No simulador, escolhas que visam apenas o lucro imediato (como desmatamento irresponsável ou uso excessivo de químicos) geram consequências severas a médio prazo, como secas e multas ambientais. Por outro lado, o investimento em tecnologia e conservação prova ser o modelo mais seguro para garantir a produção contínua, conectando a demanda da cidade com a responsabilidade do campo.

## 💻 Tecnologias Utilizadas
* **HTML5:** Estruturação semântica do conteúdo (`<header>`, `<nav>`, `<section>`, `<button>`).
* **CSS3:** Identidade visual autoral, variáveis de layout moderno (`display: grid`), animações de keyframes (gradiente contínuo no cabeçalho), transições suaves e responsividade (Media Queries).
* **JavaScript (Vanilla):** Lógica principal do simulador, manipulação dinâmica do DOM (atualização de barras de progresso, renderização de perguntas e eventos aleatórios) e controle de estado das variáveis do jogo (Dinheiro, Sustentabilidade, Água, Produção).

## ⚙️ Detalhes da Implementação
O coração do projeto é a manipulação do DOM em conjunto com a lógica de programação:
* **Banco de Dados Local:** As perguntas e suas consequências (pesos matemáticos em cada variável) estão estruturadas em um *Array de Objetos* no JavaScript.
* **Sistema de Status:** Barras dinâmicas que alteram sua cor (verde vivo, oliva, ou musgo) dependendo da saúde do recurso, utilizando estruturas condicionais (`if/else`).
* **Eventos Aleatórios:** Implementação da função `Math.random()` para simular as intempéries climáticas e flutuações de mercado a cada rodada, exigindo adaptação do jogador.
* **Múltiplos Finais:** O jogo avalia a combinação exata do status final do jogador em 2050 para entregar um diagnóstico personalizado (ex: *Agro Tecnológico*, *Agro em Colapso*, etc.).

## 📁 Estrutura do Projeto
```text
/
├── index.html       # Estrutura principal e textos do projeto
├── README.md        # Documentação e justificativa do projeto
