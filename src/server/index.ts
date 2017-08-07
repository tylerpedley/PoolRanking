import * as express from 'express';

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const config = require('../../webpack.config.js');
const compiler = webpack(config);

let expressServer: express.Express = express();
let port: string = process.env.PORT || 80;
let address: string = `${process.env.ADDRESS}:${port}`;

expressServer.use(express.static(__dirname + '/../../public'));
expressServer.use(webpackDevMiddleware(compiler,
{
    publicPath: '/',
    noInfo: true,
    watchOptions:
    {
        aggregateTimeout: 300,
        poll: 1000
    }
}));
expressServer.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client'),
{
    'path': '/__webpack_hmr',
    'heartbeat': 10 * 1000
}));
expressServer.use(webpackHotServerMiddleware(compiler));
expressServer.listen(3000, () => console.log(`Server listening on port ${port} on mode ${process.env.MODE}`));