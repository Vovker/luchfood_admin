import {MenuService} from "../services/menu.service";
import {
  CREATE_MENU_FAILURE,
  CREATE_MENU_REQUEST,
  CREATE_MENU_SUCCESS,
  CreateMenuTyped,
  DELETE_MENU_FAILURE,
  DELETE_MENU_REQUEST,
  DELETE_MENU_SUCCESS,
  GET_MENU_FAILURE,
  GET_MENU_REQUEST,
  GET_MENU_SUCCESS,
  MenuCategoryTyped,
  MenuTyped,
  UPDATE_MENU_FAILURE,
  UPDATE_MENU_REQUEST,
  UPDATE_MENU_SUCCESS,
  UpdateMenuTyped
} from "../types/menu.types";
import {Dispatch} from "@reduxjs/toolkit";
import {toast} from "react-toastify";

const menuService = new MenuService();

export function getMenus(id: number): (dispatch: Dispatch) => void {
  return (dispatch) => {
    dispatch({type: GET_MENU_REQUEST});
    menuService.getMenus(id).then(response => {
      const data = response.data.map((menu: MenuCategoryTyped) => {
        return menu.menu.map((menuItem: MenuTyped) => {
          return {...menuItem, menuCategory: {id: menu.id, name: menu.name}};
        });
      });
      if (data) {
        dispatch({type: GET_MENU_SUCCESS, payload: [].concat.apply([], data)});
      }
    }, (error) => {
      dispatch({type: GET_MENU_FAILURE, payload: error});
    });
  }
}

export function createMenu(menu: CreateMenuTyped): (dispatch: Dispatch) => void {
  return (dispatch) => {
    dispatch({type: CREATE_MENU_REQUEST});
    menuService.createMenu(menu).then(response => {
      const {data} = response;
      if (data) {
        dispatch({type: CREATE_MENU_SUCCESS, payload: [data]});
        toast("Меню успешно добавлено", {type: "success"});
      }
    }, (error) => {
      dispatch({type: CREATE_MENU_FAILURE, payload: error});
    });
  }
}

export function updateMenu(id: number, menu: UpdateMenuTyped): (dispatch: Dispatch) => void {
  return (dispatch) => {
    dispatch({type: UPDATE_MENU_REQUEST});
    menuService.updateMenu(id, menu).then(response => {
      const {data} = response;
      if (data) {
        dispatch({type: UPDATE_MENU_SUCCESS, payload: [data]});
        toast("Меню успешно обновлено", {type: "success"});
      }
    }, (error) => {
      dispatch({type: UPDATE_MENU_FAILURE, payload: error});
    });
  }
}

export function deleteMenu(id: number): (dispatch: Dispatch) => void {
  return (dispatch) => {
    dispatch({type: DELETE_MENU_REQUEST});
    menuService.deleteMenu(id).then(response => {
      const {data} = response;
      if (data) {
        dispatch({type: DELETE_MENU_SUCCESS, payload: [{id, data}]});
        toast("Меню успешно удалено", {type: "success"});
      }
    }, (error) => {
      dispatch({type: DELETE_MENU_FAILURE, payload: error});
    });
  }
}
