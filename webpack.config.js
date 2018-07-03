const path = require("path");

module.exports= {
    mode:"development",
    entry: {
        main: "./src/main.js",
        renderWorker:"./src/renderWorker.ts"
    },
    devtool:"source-map",
    output:{
        path: path.resolve(__dirname, "build"),
        filename: "[name].js"
    },
    resolve: {
            extensions: [".ts", ".tsx", ".js"]
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader"
                }
            ]
        }
};