const Path = require('path');
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
	src: Path.resolve(__dirname, '../src'),
	dist: Path.resolve(__dirname, '../public'),
	assets: 'assets/',
};

module.exports = {

	externals: {
		paths: PATHS
	},
	entry: {
		// app: Path.resolve(__dirname, '../src/scripts/index.js')
		app: `${PATHS.src}/scripts/index.js`
	},
	output: {
		path: PATHS.dist,
		filename: `${PATHS.assets}js/[name].js`
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
			name: false
		}
	},
	plugins: [
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin([{
				from: `${PATHS.src}/includes`,
				to: 'includes'
			},
			{
				from: `${PATHS.src}/images`,
				to: `${PATHS.assets}images`
			},
			{
				from: `${PATHS.src}/static`,
				to: ''
			}
		]),
		new HtmlWebpackPlugin({
			template: `${PATHS.src}/index.html`
		})
	],
	resolve: {
		alias: {
			'~': PATHS.src
		}
	},
	module: {
		rules: [{
				test: /\.mjs$/,
				include: /node_modules/,
				type: 'javascript/auto'
			},
			{
				test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[path][name].[ext]'
					}
				}
			},
		]
	}
};