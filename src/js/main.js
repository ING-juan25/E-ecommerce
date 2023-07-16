const URL_DATA = "https://ecommercebackend.fundamentos-29.repl.co";

async function getProducts() {
  try {
    const data = await fetch(URL_DATA);
    const response = await data.json();
    localStorage.setItem("pruducts", JSON.stringify(response));
    return response;
  } catch (error) {
    console.log("Esto es un error: ");
  }
}
function printTotal(store) {
  const infoTotal = document.querySelector(".totalProduct");
  const infoAmount = document.querySelector(".totalPrice");

  let totalProducts = 0;
  let totalamount = 0;
  for (const key in store.cart) {
    const { amount, price } = store.cart[key];
    totalProducts += amount;
    totalamount += amount * price;
  }

  infoTotal.textContent = totalProducts;
  infoAmount.textContent = totalamount;
}

function validateAmountQuatity(store) {
  document.querySelector(".cart__products").addEventListener("click", (e) => {
    if (e.target.classList.contains("bx")) {
      if (e.target.classList.contains("bx-minus")) {
        const id = Number(e.target.parentElement.id);
        if (store.cart[id].amount === 1) {
          const response = confirm("Seguro quieres eliminar");
          if (response) delete store.cart[id];
        } else {
          store.cart[id].amount--;
        }
      }

      if (e.target.classList.contains("bx-plus")) {
        const id = Number(e.target.parentElement.id);
        if (store.cart[id].amount === store.cart[id].quantity) {
          alert("Ya no hay más unidades disponibles");
        } else {
          store.cart[id].amount++;
        }
      }

      if (e.target.classList.contains("bxs-trash")) {
        const id = Number(e.target.parentElement.id);
        const response = confirm("Seguro quieres eliminar");
        if (response) delete store.cart[id];
      }
      localStorage.setItem("cart", JSON.stringify(store.cart));
      printProductInCart(store);
      printTotal(store);
    }
  });
}

function printProduct(store) {
  let html = "";
  store.products.forEach(({ id, image, name, price, quantity }) => {
    console.log({ id, image, name, price, quantity });
    html += `
      <div class="product">
      <div class="product__img">
      <img src="${image}" alt="">      
      </div>
      <div class="product__info">
      <h4>${name} <span> | <b>Unit</b>: ${quantity} </span> </h4>
      <h5>$${price}.0  
      <i class='bx bxs-plus-circle bx-md bx-tada btn_plus'id=${id}></i>
      </h5>           
      </div>
      </div>
      `;
  });

  document.querySelector(".products").innerHTML = html;
}

function handleShowCart() {
  const iconCart = document.querySelector(".icon__cart");
  const cart = document.querySelector(".cart");
  iconCart.addEventListener("click", function () {
    cart.classList.toggle("cart__show");
  });
}

function printProductInCart(store) {
  let html = "";
  for (const key in store.cart) {
    const { amount, id, image, name, price, quantity } = store.cart[key];

    html += `
      <div class="cart__product">
        <div class="cart__product__img">
          <img src="${image}" alt="" />
        </div>
        <div class="cart__product__body">
          <p>
            <b>${name}</b>
          </p>
          <p>
            <small>price: $${price}.0 | <b>
            $${amount * price}.0 </b></small>
      
          </p> 
          <p>
            <small>disponibles: ${quantity}</small>
          </p>    
          <div class="cart__product__opt" id="${id}">
            <i class='bx bx-minus'></i>
            <span>${amount}</span>
            <i class='bx bx-plus'></i>
            <i class='bx bxs-trash' ></i>
          </div>
        </div>

      </div>

      `;
  }

  document.querySelector(".cart__products").innerHTML = html;
}

function addProductCart(store) {
  const productsHTML = document.querySelector(".products");
  productsHTML.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn_plus")) {
      const id = Number(e.target.id);
      const productFound = store.products.find((product) => {
        return product.id === id;
      });
      if (store.cart[productFound.id]) {
        if (store.cart[id].amount === store.cart[id].quantity) {
          alert("Ya no hay más unidades disponibles");
        } else {
          store.cart[id].amount++;
        }
      } else {
        store.cart[productFound.id] = {
          ...productFound,
          amount: 1,
        };
      }
      localStorage.setItem("cart", JSON.stringify(store.cart));
      printProductInCart(store);
    }
  });
}

async function main() {
  const store = {
    products:
      JSON.parse(localStorage.getItem("products")) || (await getProducts()),
    cart: JSON.parse(localStorage.getItem("cart")) || {},
  };

  printProduct(store);
  handleShowCart();
  addProductCart(store);
  printProductInCart(store);
  validateAmountQuatity(store);
  printTotal(store);
}
main();
