let questao = 0
let value1
let value2
let questoes = Array()
// let timer = 0

// function timerInicio() {
//     setInterval(function() {
//         timer++
    
//         document.querySelector('#timer').innerHTML = timer
//         if (document.querySelector('#pronto').hasAttribute('hidden')) {
//         }
//         let tela = new Date().
//         console.log()
//     }, 1000);
// }

document.querySelector('#pronto').addEventListener('click',function(e) {

    e.preventDefault()
    // if (questao == 0) {
    //     timerInicio()
    // }

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
    
        document.querySelector('#resp').removeAttribute('hidden')
        document.querySelector('#questaoNumber').innerHTML = `Questão ${questao}`
        document.querySelector('#calculo').innerHTML = `${Math.round(value1)} + ${Math.round(value2)}`
    
        let result = {

            questaoNumber: questao,
            resp: document.querySelector('#resp').value,
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

        questoes[19].resp = document.querySelector('#resp').value
        let acertos = 0

        for (let i = 0; i < questoes.length; i++) {
            acertos += questoes[i].resp == questoes[i].valor1 + questoes[i].valor2 ? 1 : 0
        }
        console.log(questoes)
        document.querySelector('#resp').setAttribute('hidden','true')
        document.querySelector('#pronto').setAttribute('hidden','true')
        document.querySelector('#questaoNumber').innerHTML = `Resultado`
        document.querySelector('#calculo').innerHTML = `Você acertou ${acertos}/20`
    }
})