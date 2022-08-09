import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {newsByIdReducer, newsReducer} from "./reducers/news.reducer";
import {galleryByIdReducer, galleryReducer} from "./reducers/gallery.reducer";

const rootReducer = combineReducers({
  news: newsReducer,
  newsById: newsByIdReducer,
  gallery: galleryReducer,
  galleryById: galleryByIdReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
