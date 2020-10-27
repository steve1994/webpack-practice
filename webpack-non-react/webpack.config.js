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
		new HtmlWebpackPlugin({template: './src/index.html'}),
		new CleanWebpackPlugin(),
		extractCSS,
		extractLess
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
				include: [
                    path.resolve(__dirname, "./less")
                ],
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