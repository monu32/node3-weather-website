//console.log('Client side javascript file is loaded!')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const output = document.querySelector('#output')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const address = search.value

    fetch('/weather?address='+address).then((response) => {
        response.json().then((data) => {
            if (data.error) 
                output.textContent=data.error
             else 
              output.textContent=[data.latitude,data.longitude,data.placeName]
        })
    })
})