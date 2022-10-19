var urlAtual = window.location.href
var urlClass = new URL(urlAtual)
var mode = urlClass.searchParams.get("mode")

document.querySelector('#calculo').innerHTML = mode == 'endless' ? 'Modo Infinito' : 'Jogo rápido'

let questao = 0
let endTimer = false
let value1
let value2
let sinal
let sinalmath
let questoes = Array()

if (mode != 'endless') {

    document.querySelector('#pronto').addEventListener('click',function(e) {
    
        e.preventDefault()
    
        if (questao < 20) {
    
            questao += 1
            value1 = 50
            value2 = 50
        
            while (value1 > 25) {
    
                value1 = Math.random() * 100
            }
            while (value2 > 25) {
    
                value2 = Math.random() * 100
            }
            
            sinal = Math.random() * 100
            if (sinal < 33) { sinal = 'x' } else if (sinal < 66) { sinal = 'x' } else { sinal = '+' }

            document.querySelector('#resp').removeAttribute('hidden')
            document.querySelector('#questaoNumber').innerHTML = `Questão ${questao}`
            document.querySelector('#calculo').innerHTML = `${Math.round(value1)} ${sinal} ${Math.round(value2)}`
        
            let result = {
    
                questaoNumber: questao,
                resp: document.querySelector('#resp').value,
                sinal: sinal,
                valor1: Math.round(value1),
                valor2: Math.round(value2)
            }
            questoes.push(result)
        
            for (let i = 0; i < questoes.length; i++) {
    
                if (i + 1 == questoes.length && questoes.length > 1) {
    
                    questoes[i - 1].resp = document.querySelector('#resp').value
                }
            }
            document.querySelector('#resp').value = ''
        } else {
    
            if (questao > 20) {
                
                printResult()
            } else {
    
                questao += 1
                let acertos = 0
                questoes[questoes.length - 1].resp = document.querySelector('#resp').value
        
                for (let i = 0; i < questoes.length; i++) {
                    if (questoes[i].sinal == '+') {
                        acertos += questoes[i].resp === questoes[i].valor1 + questoes[i].valor2 ? 1 : 0
                    } else if (questoes[i].sinal == '-') {
                        acertos += questoes[i].resp === questoes[i].valor1 - questoes[i].valor2 ? 1 : 0
                    } else {
                        acertos += questoes[i].resp === questoes[i].valor1 * questoes[i].valor2 ? 1 : 0
                    }
                }
                document.querySelector('#resp').setAttribute('hidden','true')
                document.querySelector('#pronto').innerHTML = 'Mostrar respostas'
                document.querySelector('#questaoNumber').innerHTML = `Resultado`
                document.querySelector('#calculo').innerHTML = `Você acertou ${acertos}/${questoes.length}`
            }
        }
    })
} else {
    document.querySelector('#pronto').addEventListener('click',function(e) {
        
        e.preventDefault()
        if (questao == 1) {
            
            let btn = document.createElement("button")
            btn.id = 'term'
            btn.classList.add('text-white','btn','btn-outline-secondary','bg-danger','m-2')
            btn.setAttribute('onclick','end()')
            btn.innerHTML = 'Terminar'
            document.querySelector('#nav').insertBefore(btn,document.querySelector('#timer'))
        }

        questao += 1
        value1 = 50
        value2 = 50
    
        while (value1 > 25) {

            value1 = Math.random() * 100
        }
        while (value2 > 25) {

            value2 = Math.random() * 100
        }

        sinal = Math.random() * 100
        
        if (sinal < 33) { sinal = 'x' } else if (sinal < 66) { sinal = '-' } else { sinal = '+' }

        document.querySelector('#resp').removeAttribute('hidden')
        document.querySelector('#questaoNumber').innerHTML = `Questão ${questao}`
        document.querySelector('#calculo').innerHTML = `${Math.round(value1)} ${sinal} ${Math.round(value2)}`
    
        let result = {

            questaoNumber: questao,
            resp: document.querySelector('#resp').value,
            sinal: sinal,
            valor1: Math.round(value1),
            valor2: Math.round(value2)
        }
        questoes.push(result)
    
        for (let i = 0; i < questoes.length; i++) {

            if (i + 1 == questoes.length && questoes.length > 1) {

                questoes[i - 1].resp = document.querySelector('#resp').value
            }
        }
        document.querySelector('#resp').value = ''
    })
}

