var webpack = require('webpack');
module.exports = {
    entry: {
        app: ['./app/main.jsx'],
    },
    output: {
        path: './assets/build/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
            //{ test: /\.svg$/, loader: 'file-loader', path: './assets/build/' },
            { test: /\.svg$/, loader: 'url-loader?limit=8192' }
        ]
    },
    plugins: []
}