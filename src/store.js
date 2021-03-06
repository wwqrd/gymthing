import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import exercises from './ducks/exercises';

const root = combineReducers({
  exercises,
});

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(
  persistConfig,
  root,
);

const store = createStore(persistedReducer);

const persistor = persistStore(store);

export { store, persistor };

export default store;
