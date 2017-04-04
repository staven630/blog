var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'application');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var TPL_PATH = path.resolve(ROOT_PATH,'templates');
var MODULE_PATH = path.resolve(ROOT_PATH, 'node_modules');
module.exports = {
	entry: [
		path.resolve(__dirname, 'application/Index.js')
	],
	output: {
		path: path.resolve(__dirname, 'assets/scripts'),
		filename: 'index.js',
	},
	devtool: 'eval-source-map',
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true,
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
		root: APP_PATH
	},
	module: {
		preLoaders: [
			{
				test: /\.jsx?$/,
				loaders: ['eslint'],
				include: APP_PATH
			}
		],
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: ['babel'],
				include: APP_PATH
			},
			{
				test: /\.css$/,
				loaders: ['style', 'css'],
				include: APP_PATH
			},{
				test: /\.scss$/,
				loaders: ['style', 'css', 'sass'],
				include: APP_PATH
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: ' '
		})
	]
};