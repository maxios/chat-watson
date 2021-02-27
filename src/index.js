import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { ConnectedRouter } from 'connected-react-router';

import createRootReducer from '@/reducers';
import { App } from './App';
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage';
import '@/styles/index.scss';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: []
}

export const history = createBrowserHistory();

const persistedReducer = persistReducer(persistConfig, createRootReducer(history))

const middleware = [thunk, routerMiddleware(history)];

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
const persistor = persistStore(store)

const container = document.getElementById("root")

if (process.env.NODE_ENV !== 'development') {
  let disFunc = () => 'console has been disabled in production mode';

  console.log = disFunc
  console.error = disFunc
  console.warn = disFunc

  Object.freeze(console);
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  container
);
