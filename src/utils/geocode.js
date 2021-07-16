const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibGVvbW9yZ2FkbyIsImEiOiJja3FpbWRobXgwMnhlMnZwOGc3c2o4MWZuIn0.C0yudaiLrw8wZB4mA0AzHw&limit=1`
    request( {url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            const {center, place_name:location} = response.body.features[0]
            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location
            });
        }
    });
}

module.exports = geocode;