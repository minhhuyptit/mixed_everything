process.noDeprecation = true;
require("dotenv").config();
var path = require("path");
var webpack = require("webpack");

var config = {
    mode: "development",
    watch: process.env.NODE_ENV === "local" ? true : false,
    entry: "./frontend/modules/dashboard/assets/js/dashboard.js",
    output: {
        sourceMapFilename: "vendor.js.map",
        path: path.resolve("public/modules/vendors/assets/js"),
        publicPath: "/dist/",
        filename: "vendor.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 100000
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"],
                            plugins: ["transform-class-properties"]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]?[hash]"
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    },
                    {
                        loader: "sass-loader" // compiles Sass to CSS
                    }
                ]
            },
            {
                test: /\.tpl.html$/,
                use: "raw-loader"
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".vue", ".json"],
        alias: {
            Vue: "vue/dist/vue.esm-bundler.js",
            $: "jquery",
            "@": path.resolve("frontend")
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    devtool: "source-map"
};

if (process.env.NODE_ENV === "production") {
    config.plugins = (config.plugins || []).concat([
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]);
}
const VueLoaderPlugin = require("vue-loader/lib/plugin");
config.plugins = [new VueLoaderPlugin()];

module.exports = config;
