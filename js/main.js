const edadPersona = parseInt(prompt('Ingrese su edad'))
let dineroEncuenta = parseInt(prompt('Ingrese Dinero en su Cuenta'))
let cuentaCompra = 0
let ivaCgral = 0
let carrito = []
let stockProductos = []
let flagBr = false
let promo = ""
/*Funcion flecha para calcular el iva a la cuenta */
const iva = x => x * 0.21;

class Producto {
    constructor(nombre, precio, cantidad) {
        this.nombre  = nombre.toLowerCase();
        this.precio  = parseFloat(precio);
        this.cantidad = parseInt(cantidad);
        this.disponible = true;
    }

    venta(){
        this.cantidad--;
        if (this.cantidad == 0){
            this.disponible = false;
        }
    }

}


/*Funcion para mostrar mensaje generico mas aclaracion/Detalle por consola*/
function fMensaje (mAlert, mConsola){
    alert(mAlert);
    console.log(mConsola);
}
/*Funcion basica para simular el carrito*/
function agregaCarrito (articulo){
    let index = 0
    let respuesta = 0
    //carrito = carrito + articulo + " - "
    carrito.push(articulo)
    for (const producto of stockProductos){
        if (producto.nombre == articulo){
            stockProductos[index].venta()
            break;
        }
        index++;
    }
    /* Sumamos el precio del proudcto a la cuenta total*/    
    cuentaCompra = cuentaCompra + stockProductos[index].precio

    console.log("Se agrego al carrito : " + articulo)
    console.log("Stock restante del articulo : " + stockProductos[index].cantidad)
}

/*Sumamos el precio de cada articulo a la cuenta */
/*
function precioArt (articulo, cuenta){
    switch (articulo) {

        case "VASO":
            cuenta += 50;
            break;
        case "PLATO":
            cuenta += 150;
            break;
        case "HELADERA":
            cuenta += 45000;
            break;
        case "CAJA":
            cuenta += 25;
            break;
        case "JARRA":
            cuenta += 250;
            break;
    }
    return cuenta;
}
*/
function promociones(edad, cuenta){
    promo = 0
    if (edad > 50) {
        cuenta = cuenta * 0.5
        promo = "Felicitaciones, tenes 50% por ser mayor de 50 años!"
    }else if (edad > 30) {
        cuenta = cuenta * 0.75
        promo = "Felicitaciones, tenes 25% por ser mayor de 30 años!"
    }
    return cuenta
}

function altaProductos(){
    const vaso = new Producto("vaso", 50, 10)
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
        const cantArt = prompt('Ingrese la cantidad de productos a comprar:')
        if ((cantArt != null) && (cantArt > 0) && (cantArt < 10)) {
            /*Bucle para tomar el pedido de productos */ 
            for (let i = 0; i < cantArt; i++) {
                let artTemp = prompt('Escriba el nombre del producto que desea:\n - Vaso($50) \n - Plato($150) \n - Heladera($45.000) \n - Caja($25) \n - Jarra($250) \n "* los productos no tienen IVA" ')
                artTemp = artTemp.toLowerCase()
                if ((artTemp == "vaso") || (artTemp == "plato") || (artTemp == "heladera") || (artTemp == "caja") || (artTemp == "jarra")) {
                    agregaCarrito(artTemp)
                } else {
                    fMensaje ("El articulo no esta disponible o no se ingreso correctamente", "El articulo debe estar en la lista actual")
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
                 cuentaCompra = promociones (edadPersona, cuentaCompra)
                ivaCgral = cuentaGral + iva(cuentaCompra)
                console.log("Articulos Seleccionados: " + carrito);
                console.log("Total Cuenta a Pagar: $" + cuentaCompra + " Total c/IVA: $"+ ivaCgral );
                console.log(promo);
                contComp = prompt("Desea Seguir comprando? SI/NO");
                contComp = contComp.toUpperCase();
            }
        } else {
            fMensaje ("Introduzca un valor entre 0 a 10","El valor no puede estar vacio , rango:0-10")
        }
    } while (contComp != "NO")

} else {/*SAlida si el usuaio no es mayor de 18 años*/
    fMensaje ("Necesitas ser mayor de edad", "Necesitas ser mayor de 18 años para poder comprar aqui.")
}

