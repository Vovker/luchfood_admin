import EventsService from "../services/events.service";
import {Dispatch} from "@reduxjs/toolkit";
import {
  CREATE_EVENTS_FAILURE,
  CREATE_EVENTS_REQUEST, CREATE_EVENTS_SUCCESS,
  CreateEventsTyped,
  DELETE_EVENTS_FAILURE,
  DELETE_EVENTS_REQUEST, DELETE_EVENTS_SUCCESS,
  GET_EVENTS_BY_ID_FAILURE,
  GET_EVENTS_BY_ID_REQUEST, GET_EVENTS_BY_ID_SUCCESS,
  GET_EVENTS_FAILURE,
  GET_EVENTS_REQUEST,
  GET_EVENTS_SUCCESS, UPDATE_EVENTS_FAILURE, UPDATE_EVENTS_REQUEST, UPDATE_EVENTS_SUCCESS
} from "../types/events.types";
import {toast} from "react-toastify";


const eventsService = new EventsService();

export function getEvents(amount: number, offset: number): (dispatch: Dispatch) => void {
  return (dispatch) => {
    dispatch({type: GET_EVENTS_REQUEST});
    eventsService.getEvents(amount, offset).then(response => {
      const {data} = response;
      if (data) {
        dispatch({type: GET_EVENTS_SUCCESS, payload: data});
      }
    }).catch(error => {
      dispatch({type: GET_EVENTS_FAILURE, payload: error});
    })
  }
}

export function getEventsById(id: number): (dispatch: Dispatch) => void {
  return (dispatch) => {
    dispatch({type: GET_EVENTS_BY_ID_REQUEST});
    eventsService.getEventsById(id).then(response => {
      const {data} = response;
      if (data) {
        dispatch({type: GET_EVENTS_BY_ID_SUCCESS, payload: data});
      }
    }).catch(error => {
      dispatch({type: GET_EVENTS_BY_ID_FAILURE, payload: error});
    })
  }
}

export function deleteEvent(id: number): (dispatch: Dispatch) => void {
  return (dispatch) => {
    dispatch({type: DELETE_EVENTS_REQUEST});
    eventsService.deleteEvent(id).then(response => {
      const {data} = response;
      if (data) {
        dispatch({type: DELETE_EVENTS_SUCCESS, payload: [{id, ...data}]});
        toast("Событие успешно удалено", {type: "success"});
      }
    }).catch(error => {
      dispatch({type: DELETE_EVENTS_FAILURE, payload: error});
    })
  }
}

export function createEvent(event: CreateEventsTyped): (dispatch: Dispatch) => void {
  return (dispatch) => {
    dispatch({type: CREATE_EVENTS_REQUEST});
    eventsService.createEvent(event).then(response => {
      const {data} = response;
      if (data) {
        dispatch({type: CREATE_EVENTS_SUCCESS, payload: [data]});
        toast("Событие успешно создано", {type: "success"});
      }
    }).catch(error => {
      dispatch({type: CREATE_EVENTS_FAILURE, payload: error});
    })
  }
}

export function updateEvent(id: number, event: CreateEventsTyped): (dispatch: Dispatch) => void {
  return (dispatch) => {
    dispatch({type: UPDATE_EVENTS_REQUEST});
    eventsService.updateEvent(id, event).then(response => {
      const {data} = response;
      if (data) {
        dispatch({type: UPDATE_EVENTS_SUCCESS, payload: data});
        toast("Событие успешно обновлено", {type: "success"});
      }
    }).catch(error => {
      dispatch({type: UPDATE_EVENTS_FAILURE, payload: error});
    })
  }
}
