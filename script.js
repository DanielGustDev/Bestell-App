let basket = loadBasketFromLocalStorage();

function saveBasketToLocalStorage() {
  localStorage.setItem("basket", JSON.stringify(basket));
  updateBasketBadge();
}

function loadBasketFromLocalStorage() {
  const savedBasket = localStorage.getItem("basket");
  return savedBasket ? JSON.parse(savedBasket) : [];
}

function init() {
  renderCategories();
  renderBasket();
  setupPopoverListener();
  updateBasketBadge();
}

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

function calculateBasketTotals() {
  const subtotal = basket.reduce(
    (sum, item) => sum + item.price * item.amount,
    0,
  );
  const shipping = 9.9;
  return { subtotal, shipping, total: subtotal + shipping };
}

function generateBasketContentHtml() {
  if (basket.length === 0) return getEmptyBasketTemplate();
  const { subtotal, shipping, total } = calculateBasketTotals();
  const itemsHtml = basket.map(getBasketItemTemplate).join("");
  const summaryHtml = getBasketSummaryTemplate(subtotal, shipping, total);
  return getFilledBasketTemplate(itemsHtml, summaryHtml);
}

function updateContainerContent(elementId, htmlContent) {
  const element = document.getElementById(elementId);
  if (element) element.innerHTML = htmlContent;
}

function renderBasket() {
  const contentHtml = generateBasketContentHtml();
  updateContainerContent("basket", contentHtml);
  updateContainerContent("mobile-basket-container", contentHtml);
}

function updateElementText(selectorText, textContent) {
  const elements = document.querySelectorAll(selectorText);
  elements.forEach((element) => {
    element.textContent = textContent;
  });
}

function updateSummaryUI() {
  const { subtotal, total } = calculateBasketTotals();
  updateElementText(".subtotal-val", `${formatPrice(subtotal)} €`);
  updateElementText(".total-val", `${formatPrice(total)} €`);
}

function getActionButtonTemplate(amount, productId) {
  const deleteButton = `<button onclick="deleteBasketItem('${productId}')">${getTrashIconSvg()}</button>`;
  const decreaseButton = `<button onclick="decreaseAmount('${productId}')">-</button>`;
  return amount > 1 ? decreaseButton : deleteButton;
}

function updateItemDOMValues(itemElement, item) {
  itemElement.querySelector(".item-title-amount").textContent = item.amount;
  itemElement.querySelector(".item-amount-display").textContent = item.amount;
  itemElement.querySelector(".basket-item-price").textContent =
    `${formatPrice(item.price * item.amount)} €`;
  const actionButtonContainer = itemElement.querySelector(
    ".action-button-container",
  );
  if (actionButtonContainer) {
    actionButtonContainer.innerHTML = getActionButtonTemplate(
      item.amount,
      item.id,
    );
  }
}

function updateSingleItemDOM(productId) {
  const item = basket.find((item) => item.id === productId);
  if (!item) return;
  const itemElements = document.querySelectorAll(
    `[data-product-id="${productId}"]`,
  );
  itemElements.forEach((element) => updateItemDOMValues(element, item));
}

function updateBasketItemUI(productId) {
  updateSingleItemDOM(productId);
  updateSummaryUI();
}

function addToBasket(productId) {
  const basketItem = basket.find((item) => item.id === productId);
  if (basketItem) {
    basketItem.amount++;
    updateBasketItemUI(productId);
  } else {
    const product = products.find((product) => product.id === productId);
    basket.push({ ...product, amount: 1 });
    renderBasket();
  }
  saveBasketToLocalStorage();
}

function updateAmount(productId, deltaValue) {
  const item = basket.find((item) => item.id === productId);
  if (item && item.amount + deltaValue > 0) {
    item.amount += deltaValue;
    updateBasketItemUI(productId);
    saveBasketToLocalStorage();
  }
}

const increaseAmount = (productId) => updateAmount(productId, 1);
const decreaseAmount = (productId) => updateAmount(productId, -1);

function deleteBasketItem(productId) {
  basket = basket.filter((item) => item.id !== productId);
  renderBasket();
  saveBasketToLocalStorage();
}

function hidePopoverIfOpen(modalId) {
  const modalElement = document.getElementById(modalId);
  if (modalElement && modalElement.hidePopover) modalElement.hidePopover();
}

function checkout() {
  if (basket.length === 0) return;
  basket = [];
  renderBasket();
  saveBasketToLocalStorage();
  hidePopoverIfOpen("mobile-basket-popover");
  const checkoutModal = document.getElementById("checkout-modal");
  if (checkoutModal) {
    checkoutModal.showPopover();
    setTimeout(() => {
      checkoutModal.hidePopover();
    }, 5000);
  }
}

function formatPrice(amount) {
  return amount.toFixed(2).replace(".", ",");
}

function updateBasketBadge() {
  const badge = document.getElementById("mobile-basket-badge");
  if (!badge) return;

  const totalCount = basket.reduce((sum, item) => sum + item.amount, 0);

  if (totalCount > 0) {
    badge.textContent = totalCount;
    badge.classList.remove("hidden");
  } else {
    badge.classList.add("hidden");
  }
}