function end() {

    endTimer = true
    questoes[questoes.length - 1].resp = document.querySelector('#resp').value
    questoes.pop()
    let acertos = 0

    for (let i = 0; i < questoes.length; i++) {

        if (questoes[i].sinal == '+') 
            acertos += questoes[i].resp === questoes[i].valor1 + questoes[i].valor2 ? 1 : 0
        else if (questoes[i].sinal == '-')
            acertos += questoes[i].resp === questoes[i].valor1 - questoes[i].valor2 ? 1 : 0
        else
            acertos += questoes[i].resp === questoes[i].valor1 * questoes[i].valor2 ? 1 : 0
    }
    document.querySelector('#term').setAttribute('hidden','true')
    document.querySelector('#resp').setAttribute('hidden','true')
    document.querySelector('#pronto').setAttribute('hidden','true')
    document.querySelector('#questaoNumber').innerHTML = `Resultado`
    document.querySelector('#calculo').innerHTML = `Você acertou ${acertos}/${questoes.length}`

    let mostrarResult = document.createElement("button")
    mostrarResult.classList.add('text-black','btn','btn-outline-secondary','bg-white','m-2')
    mostrarResult.setAttribute('onclick','printResult()')
    mostrarResult.innerHTML = 'Mostrar respostas'
    document.querySelector('#print').appendChild(mostrarResult)
}

function printResult() {

    endTimer = true
    document.querySelector('#print').innerHTML = ''
    document.querySelector('#print').classList.remove('d-flex')
    document.querySelector('#main').classList.remove('border','d-flex')
    document.querySelector('body').classList.remove('align-items-center')

    for (let i = 0; i < questoes.length; i++) {
        
        let div = document.createElement("div")
        let div2 = document.createElement("div")
        let questao = document.createElement('h3')
        let calculo = document.createElement('h5')
        let resultado = document.createElement('h5')
    
        div.classList.add('m-5','border','border-white','p-5')
        div2.classList.add('d-flex','justify-content-around','align-items-center')
        questao.classList.add('bg-white','m-3','text-center')
        calculo.classList.add('text-white','m-3','p-2')
        resultado.classList.add('text-white','m-3','p-2')

        if (questoes[i].sinal == '+') {
            if (questoes[i].valor1 + questoes[i].valor2 === questoes[i].resp) {
                calculo.classList.add('bg-success')
                resultado.classList.add('bg-success')
            } else {
                calculo.classList.add('bg-danger')
                resultado.classList.add('bg-danger')
            }
        } else if (questoes[i].sinal == '-') {
            if (questoes[i].valor1 - questoes[i].valor2 === questoes[i].resp) {
                calculo.classList.add('bg-success')
                resultado.classList.add('bg-success')
            } else {
                calculo.classList.add('bg-danger')
                resultado.classList.add('bg-danger')
            }
        } else {
            if (questoes[i].valor1 * questoes[i].valor2 === questoes[i].resp) {
                calculo.classList.add('bg-success')
                resultado.classList.add('bg-success')
            } else {
                calculo.classList.add('bg-danger')
                resultado.classList.add('bg-danger')
            }
        }

        if (questoes[i].sinal == '+') {
            calculo.innerHTML = `${questoes[i].valor1} + ${questoes[i].valor2} = ${questoes[i].valor1 + questoes[i].valor2}`
        } else if (questoes[i].sinal == '-') {
            calculo.innerHTML = `${questoes[i].valor1} - ${questoes[i].valor2} = ${questoes[i].valor1 - questoes[i].valor2}`
        } else {
            calculo.innerHTML = `${questoes[i].valor1} x ${questoes[i].valor2} = ${questoes[i].valor1 * questoes[i].valor2}`
        }
        questao.innerHTML = `Questão ${questoes[i].questaoNumber}`
        resultado.innerHTML = `Resposta = ${questoes[i].resp}`

        document.querySelector('#print').appendChild(div)
        div.appendChild(questao)
        div.appendChild(div2)
        div2.appendChild(calculo)
        div2.appendChild(resultado)
    }
}

function começarTimer(inicial, display) {
    var timer = inicial, minutos, segundos
    setInterval(function () {
        minutos = parseInt(timer / 60, 10)
        segundos = parseInt(timer % 60, 10)
        minutos = minutos < 10 ? "0" + minutos : minutos
        segundos = segundos < 10 ? "0" + segundos : segundos
        display.textContent = minutos + ":" + segundos
        console.log(endTimer)
        if (!endTimer) {
            timer++
        }
    }, 1000)
}
window.onload = function () {
    var inicial = 0
    começarTimer(inicial, document.querySelector('#timer'))
}