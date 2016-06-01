var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var context = path.resolve(__dirname, './src');

module.exports = {
    context: context,
    entry: {
        'app': './main.ts',
        'vendor': './vendor.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    resolve: {
        cache: true,
        root: path.resolve(__dirname),
        modulesDirectories: ['node_modules'],
        extensions: ['', '.ts', '.js', '.json', '.less', '.css', '.html']
    },
    resolveLoader: {
        alias: {
            'component-style-loader': path.resolve(context, './loaders/component-style-loader.js')
        }
    },
    /* You can use 'eval' here to speed things up, but we should use 'source-map' in production. */
    devtool: 'source-map',
    debug: true,
    module: {
        loaders: [
            // Support LESS compilation into style tag
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('css-loader!less-loader'),
                include: [
                    path.resolve(context, './less'),
                    path.resolve('node_modules')
                ]
            },

            // Support LESS compilation and injection for components
            {
                test: /\.less$/, loader: 'component-style-loader!css-loader!less-loader',
                exclude: [
                    path.resolve(context, './less'),
                    path.resolve('node_modules')
                ]
            },

            // Support css files
            {test: /\.css$/, loader: 'style-loader!css-loader'},

            // Support HTML injection for components
            {test: /\.html$/, loader: 'html-loader'},

            // Support typescript compilation
            {test: /\.ts$/, loader: 'ts-loader'},

            // Support bundling images
            {
                test: /\.(png|jpg|gif)$/, loader: 'file-loader',
                exclude: [
                    // Ignoring assets images because they get copied over
                    path.resolve(context, './assets')
                ]
            },

            // Support translations and other json files
            {test: /\.json$/, loader: 'json-loader'},

            // Support bundling fonts
            {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=100000'},
            {test: /\.ttf(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader'},
            // Customized query for font-awesome
            {test: /\.eot(\?#iefix)?((\?|&)v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader'},
            {test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader'}
        ],
        // Ignore these as we don't need to compile the distributables
        noParse: [/.+zone\.js\/dist\/.+/, /.+angular2\/bundles\/.+/, /angular2-polyfills\.js/]
    },
    'html-minify-loader': {
        empty: true,
        dom: {
            lowerCaseAttributeNames: false
        }
    },
    ts: {
        transpileOnly: true
    },
    plugins: [
        // Dedupe modules in the output
        new webpack.optimize.DedupePlugin(),

        // Assign the module and chunk ids by occurrence count
        new webpack.optimize.OccurenceOrderPlugin(),

        new CopyWebpackPlugin([
            // Copy src assets before lib assets, because the lib copy won't overwrite them
            { from: path.resolve(context, './assets'), to: 'assets/' },
            { from: path.resolve('vendor/'), to: 'vendor/'}
        ])
    ]

};
