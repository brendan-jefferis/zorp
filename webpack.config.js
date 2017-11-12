const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports ={
  entry: './src/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    //new CleanWebpackPlugin(['dist/']),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}
