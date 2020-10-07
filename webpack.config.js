/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
// const glob = require("glob");
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const PurgecssPlugin = require("purgecss-webpack-plugin");

module.exports = {
    entry: {
        background: './src/background/index.ts',
        popup: './src/popup/index.tsx'
        // content_script: './src/content-script/index.tsx'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.jsx', '.ts', '.js']
    },
    output: {
        filename: '[name]/[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        // new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            inject: true,
            title: 'Sticky Note',
            chunks: ['popup'],
            template: './src/popup/index.html',
            filename: './popup/index.html'
        }),
        // @ts-ignore
        new CopyPlugin([
            { from: 'manifest.json', to: 'manifest.json' },
            { from: 'src/assets', to: 'assets' }
        ]),
        new MiniCssExtractPlugin({
            filename: '[name]/[name].css'
        })
        // new PurgecssPlugin({
        //     paths: () => glob.sync(`${path.resolve(__dirname, "src")}/**/*`, { nodir: true })
        // })
    ],
    // mode: "development",
    mode: 'production',
    target: 'web'
};
