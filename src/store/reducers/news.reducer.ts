import {
  CREATE_NEWS_SUCCESS,
  DELETE_NEWS_SUCCESS, GET_NEWS_BY_ID_FAILURE, GET_NEWS_BY_ID_REQUEST, GET_NEWS_BY_ID_SUCCESS,
  GET_NEWS_FAILURE,
  GET_NEWS_REQUEST,
  GET_NEWS_SUCCESS, NewsByIdState,
  NewsState,
  NewsTyped, UPDATE_NEWS_REQUEST, UPDATE_NEWS_SUCCESS
} from "../types/news.types";
import {ActionWithPayload} from "../types/index.types";
import _ from "lodash";


const initialState: NewsState = {
  news: [],
  error: null,
  isLoading: false,
  isMore: true,
}

export const newsReducer = (state = initialState, action: ActionWithPayload<NewsTyped[]>): NewsState => {
  switch (action.type) {
    case GET_NEWS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isMore: true,
      }
    case GET_NEWS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        news: _.unionBy(state.news, action.payload, 'id'),
        isMore: action.payload.length !== 0,
      } as NewsState
    case GET_NEWS_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        isMore: false,
      }
    case DELETE_NEWS_SUCCESS:
      return {
        ...state,
        news: state.news.filter(news => news.created_at !== action.payload[0].created_at),
        isLoading: false,
        error: null,
      }
    case CREATE_NEWS_SUCCESS:
      return {
        ...state,
        news: [...state.news, action.payload[0]],
        isLoading: false,
      }
    default:
      return state;
  }
}

const initialStateById: NewsByIdState = {
  news: null,
  error: null,
  isLoading: false,
}

export const newsByIdReducer = (state = initialStateById, action: ActionWithPayload<NewsTyped>): NewsByIdState => {
  switch (action.type) {
    case GET_NEWS_BY_ID_REQUEST || UPDATE_NEWS_REQUEST:
      return {
        ...state,
        news: null,
        isLoading: true,
      }
    case GET_NEWS_BY_ID_SUCCESS:
      return {
        isLoading: false,
        error: null,
        news: action.payload,
      }
    case GET_NEWS_BY_ID_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }
    case UPDATE_NEWS_SUCCESS:
      return {
        ...state,
        news: action.payload,
        isLoading: false,
      }
    default:
      return state;
  }
}
