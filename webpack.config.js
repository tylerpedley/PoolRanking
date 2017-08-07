var webpack = require('webpack');
var path = require('path');
const dist = path.join(__dirname, 'dist');
var nodeExternals = require('webpack-node-externals');

module.exports =
[
    {
        name: 'client',
        target: 'web',
        entry: 
        { 
            client: [ 'react-hot-loader/patch', 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true', './src/client/client.tsx'] 
        },
        output: 
        {
            path: dist,
            publicPath : '/',
            filename: 'client.js',
            devtoolModuleFilenameTemplate: function(info) 
            {
                return "file:///"+encodeURI(info.absoluteResourcePath);
            }
        },
        devtool: 'inline-source-map',
        module:
        { 
            rules: 
            [
                {
                    enforce: 'pre',
                    test: /\.tsx?$/,
                    loader: 'tslint-loader',
                    exclude: /(node_modules)/,
                    options: 
                    {
                        configFile: 'tslint.json'
                    }
                },
                { test : /\.tsx?$/, loaders : [ 'react-hot-loader/webpack', 'awesome-typescript-loader' ]},
                { test: /\.js$/, exclude: [/node_modules/, /Documentation/] },
                { test: /\.css$/, loaders: ['style-loader', 'css-loader', ], exclude: /node_modules/ }
            ]
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx']
        },
        plugins: 
        [
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin()
        ],
        externals: 
        {
            "react": "React",
            "react-dom": "ReactDOM",
            "ws": "ws"
        }
    }, 
    {
        name: 'server',
        target: 'node',
        entry: './src/server/server.tsx',
        output: {
            path: dist,
            filename: 'server.js',
            libraryTarget: 'commonjs2'
        },
        module:
        {
            rules: 
            [
                {
                    enforce: 'pre',
                    test: /\.tsx?$/,
                    loader: 'tslint-loader',
                    exclude: /(node_modules)/,
                    options: 
                    {
                        configFile: 'tslint.json'
                    }
                },
                { test : /\.tsx?$/, loaders : [ 'react-hot-loader/webpack', 'awesome-typescript-loader' ]},
                { test: /\.js$/, exclude: [/node_modules/, /Documentation/] },
            ]
        },
        node: 
        {
            fs: "empty",
            tls: "empty",
            net: "empty"
        },
        externals: [nodeExternals()],
        devtool: 'source-map',
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx']
        },
    }
];

 