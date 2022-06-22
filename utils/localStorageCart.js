class LocalStorageCart {
  constructor() {
    // создаем ключ в LS
    this.keyName = "products";
  }
  // метод получает все продукты из LocalStorage
  getProducts() {
    const productsLocalStorage = localStorage.getItem(this.keyName);
    if (productsLocalStorage !== null) {
      return JSON.parse(productsLocalStorage);
    }
    return [];
  }

  // метод добавляет новое значени в LocalStorage по id
  putProducts(id) {
    let products = this.getProducts();
    let pushProduct = false;
    const index = products.indexOf(id);

    if (index === -1) {
      products.push(id);
      pushProduct = true;
    } else {
      products.splice(index, 1);
    }

    localStorage.setItem(this.keyName, JSON.stringify(products));

    return { pushProduct, products };
  }
}

const localStorageCart = new LocalStorageCart();
