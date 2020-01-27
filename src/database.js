export class Database {
  setupDatabase() {
    // Setup Firebase
    var firebaseConfig = {
      apiKey: "AIzaSyBf_FkfuasCnOh1iAqcsxma19MBW7V14a0",
      authDomain: "island-moon-candles.firebaseapp.com",
      databaseURL: "https://island-moon-candles.firebaseio.com",
      projectId: "island-moon-candles",
      storageBucket: "island-moon-candles.appspot.com",
      messagingSenderId: "534882603904",
      appId: "1:534882603904:web:f3bdd620a7bc5522c62765"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Create database in firebase
    let cartDatabase = firebase.database().ref("cart");
    return cartDatabase;
  }

  addToDatabase(product) {
    let cartDatabase = this.setupDatabase();
    let productToAdd = cartDatabase.push();
    productToAdd.set({
      id: product.id,
      title: product.title,
      price: product.price,
      img: product.image
    });
  }
}
