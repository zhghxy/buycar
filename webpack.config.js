const path=require('path')

module.exports={
    entry:{
        index:'./src/index.js',
        settle:'./src/settle.js'
    },
    output:{
        path:__dirname+"./dist",
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
	}
}