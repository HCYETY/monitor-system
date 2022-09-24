const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;

const isProduction = process.env.NODE_ENV == "production";

const postCssLoaderConfig = {
    loader: 'postcss-loader',
    options: {
        plugins: [
            require('autoprefixer')({
                overrideBrowserslist: [
                    'Chrome > 31',
                    'ff > 31',
                    'ie >= 10'
                ]
            })
        ]
    }
};

const commonConfig = {
    entry: './src/index.ts',
    context: process.cwd(),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'monitor.js',
        environment: {
            arrowFunction: false
        },
    },
    devtool: isProduction ? "source-map" : "cheap-module-source-map",
    devServer: {
      static: path.join(__dirname, 'dist'),
      compress: true,
      port: 3000,
      hot: true,
      // open: true,
      // progress: true,
      historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "static/css/[name].[hash].css",
        }),
        new webpack.HotModuleReplacementPlugin(),
        // new WebpackDeepScopeAnalysisPlugin(),
    ],
    module: {
        rules: [{
            test: /\.(jsx?|tsx?)$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
                plugins: [
                    ["import", {
                        libraryName: "antd",
                        style: "css"
                    }]
                ]
            }
        }, {
            test: /\.ts$/,
            use: [
                //配置babel
                {
                    //指定加载器
                    loader: 'babel-loader',
                    //设置 babel
                    options: {
                        //设置预定义的环境
                        presets: [
                            //指定环境插件
                            '@babel/preset-env'
                        ]
                    }
                },
                'ts-loader'
            ],
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                postCssLoaderConfig,
            ]
        }, {
            test: /\.ttf$/,
            use: ['file-loader']
        }, {
            test: /\.less$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', postCssLoaderConfig, 'less-loader']
        }, {
            test: /.*\.(gif|png|svg|jpe?g)$/i,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 5120,
                    name: 'static/imgs/[name].[hash:8].[ext]',
                    publicPath: '../../'
                }
            }]
        }]
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx', '.json'],
        // mainFiles: ['index.ts', 'index'],
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@config': path.resolve(__dirname, './src/config'),
            '@monitor': path.resolve(__dirname, './src/monitor'),
            '@type': path.resolve(__dirname, './src/type'),
            '@util': path.resolve(__dirname, './src/util'),
        },
    },
    externals: {
      fs: require('fs')
    }
};



module.exports = () => {
    if (isProduction) {
        commonConfig.mode = "production";
    } else {
        commonConfig.mode = "development";
    }
    return commonConfig;
}
