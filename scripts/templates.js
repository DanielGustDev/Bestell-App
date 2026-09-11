// @ts-nocheck

// Icon-SVGs
function getTrashIconSvg() {
  return `<svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3C0.716667 3 0.479167 2.90417 0.2875 2.7125C0.0958333 2.52083 0 2.28333 0 2C0 1.71667 0.0958333 1.47917 0.2875 1.2875C0.479167 1.09583 0.716667 1 1 1H5C5 0.716667 5.09583 0.479167 5.2875 0.2875C5.47917 0.0958333 5.71667 0 6 0H10C10.2833 0 10.5208 0.0958333 10.7125 0.2875C10.9042 0.479167 11 0.716667 11 1H15C15.2833 1 15.5208 1.09583 15.7125 1.2875C15.9042 1.47917 16 1.71667 16 2C16 2.28333 15.9042 2.52083 15.7125 2.7125C15.5208 2.90417 15.2833 3 15 3V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM13 3H3V16H13V3ZM6 14C6.28333 14 6.52083 13.9042 6.7125 13.7125C6.90417 13.5208 7 13.2833 7 13V6C7 5.71667 6.90417 5.47917 6.7125 5.2875C6.52083 5.09583 6.28333 5 6 5C5.71667 5 5.47917 5.09583 5.2875 5.2875C5.09583 5.47917 5 5.71667 5 6V13C5 13.2833 5.09583 13.5208 5.2875 13.7125C5.47917 13.9042 5.71667 14 10 14ZM10 14C10.2833 14 10.5208 13.9042 10.7125 13.7125C10.9042 13.5208 11 13.2833 11 13V6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6V13C9 13.2833 9.09583 13.5208 9.2875 13.7125C9.47917 13.9042 9.71667 14 10 14Z" fill="#8a1b4a"/>
    </svg>`;
}

function getEmptyBasketSvg() {
  return `<svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M36.0333 120C32.7302 120 29.9026 118.825 27.5505 116.475C25.1983 114.125 24.0222 111.3 24.0222 108C24.0222 104.7 25.1983 101.875 27.5505 99.525C29.9026 97.175 32.7302 96 36.0333 96C39.3363 96 42.164 97.175 44.5161 99.525C46.8683 101.875 48.0444 104.7 48.0444 108C48.0444 111.3 46.8683 114.125 44.5161 116.475C42.164 118.825 39.3363 120 36.0333 120ZM96.0888 120C92.7857 120 89.9581 118.825 87.6059 116.475C85.2538 114.125 84.0777 111.3 84.0777 108C84.0777 104.7 85.2538 101.875 87.6059 99.525C89.9581 97.175 92.7857 96 96.0888 96C99.3918 96 102.219 97.175 104.572 99.525C106.924 101.875 108.1 104.7 108.1 108C108.1 111.3 106.924 114.125 104.572 116.475C102.219 118.825 99.3918 120 96.0888 120ZM30.9286 24L45.3419 54H87.3807L103.896 24H30.9286ZM25.2233 12H113.805C116.107 12 117.859 13.025 119.06 15.075C120.261 17.125 120.311 19.2 119.21 21.3L97.8904 59.7C96.7894 61.7 95.3131 63.25 93.4613 64.35C91.6096 65.45 89.5828 66 87.3807 66H42.6394L36.0333 78H102.094C103.796 78 105.222 78.575 106.373 79.725C107.524 80.875 108.1 82.3 108.1 84C108.1 85.7 107.524 87.125 106.373 88.275C105.222 89.425 103.796 90 102.094 90H36.0333C31.5291 90 28.126 88.025 25.8239 84.075C23.5217 80.125 23.4216 76.2 25.5236 72.3L33.6311 57.6L12.0111 12H6.00555C4.30398 12 2.87766 11.425 1.7266 10.275C0.575532 9.125 0 7.7 0 6C0 4.3 0.575532 2.875 1.7266 1.725C2.87766 0.575 4.30398 0 6.00555 0H15.7646C16.8656 0 17.9166 0.3 18.9175 0.9C19.9184 1.5 20.6691 2.35 21.1696 3.45L25.2233 12Z" fill="var(--background-primary)" />
    </svg>`;
}

//price helper
function formatPrice(amount) {
  return amount.toFixed(2).replace(".", ",");
}

//product-card an categories
function getSingleProductTemplate(product) {
  return `
        <article class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-title">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
            </div>
            <div class="price-plus-button">
                <p>${formatPrice(product.price)} €</p>
                <button onclick="addToBasket('${product.id}')">Add to basket</button>
            </div>
        </article>
    `;
}

function getCategoryHeaderTemplate(categoryTitle) {
  const categoryClass = categoryTitle.toLowerCase();
  return `
    <div class="category-header-band ${categoryClass}">
      <div class="category-header-content">
        <div class="category-icon"></div>
        <h2>${categoryTitle}</h2>
      </div>
    </div>
  `;
}

function getCategorySectionTemplate(categoryTitle, productsHtml) {
  const categoryClass = categoryTitle.toLowerCase();
  return `
    <section class="category-block ${categoryClass}">
      <div class="products-grid">
        ${productsHtml}
      </div>
    </section>
  `;
}

//basket
function getEmptyBasketTemplate() {
  return `
        <div class="empty-basket-content">
            <p>Nothing here yet.<br>Go ahead and choose your next Game!</p>
            <div class="empty-basket-icon">
                ${getEmptyBasketSvg()}
            </div>
        </div>
    `;
}

function getBasketControlsTemplate(item) {
  const deleteButton = `<button onclick="deleteBasketItem('${item.id}')">${getTrashIconSvg()}</button>`;
  const decreaseButton = `<button onclick="decreaseAmount('${item.id}')">-</button>`;
  const actionButton = item.amount > 1 ? decreaseButton : deleteButton;

  return `
        <div class="amount-buttons">
            ${actionButton}
            <p>${item.amount}</p>
            <button onclick="increaseAmount('${item.id}')">+</button>
        </div>
    `;
}

function getBasketItemTemplate(item) {
  const totalItemPrice = formatPrice(item.price * item.amount);

  return `
        <div class="basket-item">
            <p class="basket-item-title">${item.amount} x ${item.name}</p>
            <div class="basket-controls">
                ${getBasketControlsTemplate(item)}
                <div class="basket-item-price">${totalItemPrice} €</div>
            </div>
        </div>
    `;
}

function getBasketSummaryTemplate(subtotal, shipping, total) {
  return `
        <div class="basket-summary">
            <div class="summary-line"><p>Subtotal:</p><p>${formatPrice(subtotal)} €</p></div>
            <div class="summary-line"><p>Delivery:</p><p>${formatPrice(shipping)} €</p></div>
            <hr>
            <div class="summary-line total-line"><p>Total:</p><p>${formatPrice(total)} €</p></div>
            <button class="buy-now-btn" onclick="checkout()">Buy Now</button>
        </div>
    `;
}

function getFilledBasketTemplate(allBasketItemsHtml, summaryHtml) {
  return `
        <div class="basket-items-list">
            ${allBasketItemsHtml}
        </div>
        ${summaryHtml}
    `;
}
