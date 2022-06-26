const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=ec7f575028c94f81e492b5da44422dca&query=${latitude},${longitude}&units=m`
    request({url, json:true}, (error, {body}) => {
        if(error) {
            callback('Unable to reach weather service!', undefined)
        } else if(body.error) {
            callback('Coordinate error, please use valid coordinates!', undefined)
        } else {
            callback(undefined,
                `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degree temperature and feels like ${body.current.feelslike} degree. We have a humidity of ${body.current.humidity}%.`
            )
        }
    })

}

module.exports = forecast