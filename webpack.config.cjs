const { resolve, join } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
   mode: 'development',
   entry: join(process.cwd(), 'build.js'),
   output: {
      path: resolve(process.cwd(), 'build'),
      filename: 'bundle.js',
      clean: true
   },
   module: {
      rules: [
         {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
         },
      ],
   },
   plugins: [
      new MiniCssExtractPlugin({ filename: 'style.css' }),
   ],
   devServer: {
      static: join(process.cwd(), 'build'),
      hot: true,
   },
};