import MenuCategoryService from "../services/menuCategory.service";
import {Dispatch} from "@reduxjs/toolkit";
import {
  CREATE_MENU_CATEGORY_FAILURE,
  CREATE_MENU_CATEGORY_REQUEST,
  CREATE_MENU_CATEGORY_SUCCESS,
  CreateMenuCategoryTyped, DELETE_MENU_CATEGORY_FAILURE, DELETE_MENU_CATEGORY_REQUEST, DELETE_MENU_CATEGORY_SUCCESS,
  GET_MENU_CATEGORIES_FAILURE,
  GET_MENU_CATEGORIES_REQUEST,
  GET_MENU_CATEGORIES_SUCCESS,
  UPDATE_MENU_CATEGORY_FAILURE,
  UPDATE_MENU_CATEGORY_REQUEST,
  UPDATE_MENU_CATEGORY_SUCCESS,
  UpdateMenuCategoryTyped
} from "../types/menuCategory.types";
import {toast} from "react-toastify";

const menuCategoryService = new MenuCategoryService();

export function getMenuCategories(id: number): (dispatch: Dispatch) => void {
  return (dispatch) => {
    dispatch({type: GET_MENU_CATEGORIES_REQUEST});
    menuCategoryService.getMenuCategories(id).then(response => {
      const {data} = response;
      if (data) {
        dispatch({type: GET_MENU_CATEGORIES_SUCCESS, payload: data});
      }
    }, (error) => {
      dispatch({type: GET_MENU_CATEGORIES_FAILURE, payload: error});
    });
  }
}

export function createMenuCategory(menuCategory: CreateMenuCategoryTyped): (dispatch: Dispatch) => void {
  return (dispatch) => {
    dispatch({type: CREATE_MENU_CATEGORY_REQUEST});
    menuCategoryService.createMenuCategory(menuCategory).then(response => {
      const {data} = response;
      if (data) {
        dispatch({type: CREATE_MENU_CATEGORY_SUCCESS, payload: [data]});
        toast("Категория успешно добавлена", {type: "success"});
      }
    }, (error) => {
      dispatch({type: CREATE_MENU_CATEGORY_FAILURE, payload: error});
    });
  }
}

export function updateMenuCategory(id: number, menuCategory: UpdateMenuCategoryTyped): (dispatch: Dispatch) => void {
  return (dispatch) => {
    dispatch({type: UPDATE_MENU_CATEGORY_REQUEST});
    menuCategoryService.updateMenuCategory(id, menuCategory).then(response => {
      const {data} = response;
      if (data) {
        dispatch({type: UPDATE_MENU_CATEGORY_SUCCESS, payload: [data]});
        toast("Категория успешно обновлена", {type: "success"});
      }
    }, (error) => {
      dispatch({type: UPDATE_MENU_CATEGORY_FAILURE, payload: error});
    });
  }
}

export function deleteMenuCategory(id: number): (dispatch: Dispatch) => void {
  return (dispatch) => {
    dispatch({type: DELETE_MENU_CATEGORY_REQUEST});
    menuCategoryService.deleteMenuCategory(id).then(response => {
      const {data} = response;
      if (data) {
        dispatch({type: DELETE_MENU_CATEGORY_SUCCESS, payload: [{id, ...data}]});
        toast("Категория успешно удалена", {type: "success"});
      }
    }, (error) => {
      if(error.response.status === 500) {
        toast("Невозможно удалить категорию, так как она используется в меню", {type: "error"});
      }
      dispatch({type: DELETE_MENU_CATEGORY_FAILURE, payload: error});
    });
  }
}
