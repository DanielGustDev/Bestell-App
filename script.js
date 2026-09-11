// @ts-nocheck

// 1. HAUPTFUNKTION
function init() {
  renderCategories();
  renderBasket();
}

// 2. KATEGORIEN RENDERN
function renderCategories() {
  const container = document.getElementById("category");
  const categories = ["games", "consoles", "periphery"];

  // .map() verwandelt alle Kategorien in HTML-Strings und fügt sie performant auf einmal ein
  container.innerHTML = categories.map(createCategoryHtml).join("");
}

function createCategoryHtml(category) {
  const filteredProducts = filterProductsByCategory(category);
  const productsHtml = createProductListHtml(filteredProducts);
  const title = category.toUpperCase();

  return (
    getCategoryHeaderTemplate(title) +
    getCategorySectionTemplate(title, productsHtml)
  );
}

function filterProductsByCategory(category) {
  return products.filter((product) => product.category === category);
}

function createProductListHtml(productList) {
  return productList.map(getSingleProductTemplate).join("");
}

// 3. WARENKORB RENDERN
function renderBasket() {
  const basketContainer = document.getElementById("basket");

  if (basket.length === 0) {
    basketContainer.innerHTML = getEmptyBasketTemplate();
    return;
  }

  // .reduce() berechnet die Gesamtsumme elegant in einer Zeile
  const subtotal = basket.reduce(
    (sum, item) => sum + item.price * item.amount,
    0,
  );
  const shipping = 9.9;

  const itemsHtml = basket.map(getBasketItemTemplate).join("");
  const summaryHtml = getBasketSummaryTemplate(
    subtotal,
    shipping,
    subtotal + shipping,
  );

  basketContainer.innerHTML = getFilledBasketTemplate(itemsHtml, summaryHtml);
}

// 4. WARENKORB LOGIK
function addToBasket(productId) {
  const basketItem = basket.find((item) => item.id === productId);

  if (basketItem) {
    basketItem.amount++;
  } else {
    const product = products.find((p) => p.id === productId);
    basket.push({ ...product, amount: 1 }); // Spread-Operator kopiert Eigenschaften kompakt
  }

  renderBasket();
}

// Hilfsfunktion zum Ändern der Menge (reduziert Code-Duplizierung von + / -)
function updateAmount(productId, delta) {
  const item = basket.find((i) => i.id === productId);
  if (item && item.amount + delta > 0) {
    item.amount += delta;
    renderBasket();
  }
}

const increaseAmount = (id) => updateAmount(id, 1);
const decreaseAmount = (id) => updateAmount(id, -1);

function deleteBasketItem(productId) {
  basket = basket.filter((item) => item.id !== productId);
  renderBasket();
}

function checkout() {
  alert("Vielen Dank für deine Bestellung!");
  basket = [];
  renderBasket();
}
