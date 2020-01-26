export class Cart {
  constructor() {
    this.cart = [];
  }

  addToCart(product) {
    this.cart.push(product);
  }

  removeFromCart(product) {
    this.cart.forEach(productInCart => {
      if (product.id === productInCart.id) {
        this.cart.splice(productInCart, 1);
      }
    });
  }

  removeAll() {
    this.cart.length = 0;
  }

  displayCart() {
    let cartDisplayArea = document.getElementById("cart-product-area");
    cartDisplayArea.textContentinnerHTML = "";
    let htmlString = "";

    this.cart.forEach(product => {
      htmlString += `
      <div id="cart-item-div">
          <div id="cart-item-info">
            <img class="cart-product-image" src=${product.image} alt="" />
            <div id="cart-item-text">
              <h4 id="product-title">${product.title}</h4>
              <p id="product-price">${product.price}</p>
            </div>
          </div>
          <div id="cart-item-amount">
            <button class='minus-btn' data-key=${product.id}>-</button>
            <p id='cart-item-amount'>${product.amountInCart}</p>
            <button class='plus-btn' data-key=${product.id}>+</button>
          </div>
           <button id='remove-item-btn' data-key=${product.id}>remove item</button>
        </div>
      `;
    });

    htmlString += `
    </div>
      <div id="cart-total-area">
        <h3>Cart Total :</h3>
        <p id='cart-total'></p>
        <button id='clear-cart-btn'>Clear Cart</button>
      </div>`;

    cartDisplayArea.innerHTML = htmlString;
  }

  updateTotal() {
    const totalDisplay = document.getElementById("cart-total");
    const cartWrapper = document.getElementById("cart-wrapper");
    totalDisplay.innerHTML = "";
    let total = 0;

    this.cart.forEach(product => {
      total += product.price * product.amountInCart;
    });

    if (total === 0) {
      cartWrapper.className = "hidden";
    }

    totalDisplay.innerHTML = total;
  }

  updateNavTotal() {
    let navTotalArea = document.getElementById("cart-icon-amount");
    let total = 0;

    this.cart.forEach(product => {
      total += product.amountInCart;
    });

    navTotalArea.innerHTML = total;
  }
}
