const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {

    entry: './src/index.tsx',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'grabAColdOne-bundle.js' 
    },

    mode: "production",

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx"]
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },

    // Avoid bundling dependencies to reduce bundle size, template will include these via a cdn
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/bundleTemplate.html',
            filename: 'index.html'
        })
    ]
};