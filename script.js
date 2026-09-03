// 1. HAUPTFUNKTION: Steuert nur den Gesamtablauf
function init() {
  renderCategories();
}

// 2. RENDER-FUNKTION: Ist nur für das Einfügen in das HTML zuständig
function renderCategories() {
  const container = document.getElementById("category");
  container.innerHTML = "";

  const categories = ["games", "consoles", "periphery"];

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];

    // Holt das fertige HTML für diese eine Kategorie
    const categoryHtml = createCategoryHtml(category);

    // Fügt es in den Container ein
    container.innerHTML += categoryHtml;
  }
}

// 3. LOGIK-FUNKTION 1: Baut das HTML für genau eine Kategorie zusammen
function createCategoryHtml(category) {
  const filteredProducts = filterProductsByCategory(category);
  const productsHtml = createProductListHtml(filteredProducts);
  const title = category.toUpperCase();

  return getCategorySectionTemplate(title, productsHtml);
}

// 4. LOGIK-FUNKTION 2: Filtert nur die Daten
function filterProductsByCategory(category) {
  return products.filter((product) => product.category === category);
}

// 5. LOGIK-FUNKTION 3: Wandelt ein Produkt-Array in einen HTML-String um
function createProductListHtml(productList) {
  let html = "";
  for (let i = 0; i < productList.length; i++) {
    html += getSingleProductTemplate(productList[i]);
  }
  return html;
}
