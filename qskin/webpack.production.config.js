const webpack = require('webpack')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
})

module.exports = {
	mode: 'production',
	entry: {
		app: './app/app.js',
		vendor: ['react', 'react-dom', 'react-router', 'redux', 'react-redux', 'redux-thunk']
	},
	output: {
		path: path.join(__dirname, "build"),
		filename: '[name].js'
	},
	devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: { 'react/lib/ReactMount': 'react-dom/lib/ReactMount' }
  },
	module: {
		rules: [
			{ 
				test: /\.jsx|\.js$/, 
				exclude: /node_modules/, 
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				include: /stylesheets|node_modules/,
				loader: 'style-loader!css-loader?outputStyle=expanded'
			},
			{
				test: /\.scss$/,
				include: /stylesheets/,
				loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
			},
			{
				test: /\.(jpg|png|gif|eot|woff|ttf|svg)/,
				loader: "file-loader"
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin('[name].css'),
		devFlagPlugin
	],
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				"cache": true,
				parallel: true,
				sourceMap: true
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	}
}
