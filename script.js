// @ts-nocheck

// Globaler Basket (wird beim Laden direkt aus dem localStorage geholt)
let basket = loadBasketFromLocalStorage();

// 1. LOCAL STORAGE HELPER
function saveBasketToLocalStorage() {
  localStorage.setItem("basket", JSON.stringify(basket));
}

function loadBasketFromLocalStorage() {
  const savedBasket = localStorage.getItem("basket");
  return savedBasket ? JSON.parse(savedBasket) : [];
}

// 2. HAUPTFUNKTION
function init() {
  renderCategories();
  renderBasket();
}

// 3. KATEGORIEN RENDERN
function renderCategories() {
  const container = document.getElementById("category");
  const navContainer = document.querySelector(".category-navigation");
  const categories = ["games", "consoles", "periphery"];
  if (navContainer) {
    navContainer.innerHTML = categories
      .map(getCategoryNavLinkTemplate)
      .join("");
  }
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

// 4. BERECHNUNG & VOLLSTÄNDIGES RENDERN (nur bei Strukturänderungen)
function calculateBasketTotals() {
  const subtotal = basket.reduce(
    (sum, item) => sum + item.price * item.amount,
    0,
  );
  const shipping = 9.9;
  return { subtotal, shipping, total: subtotal + shipping };
}

function generateBasketContentHtml() {
  if (basket.length === 0) {
    return getEmptyBasketTemplate();
  }

  const { subtotal, shipping, total } = calculateBasketTotals();
  const itemsHtml = basket.map(getBasketItemTemplate).join("");
  const summaryHtml = getBasketSummaryTemplate(subtotal, shipping, total);

  return getFilledBasketTemplate(itemsHtml, summaryHtml);
}

function renderBasket() {
  const basketContainer = document.getElementById("basket");
  basketContainer.innerHTML = generateBasketContentHtml();
}

// 5. GEZIELTE DOM-UPDATES (Kein Re-Render / Kein Scroll-Springen)
function updateSummaryUI() {
  const { subtotal, total } = calculateBasketTotals();
  const subtotalEl = document.querySelector(".subtotal-val");
  const totalEl = document.querySelector(".total-val");

  if (subtotalEl) subtotalEl.textContent = `${formatPrice(subtotal)} €`;
  if (totalEl) totalEl.textContent = `${formatPrice(total)} €`;
}

function updateBasketItemUI(productId) {
  const item = basket.find((i) => i.id === productId);
  if (!item) return;

  const itemElement = document.querySelector(
    `[data-product-id="${productId}"]`,
  );
  if (!itemElement) return;

  // Texte direkt anpassen
  itemElement.querySelector(".item-title-amount").textContent = item.amount;
  itemElement.querySelector(".item-amount-display").textContent = item.amount;
  itemElement.querySelector(".basket-item-price").textContent =
    `${formatPrice(item.price * item.amount)} €`;

  // - Button vs. Mülleimer austauschen
  const actionContainer = itemElement.querySelector(".action-button-container");
  const deleteBtn = `<button onclick="deleteBasketItem('${item.id}')">${getTrashIconSvg()}</button>`;
  const decreaseBtn = `<button onclick="decreaseAmount('${item.id}')">-</button>`;

  actionContainer.innerHTML = item.amount > 1 ? decreaseBtn : deleteBtn;

  // Summe aktualisieren
  updateSummaryUI();
}

// 6. WARENKORB LOGIK (mit Speichern)
function addToBasket(productId) {
  const basketItem = basket.find((item) => item.id === productId);

  if (basketItem) {
    basketItem.amount++;
    updateBasketItemUI(productId);
  } else {
    const product = products.find((p) => p.id === productId);
    basket.push({ ...product, amount: 1 });
    renderBasket();
  }
  saveBasketToLocalStorage();
}

function updateAmount(productId, delta) {
  const item = basket.find((i) => i.id === productId);
  if (item && item.amount + delta > 0) {
    item.amount += delta;
    updateBasketItemUI(productId);
    saveBasketToLocalStorage();
  }
}

const increaseAmount = (id) => updateAmount(id, 1);
const decreaseAmount = (id) => updateAmount(id, -1);

function deleteBasketItem(productId) {
  basket = basket.filter((item) => item.id !== productId);
  renderBasket();
  saveBasketToLocalStorage();
}

function checkout() {
  if (basket.length === 0) return;

  basket = [];
  renderBasket();
  saveBasketToLocalStorage();

  // Öffnet das Popover nativ
  const modal = document.getElementById("checkout-modal");
  if (modal) {
    modal.showPopover();
  }
}
