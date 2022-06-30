const edadPersona = parseInt(prompt('Ingrese su edad'))
let dineroEncuenta = parseInt(prompt('Ingrese Dinero en su Cuenta'))
let cuenta = 0
let artSeleccionados = ""
let flagBr = false


if (edadPersona >= 18) {
    alert("Bienvenido!");
    do {
        const cantArt = prompt('Ingrese la cantidad de productos a comprar:')
        if ((cantArt != null) && (cantArt > 0) && (cantArt < 10)) {
            for (let i = 0; i < cantArt; i++) {
                let artTemp = prompt('Escriba el nombre del producto que desea:\n - Vaso($50) \n - Plato($150) \n - Heladera($45.000) \n - Caja($25) \n - Jarra($250) ')
                if ((artTemp == "Vaso") || (artTemp == "Plato") || (artTemp == "Heladera") || (artTemp == "Caja") || (artTemp == "Jarra")) {
                    artSeleccionados = artSeleccionados + artTemp + " - "
                } else {
                    alert("El articulo no esta disponible o no se ingreso correctamente")
                    console.log("El articulo debe estar en la lista actual")
                    flagBr = true
                    break;
                }

                switch (artTemp) {

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

                if (dineroEncuenta <= cuenta) {
                    alert("No tienes mas saldo en tu cuenta")
                    console.log("Dinero en cuenta:" + dineroEncuenta + " Valor compra:" + cuenta)
                    flagBr = false
                    break;
                }

            }
            if (!flagBr) {
                console.log("Articulos Seleccionados: " + artSeleccionados);
                console.log("Total Cuenta a Pagar: " + cuenta);
                contComp = prompt("Desea Seguir comprando? SI/NO");
            }
        } else {
            alert("EL valor no puede estar vacio, tiene que ser mayor a 0 y menor a 10")
        }
    } while (contComp != "NO")
} else {
    alert("Necesitas ser mayor de edad")
    console.log("Necesitas ser mayor de 18 años para poder comprar aqui.")
}

