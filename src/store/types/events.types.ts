import {EventTypesTypes} from "./eventTypes.types";

const GET_EVENTS_SUCCESS = 'GET_EVENTS_SUCCESS';
const GET_EVENTS_FAILURE = 'GET_EVENTS_FAILURE';
const GET_EVENTS_REQUEST = 'GET_EVENTS_REQUEST';
const GET_EVENTS_BY_ID_SUCCESS = 'GET_EVENTS_BY_ID_SUCCESS';
const GET_EVENTS_BY_ID_FAILURE = 'GET_EVENTS_BY_ID_FAILURE';
const GET_EVENTS_BY_ID_REQUEST = 'GET_EVENTS_BY_ID_REQUEST';
const DELETE_EVENTS_SUCCESS = 'DELETE_EVENTS_SUCCESS';
const DELETE_EVENTS_FAILURE = 'DELETE_EVENTS_FAILURE';
const DELETE_EVENTS_REQUEST = 'DELETE_EVENTS_REQUEST';
const CREATE_EVENTS_SUCCESS = 'CREATE_EVENTS_SUCCESS';
const CREATE_EVENTS_FAILURE = 'CREATE_EVENTS_FAILURE';
const CREATE_EVENTS_REQUEST = 'CREATE_EVENTS_REQUEST';
const UPDATE_EVENTS_SUCCESS = 'UPDATE_EVENTS_SUCCESS';
const UPDATE_EVENTS_FAILURE = 'UPDATE_EVENTS_FAILURE';
const UPDATE_EVENTS_REQUEST = 'UPDATE_EVENTS_REQUEST';

export {
  GET_EVENTS_SUCCESS,
  GET_EVENTS_FAILURE,
  GET_EVENTS_REQUEST,
  GET_EVENTS_BY_ID_SUCCESS,
  GET_EVENTS_BY_ID_FAILURE,
  GET_EVENTS_BY_ID_REQUEST,
  DELETE_EVENTS_SUCCESS,
  DELETE_EVENTS_FAILURE,
  DELETE_EVENTS_REQUEST,
  CREATE_EVENTS_SUCCESS,
  CREATE_EVENTS_FAILURE,
  CREATE_EVENTS_REQUEST,
  UPDATE_EVENTS_SUCCESS,
  UPDATE_EVENTS_FAILURE,
  UPDATE_EVENTS_REQUEST,
}

export type CreateEventsTyped = {
  type: number,
  name: string,
  description: string,
  img: string,
  date: string,
}

export type EventsTypes = {
  id: number;
  name: string;
  description: string;
  img: string;
  date: Date;
  type: EventTypesTypes;
}

export type EventsState = {
  events: EventsTypes[];
  isLoading: boolean;
  error: any;
  isMore: boolean;
}

export type EventByIdState = {
  event: EventsTypes | null;
  isLoading: boolean;
  error: any;
}
