let questao = 0
let value1
let value2
let questoes = Array()

document.querySelector('#pronto').addEventListener('click',function(e) {

    e.preventDefault()
    
    
    questao += 1
    value1 = 50
    value2 = 50

    while (value1 > 25) {
        value1 = Math.random() * 100
    }
    while (value2 > 25) {
        value2 = Math.random() * 100
    }

    document.querySelector('#resp').removeAttribute('hidden')
    document.querySelector('#questaoNumber').innerHTML = `Questão ${questao}`
    document.querySelector('#calculo').innerHTML = `${Math.round(value1)} + ${Math.round(value2)}`

    let result = {
        questaoNumber: questao,
        resp: document.querySelector('#resp').value,
        result: Math.round(value1) + Math.round(value2)
    }

    questoes.push(result)

    for (let i = 0; i < questoes.length; i++) {
        if (i + 1 == questoes.length && questoes.length > 1) {
            questoes[i - 1].resp = document.querySelector('#resp').value
        }
    }
})