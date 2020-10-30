const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');
const glob = require("glob");
const globConcat = require("glob-concat");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally');

let pathsToClean = ['./dist'];
let cleanOptions = {
	root: path.resolve(__dirname),
	exclude: ['test.txt','dummy/*'],
	verbose: true,
	dry: false
}

module.exports = {
	entry : './src/index.js',
	plugins: [
		new HtmlWebpackPlugin({template: './src/index.html'}),
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: ['./img/*','./index.html','./plugins.min.js','./style.css','./index.bundle.js'],
		}),
		new MiniCssExtractPlugin({
			filename: 'style.css'
		}),
		new MergeIntoSingleFilePlugin({
			files: {
				'plugins.min.js': [
					'./node_modules/clientjs/dist/client.min.js',
					'./node_modules/jquery.payment/lib/jquery.payment.min.js'
				]
			},
			transform: {
				'plugins.min.js': code => require('uglify-js').minify(code).code
			}
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