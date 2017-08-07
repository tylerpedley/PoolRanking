import { BrowserRouter } from 'react-router-dom';
import 'react-hot-loader/patch';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Routes from '../pages/routes';
import ConfigureStore from '../redux/storeManager';
import { AppContainer } from 'react-hot-loader';
import {} from 'webpack-env';

// Pick up any initial state sent by the server
const initialState = (window as any).__REDUX_STATE__;
const store = ConfigureStore(initialState);

render(
    <Provider store={store}>
        <AppContainer>
            <BrowserRouter>
                <div>
                    <Routes />
                </div>
            </BrowserRouter>
        </AppContainer>
    </Provider>
, document.getElementById('app'));

if (module.hot)
{
    module.hot.accept();
}