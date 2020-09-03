module.exports = [
    // Add support for native node modules
    {
        test: /\.node$/,
        use: "node-loader"
    },
    {
        test: /\.(m?js|node)$/,
        parser: { amd: false },
        use: {
            loader: "@marshallofsound/webpack-asset-relocator-loader",
            options: { outputAssetBase: "native_modules" }
        }
    },
    // Put your webpack loader rules in this array.  This is where you would put
    // your ts-loader configuration for instance:
    // /**
    //  * Typescript Example:
    //  *

    {
        test: /\.scss$/,
        exclude: /\.useable\.scss/,
        use: [{ loader: "style-loader" }, { loader: "css-loader?modules" }, { loader: "sass-loader" }]
    },
    {
        test: /\.tsx?$/,
        exclude: /(node_modules|.webpack)/,
        loaders: [{ loader: "babel-loader" }]
    }
    //  */
];
