const request = require('request')

const geoCode = (adress, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=pk.eyJ1Ijoia2xpbWUiLCJhIjoiY2s3YW05OTJsMTB0YjNtcGpxbHFqZDRzeiJ9.r6zvhRnfWYMou28Mg3xWaA&limit=1'
    request({ url, json: true}, (error, response, {features} = {}) => {
        if(error){
            callback('Unable to connect to locaton services!', undefined)
        }else if(features.length === 0){
            callback('Unable to find location. Try another search.', undefined)
        }else{
            callback(undefined, {
                longitude: features[0].center[0],
                latitude: features[0].center[1],
                location: features[0].place_name
            })
        }
    })
}

module.exports = geoCode