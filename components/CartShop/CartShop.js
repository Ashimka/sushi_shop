class Cartshop {
  hendleClear() {
    ROOT_CARTSHOP.innerHTML = "";

    // Включить скролл страницы
    document.body.classList.remove("hidden");
    productsPage.render();
    productsPage.setLocalStorage();
  }
  render() {
    //   Получаем id продукта из LocalStorage
    const productsStorage = localStorageCart.getProducts();
    let html = "";
    let htmlCatalog = "";
    let totalPrice = 0;

    //  Получаем продукты из каталога которые добавлены в LocalStorage
    CATALOG.forEach(({ id, name, img, price }) => {
      if (productsStorage.indexOf(id) !== -1) {
        htmlCatalog += `
      <li class="cart-element">
        <img class="cart-element__img" src="${img}" alt="${name}"/>
        <span class="cart-element__name">${name}</span>       
        <span class="cart-element__price" data-btn="${id}">${price} ₽</span>
        <button class="cart-element__btn" data-id="${id}">x</button>  
      </li>
        `;
        totalPrice += price;
      }
    });

    if (productsStorage.length !== 0) {
      html = `
    <div class="cart-container">
      <div class="cart-close" onclick="cartShopPage.hendleClear();"></div>
      <h2 class="cart-title">Ваша корзина:</h2>
        <ul class="cart-products">${htmlCatalog}</ul>
          <div class="cart-total-wrap">
            <div class="cart-total">
              <span class="cart-total__name">Итого:</span>
              <span class="cart-total__price">${totalPrice.toLocaleString()} ₽</span>
            </div>
          </div>
    </div>
    `;
    }

    if (productsStorage.length === 0) {
      html = `<div class="cart-container">
                <div class="cart-close" onclick="cartShopPage.hendleClear();"></div>
                <h2 class="cart-title">В корзине нет выбранных товаров</h2>
              </div>
              `;
    }

    ROOT_CARTSHOP.innerHTML = html;
    cartShopPage.deleteProduct();
  }
  // Удаление продукта из корзины
  deleteProduct() {
    let deleteElement = document.querySelectorAll(".cart-element__btn");

    deleteElement.forEach((element) => {
      element.addEventListener("click", (e) => {
        let id = e.target.dataset.id;
        let cart = JSON.parse(localStorage["products"]);
        let arrLS = cart.filter((item) => {
          if (item !== id) {
            return item;
          }
        });
        localStorage.removeItem("products");
        localStorage.setItem("products", JSON.stringify(arrLS));

        headerPage.render(arrLS.length);
        cartShopPage.render();
      });
    });
  }
}
const cartShopPage = new Cartshop();
