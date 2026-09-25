/* global products */

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {number} price
 * @property {string} image
 * @property {string} [category]
 */

/**
 * @typedef {Object} BasketItem
 * @property {string} id
 * @property {string} name
 * @property {number} price
 * @property {number} amount
 * @property {string} [category]
 * @property {string} [description]
 * @property {string} [image]
 */

/**
 * @type {BasketItem[]}
 * Application basket state loaded from LocalStorage.
 */
let basket = loadBasketFromLocalStorage();

/**
 * Saves the current basket state to LocalStorage and updates the basket badge.
 */
function saveBasketToLocalStorage() {
  localStorage.setItem("basket", JSON.stringify(basket));
  updateBasketBadge();
}

/**
 * Loads the stored basket array from LocalStorage.
 * @returns {BasketItem[]} Parsed array of basket items.
 */
function loadBasketFromLocalStorage() {
  const savedBasket = localStorage.getItem("basket");
  if (!savedBasket) return [];
  try {
    return JSON.parse(savedBasket) || [];
  } catch (error) {
    console.error("Failed to parse basket from LocalStorage:", error);
    return [];
  }
}

/**
 * Initializes the application state, renders initial views, and sets up event listeners.
 */
function init() {
  renderCategories();
  renderBasket();
  setupPopoverListener();
  updateBasketBadge();
}

/**
 * Attaches a listener to the mobile basket popover to trigger a re-render prior to opening.
 */
function setupPopoverListener() {
  const mobilePopover = document.getElementById("mobile-basket-popover");
  if (mobilePopover) {
    mobilePopover.addEventListener("beforetoggle", (event) => {
      if (event.newState === "open") {
        renderBasket();
      }
    });
  }
}

/**
 * Renders category navigation links and category sections in the DOM.
 */
function renderCategories() {
  const container = document.getElementById("category");
  const navigationContainer = document.querySelector(".category-navigation");
  const categories = ["games", "consoles", "periphery"];

  if (navigationContainer) {
    navigationContainer.innerHTML = categories
      .map(getCategoryNavLinkTemplate)
      .join("");
  }
  if (container) {
    container.innerHTML = categories.map(createCategoryHtml).join("");
  }
}

/**
 * Creates HTML markup for a given product category section.
 * @param {string} category - The category key.
 * @returns {string} Combined HTML string for the category header and section.
 */
function createCategoryHtml(category) {
  const filteredProducts = filterProductsByCategory(products, category);
  const productsHtml = createProductListHtml(filteredProducts);
  const title = category ? category.toUpperCase() : "";

  return getCategorySectionTemplate(title, productsHtml);
}

/**
 * Filters a product list by category.
 * @param {Product[]} productList - The array of product objects.
 * @param {string} category - The category string to match.
 * @returns {Product[]} List of matching product objects.
 */
function filterProductsByCategory(productList, category) {
  if (!Array.isArray(productList)) return [];
  return productList.filter(
    (product) => product && product.category === category,
  );
}

/**
 * Generates an HTML string for an array of products.
 * @param {Product[]} productList - List of product items.
 * @returns {string} Concatenated HTML string of single product templates.
 */
function createProductListHtml(productList) {
  if (!Array.isArray(productList)) return "";
  return productList.map(getSingleProductTemplate).join("");
}

/**
 * Calculates subtotal, fixed shipping, and grand total prices for the current basket.
 * @returns {{subtotal: number, shipping: number, total: number}} Total values.
 */
function calculateBasketTotals() {
  const subtotal = basket.reduce(
    (sum, item) => sum + (item.price || 0) * (item.amount || 0),
    0,
  );
  const shipping = 9.9;
  return { subtotal, shipping, total: subtotal + shipping };
}

/**
 * Generates the structural HTML content for the basket depending on whether it is empty or populated.
 * @returns {string} Formatted basket HTML markup.
 */
function generateBasketContentHtml() {
  if (basket.length === 0) return getEmptyBasketTemplate();
  const { subtotal, shipping, total } = calculateBasketTotals();
  const itemsHtml = basket.map(getBasketItemTemplate).join("");
  const summaryHtml = getBasketSummaryTemplate(subtotal, shipping, total);
  return getFilledBasketTemplate(itemsHtml, summaryHtml);
}

/**
 * Replaces the inner HTML of a DOM element identified by its ID.
 * @param {string} elementId - Target DOM element identifier.
 * @param {string} htmlContent - HTML markup to insert.
 */
function updateContainerContent(elementId, htmlContent) {
  const element = document.getElementById(elementId);
  if (element) element.innerHTML = htmlContent;
}

