// Seleciona checkboxes
const checkCategorias = document.querySelectorAll('.aside__div1 input[type="checkbox"]');
const checkPrecos = document.querySelectorAll('.aside__div2 input[type="checkbox"]');
const produtos = document.querySelectorAll('.product-card');

// Função para extrair o preço do texto (ex: "R$ 29,90" -> 29.90)
function extrairPreco(texto) {
  return parseFloat(texto.replace("R$", "").replace(",", ".").trim());
}

// Verifica se o preço de um produto está dentro das faixas selecionadas
function precoValido(precoProduto, filtrosPreco) {
  if (filtrosPreco.length === 0) return true;

  return filtrosPreco.some(filtro => {
    if (filtro === "0-25") return precoProduto >= 0 && precoProduto <= 25;
    if (filtro === "25-50") return precoProduto > 25 && precoProduto <= 50;
    if (filtro === "50-100") return precoProduto > 50 && precoProduto <= 100;
    if (filtro === "100+") return precoProduto > 100;
  });
}

// Função principal de filtragem
function filtrar() {
  const categoriasSelecionadas = Array.from(checkCategorias)
    .filter(c => c.checked)
    .map(c => c.value);

  const precosSelecionados = Array.from(checkPrecos)
    .filter(c => c.checked)
    .map(c => c.value);

  produtos.forEach(produto => {
    const categoriasProduto = produto.dataset.categoria.split(" ");
    const precoTexto = produto.querySelector("p").innerText;
    const precoProduto = extrairPreco(precoTexto);

    const categoriaOk =
      categoriasSelecionadas.length === 0 ||
      categoriasSelecionadas.some(cat => categoriasProduto.includes(cat));

    const precoOk = precoValido(precoProduto, precosSelecionados);

    if (categoriaOk && precoOk) {
      produto.style.display = "block";
    } else {
      produto.style.display = "none";
    }
  });
}

// Adiciona eventos
[...checkCategorias, ...checkPrecos].forEach(chk => {
  chk.addEventListener("change", filtrar);
});

// Roda ao carregar
filtrar();