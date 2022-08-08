import {
  CREATE_NEWS_FAILURE,
  CREATE_NEWS_REQUEST,
  CREATE_NEWS_SUCCESS,
  CreateNewsTyped,
  DELETE_NEWS_FAILURE,
  DELETE_NEWS_REQUEST,
  DELETE_NEWS_SUCCESS,
  GET_NEWS_BY_ID_REQUEST,
  GET_NEWS_FAILURE,
  GET_NEWS_REQUEST,
  GET_NEWS_SUCCESS,
  GET_NEWS_BY_ID_SUCCESS,
  GET_NEWS_BY_ID_FAILURE, UPDATE_NEWS_REQUEST, UPDATE_NEWS_SUCCESS, UPDATE_NEWS_FAILURE
} from "../types/news.types";
import {Dispatch} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import NewsService from "../services/news.service";

const newsService = new NewsService();

export function getNews(amount: number, pageNumber: number): (dispatch: Dispatch) => void {
  return (dispatch) => {
    dispatch({type: GET_NEWS_REQUEST});
    newsService.getNews(amount, pageNumber).then(response => {
      const {data} = response;
      if (data) {
        dispatch({type: GET_NEWS_SUCCESS, payload: data});
      }

    }, (error) => {
      dispatch({type: GET_NEWS_FAILURE, payload: error});
    });
  }
}

export function deleteNews(id: number): (dispatch: Dispatch) => void {
  return (dispatch) => {
    dispatch({type: DELETE_NEWS_REQUEST});
    newsService.deleteNews(id).then(response => {
      const {data} = response;
      if (data) {
        dispatch({type: DELETE_NEWS_SUCCESS, payload: [data]});
        toast("Новость успешно удалена", {type: "success"});
      }

    }, (error) => {
      dispatch({type: DELETE_NEWS_FAILURE, payload: error});
    });
  }
}

export function createNews(news: CreateNewsTyped): (dispatch: Dispatch) => void {
  return (dispatch) => {
    dispatch({type: CREATE_NEWS_REQUEST});
    newsService.createNews(news).then(response => {
      const {data} = response;
      if (data) {
        dispatch({type: CREATE_NEWS_SUCCESS, payload: [data]});
        toast("Новость успешно создана", {type: "success"});
        window.location.href = `/news/${data.id}`;
      }

    }, (error) => {
      dispatch({type: CREATE_NEWS_FAILURE, payload: error});
    });
  }
}

export function getNewsById(id: number): (dispatch: Dispatch) => void {
  return (dispatch) => {
    dispatch({type: GET_NEWS_BY_ID_REQUEST});
    newsService.getNewsById(id).then(response => {
      const {data} = response;
      if (data) {
        dispatch({type: GET_NEWS_BY_ID_SUCCESS, payload: data});
      }
    }, (error) => {
      dispatch({type: GET_NEWS_BY_ID_FAILURE, payload: error});
    });
  }
}

export function updateNews(id: number, news: CreateNewsTyped): (dispatch: Dispatch) => void {
  return (dispatch) => {
    dispatch({type: UPDATE_NEWS_REQUEST});
    newsService.updateNews(id, news).then(response => {
      const {data} = response;
      if (data) {
        dispatch({type: UPDATE_NEWS_SUCCESS, payload: data});
        toast("Новость успешно обновлена", {type: "success"});
      }
    }, (error) => {
      dispatch({type: UPDATE_NEWS_FAILURE, payload: error});
    });
  }
}
