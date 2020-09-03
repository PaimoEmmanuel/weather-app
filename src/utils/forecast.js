const request = require('request');

const forecast = (lat, long, callback) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=342e8c6ca606698f224109703aedd562`;

    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback("Unable to connect to weather forecast service", undefined);
        } else if (body.message) {
            callback(body.message, undefined);
        } else {
            callback(undefined, {
                location: body.name,
                country: body.sys.country,
                temperature: body.main.temp,
                humidity: body.main.humidity
            })
        }
    });
}
module.exports = forecast;