import {
  CREATE_MENU_CATEGORY_FAILURE,
  CREATE_MENU_CATEGORY_REQUEST, CREATE_MENU_CATEGORY_SUCCESS, DELETE_MENU_CATEGORY_FAILURE,
  DELETE_MENU_CATEGORY_REQUEST, DELETE_MENU_CATEGORY_SUCCESS, GET_MENU_CATEGORIES_FAILURE,
  GET_MENU_CATEGORIES_REQUEST, GET_MENU_CATEGORIES_SUCCESS,
  MenuCategoryState,
  MenuCategoryTyped, UPDATE_MENU_CATEGORY_FAILURE, UPDATE_MENU_CATEGORY_REQUEST, UPDATE_MENU_CATEGORY_SUCCESS
} from "../types/menuCategory.types";
import {ActionWithPayload} from "../types/index.types";

const initialState: MenuCategoryState = {
  menuCategories: [],
  isLoading: false,
  error: null,
}

export const menuCategoryReducer = (state = initialState, action: ActionWithPayload<MenuCategoryTyped[]>): MenuCategoryState => {
  switch (action.type) {
    case GET_MENU_CATEGORIES_REQUEST || DELETE_MENU_CATEGORY_REQUEST || CREATE_MENU_CATEGORY_REQUEST || UPDATE_MENU_CATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case GET_MENU_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        menuCategories: action.payload,
      }
    case DELETE_MENU_CATEGORY_SUCCESS:
      return {
        ...state,
        menuCategories: state.menuCategories.filter(menuCategory => menuCategory.id !== action.payload[0].id),
        isLoading: false,
        error: null,
      }
    case CREATE_MENU_CATEGORY_SUCCESS:
      return {
        ...state,
        menuCategories: [...state.menuCategories, action.payload[0]],
        isLoading: false,
        error: null,
      }
    case UPDATE_MENU_CATEGORY_SUCCESS:
      return {
        ...state,
        menuCategories: state.menuCategories.map(menuCategory => menuCategory.id === action.payload[0].id ? action.payload[0] : menuCategory),
        isLoading: false,
        error: null,
      }
    case GET_MENU_CATEGORIES_FAILURE || DELETE_MENU_CATEGORY_FAILURE || CREATE_MENU_CATEGORY_FAILURE || UPDATE_MENU_CATEGORY_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }
    default:
      return state;
  }
}
