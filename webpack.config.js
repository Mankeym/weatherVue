const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')

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
                    test: /\.s[ac]ss$/gi,
                    use: [
                        // Creates `style` nodes from JS strings
                        'style-loader',
                        // Translates CSS into CommonJS
                        'css-loader',
                        // Compiles Sass to CSS
                        'sass-loader',
                    ],
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
            extensions: ['.js','vue'],
        },
        plugins: [
            new VueLoaderPlugin(),
            new webpack.DefinePlugin({
                __VUE_OPTIONS_API__: false,
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
