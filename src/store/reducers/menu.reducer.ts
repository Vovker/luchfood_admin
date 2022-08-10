import {ActionWithPayload} from "../types/index.types";
import {
  CREATE_MENU_REQUEST,
  CREATE_MENU_SUCCESS,
  DELETE_MENU_REQUEST,
  DELETE_MENU_SUCCESS,
  GET_MENU_REQUEST,
  GET_MENU_SUCCESS,
  MenuState,
  MenuTyped,
  UPDATE_MENU_REQUEST,
  UPDATE_MENU_SUCCESS
} from "../types/menu.types";

const initialState: MenuState = {
  menu: [],
  isLoading: false,
  error: null,
}

export const menuReducer = (state = initialState, action: ActionWithPayload<MenuTyped[]>): MenuState => {
  switch (action.type) {
    case GET_MENU_REQUEST || UPDATE_MENU_REQUEST || CREATE_MENU_REQUEST || DELETE_MENU_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case GET_MENU_SUCCESS:
      return {
        ...state,
        isLoading: false,
        menu: action.payload,
        error: null,
      }
    case CREATE_MENU_SUCCESS:
      return {
        ...state,
        menu: [...state.menu, action.payload[0]],
        isLoading: false,
        error: null,
      }
    case UPDATE_MENU_SUCCESS:
      return {
        ...state,
        menu: state.menu.map(menuItem => menuItem.id === action.payload[0].id ? {...menuItem, ...action.payload[0]} : menuItem),
        isLoading: false,
        error: null,
      } as MenuState
    case DELETE_MENU_SUCCESS:
      return {
        ...state,
        menu: state.menu.filter(menu => menu.id !== action.payload[0].id),
        isLoading: false,
        error: null,
      }
    default:
      return state;
  }
}
