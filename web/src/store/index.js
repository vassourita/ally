import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './modules/rootReducer';

const config = {
  key: '@ally-mobile/persisted-root',
  storage,
  whitelist: ['auth', 'user'],
};

const persistedReducer = persistReducer(config, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
