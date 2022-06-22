class Header {
  handlerOpenShopCart() {
    cartShopPage.render();
  }

  render(count) {
    const html = `
     <div class="header-container header">
      <div class="header__title">
       <span class="header__text">Суши Роллы</span>
      </div>
      <div class="header__cart" onclick="headerPage.handlerOpenShopCart();">
       <img class="header__img" src="/img/cart.png" alt="cart"/>
       <div class="header__count">${count}</div>
      </div>
     </div>
     `;
    ROOT_HEADER.innerHTML = html;
    // Если корзина пуста, то счетчик товаров скрыть
    const countNumber = document.querySelector(".header__count");

    if (count === 0) {
      countNumber.classList.add("header-hidden");
    }
    // При нажатии на иконку корзины переходим в корзину
    // onclick="headerPage.handlerOpenShopCart();"

    // Отключить скролл страницы
    const scrollOff = document.querySelector(".header__cart");

    scrollOff.addEventListener("click", () => {
      document.body.classList.add("hidden");
    });
  }
}
const headerPage = new Header();

const productStorage = localStorageCart.getProducts();

headerPage.render(productStorage.length);
