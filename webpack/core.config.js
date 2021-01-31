process.noDeprecation = true;
require("dotenv").config();
var path = require("path");
var webpack = require("webpack");

var config = {
    mode: "development",
    watch: process.env.NODE_ENV === "local" ? true : false,
    entry: "./frontend/modules/vendors/vendor-main.js",
    output: {
        sourceMapFilename: "vendor.js.map",
        path: path.resolve("public/modules/vendors/assets/js"),
        publicPath: "/dist/",
        filename: "vendor.js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 100000,
                        },
                    },
                ],
            },
            {
                test: /\.js$/, //Regular expression 
                exclude: /(node_modules|bower_components)/,//excluded node_modules 
                use: {
                loader: "babel-loader", 
                options: {
                  presets: ["@babel/preset-env"]  //Preset used for env setup
                 }
                }
            },
            // {
            //     test: /\.js$/,
            //     use: [
            //         {
            //             loader: "babel-loader",
            //             options: {
            //                 presets: ["@babel/preset-env", "@babel/es2015"],
            //                 plugins: [
            //                     "transform-es2015-arrow-functions",
            //                     "transform-es2015-object-super",
            //                 ],
            //             },
            //         },
            //     ],
            // },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: "vue-loader",
                        options: {
                            scss: "vue-style-loader!css-loader!sass-loader",
                            sass:
                                "vue-style-loader!css-loader!sass-loader?indentedSyntax",
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]?[hash]",
                },
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader", // creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader", // translates CSS into CommonJS
                    },
                    {
                        loader: "sass-loader", // compiles Sass to CSS
                    },
                ],
            },
            {
                test: /\.tpl.html$/,
                use: "raw-loader",
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".vue", ".json"],
        alias: {
            Vue: "vue/dist/vue.esm-bundler.js",
            vue: "@vue/runtime-dom",
            $: "jquery",
            "@": path.resolve("frontend"),
        },
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
    },
    performance: {
        hints: false,
    },
    devtool: "source-map",
};

if (process.env.NODE_ENV === "production") {
    config.plugins = (config.plugins || []).concat([
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: '"production"',
            },
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                warnings: false,
            },
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
        }),
    ]);
}

module.exports = config;
