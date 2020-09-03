const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require("./utils/geocode");
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;
//Define path for express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicPath));

app.get("", (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Paimo Emmanuel"
    });
});

app.get("/about", (req, res) => {
    res.render('about', {
        title: "About me",
        name: "Paimo Emmanuel"
    });
});

app.get("/help", (req, res) => {
    res.render('help', {
        message: "We will help you here",
        title: "Help",
        name: "Paimo Emmanuel"
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address query"
        });
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                address: req.query.address,
                location,
                forecast: forecastData
            })
            //console.log(`${location}`, JSON.stringify(forecastData));
        });
    });
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query);
    res.send({
        products: []
    })
});

app.get('/help/*', (req, res) => {
    res.render('NotFound', {
        message: 'Help article not found'
    });
});
app.get('*', (req, res) => {
    res.render('NotFound', {
        message: 'Page article not found'
    })
})
app.listen(port, () => {
    console.log('Express is running on port ' + port);
});