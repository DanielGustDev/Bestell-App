// @ts-nocheck

// 1. Erstellt das HTML für eine einzelne Produktkarte
function getSingleProductTemplate(product) {
  // Wandelt den Punkt in ein Komma um
  const formattedPrice = product.price.toFixed(2).replace(".", ",");

  return `
        <article class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-title">
            <h3>${product.name}</h4>
            <p>${product.description}</p>
            </div>
            <div class="price-plus-button">
            <p>${formattedPrice} €</p>
            <button onclick="addToBasket('${product.id}')">Add to basket</button>
            </div>
        </article>
    `;
}

// 2. Erstellt das HTML für eine komplette Kategorie-Sektion
function getCategorySectionTemplate(categoryTitle, productsHtml) {
  const categoryClass = categoryTitle.toLowerCase();
  return `
        <section class="category-block">
            <div class="category-header ${categoryClass}">
                <div class="category-icon"></div>
                <h2>${categoryTitle}</h2>
            </div>
            <div class="products-grid">
                ${productsHtml}
            </div>
        </section>
    `;
}

// Template für eine Zeile im Warenkorb
function getBasketItemTemplate(item) {
  const totalItemPrice = (item.price * item.amount)
    .toFixed(2)
    .replace(".", ",");

  // Bedingung: Minus-Button oder Mülleimer-Button anzeigen
  const minusOrDeleteButton =
    item.amount > 1
      ? `<button onclick="decreaseAmount('${item.id}')">-</button>`
      : `<button onclick="deleteBasketItem('${item.id}')"><svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3C0.716667 3 0.479167 2.90417 0.2875 2.7125C0.0958333 2.52083 0 2.28333 0 2C0 1.71667 0.0958333 1.47917 0.2875 1.2875C0.479167 1.09583 0.716667 1 1 1H5C5 0.716667 5.09583 0.479167 5.2875 0.2875C5.47917 0.0958333 5.71667 0 6 0H10C10.2833 0 10.5208 0.0958333 10.7125 0.2875C10.9042 0.479167 11 0.716667 11 1H15C15.2833 1 15.5208 1.09583 15.7125 1.2875C15.9042 1.47917 16 1.71667 16 2C16 2.28333 15.9042 2.52083 15.7125 2.7125C15.5208 2.90417 15.2833 3 15 3V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM13 3H3V16H13V3ZM6 14C6.28333 14 6.52083 13.9042 6.7125 13.7125C6.90417 13.5208 7 13.2833 7 13V6C7 5.71667 6.90417 5.47917 6.7125 5.2875C6.52083 5.09583 6.28333 5 6 5C5.71667 5 5.47917 5.09583 5.2875 5.2875C5.09583 5.47917 5 5.71667 5 6V13C5 13.2833 5.09583 13.5208 5.2875 13.7125C5.47917 13.9042 5.71667 14 6 14ZM10 14C10.2833 14 10.5208 13.9042 10.7125 13.7125C10.9042 13.5208 11 13.2833 11 13V6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6V13C9 13.2833 9.09583 13.5208 9.2875 13.7125C9.47917 13.9042 9.71667 14 10 14Z" fill="#8a1b4a"/>
</svg></button>`;

  return `
        <div class="basket-item">
            <p class="basket-item-title">${item.name}</p>
            <div class="basket-controls">
                ${minusOrDeleteButton}
                <p>${item.amount}</p>
                <button onclick="increaseAmount('${item.id}')">+</button>
            </div>
            <div class="basket-item-price">${totalItemPrice} €</div>
        </div>
    `;
}

// Template für die Summen & den Buy Now Button
function getBasketSummaryTemplate(subtotal, shipping, total) {
  const subtotalFormatted = subtotal.toFixed(2).replace(".", ",");
  const shippingFormatted = shipping.toFixed(2).replace(".", ",");
  const totalFormatted = total.toFixed(2).replace(".", ",");

  return `
        <div class="basket-summary">
            <div class="summary-line">
                <p>Zwischensumme:</p>
                <p>${subtotalFormatted} €</p>
            </div>
            <div class="summary-line">
                <p>Lieferkosten:</p>
                <p>${shippingFormatted} €</p>
            </div>
            <hr>
            <div class="summary-line total-line">
                <p>Gesamtsumme:</p>
                <p>${totalFormatted} €</p>
            </div>
            <button class="buy-now-btn" onclick="checkout()">Buy Now</button>
        </div>
    `;
}
