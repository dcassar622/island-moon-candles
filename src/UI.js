export class UI {
  /* Displays the products in the product area */

  displayProducts(productArray) {
    let productAreaInnerHtml = "";
    productArray.forEach(product => {
      productAreaInnerHtml += `
      <div id="product-div">
        <div class='image-div'>
         <img class='product-image' src=${product.image} alt=""/>
         <button class='add-cart-btn' id=${product.id}>Add To Cart</button>
        </div>
        <h4 id="product-title">${product.title}</h4>
        <p id=product-description">
          ${product.description}
        </p>
        <p id="product-price">${product.price}</p>
      </div>
      `;
    });
    const productDisplayArea = document.getElementById("products-area");
    productDisplayArea.innerHTML = productAreaInnerHtml;
  }

  /* sets up the user interface by adding 
      Event Listeners to Nav, Product and Cart Areas */

  setupUI(productArray, cart, database) {
    const navWrapper = document.getElementById("nav-wrapper");
    const productArea = document.getElementById("products-wrapper");
    const cartWrapper = document.getElementById("cart-wrapper");

    /* ---------- PRODUCT Area ---------- */

    productArea.addEventListener("click", event => {
      if (event.target.className === "add-cart-btn") {
        cartWrapper.className = "";
        productArray.forEach(product => {
          if (product.id === event.target.id) {
            event.target.innerHTML = "In Cart";
            event.target.disabled = true;
            product.amountInCart = 1;
            cart.addToCart(product);
            cart.displayCart();
            cart.updateTotal();
            cart.updateNavTotal();

            database.addToDatabase(product);
          }
        });
      }
    });

    /* ---------- NAV  Area ---------- */
    let cartIconClicked = false;
    let dropdownIconClicked = false;

    navWrapper.addEventListener("click", event => {
      //if user toggles the cart icon
      if (event.target.id === "cart-icon") {
        if (cartIconClicked === false) {
          cartWrapper.className = "";
          cartIconClicked = true;
        } else if (cartIconClicked === true) {
          cartWrapper.className = "hidden";
          cartIconClicked = false;
        }
      }
    });

    // if user hovers over/away from the menu bars (shows/toggles dropdown)
    let dropdownList = document.getElementById("dropdown-list");
    let dropdown = document.getElementById("dropdown");
    window.addEventListener("mouseover", event => {
      if (
        //event.target.id === "dropdown" ||
        event.target.id === "nav-bars" ||
        event.target.id === "dropdown-list"
      ) {
        dropdownList.className = "";
      }
    });

    dropdownList.addEventListener("mouseleave", event => {
      if (event.target.id === "dropdown-list") {
        dropdownList.className = "hidden";
      }
    });

    dropdown.addEventListener("mouseleave", event => {
      if (event.target.id === "dropdown") {
        dropdownList.className = "hidden";
      }
    });

    dropdownList.addEventListener("click", event => {
      dropdownList.className = "hidden";
    });

    /* ---------- CART Area ---------- */

    cartWrapper.addEventListener("click", event => {
      let chosenProduct = event.target.dataset.key;

      // if user wants to add more of the same product
      if (event.target.className === "plus-btn") {
        cart.cart.forEach(product => {
          if (product.id === chosenProduct) {
            console.log("adding to cart");
            product.amountInCart++;
            cart.displayCart();
          }
        });
      }
      //if user wants to close the cart
      else if (event.target.id === "close-cart-btn") {
        cartWrapper.className = "hidden";
      }
      // if user wants to remove the amount of a particular product
      else if (event.target.className === "minus-btn") {
        cart.cart.forEach(product => {
          if (product.id === chosenProduct && product.amountInCart > 1) {
            product.amountInCart--;
            console.log("subtracting from cart");
            cart.displayCart();
          } else if (product.id === chosenProduct && product.amountInCart < 2) {
            console.log("removing from cart");
            cart.removeFromCart(product);
            cart.displayCart();
          }
        });
      }
      // remove all items from cart
      else if (event.target.id === "clear-cart-btn") {
        cartWrapper.className = "hidden";
        cart.cart.forEach(() => {
          resetAllProductButtons(productArray);
          cart.removeAll();
          cart.displayCart();
        });
      } else if (event.target.id === "remove-item-btn") {
        /* remove single item from cart, and allows the user to 
          select it again from the products area*/
        cart.cart.forEach(product => {
          if (product.id === chosenProduct) {
            cart.removeFromCart(product);
            cart.displayCart(productArray);
          }
        });

        productArray.forEach(product => {
          if (chosenProduct === product.id) {
            let addToCartBtn = document.getElementById(product.id);
            addToCartBtn.innerHTML = "Add To Cart";
            addToCartBtn.disabled = false;
          }
        });
      }

      //update the cart total

      cart.updateTotal();
      cart.updateNavTotal();
    });
  }
}

function resetAllProductButtons(productArray) {
  productArray.forEach(product => {
    let addToCartBtn = document.getElementById(product.id);
    addToCartBtn.innerHTML = "Add To Cart";
    addToCartBtn.disabled = false;
  });
}
