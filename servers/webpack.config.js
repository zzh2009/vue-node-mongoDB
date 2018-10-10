var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: './app.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename:'js/bundle.js'
    },
    module: {
        rules: [

        ]
    }
}




