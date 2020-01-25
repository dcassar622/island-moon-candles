import { ProductDataManager } from "./product-data-manager.js";
import { ProductUI } from "./product-ui.js";

document.addEventListener("DOMContentLoaded", () => {
  runSite();
});

function runSite() {
  setupUI();
}

// sets up UI for site
function setupUI() {
  const productUI = new ProductUI();
  let products = getAllProductData();
  productUI.setupProductUI(products);
}

// gets product data from product database (Contentful) and parses it for sitewide use
function getAllProductData() {
  const client = contentful.createClient({
    space: "h7vpyobbk8cw",
    accessToken: "zBwKjd4L6gVGJ-i4naXSU9YqOG5EEma86CDHmuArRak"
  });

  const productDataManager = new ProductDataManager(client);
  //getting promise not an array, needs  to be an array
  productDataManager.getProducts().then(productArray => {
    return productArray;
  });
}
