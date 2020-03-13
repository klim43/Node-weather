const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const foreCast = require('./utils/forecast')


const app = express()

//Define paths for express config
const pubblicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars into views directory. Than changes the views directory to the value of viewsPath
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory for server
app.use(express.static(pubblicDirectoryPath))

app.get('',(req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Kliment Georgiev'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Kliment Georgiev'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Kliment Georgiev'
    })
})

app.get('/weather', (req, res) => {
    address = req.query.address
    if(!address) {
        return res.send({
            error: 'Please provide adrress!'
        })
    }
    geoCode(address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error })
        }
        foreCast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }
            return res.send({
                forecast: forecastData,
                location: location,
                address
            })
        })

    })
})

app.get('*', (req, res) => {
    res.render('404')
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

// app.get('', (req, res) => {        //first case nothing'', second case help
//     res.send('Hello express')
// })

// app.get('/help', (req, res) => {
//     res.send('help page')
// })

// //app.com
// //app.com/help
// //app.com/about

// app.listen(3000, () => {
//     console.log('Server is running on port 3000.')
// })