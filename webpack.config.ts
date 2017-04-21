
import * as webpack from "webpack";
import * as path from "path";
import * as ext from "webpack-node-externals";

const env = process.env.WEBPACK_ENV;
const native = env === "native";
const web = env === "web";

const config: webpack.Configuration = {
	entry: "./src/index.tsx",
	output: {
		filename: `${env}.js`,
		path: __dirname + "/dist"
	},

	// Enable sourcemaps for debugging webpack's output.
	devtool: "source-map",

	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
		modules: [path.resolve(__dirname, "src"), "node_modules"]
	},

	externals: native ? [ext()] : [],

	module: {
		rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{ test: /\.tsx?$/, loader: "awesome-typescript-loader" },
			{ test: /\.(eot|mp4|otf)$/, use: "file-loader" },
			{ test: /\.(gif|jpeg|jpg|png|svg)$/, use: "url-loader?limit=10000" },
			{ test: /\.(woff|woff2)$/, use: "url-loader?limit=10000&mimetype=application/font-woff" },
			{ test: /\.ttf$/, use: "url-loader?limit=10000&mimetype=application/octet-stream" },
		]
	}
};

export default config;
