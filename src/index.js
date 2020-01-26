import { ProductDataManager } from "./product-data-manager.js";
import { UI } from "./UI.js";
import { Cart } from "./cart.js";

document.addEventListener("DOMContentLoaded", () => {
  setupSite();
});

function setupSite() {
  // get product data from "Contentful" database
  const contentfulData = contentful.createClient({
    space: "h7vpyobbk8cw",
    accessToken: "zBwKjd4L6gVGJ-i4naXSU9YqOG5EEma86CDHmuArRak"
  });

  const productDataManager = new ProductDataManager(contentfulData);
  const ui = new UI();
  const cart = new Cart();

  // get the parsed product info then display it
  productDataManager.getProducts().then(products => {
    ui.displayProducts(products);
    //setup system for adding products to cart
    ui.setupCartSystem(products, cart);
  });
}
