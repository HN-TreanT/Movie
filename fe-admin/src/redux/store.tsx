import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from "redux";
import { createBrowserHistory } from "history";
import { routerReducer } from "react-router-redux";
import createSagaMiddleware from "redux-saga";
import reducers from "../redux/reducers";
import rootSaga from "../redux/sagas";

// const history = syncHistoryWithStore(_history, store)
const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  composeEnhancers(applyMiddleware(...middleware))
  // applyMiddleware(...middleware)
);

sagaMiddleware.run(rootSaga);
export { store, history };
