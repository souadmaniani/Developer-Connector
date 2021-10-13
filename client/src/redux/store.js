import { createStore, compose, applyMiddleware} from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

let initialState = {}

export default createStore(
    reducers,
    initialState,
    compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)