// Pegando os elementos da página
const inputCidade = document.getElementById("inputCidade");
const mensagemStatus = document.getElementById("mensagemStatus");
const listaCidades = document.getElementById("listaCidades");
const resultadoPrevisao = document.getElementById("resultadoPrevisao");

// Quando o usuário pressionar Enter no campo de busca, inicia a pesquisa
inputCidade.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") {
    const nomeCidade = inputCidade.value.trim();

    if (nomeCidade === "") {
      mostrarErro("Digite o nome de uma cidade.");
      return;
    }

    buscarCidades(nomeCidade);
  }
});

// Etapa 1: buscar cidades pelo nome digitado
async function buscarCidades(nomeCidade) {
  // Limpa resultados antigos
  listaCidades.innerHTML = "";
  resultadoPrevisao.innerHTML = "";
  mostrarStatus("Buscando...");

  try {
    const resposta = await fetch(
      `https://brasilapi.com.br/api/cptec/v1/cidade/${nomeCidade}`
    );

    if (!resposta.ok) {
      throw new Error("Não foi possível encontrar essa cidade.");
    }

    const cidades = await resposta.json();

    if (cidades.length === 0) {
      mostrarErro("Nenhuma cidade encontrada com esse nome.");
      return;
    }

    limparStatus();
    exibirCidades(cidades);
  } catch (erro) {
    mostrarErro(erro.message);
  }
}

// Mostra a lista de cidades encontradas na tela
function exibirCidades(cidades) {
  cidades.forEach((cidade) => {
    const item = document.createElement("div");
    item.className = "cidade-item";
    item.textContent = `${cidade.nome} - ${cidade.estado}`;

    // Ao clicar na cidade, busca a previsão do tempo dela
    item.addEventListener("click", () => {
      buscarPrevisao(cidade.id);
    });

    listaCidades.appendChild(item);
  });
}

// Etapa 2: buscar a previsão do tempo pelo id da cidade
async function buscarPrevisao(idCidade) {
  resultadoPrevisao.innerHTML = "";
  mostrarStatus("Buscando...");

  try {
    const resposta = await fetch(
      `https://brasilapi.com.br/api/cptec/v1/clima/previsao/${idCidade}`
    );

    if (!resposta.ok) {
      throw new Error("Não foi possível obter a previsão do tempo.");
    }

    const previsao = await resposta.json();

    limparStatus();
    exibirPrevisao(previsao);
  } catch (erro) {
    mostrarErro(erro.message);
  }
}

// Mostra a previsão do tempo na tela
function exibirPrevisao(previsao) {
  const container = document.createElement("div");

  const titulo = document.createElement("h2");
  titulo.textContent = `${previsao.cidade} - ${previsao.estado}`;

  const atualizado = document.createElement("p");
  atualizado.className = "atualizado";
  atualizado.textContent = `Atualizado em: ${previsao.atualizado_em}`;

  container.appendChild(titulo);
  container.appendChild(atualizado);

  previsao.clima.forEach((dia) => {
    const linha = document.createElement("div");
    linha.className = "dia-previsao";

    linha.innerHTML = `
      <span class="data">${dia.data}</span>
      <span class="condicao">${dia.condicao_desc}</span>
      <span class="temperaturas">${dia.min}°C / ${dia.max}°C</span>
      <span class="uv">UV: ${dia.indice_uv}</span>
    `;

    container.appendChild(linha);
  });

  resultadoPrevisao.appendChild(container);
}

// Funções auxiliares para mensagens de status
function mostrarStatus(texto) {
  mensagemStatus.textContent = texto;
  mensagemStatus.classList.remove("erro");
}

function mostrarErro(texto) {
  mensagemStatus.textContent = texto;
  mensagemStatus.classList.add("erro");
}

function limparStatus() {
  mensagemStatus.textContent = "";
  mensagemStatus.classList.remove("erro");
}
