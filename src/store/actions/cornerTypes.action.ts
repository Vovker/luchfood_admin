import {Dispatch} from "@reduxjs/toolkit";
import CornerTypesService from "../services/cornerTypes.service";
import {
  CREATE_CORNER_TYPE_FAILURE,
  CREATE_CORNER_TYPE_REQUEST,
  CREATE_CORNER_TYPE_SUCCESS,
  CreateCornerTypeTyped,
  DELETE_CORNER_TYPE_FAILURE,
  DELETE_CORNER_TYPE_REQUEST,
  DELETE_CORNER_TYPE_SUCCESS,
  GET_CORNER_TYPE_FAILURE,
  GET_CORNER_TYPE_REQUEST,
  GET_CORNER_TYPE_SUCCESS,
  UPDATE_CORNER_TYPE_FAILURE,
  UPDATE_CORNER_TYPE_REQUEST,
  UPDATE_CORNER_TYPE_SUCCESS
} from "../types/cornerType.types";
import {toast} from "react-toastify";

const cornerTypesService = new CornerTypesService();

export function getCornerTypes(): (dispatch: Dispatch) => void {
  return (dispatch) => {
    dispatch({type: GET_CORNER_TYPE_REQUEST});
    cornerTypesService.getCornerTypes().then(response => {
      const {data} = response;
      if (data) {
        dispatch({type: GET_CORNER_TYPE_SUCCESS, payload: data});
        if (data.length === 0) {
          toast('Прежде чем добавить корнера, добавьте "Категории кухни"', {type: 'error'});
        }
      }
    }, (error) => {
      dispatch({type: GET_CORNER_TYPE_FAILURE, payload: error});
    });
  }
}

export function createCornerType(cornerType: CreateCornerTypeTyped): (dispatch: Dispatch) => void {
  return (dispatch) => {
    dispatch({type: CREATE_CORNER_TYPE_REQUEST});
    cornerTypesService.createCornerType(cornerType).then(response => {
      const {data} = response;
      if (data) {
        dispatch({type: CREATE_CORNER_TYPE_SUCCESS, payload: [data]});
        toast("Категория корнеров успешно создана", {type: "success"});
      }
    }, (error) => {
      dispatch({type: CREATE_CORNER_TYPE_FAILURE, payload: error});
    });
  }
}

export function updateCornerType(id: number, cornerType: CreateCornerTypeTyped): (dispatch: Dispatch) => void {
  return (dispatch) => {
    dispatch({type: UPDATE_CORNER_TYPE_REQUEST});
    cornerTypesService.updateCornerType(id, cornerType).then(response => {
      const {data} = response;
      if (data) {
        dispatch({type: UPDATE_CORNER_TYPE_SUCCESS, payload: [data]});
        toast("Категория успешно обновлена", {type: "success"});
      }
    }, (error) => {
      dispatch({type: UPDATE_CORNER_TYPE_FAILURE, payload: error});
    });
  }
}

export function deleteCornerType(id: number): (dispatch: Dispatch) => void {
  return (dispatch) => {
    dispatch({type: DELETE_CORNER_TYPE_REQUEST});
    cornerTypesService.deleteCornerType(id).then(response => {
      const {data} = response;
      if (data) {
        dispatch({type: DELETE_CORNER_TYPE_SUCCESS, payload: [{id, ...data}]});
        toast("Категория успешно удалена", {type: "success"});
      }
    }, (error) => {
      if(error.response.status === 500) {
        toast("Невозможно удалить категорию корнеров, так как она используется в других корнерах", {type: "error"});
      }
      dispatch({type: DELETE_CORNER_TYPE_FAILURE, payload: error});
    });
  }
}
