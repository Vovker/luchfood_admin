import {
  CREATE_EVENTS_REQUEST, CREATE_EVENTS_SUCCESS,
  DELETE_EVENTS_REQUEST, DELETE_EVENTS_SUCCESS, EventByIdState,
  EventsState,
  EventsTypes, GET_EVENTS_BY_ID_FAILURE, GET_EVENTS_BY_ID_REQUEST, GET_EVENTS_BY_ID_SUCCESS, GET_EVENTS_FAILURE,
  GET_EVENTS_REQUEST, GET_EVENTS_SUCCESS, UPDATE_EVENTS_REQUEST, UPDATE_EVENTS_SUCCESS
} from "../types/events.types";
import {ActionWithPayload} from "../types/index.types";

const inialState: EventsState = {
  events: [],
  isLoading: false,
  error: null,
  isMore: true,
}

export const eventsReducer = (state = inialState, action: ActionWithPayload<EventsTypes[]>): EventsState => {
  switch (action.type) {
    case GET_EVENTS_REQUEST || DELETE_EVENTS_REQUEST || CREATE_EVENTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case GET_EVENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        events: action.payload,
      }
    case GET_EVENTS_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }
    case DELETE_EVENTS_SUCCESS:
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.payload[0].id),
        isLoading: false,
      }
    case CREATE_EVENTS_SUCCESS:
      return {
        ...state,
        events: [...state.events, action.payload[0]],
        isLoading: false,
      }
    default:
      return state;
  }
}

const initialStateById: EventByIdState = {
  event: null,
  isLoading: false,
  error: null,
}

export const eventByIdReducer = (state = initialStateById, action: ActionWithPayload<EventsTypes>): EventByIdState => {
  switch (action.type) {
    case GET_EVENTS_BY_ID_REQUEST || UPDATE_EVENTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case GET_EVENTS_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        event: action.payload,
      }
    case GET_EVENTS_BY_ID_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }
      case UPDATE_EVENTS_SUCCESS:
        return {
          ...state,
          event: action.payload,
          isLoading: false,
        }
    default:
      return state;
  }
}
