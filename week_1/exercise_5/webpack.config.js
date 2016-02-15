const PATH = __dirname;
const path = require('path');

module.exports = {

	// Context of the app
	context: PATH,

	// Entry
	entry: {
		scripts: './src/main.js',
		html: './src/public/index.html',
	},

	// Output
	output: { path: __dirname, filename: 'bundle.js' },

	// Instructions to how resolve the modules
	resolve: {
		root: `${PATH}/src`,
		extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
		fallback: path.join(__dirname, 'node_modules'),
	},

	resolveLoader: {
		root: path.join(__dirname, 'node_modules'),
		fallback: path.join(__dirname, 'node_modules'),
	},

	// Modules
	module: {
		loaders: [
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'react'],
				},
			},
			{
				test: /\.html$/,
				exclude: /node_modules/,
				loader: 'file',
				query: {
					name: '[name].[ext]',
				},
			},
		],
	},
};
