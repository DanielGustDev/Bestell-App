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
            <button>Add to basket</button>
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
