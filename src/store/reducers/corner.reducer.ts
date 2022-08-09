import {
  CornerByIdState,
  CornerState,
  CornerTyped,
  CREATE_CORNER_REQUEST,
  CREATE_CORNER_SUCCESS,
  DELETE_CORNER_REQUEST,
  DELETE_CORNER_SUCCESS,
  GET_BY_ID_CORNER_FAILURE,
  GET_BY_ID_CORNER_REQUEST,
  GET_BY_ID_CORNER_SUCCESS,
  GET_CORNER_REQUEST,
  GET_CORNER_SUCCESS, UPDATE_CORNER_REQUEST,
  UPDATE_CORNER_SUCCESS
} from "../types/corners.types";
import {ActionWithPayload} from "../types/index.types";

const initialState: CornerState = {
  corners: [],
  isLoading: false,
  error: null,
}

export const cornerReducer = (state = initialState, action: ActionWithPayload<CornerTyped[]>): CornerState => {
  switch (action.type) {
    case GET_CORNER_REQUEST || DELETE_CORNER_REQUEST || CREATE_CORNER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case GET_CORNER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        corners: action.payload,
      }
    case CREATE_CORNER_SUCCESS:
      return {
        ...state,
        corners: [...state.corners, action.payload[0]],
        isLoading: false,
      }
    case DELETE_CORNER_SUCCESS:
      return {
        ...state,
        corners: state.corners.filter(corner => corner.id !== action.payload[0].id),
        isLoading: false,
      }
    case GET_BY_ID_CORNER_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }
    default:
      return state;
  }
}

const initialByIdState: CornerByIdState = {
  corner: null,
  isLoading: false,
  error: null,
}

export const cornerByIdReducer = (state = initialByIdState, action: ActionWithPayload<CornerTyped>): CornerByIdState => {
  switch (action.type) {
    case GET_BY_ID_CORNER_REQUEST || UPDATE_CORNER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case GET_BY_ID_CORNER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        corner: action.payload,
      }
    case GET_BY_ID_CORNER_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }
    case UPDATE_CORNER_SUCCESS:
      return {
        ...state,
        corner: action.payload,
        isLoading: false,
      }
    default:
      return state;
  }
}