/**
 * Renders basket views for both desktop and mobile containers.
 */
function renderBasket() {
  const contentHtml = generateBasketContentHtml();
  updateContainerContent("basket", contentHtml);
  updateContainerContent("mobile-basket-container", contentHtml);
}

/**
 * Updates the text content of all DOM elements matching a CSS selector.
 * @param {string} selectorText - CSS selector to match elements.
 * @param {string} textContent - New text content to apply.
 */
function updateElementText(selectorText, textContent) {
  const elements = document.querySelectorAll(selectorText);
  elements.forEach((element) => {
    if (element) element.textContent = textContent;
  });
}

/**
 * Recalculates totals and updates subtotal and grand total price labels across the UI.
 */
function updateSummaryUI() {
  const { subtotal, total } = calculateBasketTotals();
  updateElementText(".subtotal-val", `${formatPrice(subtotal)} €`);
  updateElementText(".total-val", `${formatPrice(total)} €`);
  updateElementText(".buy-now-button", `Buy Now (${formatPrice(total)} €)`);
}

/**
 * Determines whether to display a decrease or delete button based on current quantity.
 * @param {number} amount - Item count.
 * @param {string} productId - Product identifier.
 * @returns {string} HTML button string.
 */
function getActionButtonTemplate(amount, productId) {
  const deleteButton = `<button type="button" aria-label="Remove item" onclick="deleteBasketItem('${productId}')">${getTrashIconSvg()}</button>`;
  const decreaseButton = `<button type="button" aria-label="Decrease quantity" onclick="decreaseAmount('${productId}')">-</button>`;
  return amount > 1 ? decreaseButton : deleteButton;
}

/**
 * Updates text content for title and amount display elements.
 * @param {Element} itemElement - Target DOM container node.
 * @param {number} amount - Current product item amount.
 */
function updateItemAmountDOM(itemElement, amount) {
  const titleAmountEl = itemElement.querySelector(".item-title-amount");
  if (titleAmountEl) titleAmountEl.textContent = String(amount);

  const amountDisplayEl = itemElement.querySelector(".item-amount-display");
  if (amountDisplayEl) amountDisplayEl.textContent = String(amount);
}

/**
 * Updates the price display element for a basket item.
 * @param {Element} itemElement - Target DOM container node.
 * @param {number} price - Single item price.
 * @param {number} amount - Current product item amount.
 */
function updateItemPriceDOM(itemElement, price, amount) {
  const priceEl = itemElement.querySelector(".basket-item-price p");
  if (priceEl) {
    priceEl.textContent = `${formatPrice((price || 0) * (amount || 0))} €`;
  }
}

/**
 * Updates the action button container template (decrease or delete).
 * @param {Element} itemElement - Target DOM container node.
 * @param {number} amount - Current product item amount.
 * @param {string} id - Product identifier.
 */
function updateItemActionButtonDOM(itemElement, amount, id) {
  const container = itemElement.querySelector(".action-button-container");
  if (container) {
    container.innerHTML = getActionButtonTemplate(amount, id);
  }
}

/**
 * Updates all domestic values for a specific rendered basket item.
 * @param {Element} itemElement - Target DOM container node for the product.
 * @param {BasketItem} item - Product item data object.
 */
function updateItemDOMValues(itemElement, item) {
  if (!itemElement || !item) return;
  updateItemAmountDOM(itemElement, item.amount);
  updateItemPriceDOM(itemElement, item.price, item.amount);
  updateItemActionButtonDOM(itemElement, item.amount, item.id);
  const topDeleteContainer = itemElement.querySelector(".top-delete-container");
  if (topDeleteContainer) {
    topDeleteContainer.innerHTML =
      item.amount > 1
        ? `<button type="button" class="delete-item-btn" aria-label="Remove item" onclick="deleteBasketItem('${item.id}')">${getTrashIconSvg()}</button>`
        : "";
  }
}

/**
 * Finds all DOM nodes corresponding to a product ID and refreshes their rendered values.
 * @param {string} productId - Product identifier.
 */
function updateSingleItemDOM(productId) {
  const item = basket.find((item) => item.id === productId);
  if (!item) return;
  const itemElements = document.querySelectorAll(
    `[data-product-id="${productId}"]`,
  );
  itemElements.forEach((element) => updateItemDOMValues(element, item));
}

/**
 * Updates UI values for an individual product item and refreshes the overall order summary.
 * @param {string} productId - Product identifier.
 */
function updateBasketItemUI(productId) {
  updateSingleItemDOM(productId);
  updateSummaryUI();
}

