// 1. Erstellt das HTML für eine einzelne Produktkarte
function getSingleProductTemplate(product) {
  // Wandelt den Punkt in ein Komma um
  const formattedPrice = product.price.toFixed(2).replace(".", ",");

  return `
        <article class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h4>${product.name}</h4>
            <p>${product.description}</p>
            <div class="price">${formattedPrice} €</div>
        </article>
    `;
}

// 2. Erstellt das HTML für eine komplette Kategorie-Sektion
function getCategorySectionTemplate(categoryTitle, productsHtml) {
  return `
        <section class="category-block category-${categoryTitle.toLowerCase()}">
            <h2>${categoryTitle}</h2>
            <div class="products-grid">
                ${productsHtml}
            </div>
        </section>
    `;
}
