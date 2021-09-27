const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=&query='+latitude+','+longitude
    request({ url, json: true }, (error,response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.error) {
            callback('Unable to find location', undefined)
        } else {
            callback("",{place_name:response.body.location.name,region:response.body.location.region,country:response.body.location.country})
        }
    })
}

module.exports = forecast