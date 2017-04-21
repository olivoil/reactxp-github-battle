
declare module "webpack-node-externals" {
	import * as webpack from "webpack";

	var ext: () => webpack.ExternalsFunctionElement;
	export = ext;
}
