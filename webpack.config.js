const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const dotenv = require('dotenv').config({
    path: path.join(__dirname, '.env'),
})

module.exports = (env) => {
    return {
        mode: env.production ? 'production' : 'development',
        entry: './src/main.js',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, 'dist'),
        },
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                },
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    options: {
                        appendTsSuffixTo: [/\.vue$/],
                    },
                    exclude: /node_modules/,
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            ts: 'ts-loader',
                        },
                        customElement: true,
                    },
                },
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                        'postcss-loader'
                    ]
                },
                {
                    test: /\.(png|jpg|svg)$/i,
                    use: [
                        {
                            loader: 'url-loader',
                        },
                    ],
                },
            ],
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src/'),
            },
            extensions: ['.tsx', '.ts', '.js'],
        },
        plugins: [
            new VueLoaderPlugin(),
            new webpack.DefinePlugin({
                'process.env': JSON.stringify(dotenv.parsed),
            }),
        ],
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist'),
            },
            compress: true,
            port: 5050,
        },
    }
}
