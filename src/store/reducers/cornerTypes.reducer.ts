import {
  CornerTypeTyped,
  CornerTypeTypesState,
  CREATE_CORNER_TYPE_REQUEST,
  CREATE_CORNER_TYPE_SUCCESS,
  DELETE_CORNER_TYPE_REQUEST,
  DELETE_CORNER_TYPE_SUCCESS,
  GET_CORNER_TYPE_FAILURE,
  GET_CORNER_TYPE_REQUEST,
  GET_CORNER_TYPE_SUCCESS,
  UPDATE_CORNER_TYPE_REQUEST,
  UPDATE_CORNER_TYPE_SUCCESS
} from "../types/cornerType.types";
import {ActionWithPayload} from "../types/index.types";

const initialState: CornerTypeTypesState = {
  cornerTypes: [],
  isLoading: false,
  error: null,
}

export const cornerTypesReducer = (state = initialState, action: ActionWithPayload<CornerTypeTyped[]>): CornerTypeTypesState => {
  switch (action.type) {
    case GET_CORNER_TYPE_REQUEST || DELETE_CORNER_TYPE_REQUEST || CREATE_CORNER_TYPE_REQUEST || UPDATE_CORNER_TYPE_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case GET_CORNER_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        cornerTypes: action.payload,
      }
    case GET_CORNER_TYPE_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }
    case CREATE_CORNER_TYPE_SUCCESS:
      return {
        ...state,
        cornerTypes: [...state.cornerTypes, action.payload[0]],
        isLoading: false,
      }
    case UPDATE_CORNER_TYPE_SUCCESS:
      return {
        ...state,
        cornerTypes: state.cornerTypes.map(cornerType => cornerType.id === action.payload[0].id ? action.payload[0] : cornerType),
      }
    case DELETE_CORNER_TYPE_SUCCESS:
      return {
        ...state,
        cornerTypes: state.cornerTypes.filter(cornerType => cornerType.id !== action.payload[0].id),
      }
    default:
      return state;
  }
}
