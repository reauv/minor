const PATH = __dirname;
var path = require('path');
var webpack = require('webpack');

module.exports = {

	// Context of the app
	context: PATH,

	devtool: 'eval',

	entry: [
		'webpack-dev-server/client?http://0.0.0.0:8080',
		'webpack/hot/only-dev-server',
		'./src/index'
	],

	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/static/',
	},

	// Instructions to how resolve the modules
	resolve: {
		root: `${PATH}/src/app`,
		extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
		fallback: path.join(__dirname, 'node_modules'),
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: ['react-hot', 'babel'],
				exclude: /node_modules/,
			},
			{
				test: /\.html$/,
				exclude: /node_modules/,
				loader: 'file',
				query: {
					name: '[name].[ext]',
				},
			}
		],
	}
};
