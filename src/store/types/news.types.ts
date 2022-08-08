const GET_NEWS_SUCCESS = 'GET_NEWS_SUCCESS';
const GET_NEWS_FAILURE = 'GET_NEWS_FAILURE';
const GET_NEWS_BY_ID_SUCCESS = 'GET_NEWS_BY_ID_SUCCESS';
const GET_NEWS_BY_ID_FAILURE = 'GET_NEWS_BY_ID_FAILURE';
const GET_NEWS_BY_ID_REQUEST = 'GET_NEWS_BY_ID_REQUEST';
const GET_NEWS_REQUEST = 'GET_NEWS_REQUEST';
const DELETE_NEWS_SUCCESS = 'DELETE_NEWS_SUCCESS';
const DELETE_NEWS_FAILURE = 'DELETE_NEWS_FAILURE';
const DELETE_NEWS_REQUEST = 'DELETE_NEWS_REQUEST';
const CREATE_NEWS_SUCCESS = 'CREATE_NEWS_SUCCESS';
const CREATE_NEWS_FAILURE = 'CREATE_NEWS_FAILURE';
const CREATE_NEWS_REQUEST = 'CREATE_NEWS_REQUEST';
const UPDATE_NEWS_SUCCESS = 'UPDATE_NEWS_SUCCESS';
const UPDATE_NEWS_FAILURE = 'UPDATE_NEWS_FAILURE';
const UPDATE_NEWS_REQUEST = 'UPDATE_NEWS_REQUEST';

export {
  GET_NEWS_SUCCESS,
  GET_NEWS_FAILURE,
  GET_NEWS_BY_ID_SUCCESS,
  GET_NEWS_BY_ID_FAILURE,
  GET_NEWS_BY_ID_REQUEST,
  GET_NEWS_REQUEST,
  DELETE_NEWS_REQUEST,
  DELETE_NEWS_SUCCESS,
  DELETE_NEWS_FAILURE,
  CREATE_NEWS_REQUEST,
  CREATE_NEWS_SUCCESS,
  CREATE_NEWS_FAILURE,
  UPDATE_NEWS_REQUEST,
  UPDATE_NEWS_SUCCESS,
  UPDATE_NEWS_FAILURE,
}

export type CreateNewsTyped = {
  title: string;
  description: string;
  body: string;
  img: string;
}

export type NewsTyped = {
  id: number;
  title: string;
  description: string;
  body?: string;
  img: string;
  created_at: string;
}

export interface NewsState {
  news: NewsTyped[];
  isLoading: boolean;
  error: any;
  isMore: boolean;
}

export interface NewsByIdState {
  news: NewsTyped | null;
  isLoading: boolean;
  error: any;
}
