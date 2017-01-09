"use strict";

const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: path.resolve("./src"),

    entry: {
        vendor: [ "jquery" ],
        nmr: [ "./nmr/index.js", "./nmr/resource/index.less" ],
        // todo: [ "./todo/index.js" ]
    },

    output: {
        path: path.resolve("./assets"),
        publicPath: "/assets",
        filename: "[name]/bundle.js"
    },

    resolve: {
        extensions: [ "", ".js", ".less" ]
    },

    devtool: "source-map",

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: [ "babel" ],
                include: path.join(__dirname, 'src/')
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),

        new webpack.NoErrorsPlugin(),

        new webpack.ProvidePlugin({
            "$": "jquery"
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.js",
            minChunks: Infinity
        }),

        new ExtractTextPlugin("./[name]/resource/bundle.css")
    ],

    devServer: {
        proxy: {
            "/api/*": {
                "target": {
                  "host": "music.163.com",
                  "protocol": 'http:',
                  "port": 80
                },
                ignorePath: false,
                changeOrigin: true,
                secure: false,
                // headers: {
                //     "Referer": "http://music.163.com"
                // }
            }
        }
    }
};
