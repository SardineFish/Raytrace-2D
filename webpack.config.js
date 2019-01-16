const path = require("path");

module.exports= {
    mode:"development",
    entry: {
        main: "./src/main.ts",
        renderWorker: "./src/renderWorker.ts",
        testWorker: "./src/testWorker.ts",
        userLib:"./src/user-lib/user-lib.ts",
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