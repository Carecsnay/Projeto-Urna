const qs = (el) => document.querySelector(el);
const qsa = (el) => document.querySelectorAll(el);

// Variáveis de controle de interface
let seuVotoPara = qs(".d-1-1 span");
let cargo = qs(".d-1-2 span");
let descricao = qs(".d-1-4");
let aviso = qs(".d-2");
let lateral = qs(".d-1-right");
let numeros = qs(".d-1-3");

// Variáveis de ambiente
let etapaAtual = 0;
let numero = "";
let votoBranco = false;

const iniciarEtapa = () => {
  let etapa = etapas[etapaAtual];
  let numeroHTML = "";
  numero = "";

  for (let i = 0; i < etapa.numeros; i++) {
    if (i === 0) {
      numeroHTML += `<div class="numero"><span class="pisca">-</span></div>`
    } else {
      numeroHTML += `<div class="numero"><span>-</span></div>`
    }
  }

  seuVotoPara.style.display = "none";
  cargo.innerHTML = etapa.titulo;
  descricao.innerHTML = "";
  aviso.style.display = "none";
  lateral.innerHTML = "";
  numeros.innerHTML = numeroHTML;

};
const atualizarInterface = () => {
  let etapa = etapas[etapaAtual];
  let candidato = etapa.candidatos.filter((item) => {
    if (item.numero === numero) { //numero do candidato = numero digitado
      return true;
    } else {
      return false;
    }
  })
  if (candidato.length > 0) {
    candidato = candidato[0];
    seuVotoPara.style.display = "block";
    descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;
    aviso.style.display = "block";
    let fotosHtml = '';
    for (let i in candidato.fotos) {
      fotosHtml += `<div class="d-1-image"> <img src="./images/${candidato.fotos[i].url}" alt="Candidato 01">${candidato.fotos[i].legenda}</div>`
    }
    lateral.innerHTML = fotosHtml;
  } else {
    seuVotoPara.style.display = "block";
    aviso.style.display = "block";
    descricao.innerHTML = "<div class='aviso-grande pisca'>VOTO NULO</div>";
  }
}

const clicou = (keyboard) => {
  let elNumero = qs(".numero span.pisca");
  if (elNumero !== null) {
    elNumero.innerHTML = keyboard;
    numero = `${numero}${keyboard}`

    elNumero.classList.remove("pisca");
    let proximoNumero = elNumero.parentElement.nextElementSibling;;
    if (proximoNumero !== null) {
      proximoNumero.querySelector("span").classList.add("pisca");
    } else {
      atualizarInterface();
    }
  }
};

const branco = () => {
  if (numero === '') {
    votoBranco = true;
    seuVotoPara.style.display = "block";
    aviso.style.display = "block";
    numeros.innerHTML = "";
    descricao.innerHTML = "<div class='aviso-grande pisca'>VOTO EM BRANCO</div>";
  }
};

const corrige = () => {
  iniciarEtapa();
};

const confirma = () => {
  if (votoBranco === true) {
    alert("Confirmação de voto em branco");
  } else if (numero.length === etapas[etapaAtual].numeros) {
    alert("Confirmado como: " + numero);
  }

}
iniciarEtapa();