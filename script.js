let lista_utenti = []

let bottone = document.querySelector('button')
bottone.onclick = () => salva_utente(prendi_input())

let div_utenti = document.querySelector('body div')

function Persona(nome ,cognome, citta, pasw, email){
    this.nome = nome
    this.cognome = cognome
    this.citta = citta
    this.pasw = pasw
    this.email = email
}

function appendi_persona(persona){
    lista_utenti.push(persona)
}

function salva_utente(lista_degli_input){
    if (!lista_degli_input.includes('')){
        let utente_da_aggiungere = new Persona(
            lista_degli_input[0],
            lista_degli_input[1],
            lista_degli_input[2],
            lista_degli_input[3],
            lista_degli_input[4]
            ) 
        appendi_persona(utente_da_aggiungere)
        mostra_persona(utente_da_aggiungere)
    }
}

function mostra_persona(persona){
    const elemento_div = document.createElement('div')
    const elemento_nome = document.createElement('p')
    elemento_nome.innerText = persona.nome
    const elemento_cognome = document.createElement('p')
    elemento_cognome.innerText = persona.cognome
    const elemento_citta = document.createElement('p')
    elemento_citta.innerText = persona.citta
    const elemento_pasw = document.createElement('p')
    elemento_pasw.innerText = persona.pasw
    const elemento_email = document.createElement('p')
    elemento_email.innerText = persona.email
    const elemento_bottone = document.createElement('button')
    elemento_bottone.addEventListener('click' , () => cancella(persona))
    elemento_bottone.innerHTML = 'cancella'
    elemento_div.appendChild(elemento_nome)
    elemento_div.appendChild(elemento_cognome)
    elemento_div.appendChild(elemento_citta)
    elemento_div.appendChild(elemento_pasw)
    elemento_div.appendChild(elemento_email)
    elemento_div.appendChild(elemento_bottone)
    div_utenti.appendChild(elemento_div)
}

function prendi_input(){
    let lista_inputs = document.querySelectorAll('body main input')
    let valori_input = []
    for (const iterator of lista_inputs) {
        if(valida_input(iterator.value ,iterator.name) && !iterator.value.includes('')){
            valori_input.push(iterator.value)
            iterator.style = 'border-bottom: 2px solid green'
        }else{
            iterator.style = 'border-bottom: 2px solid red'
            valori_input.push('')
        }
    }
    return valori_input
}

function valida_input(input_da_validare , tipo_di_input){
    const regexemail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    const regexcf = /[A-Z]{6}[0-9LMNPQRSTUV]{2}[A-Z]{1}[0-7LMNPQRST]{1}[0-9LMNPQRSTUV]{1}[A-Z]{1}[0-9LMNPQRSTUV]{3}[A-Z]{1}/;
    const regexpass = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm;
    const regexText = /^[a-zA-Z]*$/;
    switch (tipo_di_input) {
        case "nome":
            return regexText.test(input_da_validare)
        case "cognome":
            return regexText.test(input_da_validare) 
        case "citta":
            return regexText.test(input_da_validare)
        case "codice_fiscale":
            return regexcf.test(input_da_validare)
        case "pasw":
            return regexpass.test(input_da_validare)
        case "email":
            return regexemail.test(input_da_validare)
    }
}

function cancella(utente_da_cancellare){
    for (const iterator of lista_utenti) {
        if(iterator === utente_da_cancellare){
            let indice_da_cancellare = lista_utenti.indexOf(utente_da_cancellare)
            lista_utenti.splice(indice_da_cancellare, 1)
            div_utenti.querySelectorAll('div')[indice_da_cancellare].remove()
        }
    }
}
