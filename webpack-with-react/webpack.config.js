const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');
const glob = require("glob");
const globConcat = require("glob-concat");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = {
	entry : './src/index.js',
	plugins: [
		new HtmlWebpackPlugin({template: './public/index.html'}),
		new CleanWebpackPlugin()
	],
	output: {
		filename: 'index.bundle.js',
		path: path.resolve(__dirname, './dist')
	},
	module: {
		rules: [
			{
		        test: /\.js$/,
		        loader: 'babel-loader',
		        exclude: /node_modules/
		    },
			{
				test: /\.less$/,
				use:  [
					{
						loader: 'style-loader'
					},
					{
					   	loader: 'css-loader',
					   	options: {
					   		sourceMap: true,
					   		modules: true
					   	}
					}, 
					{
					   	loader: 'less-loader',
					   	options: {
					   		sourceMap: true
					   	}
					}
				]
			},
			{
				test: /\.css$/i,
				use: [
					{
						loader: 'style-loader'
					},
					{
					   	loader: 'css-loader',
					   	options: {
					   		sourceMap: true,
					   		modules: true
					   	}
					}
				],
			},
			{
				test: /\.jpe?g$/i,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
				},				
			}
		]
	}
}