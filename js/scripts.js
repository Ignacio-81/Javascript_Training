//get the chop cart information from local storage
let shopCart = JSON.parse(localStorage.getItem("shopCart")) ?? []; //
//sum the prices of the shop cart to know initian price.
let cartPrice = shopCart.reduce((acc, product) => acc + product.price, 0);
//show on shop cart button the initical value
document.getElementById("cartCount").innerHTML = `${shopCart.length} - $${cartPrice}`;

//const edadPersona = parseInt(prompt('Ingrese su edad'))
//let dineroEncuenta = parseInt(prompt('Ingrese Dinero en su Cuenta'))
let userName = prompt('Please put your User Name').toUpperCase();
let ivaCgral = 0 //tiene el valor final + IVA de la cuenta de carrito
let stockProducts = [] //Stock de productos de la tienda
let flagchkp = false
let promo = "" //Mensaje para las promos

const iva = x => x * 0.21; //Funcion flecha para calcular el iva a la cuenta 

/*Product Class */
class Product {
    constructor(id, name, price, quantity, img) {
        this.id = parseInt(id)
        this.name = name.toLowerCase();
        this.price = parseFloat(price);
        this.quantity = parseInt(quantity);
        this.img = img;
        this.available = true;
    }

    sell() {
        this.quantity--;
        if (this.quantity == 0) {
            this.available = false;
        }
    }

}

/*message function */
function fMensaje(mAlert, mConsola) {
    alert(mAlert);
    console.log(mConsola);
}
//Cart function
function add2Cart(product) {

    if (product.available) { //check if the product is available
        product.sell()
    } else {
        return false // the product has no Stock 
    }

    shopCart.push(product)

    cartPrice = cartPrice + product.price // adding product price to cart total cost
    alert("You added " + product.name.toUpperCase() + " to the Shopcart")
    document.getElementById("cartCount").innerHTML = `${shopCart.length} - $${cartPrice}`; //Adding total items and cost on en cart button
    localStorage.setItem("shopCart", JSON.stringify(shopCart)); //save information on the local storage
    localStorage.setItem("totalCarrito", shopCart.length) //save total items on the localstorage
    console.log("Added to ShopCart: " + product)
    console.log("Ramaining Stock of this product : " + product.quantity)
    return true
}
/*Funcion para calcular promociones*/
function promociones(edad, cuenta) {
    promo = 0
    if (edad > 50) {
        cuenta = cuenta * 0.5
        promo = "Felicitaciones, tenes 50% por ser mayor de 50 años!"
    } else if (edad > 30) {
        cuenta = cuenta * 0.75
        promo = "Felicitaciones, tenes 25% por ser mayor de 30 años!"
    }
    return cuenta
}
/*function to create new products*/
function newProducts() {
    const prod1 = new Product(1, "Ferrari Roja", 50, 5, "./assets/img/ferrari.jpg")
    const prod2 = new Product(2, "Camaro Amarillo", 75, 10, "./assets/img/camaro.jpg")
    const prod3 = new Product(3, "Combo x5", 4500, 10, "./assets/img/combo.jpg")
    const prod4 = new Product(4, "Delorian Plata", 25, 10, "./assets/img/delorian.jpg")
    const prod5 = new Product(5, "Audi TT Blanco", 250, 10, "./assets/img/audiTT.jpg")
    return [prod1, prod2, prod3, prod4, prod5]
}

stockProducts = newProducts()
//Add user name to the navBar
const titulo = document.querySelector("h1");
titulo.textContent = "Hello " + userName;

//Agregamos el titulo de los articulos disponibles.
const tituloArt = document.querySelectorAll("h5");
const tarjeta = document.body.querySelectorAll(".card-body");

stockProducts.forEach((product) => {
    const idButton = `add-cart${product.id}`
    document.getElementById("section-card").innerHTML += `<div class="col mb-5">
    <div class="card h-100">
        <!-- Product image-->
        <img class="card-img-top" src="${product.img}" alt="..." />
        <!-- Product details-->
        <div class="card-body p-4">
            <div class="text-center">
                <!-- Product name-->
                <h5 class="fw-bolder">${product.name}</h5>
                <!-- Product price-->
                $${product.price}
            </div>
        </div>
        <!-- Product actions-->
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center"><a id="${idButton}" data-id="${product.id}" class="btn btn-outline-dark mt-auto" href="#">Add to cart </a></div>
        </div>
    </div>
</div>`;
})

inputText = document.getElementById("ManualImput")
inputText.addEventListener("keydown", (event) => {

    if (event.key == "Enter") { //Tecla enter
        flagchkp = false
        stockProducts.forEach((product) => {
            if (product.name == inputText.value) {
                add2Cart(product)
                flagchkp = true
            }
        })
        if (!flagchkp) {
            fMensaje("This product does not exist", "You need to enter same name as on the card")

        }
        inputText.value = ""
    }
});

//Event listener
document.addEventListener('click', (e) => {
    // Retrieve id from clicked element
    let elementId = e.target.id;
    // If element has id
    console.log(elementId)
    str = elementId.slice(0, 8)
    if ((elementId == "cartButton") || (elementId == "cartCount")) {
        document.getElementById("cart-modal").innerHTML = ""
        shopCart.forEach((product) => {

            document.getElementById("cart-modal").innerHTML += `
            <div class="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
            <div class="mr-1"><img class="rounded" src="${product.img}" width="70"></div>
            <div class="d-flex flex-column align-items-center product-details"><span class="font-weight-bold">${product.name}</span>

                <div class="d-flex flex-row product-desc">
                    <div class="size mr-1"><span class="text-grey">Qty Available:</span><span class="font-weight-bold">&nbsp;${product.quantity}</span></div>
                </div>
               </div>
            <div class="d-flex flex-row align-items-center qty"><i class="fa fa-minus text-danger"></i>
                <h5 class="text-grey mt-1 mr-1 ml-1">1</h5><i class="fa fa-plus text-success"></i></div>
            <div>
                <h5 class="text-grey">$${product.price}</h5>
            </div>
            <div class="d-flex align-items-center"><i class="fa fa-trash mb-1 text-danger"></i></div>
            </div>`;

        })
    } else if (elementId == "cart-remove") {
        if (confirm('Are you sure you want to erase all items?')) {
            shopCart = [];
            cartPrice = 0;
            document.getElementById("cart-modal").innerHTML = ""
            localStorage.removeItem("shopCart")
            localStorage.removeItem("totalCarrito")
            document.getElementById("cartCount").innerHTML = "0";
            console.log('All cart items were deleted');
        } else {
            // Do nothing!
            console.log('No action');
        }
    } else if (str == "add-cart") {
        stockProducts.forEach((product) => {
            const idButton = `add-cart${product.id}`
            if (elementId == idButton) {
                add2Cart(product)
                console.log(shopCart)
            }
        })

    } else {
        console.log("An element without an id was clicked.");
    }
}
);
