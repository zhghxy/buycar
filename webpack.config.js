const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var webpack=require("webpack");
module.exports={
    entry:{
        index:'./src/index.js',
        settle:'./src/settle.js'
    },
    output:{
        path:__dirname+"./dist",
        publicPath:/temp/,
        filename:'[name].js'
    },
    module:{
        loaders:[{
            test:/\.jsx?$/,
            loader:'babel-loader',
            exclude:/node_modules/,
            query:{
                presets:['@babel/preset-react']
            }
        },{
            test:/\.scss$/,
            loader:'style-loader!css-loader!sass-loader'
        },{
            test:/\.css$/,
            loader:'style-loader!css-loader'
        },{
            test:/\.(png|jpg|svg)$/,
            loader:'file-loader'
        }]
    },
    devServer: {
		contentBase:'./dist',
		watchContentBase:true,
		inline:true
    },
    plugins: [
        new UglifyJsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify("production")
            }
        })
    ]
}