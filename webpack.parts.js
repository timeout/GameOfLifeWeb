exports.devServer = ({ host, port } = {}) => ({
    devServer: {
        stats: "errors-only",
        host, // Defaults to `localhost`
        port, // Defaults to 8080
        open: true,
        overlay: true,
    },
});

exports.loadJavaScript = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                include,
                exclude,
                use: "babel-loader"
            }
        ]
    }
})