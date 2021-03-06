const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');
const glob = require("glob");
const globConcat = require("glob-concat");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');


module.exports = {
	entry : './src/index.js',
	plugins: [
		new HtmlWebpackPlugin({template: './public/index.html'}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: 'style.css'
		})
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
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '.'
						}
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
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '.'
						}
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
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
						},	
					},
					{
						loader: ImageMinimizerPlugin.loader,
			            options: {
			              	severityError: 'warning',
			              	minimizerOptions: {
			                	plugins: ['gifsicle'],
			              	},
			            },
					}
				]			
			}
		]
	}
}