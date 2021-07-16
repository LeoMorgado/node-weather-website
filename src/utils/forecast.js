const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=d098755c8f4b5a6bc2599b7b2067b263&query=${latitude},${longitude}`
    request( { url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (response.body.error) {
            callback(`${response.body.error.type}. ${response.body.error.info}`, undefined);
        } else {
            const {weather_descriptions: description, temperature, precip} = response.body.current;
            callback(undefined, `${description[0]}. It is currently ${temperature} degrees out. There is a ${precip} % chance of rain`)
        }
    })

}

module.exports = forecast;