import storage from 'redux-persist/lib/storage';

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import Foobar from './foobar';

const persistI18nConfig = {
  key: 'foobar',
  storage,
  whitelist: ['locale']
}

const createRootReducer = history =>
  combineReducers({
    foobar: Foobar,
    router: connectRouter(history),
  });
export default createRootReducer;
