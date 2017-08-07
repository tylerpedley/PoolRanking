import { Location } from 'tslint/lib/rules/completedDocsRule';
import { StaticRouter } from 'react-router';
import * as ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { renderToString } from 'react-router-server';
import createMemoryHistory from 'history/createMemoryHistory';
import ConfigureStore from '../redux/storeManager';
import * as React from 'react';
import Routes from '../pages/routes';

export default function ServerRenderer()
{
    return(request, response, next) =>
    {
        if (response.headersSent)
        {
            return;
        }

        const history = createMemoryHistory();
        const store = ConfigureStore();
        const context = {};

        renderToString(
            <Provider store={store}>
                <StaticRouter location={request.url} context={context}>
                    <Routes />
                </StaticRouter>
            </Provider>
        ).then(({ html }) =>
        {
            // Grab the state, for inflating on the client side
            const state = store.getState();

            // Wrap the body in your HTMLs
            response.send(`<!DOCTYPE html>
            <html>
                <body>
                    <div id="app"><div>${html}</div></div>
                    <script>window.__REDUX_STATE__ = ${JSON.stringify(state)}</script>
                    <script src="js/jquery-3.1.1.min.js"></script>
                    <script src="js/react.js"></script>
                    <script src="js/react-dom.js"></script>
                    <script src="/client.js"></script>
                </body>
            </html>`);
        }).catch(err => console.log(err));
    };
}
