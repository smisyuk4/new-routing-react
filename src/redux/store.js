import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authSlice } from './auth/authReducer';

const authPersistConfig = {
  key: 'auth',
  storage,
};

const rootReducers = combineReducers({
  [authSlice.name]: persistReducer(authPersistConfig, authSlice.reducer),
});

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  ],
  devTools: true,
});

export const persistor = persistStore(store);
