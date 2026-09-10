// @ts-nocheck

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

// 1. Haupt-Renderfunktion für den Warenkorb
function renderBasket() {
  const basketContainer = document.getElementById("basket");
  basketContainer.innerHTML = "";

  if (basket.length === 0) {
    basketContainer.innerHTML =
      '<p class="empty-basket">Dein Warenkorb ist leer.</p>';
    return;
  }

  let itemsHtml = "";
  let subtotal = 0;

  // Warenkorb-Elemente durchlaufen
  for (let i = 0; i < basket.length; i++) {
    const item = basket[i];
    subtotal += item.price * item.amount;
    itemsHtml += getBasketItemTemplate(item);
  }

  const shipping = 9.9;
  const total = subtotal + shipping;

  // Warenkorb im HTML zusammensetzen
  basketContainer.innerHTML =
    itemsHtml + getBasketSummaryTemplate(subtotal, shipping, total);
}

// 2. Produkt zum Warenkorb hinzufügen
function addToBasket(productId) {
  // Produkt aus der Datenbank suchen
  const product = products.find((p) => p.id === productId);

  // Prüfen, ob Produkt schon im Warenkorb ist
  const basketItem = basket.find((item) => item.id === productId);

  if (basketItem) {
    basketItem.amount++;
  } else {
    // Kopie des Produkts mit Eigenschaft 'amount' im Warenkorb ablegen
    basket.push({
      id: product.id,
      name: product.name,
      price: product.price,
      amount: 1,
    });
  }

  renderBasket();
}

// 3. Anzahl erhöhen (+)
function increaseAmount(productId) {
  const basketItem = basket.find((item) => item.id === productId);
  if (basketItem) {
    basketItem.amount++;
    renderBasket();
  }
}

// 4. Anzahl verringern (-)
function decreaseAmount(productId) {
  const basketItem = basket.find((item) => item.id === productId);
  if (basketItem && basketItem.amount > 1) {
    basketItem.amount--;
    renderBasket();
  }
}

// 5. Produkt komplett löschen
function deleteBasketItem(productId) {
  basket = basket.filter((item) => item.id !== productId);
  renderBasket();
}

// 6. Checkout-Dummy
function checkout() {
  alert("Vielen Dank für deine Bestellung!");
  basket = [];
  renderBasket();
}
