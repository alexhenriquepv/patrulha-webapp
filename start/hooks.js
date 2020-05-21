const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
    
    const View = use('View')
    const moment = use('moment')

    View.global('moment', (date_str, custom_format) => {
        return moment(date_str).format(custom_format)
    })

    View.global('maps_url', (coordinate_str) => {
        // longitude, latitude
        const coords = coordinate_str.split(';')
        const url = `https://www.google.com/maps/search/?api=1&query=${coords[1]},${coords[0]}`
        return url
    })
})