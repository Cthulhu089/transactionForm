import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./rootReducer";
// import { syncHistoryWithStore, routerMiddleware } from "react-router-redux";
import { createBrowserHistory } from "history";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const customHistory = createBrowserHistory();

const configureStore = preloadedState => {
  // const routeMiddleware = routerMiddleware(customHistory)
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  
  const persistConfig = {
    key: 'root',
    storage,
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer)

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(persistedReducer, preloadedState, composedEnhancers);
  // const history = syncHistoryWithStore(customHistory, store);
  let persistor = persistStore(store);

  return { store, persistor };
};

export default configureStore;