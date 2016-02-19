const PATH = __dirname;
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

	// Context of the app
	context: PATH,

	entry: './src/index',

	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/static/',
	},

	// Instructions to how resolve the modules
	resolve: {
		root: `${PATH}/src/app`,
		extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.css'],
		fallback: path.join(__dirname, 'node_modules'),
		alias: {
			env: path.join(PATH, 'env'),
		}
	},

	plugins: [
		new ExtractTextPlugin('main.css'),
	],

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: ['babel'],
				exclude: /node_modules/,
			},
			{
				test: /\.html$/,
				exclude: /node_modules/,
				loader: 'file',
				query: {
					name: '[name].[ext]',
				},
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style-loader', '!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'),
			},
		],
	}
};
