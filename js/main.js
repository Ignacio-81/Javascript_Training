const edadPersona = parseInt(prompt('Ingrese su edad'))
let dineroEncuenta = parseInt(prompt('Ingrese Dinero en su Cuenta'))
let cuentaCarrito = 0 // lleva la cuenta de dinero en el carrito para la compra
let ivaCgral = 0 //tiene el valor final + IVA de la cuenta de carrito
let carrito = [] // lista de productos en el carrito
let stockProductos = [] //Stock de productos de la tienda
let flagBr = false
let promo = "" //Mensaje para las promos

const iva = x => x * 0.21; //Funcion flecha para calcular el iva a la cuenta 

/*Definimos la clase para los productos */
class Producto {
    constructor(nombre, precio, cantidad) {
        this.nombre = nombre.toLowerCase();
        this.precio = parseFloat(precio);
        this.cantidad = parseInt(cantidad);
        this.disponible = true;
    }

    venta() {
        this.cantidad--;
        if (this.cantidad == 0) {
            this.disponible = false;
        }
    }

}

/*Funcion para mostrar mensaje generico mas aclaracion/Detalle por consola*/
function fMensaje(mAlert, mConsola) {
    alert(mAlert);
    console.log(mConsola);
}
/*Funcion basica para simular el carrito*/
function agregaCarrito(articulo) {
    let index = 0
    for (const producto of stockProductos) {
        if (producto.nombre == articulo) {
            if (producto.disponible) {
                stockProductos[index].venta()
                break;
            } else {
                return false // El producto que queremos agregar no tiene mas stock
            }
        }
        index++;
    }
    carrito.push(articulo)
    /* Sumamos el precio del proudcto a la cuenta total*/
    cuentaCarrito = cuentaCarrito + stockProductos[index].precio

    console.log("Se agrego al carrito : " + articulo)
    console.log("Stock restante del articulo : " + stockProductos[index].cantidad)
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
/*Funcion para dar de alta el portfolio de productos*/
function altaProductos() {
    const vaso = new Producto("vaso", 50, 5)
    const plato = new Producto("plato", 150, 10)
    const heladera = new Producto("heladera", 45000, 10)
    const caja = new Producto("caja", 25, 10)
    const jarra = new Producto("jarra", 250, 10)
    return [vaso, plato, heladera, caja, jarra]
}

stockProductos = altaProductos()
if (edadPersona >= 18) { /*El usuario debe ser mayor o igual a 18 años*/
    alert("Bienvenido!");
    do { /* Bucle para para la compra cuando el usuario escribe NO*/
        const cantArt = parseInt(prompt('Ingrese la cantidad de productos a comprar:'))
        if ((cantArt != null) && (cantArt > 0) && (cantArt < 20)) {
            /*Bucle para tomar el pedido de productos */
            for (let i = 0; i < cantArt; i++) {
                let artTemp = prompt('Escriba el nombre del producto que desea:\n - Vaso($50) \n - Plato($150) \n - Heladera($45.000) \n - Caja($25) \n - Jarra($250) \n "* los productos no tienen IVA" ')
                artTemp.toLowerCase()
                if ((artTemp == "vaso") || (artTemp == "plato") || (artTemp == "heladera") || (artTemp == "caja") || (artTemp == "jarra")) {

                    if (!agregaCarrito(artTemp)) { /*se comprueba segun retorno de funcion carrito si el producto tiene stock*/
                        alert("Producto sin stock");
                        i--;
                    }

                } else {
                    fMensaje("El articulo no esta disponible o no se ingreso correctamente", "El articulo debe estar en la lista actual")
                    flagBr = true
                    break;
                }

                /*Controlamos que el usuario tenga dinero en la cuenta */
                if (dineroEncuenta <= ivaCgral) {
                    fMensaje("No tienes mas saldo en tu cuenta", "Dinero en cuenta:" + dineroEncuenta + " Valor compra:" + ivaCgral)
                    flagBr = false
                    break;
                }

            }

            if (!flagBr) { /*Solo entramos si no tuvimos un break antes*/
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

} else {/*SAlida si el usuaio no es mayor de 18 años*/
    fMensaje("Necesitas ser mayor de edad", "Necesitas ser mayor de 18 años para poder comprar aqui.")
}

