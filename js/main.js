const edadPersona = parseInt(prompt('Ingrese su edad'))
let dineroEncuenta = parseInt(prompt('Ingrese Dinero en su Cuenta'))
let cuentaGral = 0
let ivaCgral = 0
let artSeleccionados = ""
let flagBr = false
let promo = ""
/*Funcion flecha para calcular el iva a la cuenta */
const iva = x => x * 0.21;

/*Funcion para mostrar mensaje generico mas aclaracion/Detalle por consola*/
function fMensaje (mAlert, mConsola){
    alert(mAlert);
    console.log(mConsola);
}
/*Sumamos el precio de cada articulo a la cuenta */
function precioArt (articulo, cuenta){
    switch (articulo) {

        case "Vaso":
            cuenta += 50;
            break;
        case "Plato":
            cuenta += 150;
            break;
        case "Heladera":
            cuenta += 45000;
            break;
        case "Caja":
            cuenta += 25;
            break;
        case "Jarra":
            cuenta += 250;
            break;
    }
    return cuenta;
}

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


if (edadPersona >= 18) { /*El usuario debe ser mayor o igual a 18 años*/ 
    alert("Bienvenido!");
    do { /* Bucle para para la compra cuando el usuario escribe NO*/
        const cantArt = prompt('Ingrese la cantidad de productos a comprar:')
        if ((cantArt != null) && (cantArt > 0) && (cantArt < 10)) {
            /*Bucle para tomar el pedido de productos */ 
            for (let i = 0; i < cantArt; i++) {
                let artTemp = prompt('Escriba el nombre del producto que desea:\n - Vaso($50) \n - Plato($150) \n - Heladera($45.000) \n - Caja($25) \n - Jarra($250) \n "* los productos no tienen IVA" ')
                if ((artTemp == "Vaso") || (artTemp == "Plato") || (artTemp == "Heladera") || (artTemp == "Caja") || (artTemp == "Jarra")) {
                    artSeleccionados = artSeleccionados + artTemp + " - "
                } else {
                    fMensaje ("El articulo no esta disponible o no se ingreso correctamente", "El articulo debe estar en la lista actual")
                    flagBr = true
                    break;
                }
                /* Sumamos el precio del proudcto a la cuenta total*/    
                cuentaGral = precioArt(artTemp, cuentaGral)

                /*Controlamos que el usuario tenga dinero en la cuenta */    
                if (dineroEncuenta <= ivaCgral) {
                    fMensaje("No tienes mas saldo en tu cuenta", "Dinero en cuenta:" + dineroEncuenta + " Valor compra:" + ivaCgral)
                    flagBr = false
                    break;
                }

            }

            if (!flagBr) { /*Solo entramos si no tuvimos un break antes*/
                cuentaGral = promociones (edadPersona, cuentaGral)
                ivaCgral = cuentaGral + iva(cuentaGral)
                console.log("Articulos Seleccionados: " + artSeleccionados);
                console.log("Total Cuenta a Pagar: $" + cuentaGral + " Total c/IVA: $"+ ivaCgral );
                console.log(promo);
                contComp = prompt("Desea Seguir comprando? SI/NO");
            }
        } else {
            fMensaje ("Introduzca un valor entre 0 a 10","El valor no puede estar vacio , rango:0-10")
        }
    } while (contComp != "NO")

} else {/*SAlida si el usuaio no es mayor de 18 años*/
    fMensaje ("Necesitas ser mayor de edad", "Necesitas ser mayor de 18 años para poder comprar aqui.")
}

