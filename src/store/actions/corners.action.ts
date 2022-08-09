import CornersService from "../services/corners.service";
import {Dispatch} from "@reduxjs/toolkit";
import {
  CREATE_CORNER_FAILURE,
  CREATE_CORNER_REQUEST,
  CREATE_CORNER_SUCCESS,
  CreateCornerTyped,
  DELETE_CORNER_FAILURE,
  DELETE_CORNER_REQUEST,
  DELETE_CORNER_SUCCESS,
  GET_BY_ID_CORNER_FAILURE,
  GET_BY_ID_CORNER_REQUEST,
  GET_BY_ID_CORNER_SUCCESS,
  GET_CORNER_FAILURE,
  GET_CORNER_REQUEST,
  GET_CORNER_SUCCESS,
  UPDATE_CORNER_FAILURE,
  UPDATE_CORNER_REQUEST,
  UPDATE_CORNER_SUCCESS
} from "../types/corners.types";
import {toast} from "react-toastify";

const cornersService = new CornersService();

export function getCorners(): (dispatch: Dispatch) => void {
  return (dispatch) => {
    dispatch({type: GET_CORNER_REQUEST});
    cornersService.getCorners().then(response => {
      const {data} = response;
      if (data) {
        dispatch({type: GET_CORNER_SUCCESS, payload: data});
      }
    }, (error) => {
      dispatch({type: GET_CORNER_FAILURE, payload: error});
    });
  }
}

export function createCorner(corner: CreateCornerTyped): (dispatch: Dispatch) => void {
  return (dispatch) => {
    dispatch({type: CREATE_CORNER_REQUEST});
    cornersService.createCorner(corner).then(response => {
      const {data} = response;
      if (data) {
        dispatch({type: CREATE_CORNER_SUCCESS, payload: [data]});
        toast("Корнер успешно создан", {type: "success"});
        window.location.href = `/corners/${data.id}`;
      }
    }, (error) => {
      dispatch({type: CREATE_CORNER_FAILURE, payload: error});
    });
  }
}

export function updateCorner(id: number, corner: CreateCornerTyped): (dispatch: Dispatch) => void {
  return (dispatch) => {
    dispatch({type: UPDATE_CORNER_REQUEST});
    cornersService.updateCorner(id, corner).then(response => {
      const {data} = response;
      if (data) {
        dispatch({type: UPDATE_CORNER_SUCCESS, payload: data});
        toast("Корнер успешно обновлен", {type: "success"});
      }
    }, (error) => {
      dispatch({type: UPDATE_CORNER_FAILURE, payload: error});
    });
  }
}

export function deleteCorner(id: number): (dispatch: Dispatch) => void {
  return (dispatch) => {
    dispatch({type: DELETE_CORNER_REQUEST});
    cornersService.deleteCorner(id).then(response => {
      const {data} = response;
      if (data) {
        dispatch({type: DELETE_CORNER_SUCCESS, payload: [data]});
        toast("Корнер успешно удален", {type: "success"});
      }
    }, (error) => {
      dispatch({type: DELETE_CORNER_FAILURE, payload: error});
    });
  }
}

export function getCornerById(id: number): (dispatch: Dispatch) => void {
  return (dispatch) => {
    dispatch({type: GET_BY_ID_CORNER_REQUEST});
    cornersService.getCornerById(id).then(response => {
      const {data} = response;
      if (data) {
        dispatch({type: GET_BY_ID_CORNER_SUCCESS, payload: data});
      }
    }, (error) => {
      dispatch({type: GET_BY_ID_CORNER_FAILURE, payload: error});
    });
  }
}
