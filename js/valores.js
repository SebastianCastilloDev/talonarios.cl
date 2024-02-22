
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
    let costoResma = null //va a cambiar de acuerto al tamaño de papel
    const costoTinta = 3
    const pagoManoDeObraImpresion = 1600 //por cada (valordecorteoperacionemenores) tiros 
    const pagoOperacionesMenores = 25 //por talonario
    const pagoAlzado = 1000  
    const pagoPerforado = 500

    const tirajeDeCorte = 1000 //
    
    return {
        sobrantes,
        unTal,
        valorDiseno,
        gg,
        utilidad,
        impuesto,
        hojasResma,
        costoTinta,
        pagoManoDeObraImpresion,
        pagoOperacionesMenores,
        pagoAlzado,
        pagoPerforado,
        tirajeDeCorte
    }

}

// cantidades = [50,100,200,500,1000,2000,2500,3000,4000,5000]
let cantidades = [50,100,200,500,1000,2000,2500,3000,4000,5000]

// Función que se encarga de imprimir los valores en el HTMl, con el html creado en la funcion listasDePreciosHTML
function valores() {
    const moldes = [[4,'cuarto'],[2,'media'],[1,'completo']]
    const tamanos = ['carta','oficio']
    const multiplicidad = [[2,'duplicado'],[3,'triplicado'],[4,'cuadruplicado'],[1,'simple']]
    let costoResma = 0
    moldes.forEach((molde)=>{
        if (molde[1]=='completo') {
            cantidades = [50,100,150,200, 250,500,1000, 1500,2000,2500,3000,4000,5000]
        }
        tamanos.forEach( tamano => {
            if (tamano == 'carta') {
                costoResma = 6200
            } else if (tamano == 'oficio') {
                costoResma = 7300
            }
            multiplicidad.forEach((mult)=>{
                listasDePreciosHTML(cantidades, molde[0], mult[0], `${molde[1]}-${tamano}-${mult[1]}`, costoResma)
            })
        })
        
    })
}
valores()


//Funcion que devuelve un objeto con todos los calculos asociaciados al precio.
function resultados(cantidad, moldes, multiplicidad, costoResma) {
    const {
        sobrantes,
        unTal,
        valorDiseno,
        gg,
        utilidad,
        impuesto,
        hojasResma,
        costoTinta,
        pagoManoDeObraImpresion,
        pagoOperacionesMenores,
        pagoAlzado,
        pagoPerforado,
        tirajeDeCorte
    } = getParameters()

    console.log(costoResma)
    
    const tirajeUtil = cantidad / moldes * multiplicidad

    
    const talonarios = cantidad / unTal
    const tirajeReal = tirajeUtil + sobrantes * multiplicidad
    const costoPapel = costoResma / hojasResma * tirajeReal
    const costoDiseno = valorDiseno
    const costoImpresion = tirajeReal * costoTinta

    const costoManoDeObraImpresion =    tirajeUtil % tirajeDeCorte === 0 ? 
                                        pagoManoDeObraImpresion * tirajeUtil / tirajeDeCorte : 
                                        pagoManoDeObraImpresion * parseInt(tirajeUtil / tirajeDeCorte + 1)

    const costoAlzado =                 tirajeUtil % tirajeDeCorte === 0 ? 
                                        pagoAlzado * tirajeUtil / tirajeDeCorte : 
                                        pagoAlzado * parseInt(tirajeUtil / tirajeDeCorte + 1)

    const costoPerforado =              tirajeUtil % tirajeDeCorte === 0 ? 
                                        pagoPerforado * tirajeUtil / tirajeDeCorte : 
                                        pagoPerforado * parseInt(tirajeUtil / tirajeDeCorte + 1)

    const costoTerminado = talonarios*pagoOperacionesMenores
    const costoSeparado = talonarios*pagoOperacionesMenores
    const costoCorcheteado = talonarios*pagoOperacionesMenores
    const costoCorte =  talonarios*pagoOperacionesMenores
    
    const costoOperacional = costoDiseno 
                            + costoPapel 
                            + costoImpresion 
                            + costoManoDeObraImpresion 
                            + costoAlzado 
                            + costoPerforado 
                            + costoTerminado 
                            + costoSeparado 
                            + costoCorcheteado 
                            + costoCorte
    const costoTotal = costoOperacional * (1 + gg / 100)
    const precioDeVenta = Math.ceil((costoTotal * (1 + utilidad / 100) + impuesto / 100 * costoTotal * utilidad / 100) / 100) * 100
    const precioUnitario = parseInt(precioDeVenta/talonarios)

    return {
        cantidad,
        tirajeUtil,
        tirajeReal,
        talonarios,
        costoPapel,
        costoDiseno,
        costoImpresion,
        costoManoDeObraImpresion,
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



function listasDePreciosHTML(cantidades, moldes, multiplicidad, htmlId, costoResma) {
    let el = document.getElementById(htmlId)
    if (el){
        let template = ''
        let valores = []
        cantidades.forEach(function (cantidad) {
            valores.push(resultados(cantidad, moldes, multiplicidad, costoResma))
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

