var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var merge = require('webpack-merge');

var context = path.resolve(__dirname, './src');

var html5Mode = require('connect-history-api-fallback');

defaultWebpackConfig = require('./webpack.common.conf');

module.exports = merge(defaultWebpackConfig, {
    plugins: [
        // Generate common chunks if necessary
        new CommonsChunkPlugin({
            name: 'vendor',
            filename: '[name].js',
            minChunks: Infinity
        }),
        new CommonsChunkPlugin({
            name: 'common',
            filename: '[name].js',
            minChunks: 2,
            chunks: ['app', 'vendor']
        }),
        // Inject them into the index file
        new HtmlWebpackPlugin({
            title: 'Custom template',
            template: path.resolve(context, 'index.html'),
            favicon: path.resolve(context, 'favicon.ico'),
            inject: 'body',
            hash: true,
            chunksSortMode: function compare(a, b) {
                // Common always first
                if (a.names[0] === 'common') {
                    return -1;
                }
                // App always last
                if (a.names[0] === 'app') {
                    return 1;
                }
                // Vendor before app
                if (a.names[0] === 'vendor' && b.names[0] === 'app') {
                    return -1;
                } else {
                    // All other chunks come last
                    return 1;
                }
            }
        }),
        // Dedupe modules in the output
        new webpack.optimize.DedupePlugin(),

        // Assign the module and chunk ids by occurrence count
        new webpack.optimize.OccurenceOrderPlugin(),

        // Extract css into separate file
        new ExtractTextPlugin("styles.css"),

        new BrowserSyncPlugin({
            "port": 3000,
            "server": {
                "baseDir": [path.resolve(__dirname, './dist')],
                "index": "index.html",
                "middleware": [
                    html5Mode()
                ]
            }
        })
    ]
});
