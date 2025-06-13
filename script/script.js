function calcular(event) {
  event.preventDefault();

  const largura = parseFloat(document.getElementById("largura").value);
  const comprimento = parseFloat(document.getElementById("comprimento").value);
  if (isNaN(largura) || isNaN(comprimento)) {
    return alert("Preencha todos os campos!");
  }
  if (largura <= 0 || comprimento <= 0) {
    return alert("Informe valores positivos para as dimensões.");
  }

  const area = largura * comprimento;
  const preco = area * 50;

  const qtdVigas = Math.ceil(largura / 0.5);
  const qtdIsopores = Math.ceil(comprimento / 0.6);

  const resumo = `
    Área total: ${area.toFixed(2)} m²<br>
    Vigas necessárias: ${qtdVigas}<br>
    Isopores necessários: ${qtdIsopores}<br>
    Preço total: R$ ${preco.toFixed(2)}
  `;

  document.getElementById("result").innerHTML = resumo;
  document.getElementById("relatorio").style.display = "block";

  window.relatorioData = {
    area: area.toFixed(2),
    vigas: qtdVigas,
    isopores: qtdIsopores,
    preco: preco.toFixed(2),
    largura,
    comprimento
  };
}

async function gerarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const hoje = new Date();
  const data = hoje.toLocaleDateString();

  const r = window.relatorioData;

  doc.setFontSize(12);
  doc.text("FORTE LAJES - RELATÓRIO DE VENDA", 20, 20);
  doc.text("Data de Emissão: " + data, 20, 30);
  doc.text("Cliente: Fulano da Silva", 20, 40);
  doc.text("Empresa: Forte Lajes", 20, 50);
  doc.text("CNPJ: 22.554.550-0001/95", 20, 60);
  doc.text("Inscrição Estadual: 51984986516", 20, 70);
  doc.text("Endereço: Est. Comandante Luiz Souto 462 - Tanque, RJ, CEP: 22733040", 20, 80);

  doc.text("------ DETALHES ------", 20, 95);
  doc.text(`Largura da laje: ${r.largura} m`, 20, 105);
  doc.text(`Comprimento: ${r.comprimento} m`, 20, 115);
  doc.text(`Área total: ${r.area} m²`, 20, 125);
  doc.text(`Quantidade de Vigas: ${r.vigas}`, 20, 135);
  doc.text(`Quantidade de Isopores: ${r.isopores}`, 20, 145);
  doc.text(`Preço Total: R$ ${r.preco}`, 20, 155);

  doc.save("relatorio_forte_lajes.pdf");
}

function enviarEmail() {
  const email = document.getElementById("email").value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Digite um e-mail válido.");
    return;
  }

  document.getElementById("statusEnvio").innerText = "Enviado com sucesso!";
}
