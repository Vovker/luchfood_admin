import {
  CREATE_GALLERY_REQUEST,
  CREATE_GALLERY_SUCCESS, DELETE_GALLERY_REQUEST,
  DELETE_GALLERY_SUCCESS,
  GalleryByIdState,
  GalleryState,
  GalleryTyped, GET_GALLERY_BY_ID_FAILURE, GET_GALLERY_BY_ID_REQUEST, GET_GALLERY_BY_ID_SUCCESS,
  GET_GALLERY_FAILURE,
  GET_GALLERY_REQUEST,
  GET_GALLERY_SUCCESS, UPDATE_GALLERY_REQUEST, UPDATE_GALLERY_SUCCESS
} from "../types/gallery.types";
import {ActionWithPayload} from "../types/index.types";

const initialState: GalleryState = {
  gallery: [],
  isLoading: false,
  error: null,
  isMore: true,
}

export const galleryReducer = (state = initialState, action: ActionWithPayload<GalleryTyped[]>): GalleryState => {
  switch (action.type) {
    case GET_GALLERY_REQUEST || DELETE_GALLERY_REQUEST || CREATE_GALLERY_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case GET_GALLERY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        gallery: action.payload,
      }
    case GET_GALLERY_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }
    case DELETE_GALLERY_SUCCESS:
      return {
        ...state,
        gallery: state.gallery.filter(gallery => gallery.created_at !== action.payload[0].created_at),
        isLoading: false,
      }
    case CREATE_GALLERY_SUCCESS:
      return {
        ...state,
        gallery: [...state.gallery, action.payload[0]],
        isLoading: false,
      }
    default:
      return state;
  }
}

const initialStateById: GalleryByIdState = {
  gallery: null,
  isLoading: false,
  error: null,
}

export const galleryByIdReducer = (state = initialStateById, action: ActionWithPayload<GalleryTyped>): GalleryByIdState => {
  switch (action.type) {
    case GET_GALLERY_BY_ID_REQUEST || UPDATE_GALLERY_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case GET_GALLERY_BY_ID_SUCCESS:
      return {
        ...state,
        gallery: action.payload,
        isLoading: false,
        error: null,
      }
    case GET_GALLERY_BY_ID_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }
    case UPDATE_GALLERY_SUCCESS:
      return {
        ...state,
        gallery: action.payload,
        isLoading: false,
      }
    default:
      return state;
  }
}
