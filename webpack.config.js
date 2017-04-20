var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve("dist"),
        filename: "index.js"
    },
    module: {
        loaders:[
            {
                test: /\.ts|\.tsx/,
                loader: 'ts-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inlineSource: '.(js|css)$',
            template: 'src/index.html',
            alwaysWriteToDisk: true,
            cache: false
        }),
        new HtmlWebpackInlineSourcePlugin(),
        new HtmlWebpackHarddiskPlugin()
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    }
};