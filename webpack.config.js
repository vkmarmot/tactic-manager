// eslint-disable-next-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const rules = require("./webpack.rules");

rules.push({
    test: /\.css$/,
    use: [{ loader: "style-loader" }, { loader: "css-loader" }]
});

module.exports = {
    // Put your normal webpack config below here
    mode: "development",
    entry: "./src/renderer.tsx",
    module: { rules },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "bundle.js"
    },
    resolve: { extensions: [".ts", ".tsx", ".js", ".jsx"] },
    plugins: [new HtmlWebpackPlugin({ template: "src/index.html" })]
};
