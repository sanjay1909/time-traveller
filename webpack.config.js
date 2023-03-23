const HtmlWebpackPlugin = require('html-webpack-plugin');
const JSDocWebpackPlugin = require('jsdoc-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'timeTraveller.min.js',
        library: 'TimeTraveller',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new JSDocWebpackPlugin({
            conf: './jsdoc.conf.json',
        }),
    ],
};
