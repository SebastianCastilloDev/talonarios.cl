
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
    const costoResma = 6200
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
const cantidades = [50,100,200,500,1000,2000,2500,3000,4000,5000]



// listasDePrecios(cantidades, moldes, multiplicidad, htmlId)
// listasDePrecios(cantidades, 4, 2, "cuarto-carta-duplicado")
// listasDePrecios(cantidades, 4, 3, "cuarto-carta-triplicado")
// listasDePrecios(cantidades, 4, 4, "cuarto-carta-cuadruplicado")
// listasDePrecios(cantidades, 4, 1, "cuarto-carta-simple")

// listasDePrecios(cantidades, 2, 2, "media-carta-duplicado")
// listasDePrecios(cantidades, 2, 3, "media-carta-triplicado")
// listasDePrecios(cantidades, 2, 4, "media-carta-cuadruplicado")
// listasDePrecios(cantidades, 2, 1, "media-carta-simple")

// listasDePrecios(cantidades, 1, 2, "carta-duplicado")
// listasDePrecios(cantidades, 1, 3, "carta-triplicado")
// listasDePrecios(cantidades, 1, 4, "carta-cuadruplicado")
// listasDePrecios(cantidades, 1, 1, "carta-simple")

function valores() {
    const moldes = [[4,'cuarto'],[2,'media'],[1,'completo']]
    const tamanos = ['carta','oficio']
    const multiplicidad = [[2,'duplicado'],[3,'triplicado'],[4,'cuadruplicado'],[1,'simple']]

    moldes.forEach((molde)=>{
        tamanos.forEach( tamano => {
            multiplicidad.forEach((mult)=>{
                listasDePrecios(cantidades, molde[0], mult[0], `${molde[1]}-${tamano}-${mult[1]}`)
            })
        })
        
    })
}
valores()


//Funcion que devuelve un objeto con todos los calculos asociaciados al precio.
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
    const valorDeCorteOperacionesMenores = 500 //En terminos de cantidad
    
    const tirajeUtil = cantidad / moldes * multiplicidad

    const costoDeOperacionesMenores = tirajeUtil % valorDeCorteOperacionesMenores === 0 ? pagoOperacionesMenores * tirajeUtil / valorDeCorteOperacionesMenores : pagoOperacionesMenores * parseInt(tirajeUtil / valorDeCorteOperacionesMenores + 1)
    
    const talonarios = cantidad / unTal
    const tirajeReal = tirajeUtil + sobrantes * multiplicidad
    const costoPapel = costoResma / hojasResma * tirajeReal
    const costoDiseno = valorDiseno
    const costoImpresion = tirajeReal * costoTinta
    const costoManoDeObra = costoDeOperacionesMenores
    const costoAlzado = costoDeOperacionesMenores
    const costoPerforado = costoDeOperacionesMenores
    const costoTerminado = costoDeOperacionesMenores
    const costoSeparado = costoDeOperacionesMenores
    const costoCorcheteado = costoDeOperacionesMenores
    const costoCorte =  costoDeOperacionesMenores
    
    const costoOperacional = costoDiseno + costoPapel + costoImpresion + costoManoDeObra + costoAlzado + costoPerforado + costoTerminado + costoSeparado + costoCorcheteado + costoCorte
    const costoTotal = costoOperacional * (1 + gg / 100)
    const precioDeVenta = Math.ceil((costoTotal * (1 + utilidad / 100) + impuesto / 100 * costoTotal * utilidad / 100) / 100) * 100
    const precioUnitario = parseInt(precioDeVenta/talonarios)
    
    // console.log(`costoTotal/talonarios = ${costoTotal}:${talonarios} = ${costoTotal/talonarios}`)


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
        precioDeVenta,
        precioUnitario
    }
}



function listasDePrecios(cantidades, moldes, multiplicidad, htmlId) {
    console.log(typeof(htmlId));
    let el = document.getElementById(htmlId)
    if (el){
        console.log(el)
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
                    <td class="lista__td">${$cl(valor.precioUnitario)}</td>
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

