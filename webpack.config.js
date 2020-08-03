const path = require("path")
const { merge } = require("webpack-merge")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const parts = require("./webpack.parts")

const webappSrcDir = path.resolve(__dirname, "src/webapp")
const buildDir = path.resolve(__dirname, "src/main/resources/static/js")

const commonConfig = merge([
    {
        entry: {
            app: webappSrcDir + '/index.js'
        },
        output: {
            path: buildDir,
            filename: 'index.js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: "Conway's Game of Life",
                template: "./src/webapp/template.html"
            })
        ]
    },
    parts.loadJavaScript({ include: webappSrcDir })
])

const productionConfig = merge([])

const developmentConfig = merge([
    parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT
    })
])

module.exports = mode => {
    if (mode === "production") {
        return merge(commonConfig, productionConfig, { mode })
    }

    return merge(commonConfig, developmentConfig, { mode })
}