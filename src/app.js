const path = require('path')
// import express to create a new express application
const express = require('express')
const hbs = require('hbs')

// stores the created express application in a variable
const app = express()

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for Express configs
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '/templates/views')
const partialsPath = path.join(__dirname, '/templates/partials')

//Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath )
hbs.registerPartials(partialsPath)

// use is used to customize server
// Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Art'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Art'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        message: 'Need Help? Wrong route',
        name: 'Art'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({error: 'You must provide an address'})
    }

    const address = req.query.address

    geocode(address, (error, {latitude, longitude, location}={}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            
            res.send({location, forecast: forecastData, address })
        })
    })

})

app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({products:[]})
})

app.get('/help/*', (req,res)=>{
    res.render('404', {
        title: '404 - Not Found!',
        name: 'Art',
        errorMessage: 'Could not find the page.'
        
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 - Not Found!',
        errorMessage: 'Could not find the page.',
        name: 'Art'
    })
})

// configuring what the app should do when get is called on this route
// app.get('', (req, res) => {
//     res.send('<h1>Hello World!</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{name: "Art", age: 32}, {name: "Fart", age: 33}])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1 style="color:red;">About page</h1>')
// })


// starts the server and listens to a specific port
app.listen(3000,()=>{
    console.log('Server is running on Port: ' + 3000)
})