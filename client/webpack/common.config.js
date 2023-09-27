const HtmlWebpackPlugin = require("html-webpack-plugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
const { DefinePlugin } = require("webpack");
require("dotenv").config();

module.exports = {
	entry: "./client/src/index.js",
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						cacheDirectory: true,
					},
				},
			},
			{
				test: /\.(png|svg|jpe?g|gif)$/,
				// loader: "file-loader",
				type: "asset/resource",
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	output: {
		publicPath: "/",
	},
	plugins: [
		new HtmlWebpackPlugin({
			favicon: "./client/src/favicon.ico",
			template: "./client/src/index.html",
		}),
		new DefinePlugin({
			// "process.env.<NAME_IN_APP>": JSON.stringify(process.env.<DOTENV_FILE_NAME>),
			"process.env.CLIENT_ID": JSON.stringify(process.env.CLIENT_ID),
			"process.env.CLIENT_KEY": JSON.stringify(process.env.CLIENT_KEY),
			"process.env.REDIRECT_URI": JSON.stringify(process.env.REDIRECT_URI),
		}),

		// new CopyWebpackPlugin({
		// 	patterns: [
		// 		{
		// 			from: __dirname + "/client/static",
		// 			// to: "assets/images",
		// 			noErrorOnMissing: true,
		// 		},
		// 	],
		// }),
	],
};