/**
 * Adds a product to the basket or increments its quantity if already present.
 * @param {string} productId - Identifier of the product to add.
 */
function addToBasket(productId) {
  const basketItem = basket.find((item) => item.id === productId);

  if (basketItem) {
    basketItem.amount++;
    updateBasketItemUI(productId);
  } else {
    handleNewBasketItem(productId);
  }

  saveBasketToLocalStorage();
}

/**
 * Handles adding a completely new product to the basket state and DOM.
 * @param {string} productId - Identifier of the product.
 */
function handleNewBasketItem(productId) {
  if (typeof products === "undefined" || !Array.isArray(products)) return;
  const product = products.find((product) => product.id === productId);
  if (!product) return;
  const newItem = { ...product, amount: 1 };
  basket.push(newItem);
  if (basket.length === 1) {
    renderBasket();
  } else {
    appendItemToBasketDOM(newItem);
  }
}

/**
 * Appends a new item HTML string into the #basket-items-list container and updates totals.
 * @param {BasketItem} newItem - Basket item object to append.
 */
function appendItemToBasketDOM(newItem) {
  const itemHtml = getBasketItemTemplate(newItem);
  ["basket", "mobile-basket-container"].forEach((containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    const itemsList = container.querySelector("#basket-items-list");
    if (itemsList) {
      itemsList.insertAdjacentHTML("beforeend", itemHtml);
    }
  });
  updateSummaryUI();
}

/**
 * Modifies the quantity of a product in the basket by a given changed value.
 * @param {string} productId - Product identifier.
 * @param {number} change - Amount to add or subtract (e.g. +1 or -1).
 */
function updateAmount(productId, change) {
  const item = basket.find((item) => item.id === productId);
  if (item && item.amount + change > 0) {
    item.amount += change;
    updateBasketItemUI(productId);
    saveBasketToLocalStorage();
  }
}

/**
 * Increments a product's item amount by 1.
 * @param {string} productId - Product identifier.
 */
const increaseAmount = (productId) => updateAmount(productId, 1);

/**
 * Decrements a product's item amount by 1.
 * @param {string} productId - Product identifier.
 */
const decreaseAmount = (productId) => updateAmount(productId, -1);

/**
 * Removes a product completely from the basket array.
 * @param {string} productId - Product identifier.
 */
function deleteBasketItem(productId) {
  basket = basket.filter((item) => item.id !== productId);
  if (basket.length === 0) {
    renderBasket(); // Lädt das leere Template
  } else {
    // Entfernt nur die betroffenen DOM-Elemente dieses Produkts
    const itemElements = document.querySelectorAll(
      `[data-product-id="${productId}"]`,
    );
    itemElements.forEach((el) => el.remove());
    updateSummaryUI();
  }
  saveBasketToLocalStorage();
}

/**
 * Hides a popover element if it is currently present and supports Popover API.
 * @param {string} modalId - ID of the popover DOM element.
 */
function hidePopoverIfOpen(modalId) {
  const modalElement = document.getElementById(modalId);
  if (modalElement && typeof modalElement.hidePopover === "function") {
    modalElement.hidePopover();
  }
}

/**
 * Processes checkout, clears the basket, shows the checkout modal, and automatically closes it after a delay.
 */
function checkout() {
  if (basket.length === 0) return;
  basket = [];
  renderBasket();
  saveBasketToLocalStorage();
  hidePopoverIfOpen("mobile-basket-popover");

  const checkoutModal = document.getElementById("checkout-modal");
  if (checkoutModal && typeof checkoutModal.showPopover === "function") {
    checkoutModal.showPopover();
    setTimeout(() => {
      if (typeof checkoutModal.hidePopover === "function") {
        checkoutModal.hidePopover();
      }
    }, 5000);
  }
}

/**
 * Formats a numeric price into a localized currency string format (e.g., "12,50").
 * @param {number} amount - Numeric price amount.
 * @returns {string} Formatted price string.
 */
function formatPrice(amount) {
  if (typeof amount !== "number" || isNaN(amount)) return "0,00";
  return amount.toFixed(2).replace(".", ",");
}

/**
 * Recalculates total item quantities and updates or hides the mobile basket badge indicator.
 */
function updateBasketBadge() {
  const badge = document.getElementById("mobile-basket-badge");
  if (!badge) return;

  const totalCount = basket.reduce((sum, item) => sum + (item.amount || 0), 0);

  if (totalCount > 0) {
    badge.textContent = String(totalCount);
    badge.classList.remove("hidden");
  } else {
    badge.classList.add("hidden");
  }
}
