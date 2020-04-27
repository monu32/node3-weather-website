const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'MONU VISHWAKARMA'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'MONU VISHWAKARMA'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'MONU VISHWAKARMA'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address)
     { 
        if(!req.query.latitude || !req.query.longitude)
              return res.send("Error Occurs")
        else 
         {
          forecast(req.query.latitude,req.query.longitude,(error,data)=>{
             if(error)
              return res.send("Error")

              res.send(data) 
         })
         }  
     }
    else 
      {
        geocode(req.query.address,(error,data)=>{
            return res.send(data)
        })
      } 
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'MONU VISHWAKARMA',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'MONU VISHWAKARMA',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})