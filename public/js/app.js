//console.log('Client side javascript file is loaded!')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const address = search.value

    fetch('/weather?address='+address).then((response) => {
        response.json().then((data) => {
            if (data.error) 
                console.log("Error")
             else 
                console.log(data)
        })
    })
})