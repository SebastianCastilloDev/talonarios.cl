function $cl(number) {
    let pesos = new Intl.NumberFormat('cl-ES').format(number)
    pesos = `$ ${pesos}`
    return pesos
}

function $formatoNumero(number) {
    let numero = new Intl.NumberFormat('cl-ES').format(number)
    numero = `${numero}`
    return numero
}



function getParameters() {
    //const cantidad = parseInt(document.querySelector('#cantidad').value)
    //const moldes = 4
    //const multiplicidad = 2
    const sobrantes = 5
    const unTal = 50
    const valorDiseno = 1000
    const gg = 80
    const utilidad = 50
    const impuesto = 27
    const hojasResma = 500
    const costoResma = 7000
    const costoTinta = 3

    return {
        sobrantes,
        unTal,
        valorDiseno,
        gg,
        utilidad,
        impuesto,
        hojasResma,
        costoResma,
        costoTinta
    }

}

//Funcion que devuelve un json con todos los calculos asociaciados al precio.
function resultados(cantidad, moldes, multiplicidad) {
    const {
        sobrantes,
        unTal,
        valorDiseno,
        gg,
        utilidad,
        impuesto,
        hojasResma,
        costoResma,
        costoTinta
    } = getParameters()

    const pagoOperacionesMenores = 10

    const tirajeUtil = cantidad / moldes * multiplicidad
    const talonarios = cantidad / unTal
    const tirajeReal = tirajeUtil + sobrantes * multiplicidad
    const costoPapel = costoResma / hojasResma * tirajeReal
    const costoDiseno = valorDiseno
    const costoImpresion = tirajeReal * costoTinta
    const costoManoDeObra = tirajeUtil % 1000 === 0 ? pagoOperacionesMenores * tirajeUtil / 1000 : pagoOperacionesMenores * parseInt(tirajeUtil / 1000 + 1)
    const costoAlzado = tirajeUtil % 1000 === 0 ? pagoOperacionesMenores * tirajeUtil / 1000 : pagoOperacionesMenores * parseInt(tirajeUtil / 1000 + 1)
    const costoPerforado = tirajeUtil % 1000 === 0 ? pagoOperacionesMenores * tirajeUtil / 1000 : pagoOperacionesMenores * parseInt(tirajeUtil / 1000 + 1)
    const costoTerminado = tirajeUtil / unTal * pagoOperacionesMenores
    const costoSeparado = tirajeUtil / unTal * pagoOperacionesMenores
    const costoCorcheteado = tirajeUtil / unTal * pagoOperacionesMenores
    const costoCorte = tirajeUtil / unTal * pagoOperacionesMenores
    const costoOperacional = costoDiseno + costoPapel + costoImpresion + costoManoDeObra + costoAlzado + costoPerforado + costoTerminado + costoSeparado + costoCorcheteado + costoCorte
    const costoTotal = costoOperacional * (1 + gg / 100)
    const precioDeVenta = Math.ceil((costoTotal * (1 + utilidad / 100) + impuesto / 100 * costoTotal * utilidad / 100) / 100) * 100

    return {
        cantidad,
        tirajeUtil,
        tirajeReal,
        talonarios,
        costoPapel,
        costoDiseno,
        costoImpresion,
        costoManoDeObra,
        costoAlzado,
        costoPerforado,
        costoTerminado,
        costoSeparado,
        costoCorcheteado,
        costoCorte,
        costoOperacional,
        costoTotal,
        precioDeVenta
    }
}


let cantidades = [50, 100, 500, 1000, 2000, 2500, 3000, 4000, 5000]
let moldes = 4
let multiplicidad = 2
let valoresCuartoCartaDuplicado = []

cantidades.forEach(function (cantidad) {
    valoresCuartoCartaDuplicado.push(resultados(cantidad, moldes, multiplicidad))
})

let template = ''
valoresCuartoCartaDuplicado.forEach(function (valoresPrecios) {
    template += `
    <tr class="lista__tr">
        <td class="lista__td">${valoresPrecios.talonarios}</td>
        <td class="lista__td">${$formatoNumero(valoresPrecios.cantidad)}</td>
        <td class="lista__td">${$cl(valoresPrecios.precioDeVenta)}</td>
    </tr>
    `
}
)
const duplicado = document.querySelector('#duplicado')
duplicado.innerHTML = template




moldes = 4
multiplicidad = 3
valoresCuartoCartaTriplicado = []
cantidades.forEach(function (cantidad) {
    valoresCuartoCartaTriplicado.push(resultados(cantidad, moldes, multiplicidad))
})

template = ''
valoresCuartoCartaTriplicado.forEach(function (valoresPrecios) {
    template += `
    <tr class="lista__tr">
        <td class="lista__td">${valoresPrecios.talonarios}</td>
        <td class="lista__td">${$formatoNumero(valoresPrecios.cantidad)}</td>
        <td class="lista__td">${$cl(valoresPrecios.precioDeVenta)}</td>
    </tr>
    `
}
)
const triplicado = document.querySelector('#triplicado')
triplicado.innerHTML = template


moldes = 4
multiplicidad = 4
valoresCuartoCartaCuadruplicado = []
cantidades.forEach(function (cantidad) {
    valoresCuartoCartaCuadruplicado.push(resultados(cantidad, moldes, multiplicidad))
})

template = ''
valoresCuartoCartaCuadruplicado.forEach(function (valoresPrecios) {
    template += `
    <tr class="lista__tr">
        <td class="lista__td">${valoresPrecios.talonarios}</td>
        <td class="lista__td">${$formatoNumero(valoresPrecios.cantidad)}</td>
        <td class="lista__td">${$cl(valoresPrecios.precioDeVenta)}</td>
    </tr>
    `
}
)
const cuadruplicado = document.querySelector('#cuadruplicado')
cuadruplicado.innerHTML = template