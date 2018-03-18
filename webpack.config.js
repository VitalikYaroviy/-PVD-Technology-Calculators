const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    source: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
};

module.exports = {
    entry: [PATHS.source + '/index.js', PATHS.source + '/currencyTranslate'],
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: PATHS.source + '/index.pug'
        })
    ],
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            },
            {
                test: /\.css/,
                loader: 'style-loader!css-loader!stylus-loader'
            }
        ]
    }
};