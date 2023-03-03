
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



// cantidades = [50,100,200,500,1000,2000,2500,3000,4000,5000]
cantidades = [1000]

listasDePrecios(cantidades, 4, 2, "cuarto-carta-duplicado")
listasDePrecios(cantidades, 4, 3, "cuarto-carta-triplicado")
listasDePrecios(cantidades, 4, 4, "cuarto-carta-cuadruplicado")
listasDePrecios(cantidades, 4, 1, "cuarto-carta-simple")

listasDePrecios(cantidades, 2, 2, "media-carta-duplicado")
listasDePrecios(cantidades, 2, 3, "media-carta-triplicado")
listasDePrecios(cantidades, 2, 4, "media-carta-cuadruplicado")
listasDePrecios(cantidades, 2, 1, "media-carta-simple")

listasDePrecios(cantidades, 2, 2, "carta-duplicado")
listasDePrecios(cantidades, 2, 3, "carta-triplicado")
listasDePrecios(cantidades, 2, 4, "carta-cuadruplicado")
listasDePrecios(cantidades, 2, 1, "carta-simple")





























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

    const pagoOperacionesMenores = 100

    const tirajeUtil = cantidad / moldes * multiplicidad
    const talonarios = cantidad / unTal
    const tirajeReal = tirajeUtil + sobrantes * multiplicidad
    const costoPapel = costoResma / hojasResma * tirajeReal
    const costoDiseno = valorDiseno
    const costoImpresion = tirajeReal * costoTinta
    const costoManoDeObra = tirajeUtil % 1000 === 0 ? pagoOperacionesMenores * talonarios * tirajeUtil / 1000 : pagoOperacionesMenores * talonarios * parseInt(tirajeUtil / 1000 + 1)
    const costoAlzado = tirajeUtil % 1000 === 0 ? pagoOperacionesMenores * tirajeUtil / 1000 : pagoOperacionesMenores * parseInt(tirajeUtil / 1000 + 1)
    const costoPerforado = tirajeUtil % 1000 === 0 ? pagoOperacionesMenores * tirajeUtil / 1000 : pagoOperacionesMenores * parseInt(tirajeUtil / 1000 + 1)
    const costoTerminado = tirajeUtil / unTal * pagoOperacionesMenores
    const costoSeparado = tirajeUtil / unTal * pagoOperacionesMenores
    const costoCorcheteado = tirajeUtil / unTal * pagoOperacionesMenores
    const costoCorte = tirajeUtil / unTal * pagoOperacionesMenores
    const costoOperacional = costoDiseno + costoPapel + costoImpresion + costoManoDeObra + costoAlzado + costoPerforado + costoTerminado + costoSeparado + costoCorcheteado + costoCorte
    const costoTotal = costoOperacional * (1 + gg / 100)
    const precioDeVenta = Math.ceil((costoTotal * (1 + utilidad / 100) + impuesto / 100 * costoTotal * utilidad / 100) / 100) * 100

    console.log({tirajeUtil, talonarios, tirajeReal, costoPapel, costoDiseno, costoImpresion, costoManoDeObra, costoAlzado, costoPerforado, costoTerminado, costoSeparado, costoCorcheteado, costoCorte, costoOperacional, costoTotal, precioDeVenta})

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



function listasDePrecios(cantidades, moldes, multiplicidad, htmlId) {

    let el = document.getElementById(htmlId)

    if (el){
        // console.log(el)
        template = ''
        let valores = []
        cantidades.forEach(function (cantidad) {
            valores.push(resultados(cantidad, moldes, multiplicidad))
        })
        
        valores.forEach(function (valor) {
            template += `
                <tr class="lista__tr">
                <td class="lista__td">${valor.talonarios}</td>
                <td class="lista__td">${$formatoNumero(valor.cantidad)}</td>
                <td class="lista__td">${$cl(valor.precioDeVenta)}</td>
            </tr>
            `
        })
    
        el.innerHTML = template
    }
    
    

}


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