import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {newsByIdReducer, newsReducer} from "./reducers/news.reducer";
import {galleryByIdReducer, galleryReducer} from "./reducers/gallery.reducer";
import {eventTypesReducer} from "./reducers/eventTypes.reducer";
import {eventByIdReducer, eventsReducer} from "./reducers/events.reducer";
import {cornerTypesReducer} from "./reducers/cornerTypes.reducer";
import {cornerByIdReducer, cornerReducer} from "./reducers/corner.reducer";
import {menuCategoryReducer} from "./reducers/menuCategory.reducer";
import {menuReducer} from "./reducers/menu.reducer";

const rootReducer = combineReducers({
  news: newsReducer,
  newsById: newsByIdReducer,
  gallery: galleryReducer,
  galleryById: galleryByIdReducer,
  eventTypes: eventTypesReducer,
  events: eventsReducer,
  eventsById: eventByIdReducer,
  cornerTypes: cornerTypesReducer,
  corners: cornerReducer,
  cornersById: cornerByIdReducer,
  menuCategories: menuCategoryReducer,
  menu: menuReducer
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
