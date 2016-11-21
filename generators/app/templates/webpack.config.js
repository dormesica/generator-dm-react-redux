const path = require('path');
const webpack = require('webpack');

const debugModeEnabled = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './src/index.jsx'
    ],
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: 'bundle.js'
    },
    devtool: debugModeEnabled ? 'inline-sourcemap' : null,
    module: {
        loaders: [
            {
                test: /\.js[x]?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devServer: {
        contentBase: __dirname,
        hot: true,
        historyApiFallback: true
    },
    plugins: debugModeEnabled ? [
        new webpack.HotModuleReplacementPlugin()
    ] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
    ]
};
