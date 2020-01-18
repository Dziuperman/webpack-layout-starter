const Path = require('path');
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

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
		new VueLoaderPlugin(),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin([{
				from: `${PATHS.src}/components`,
				to: 'components'
			},
			{
				from: `${PATHS.src}/${PATHS.assets}/images`,
				to: `${PATHS.assets}images`
			},
			{
				from: `${PATHS.src}/static`,
				to: ''
			},
			{
				from: `${PATHS.src}/${PATHS.assets}/fonts`,
				to: `${PATHS.assets}fonts`
			},
		]),
		new HtmlWebpackPlugin({
			template: `${PATHS.src}/index.html`
		})
	],
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.js',
			'~': PATHS.src,
		},
		extensions: ['*', '.js', '.vue', '.json']
	},
	module: {
		rules: [{
				test: /\.mjs$/,
				include: /node_modules/,
				type: 'javascript/auto'
			},
			{
				// Vue
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loader: {
						scss: 'vue-style-loader!css-loader!scss-loader'
					}
				}
			},
			{
				// Fonts
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				loader: "file-loader",
				options: {
					name: "[name].[ext]"
				}
			},
			{
				// Images
				test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[path][name].[ext]'
					},
				},
				{
					loader: 'image-webpack-loader',
					options: {
						mozjpeg: {
							progressive: true,
							quality: 65
						},
						optipng: {
							// enable: false
							optimizationLevel: 7
						},
						pngquant: {
							quality: [0.65, 0.90],
							speed: 4
						},
						gifsicle: {
							interlaced: false
						},
						webp: {
							quality: 75
						}
					},
				}
			]
			},
			{
				// HTML
				test: /\.html$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]'
						}
					}
				],
				exclude: `${PATHS.src}/index.html`
			}
		]
	}
};