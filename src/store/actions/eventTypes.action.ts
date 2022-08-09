import EventTypesService from "../services/eventTypes.service";
import {Dispatch} from "@reduxjs/toolkit";
import {
  CREATE_EVENT_TYPES_FAILURE,
  CREATE_EVENT_TYPES_REQUEST,
  CREATE_EVENT_TYPES_SUCCESS,
  DELETE_EVENT_TYPES_FAILURE,
  DELETE_EVENT_TYPES_REQUEST,
  DELETE_EVENT_TYPES_SUCCESS,
  GET_EVENT_TYPES_FAILURE,
  GET_EVENT_TYPES_REQUEST,
  GET_EVENT_TYPES_SUCCESS,
  UPDATE_EVENT_TYPES_FAILURE,
  UPDATE_EVENT_TYPES_REQUEST,
  UPDATE_EVENT_TYPES_SUCCESS
} from "../types/eventTypes.types";
import {toast} from "react-toastify";

const eventTypesService = new EventTypesService();

export function getEventTypes(): (dispatch: Dispatch) => void {
  return (dispatch) => {
    dispatch({type: GET_EVENT_TYPES_REQUEST});
    eventTypesService.getEventTypes().then(response => {
      const {data} = response;
      if (data) {
        dispatch({type: GET_EVENT_TYPES_SUCCESS, payload: data});
      }
    }, (error) => {
      dispatch({type: GET_EVENT_TYPES_FAILURE, payload: error});
    });
  }
}

export function deleteEventType(id: number): (dispatch: Dispatch) => void {
  return (dispatch) => {
    dispatch({type: DELETE_EVENT_TYPES_REQUEST});
    eventTypesService.deleteEventType(id).then(response => {
      const {data} = response;
      if (data) {
        dispatch({type: DELETE_EVENT_TYPES_SUCCESS, payload: [{id, ...data}]});
        toast("Тип события успешно удален", {type: "success"});
      }
    }, (error) => {
      if(error.response.status === 500) {
        toast("Невозможно удалить тип события, так как он используется в других событиях", {type: "error"});
      }
      dispatch({type: DELETE_EVENT_TYPES_FAILURE, payload: error.response.data});
    });
  }
}

export function createEventType(eventType: any): (dispatch: Dispatch) => void {
  return (dispatch) => {
    dispatch({type: CREATE_EVENT_TYPES_REQUEST});
    eventTypesService.createEventType(eventType).then(response => {
      const {data} = response;
      if (data) {
        dispatch({type: CREATE_EVENT_TYPES_SUCCESS, payload: [data]});
        toast("Тип события успешно создан", {type: "success"});
      }
    }, (error) => {
      dispatch({type: CREATE_EVENT_TYPES_FAILURE, payload: error});
    });
  }
}

export function updateEventType(id: number, eventType: any): (dispatch: Dispatch) => void {
  return (dispatch) => {
    dispatch({type: UPDATE_EVENT_TYPES_REQUEST});
    eventTypesService.updateEventType(id, eventType).then(response => {
      const {data} = response;
      if (data) {
        dispatch({type: UPDATE_EVENT_TYPES_SUCCESS, payload: [data]});
        toast("Тип события успешно обновлен", {type: "success"});
      }
    }, (error) => {
      dispatch({type: UPDATE_EVENT_TYPES_FAILURE, payload: error});
    });
  }
}
