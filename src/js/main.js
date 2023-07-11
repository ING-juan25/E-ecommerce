const URL_DATA = "https://ecommercebackend.fundamentos-29.repl.co";

async function getProducts() {
  try {
    const data = await fetch(URL_DATA);
    const response = await data.json();
    return response;
  } catch (error) {
    console.log("Esto es un error: ");
  }
}

function printProduct(store) {
  let html = "";
  store.products.forEach(
    ({ id, image, name, price, quantity }) => {
      console.log({ id, image, name, price, quantity });
      html += `
      <div class="product">
      <div class="product__img">
      <img src="${image}" alt="">      
      </div>
      <div class="product__info">
      <h4>${name}</h4>
      <h5>$${price}.0 -  ${quantity} unidades
      <i class='bx bxs-plus-circle bx-md bx-tada btn_plus'id=${id}></i>
      </h5>           
      </div>
      </div>
      `;
    }
  );

  document.querySelector(".products").innerHTML = html;

  
}

function handleShowCart() {
  const iconCart = document.querySelector(".icon__cart")
  const cart = document.querySelector(".cart")
  iconCart.addEventListener("click", function(){
    cart.classList.toggle("cart__show")
  });
  
}

async function main() {
  const store = {
    products: await getProducts(),
    cart:{},
  } 
  
  printProduct(store)
  handleShowCart() 
  const productsHTML = document.querySelector(".products")
  productsHTML.addEventListener("click",(e)=>{
    if (e.target.classList.contains("btn_plus")) {     
      const id = Number(e.target.id)
      const productFound = store.products.find((product) =>{
        return product.id === id;

        

      })
      console.log(productFound);
    }
   
  })

 
}
main();
