import {
  CREATE_EVENT_TYPES_REQUEST, CREATE_EVENT_TYPES_SUCCESS,
  DELETE_EVENT_TYPES_REQUEST,
  DELETE_EVENT_TYPES_SUCCESS,
  EventTypesState, EventTypesTypes, GET_EVENT_TYPES_FAILURE,
  GET_EVENT_TYPES_REQUEST,
  GET_EVENT_TYPES_SUCCESS, UPDATE_EVENT_TYPES_SUCCESS
} from "../types/eventTypes.types";
import {ActionWithPayload} from "../types/index.types";

const initialState: EventTypesState = {
  eventTypes: [],
  isLoading: false,
  error: null,
}

export const eventTypesReducer = (state = initialState, action: ActionWithPayload<EventTypesTypes[]>): EventTypesState => {
  switch (action.type) {
    case GET_EVENT_TYPES_REQUEST || DELETE_EVENT_TYPES_REQUEST || CREATE_EVENT_TYPES_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case GET_EVENT_TYPES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        eventTypes: action.payload,
      }
    case GET_EVENT_TYPES_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }
    case DELETE_EVENT_TYPES_SUCCESS:
      return {
        ...state,
        eventTypes: state.eventTypes.filter(eventType => eventType.id !== action.payload[0].id),
        isLoading: false,
      }
    case CREATE_EVENT_TYPES_SUCCESS:
      return {
        ...state,
        eventTypes: [...state.eventTypes, action.payload[0]],
        isLoading: false,
      }
    case UPDATE_EVENT_TYPES_SUCCESS:
      return {
        ...state,
        eventTypes: state.eventTypes.map(eventType => eventType.id === action.payload[0].id ? action.payload[0] : eventType),
      }
    default:
      return state;
  }
}
