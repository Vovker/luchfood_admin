import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {newsByIdReducer, newsReducer} from "./reducers/news.reducer";

const rootReducer = combineReducers({
  news: newsReducer,
  newsById: newsByIdReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
