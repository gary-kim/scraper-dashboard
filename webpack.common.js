const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');
const package = require('./package.json');

module.exports = {
    entry: {
        'js/main': path.join(__dirname, 'src', 'js', 'main.js'),
        'js/background': path.join(__dirname, 'src', 'js', 'background.js'),
        'ui/options': path.join(__dirname, 'src', 'ui', 'options.js'),
        'ui/dashboard': path.join(__dirname, 'src', 'ui', 'dashboard.js'),
        'ui/feed': path.join(__dirname, 'src', 'ui', 'feed.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/js/'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ['vue-style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader']
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CopyPlugin([
            { from: "src", to: '', ignore: ['*.js', 'js/**', 'manifest.json', 'manifest - chromium.json', '*.vue']}
        ]),
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            "EXTENSION_VERSION_NAME": JSON.stringify(package.version_name),
        })
    ],
    resolve: {
        extensions: ['.js', '.vue']
    }
};
