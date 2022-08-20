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
/*Cart Class */
class Cart {
    constructor(obj) {
        this.idProd = obj.idProd;
        this.prod = obj.prod;
        this.quantity = obj.quantity;
    }

    add(item) {
        const indexProd = this.idProd.indexOf(item.id)
        if (indexProd == -1) {
            this.idProd.push(item.id)
            this.prod.push(item)
            this.quantity.push(1);
        } else {
            this.prod[indexProd] = item
            this.quantity[indexProd]++
        }
        cartSum++;
        console.log(this.prod)
    }

}

//get the shop cart information from local storage
let shopCart = new Cart(JSON.parse(localStorage.getItem("shopCart")) ?? { idProd: [], prod: [], quantity: [] }) //
//sum the prices of the shop cart to know initian price.
console.log(shopCart)
let cartPrice = shopCart.prod.reduce((acc, product) => acc + product.price, 0);
let cartSum = shopCart.quantity.reduce((acc, a) => acc + a, 0);
//show on shop cart button the initical value
document.getElementById("cartCount").innerHTML = `${cartSum} - $${cartPrice}`;

let ivaCgral = 0 //tiene el valor final + IVA de la cuenta de carrito
let stockProducts = [] //Stock de productos de la tienda
let flagchkp = false
let promo = "" //Mensaje para las promos

const iva = x => x * 0.21; //Funcion flecha para calcular el iva a la cuenta 


//Cart function
function add2Cart(product) {

    if (product.available) { //check if the product is available
        product.sell()
    } else {
        return false // the product has no Stock 
    }
    shopCart.add(product)
    //shopCart.push(product)

    cartPrice = cartPrice + product.price // adding product price to cart total cost
    Toastify({
        text: "You've added " + product.name.toUpperCase() + " to the Shopcart",
        duration: 3000,
        gravity: 'top',
        position: 'right',
        style: {
            background: 'linear-gradient(to right, #00b09b, #96c92d)'
        }

    }).showToast();
    //alert("You added " + product.name.toUpperCase() + " to the Shopcart")
    document.getElementById("cartCount").innerHTML = `${cartSum} - $${cartPrice}`; //Adding total items and cost on en cart button
    localStorage.setItem("shopCart", JSON.stringify(shopCart)); //save information on the local storage
    localStorage.setItem("totalCarrito", cartSum) //save total items on the localstorage
    console.log("Added to ShopCart: " + product)
    console.log("Ramaining Stock of this product : " + product.quantity)
    console.log(shopCart)
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

async function userInicio() {

    const { value: userName } = await Swal.fire({
        title: 'Enter your User Name',
        input: 'text',

        inputValidator: (value) => {
            if (!value) {
                return 'You need to write your User Name!'
            } else {
                //Add user name to the navBar
                const titulo = document.querySelector("h1");
                titulo.textContent = "Hello " + value;
            }
        }
    })

}
//Create stock cards from stock on the main page.
const renderProducts = (data) =>{
    data.forEach((product) => {
        const idButton = `add-cart${product.id}`
        const { id, img, name, price } = product
        document.getElementById("section-card").innerHTML += `<div class="col mb-5">
    <div class="card h-100">
        <!-- Product image-->
        <img class="card-img-top" src="${img}" alt="..." />
        <!-- Product details-->
        <div class="card-body p-4">
            <div class="text-center">
                <!-- Product name-->
                <h5 class="fw-bolder">${name}</h5>
                <!-- Product price-->
                $${price}
            </div>
        </div>
        <!-- Product actions-->
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center"><a id="${idButton}" data-id="${id}" class="btn btn-outline-dark mt-auto" href="#">Add to cart </a></div>
        </div>
    </div>
</div>`;
    })
}

const getProducts = () =>{
    fetch('./productsA.json')
        .then((response) => response.json())
        .then(data => {
            data.forEach((product) =>{
                stockProducts.push (new Product(...product))
            })

            console.log(stockProducts);
            renderProducts(stockProducts)
        })

}

getProducts()
userInicio()


// adding prduct manually
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
        !flagchkp && Swal.fire({
            icon: 'error',
            title: 'The proudct does not exist',
            showConfirmButton: false,
            timer: 1500
        })
        inputText.value = ""
    }
});

// Event listener for Button click.
document.addEventListener('click', (e) => {
    // Retrieve id from clicked element
    let elementId = e.target.id;

    // If element has id
    str = elementId.slice(0, 8)
    if ((elementId == "cartButton") || (elementId == "cartCount")) {
        document.getElementById("cart-modal").innerHTML = ""
        shopCart.prod.forEach((product) => {
            const { id, img, name, quantity, price } = product // Destruct for product array
            const indexProd = shopCart.idProd.indexOf(id) // get the index of this product
            const totalPriceProd = price * shopCart.quantity[indexProd] //get the total price for this product
            document.getElementById("cart-modal").innerHTML += `
            <div class="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
            <div class="mr-1"><img class="rounded" src="${img}" width="70"></div>
            <div class="d-flex flex-column align-items-center product-details"><span class="font-weight-bold">${name}</span>

                <div class="d-flex flex-row product-desc">
                    <div class="size mr-1"><span class="text-grey">Qty Available:</span><span class="font-weight-bold">&nbsp;${quantity}</span></div>
                </div>
               </div>
            <div class="d-flex flex-row align-items-center qty"><i class="fa fa-minus text-danger"></i>
                <h5 class="text-grey mt-1 mr-1 ml-1">${shopCart.quantity[indexProd]}</h5><i class="fa fa-plus text-success"></i></div>
            <div>
                <h5 class="text-grey">$${totalPriceProd}</h5>
            </div>
            <div class="d-flex align-items-center"><i class="fa fa-trash mb-1 text-danger"></i></div>
            </div>`;

        })
    } else if (elementId == "cart-remove") {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will remove items from cart",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove all!'
        }).then((result) => {
            if (result.isConfirmed) {
                shopCart = [];
                cartPrice = 0;
                document.getElementById("cart-modal").innerHTML = "" //delete cart modal
                localStorage.removeItem("shopCart") // remover from local storage
                localStorage.removeItem("totalCarrito") //remove from local storage
                document.getElementById("cartCount").innerHTML = "0"; // put to cero cart quantity
                console.log('All cart items were deleted');
                Swal.fire(
                    'Removed',
                    'All the items were removed.',
                    'success'
                )
            }
        })
    } else if (str == "add-cart") {
        stockProducts.forEach((product) => {
            const idButton = `add-cart${product.id}`
            //if the button correspond to the item, add it to the cart, if it is out of sotck show message
            elementId == idButton && (add2Cart(product) ? console.log("OK") : Swal.fire('out of stock!'))
        })

    } else {
        console.log("An element without an id was clicked.");
    }
}
);
