class Products {
  constructor() {
    this.classNameActive = "products-element__btn_active";
    this.textBtn = "Удалить из корзины";
    this.textBtnReturn = "Добавить в корзину";
  }

  setLocalStorage() {
    // Добавляем продукт в LocalStorage
    const productsBtn = document.querySelectorAll(".products-element__btn");

    productsBtn.forEach((elem) => {
      elem.addEventListener("click", (e) => {
        let id = e.target.dataset.id;
        let btn = document.querySelector(
          `.products-element__btn[data-id='${id}']`
        );

        const { pushProduct, products } = localStorageCart.putProducts(id);
        // console.log({ products });
        if (pushProduct) {
          // Добавить класс для кнопки
          btn.classList.add(this.classNameActive);
          // Изменить текст для кнопки
          btn.textContent = this.textBtn;
        } else {
          // Удалить класс для кнопки
          btn.classList.remove(this.classNameActive);
          // Изменить текст для кнопки
          btn.textContent = this.textBtnReturn;
        }
        // Отоброжает количество товаров в корзине
        headerPage.render(products.length);
      });
    });
  }

  render() {
    const productsStorage = localStorageCart.getProducts();

    let htmlCatalog = "";

    // Создаем карточки продуктов
    CATALOG.forEach(({ id, name, img, price }) => {
      let activeClass = "";
      let textBtn = "";
      // let btn = document.querySelectorAll(
      //   `.products-element__btn[data-id='${id}']`
      // );
      // Проверка localStorage
      if (productsStorage.indexOf(id) !== -1) {
        activeClass = this.classNameActive;
        textBtn = this.textBtn;
      } else {
        textBtn = this.textBtnReturn;
      }

      htmlCatalog += `
       <li class="products-element">
         <span class="products-element__name">${name}</span>
         <img class="products-element__img" src="${img}" alt="${name}"/>
         <span class="products-element__price">${price.toLocaleString()} ₽</span>
         <button class="products-element__btn ${activeClass}" data-id="${id}">
          ${textBtn}
         </button>
       </li>
       `;
    });
    // Метод toLocaleString() разделять большие цифры пробелом 100 000
    const html = `
    <ul class="products-container">${htmlCatalog}</ul>
    `;

    ROOT_PRODUCTS.innerHTML = html;
  }
}

const productsPage = new Products();
productsPage.render();
productsPage.setLocalStorage();
