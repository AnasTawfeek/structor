var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = [
    {
        name: "browser",
        entry: {
            main: './src/application/main.js',
            //docs: './src/client/src/docs.js',
        },
        output: {
            path: './static',
            filename: '[name].js'
        },
        module: {
            loaders: [
                { test: /\.js$/, exclude: /node_modules/, loader: 'babel',
                    query: {
                        cacheDirectory: true,
                        presets: ['react', 'es2015', 'stage-0'],
                        plugins: ['transform-object-assign', 'add-module-exports']
                    }
                },
                { test: /\.css$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
                { test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)([\?]?.*)$/, exclude: /node_modules/, loader: 'url-loader' }
            ]
        },
        plugins: [
            new ExtractTextPlugin("styles.css"),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
            new webpack.DefinePlugin({
                "process.env": {
                    NODE_ENV: JSON.stringify("production")
                }
            })
        ],
        externals: {
            "jquery": "jQuery"
        }
    }
];

