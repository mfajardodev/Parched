const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {

    entry: './src/index.tsx',

    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: 'grabAColdOne-bundle.js' 
    },

    mode: 'production',

    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.js', '.ts', '.tsx', '.css', '.scss']
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', // creates style nodes from JS strings
                    'css-loader', // translates CSS into CommonJS
                    'sass-loader' // compiles Sass to CSS, using Node Sass by default
                ]

            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            }
        ]
    },

    // Avoid bundling dependencies to reduce bundle size, template will include these via a cdn
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'axios': 'axios'
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/bundleTemplate.html',
            filename: 'index.html'
        })
    ]
};