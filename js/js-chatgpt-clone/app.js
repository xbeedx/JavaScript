const API_KEY = '' //
const submitButton = document.querySelector('#submit')
const outPutElement = document.querySelector('#output')
const inPutElement = document.querySelector('input')
const historyElement = document.querySelector('.history')
const buttonElement = document.querySelector('button')

function changeInput(value) {
    const inputElement = document.querySelector('input')
    inputElement.value = value
}

async function getMessage() {
    const options = {
        method: 'POST',
        headers: {
            "authorization_type": "bearer",
            "verification_tokens": {
                "openai": "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"
            },
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: inPutElement.value}]
        })
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        console.log(data)
        outPutElement.textContent = data.choices[0].message.content
        if(data.choices[0].message.content && inPutElement.value){
            const pElement = document.createElement('p')
            pElement.textContent = inPutElement.value
            pElement.addEventListener('click',()=> changeInput(pElement.textContent))
            historyElement.append(pElement)
        }
    } catch(error) {
        console.log(error)
    }
}

submitButton.addEventListener('click',getMessage)

function clearInput() {
    inPutElement.value = ''
}

buttonElement.addEventListener('click',clearInput)