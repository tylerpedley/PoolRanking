import {} from 'node';
import { createStore } from 'redux';
import rootReducer from './reducers';
const devToolsEnhancer = require('remote-redux-devtools').default;
const ExecutionEnvironment = require('exenv');

let clientStore = null;

export default function ConfigureStore(initialState = {})
{
    let store = null;

    if (ExecutionEnvironment.canUseDOM)
    {
        const enhancers = (<any>window).__REDUX_DEVTOOLS_EXTENSION__ && (<any>window).__REDUX_DEVTOOLS_EXTENSION__();
        if (clientStore == null)
        {
            clientStore = createStore(rootReducer, initialState, enhancers);
        }
        store = clientStore;
    }
    else
    {
        store = createStore(rootReducer, initialState);
    }

    if (module.hot)
    {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () =>
        {
            const nextRootReducer = require('./reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}