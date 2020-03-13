const request = require('request')

const foreCast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/dbf22779710ffcd1abf857bc15bdb7ba/' + latitude + ','+ longitude +'?units=si'
    request({ url, json: true}, (error,response,{currently, daily, error: weatherError}) => {
        if(error){
            callback('Weather Sevice Unavailable', undefined)
        }else if(weatherError){
            callback('Unable to find location', undefined)
        }
        else{
            const temp = currently.temperature
            const rain = currently.precipProbability
            callback(undefined, daily.data[0].summary + ' The temperature is ' + temp + 'C° and there is ' + rain + '% chance of rain')
        }
    })
}

module.exports = foreCast