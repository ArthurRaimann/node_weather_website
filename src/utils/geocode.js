const request = require('postman-request')

const geocode = (address, callback) => {
    const encodedAddress = encodeURIComponent(address)
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?language=de&limit=1&access_token=pk.eyJ1IjoiYXJtb25rZXkiLCJhIjoiY2wxcXF2d2s4MGR0NjNmbnV3dzB4N2dhYiJ9.q47Lqrkx2zqEHCsMT_pBOw`

    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connet to location service!', undefined)
        } else if(body.features?.length === 0) {
            callback('Unable to find location, try another search!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name_de
            })
        }
    })
}

module.exports = geocode