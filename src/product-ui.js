export class ProductUI {
  setupProductUI(productArray) {
    let productAreaInnerHtml = "";
    productArray.forEach(product => {
      productAreaInnerHtml += `
      <div id="product-div">
        <img class='product-image' src=${product.image} alt=""/>
        <h4 id="product-title">${product.title}</h4>
        <p id=product-description">
          ${product.description}
        </p>
        <p id="product-price">${product.description}</p>
      </div>
      `;
    });
    const productDisplayArea = document.getElementById("products-wrapper");
    productDisplayArea.innerHTML = productAreaInnerHtml;
  }
}
