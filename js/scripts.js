
//const edadPersona = parseInt(prompt('Ingrese su edad'))
//let dineroEncuenta = parseInt(prompt('Ingrese Dinero en su Cuenta'))
let userName = prompt('Please put your User Name').toUpperCase();
let cartPrice = 0 // lleva la cuenta de dinero en el carrito para la compra
let ivaCgral = 0 //tiene el valor final + IVA de la cuenta de carrito
let shopCart = [] // lista de productos en el carrito
let stockProducts = [] //Stock de productos de la tienda
let flagBr = false
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

/*Funcion para mostrar mensaje generico mas aclaracion/Detalle por consola*/
function fMensaje(mAlert, mConsola) {
    alert(mAlert);
    console.log(mConsola);
}
/*Funcion basica para simular el carrito*/
function add2Cart(product) {

    if (product.available) {
        product.sell()
    } else {
        return false // El producto que queremos agregar no tiene mas stock
    }

    shopCart.push(product)
    /* Sumamos el precio del proudcto a la cuenta total*/
    cartPrice = cartPrice + product.price

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
    const prod1 = new Product(1,"Ferrari Roja", 50, 5, "./assets/img/ferrari.jpg")
    const prod2 = new Product(2,"Camaro Amarillo", 150, 10, "./assets/img/camaro.jpg")
    const prod3 = new Product(3,"Combo x5", 45000, 10, "./assets/img/combo.jpg")
    const prod4 = new Product(4,"Delorian Plata", 25, 10, "./assets/img/delorian.jpg")
    const prod5 = new Product(5,"Audi TT Blanco", 250, 10, "./assets/img/audiTT.jpg")
    return [prod1, prod2, prod3, prod4, prod5]
}

stockProducts = newProducts()
//Add user name to the navBar
const titulo = document.querySelector("h1");
titulo.textContent = "Hello "+userName;

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

stockProducts.forEach((product) => {
    const idButton = `add-cart${product.id}` 
    document.getElementById(idButton).addEventListener('click', (event) => {
        add2Cart(product)
        alert("You added "+product.name.toUpperCase()+" to the Shopcart")
        document.getElementById("cartCount").innerText = shopCart.length
        console.log(shopCart)
    })
})

//DEJO ESTE CODIGO COMENTADO QUE ES DEL CODIGO ANTERIOR PARA RE UTILIZAR MAS ADELANTE
/*

if (edadPersona >= 18) { //El usuario debe ser mayor o igual a 18 años
    alert("Bienvenido!");
    do { // Bucle para para la compra cuando el usuario escribe NO
        const cantArt = parseInt(prompt('Ingrese la cantidad de productos a comprar:'))
        if ((cantArt != null) && (cantArt > 0) && (cantArt < 20)) {
            //Bucle para tomar el pedido de productos 
            for (let i = 0; i < cantArt; i++) {
                let artTemp = prompt('Escriba el nombre del producto que desea:\n - Vaso($50) \n - Plato($150) \n - Heladera($45.000) \n - Caja($25) \n - Jarra($250) \n "* los productos no tienen IVA" ')
                artTemp.toLowerCase()
                if ((artTemp == "vaso") || (artTemp == "plato") || (artTemp == "heladera") || (artTemp == "caja") || (artTemp == "jarra")) {

                    if (!agregaCarrito(artTemp)) { //se comprueba segun retorno de funcion carrito si el producto tiene stock
                        alert("Producto sin stock");
                        i--;
                    }

                } else {
                    fMensaje("El articulo no esta disponible o no se ingreso correctamente", "El articulo debe estar en la lista actual")
                    flagBr = true
                    break;
                }

                //Controlamos que el usuario tenga dinero en la cuenta 
                if (dineroEncuenta <= ivaCgral) {
                    fMensaje("No tienes mas saldo en tu cuenta", "Dinero en cuenta:" + dineroEncuenta + " Valor compra:" + ivaCgral)
                    flagBr = false
                    break;
                }

            }

            if (!flagBr) { //Solo entramos si no tuvimos un break antes
                cuentaCarrito = promociones(edadPersona, cuentaCarrito)
                ivaCgral = cuentaCarrito + iva(cuentaCarrito)
                console.log("Articulos Seleccionados: " + carrito);
                console.log("Total Cuenta a Pagar: $" + cuentaCarrito + " Total c/IVA: $" + ivaCgral);
                console.log(promo);
                contComp = prompt("Desea Seguir comprando? SI/NO");
                contComp = contComp.toUpperCase();
            }
        } else {
            fMensaje("Introduzca un valor entre 0 a 20", "El valor no puede estar vacio , rango:0-10")
        }
    } while (contComp != "NO")

} else {//SAlida si el usuaio no es mayor de 18 años
    fMensaje("Necesitas ser mayor de edad", "Necesitas ser mayor de 18 años para poder comprar aqui.")
}
*/