const form = document.getElementById('form');

function arredondarPraCimaSeDecimal(valor) {
  return valor % 1 === 0 ? valor : Math.ceil(valor);
}

function calcular(event) {
  if (event) {
    event.preventDefault();
  }

  const largura = parseFloat(document.getElementById("largura").value);
  const comprimento = parseFloat(document.getElementById("comprimento").value);

  if (isNaN(largura) || isNaN(comprimento)) {
    document.getElementById("result").innerHTML = "Preencha os dois valores corretamente.";
    return;
  }

  const modulo = 0.43; // 0.30 isopor + 0.13 viga
  const vaoEntreVigas = Math.floor(largura / modulo);
  const qtdVigas = vaoEntreVigas + 1;
  const isoporesSemArredondar = vaoEntreVigas * comprimento;
  const qtdIsopores = arredondarPraCimaSeDecimal(isoporesSemArredondar);

  document.getElementById("result").innerHTML = `
    <p>Quantidade de vigas: ${qtdVigas}</p>
    <p>Quantidade de isopores: ${qtdIsopores}</p>
  `;
}

form.addEventListener('submit', calcular);
