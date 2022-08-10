import { MenuCategoryTyped as MenuCategoriesCategoryTyped } from './menuCategory.types';
const GET_MENU_REQUEST = 'GET_MENU_REQUEST';
const GET_MENU_SUCCESS = 'GET_MENU_SUCCESS';
const GET_MENU_FAILURE = 'GET_MENU_FAILURE';
const CREATE_MENU_REQUEST = 'CREATE_MENU_REQUEST';
const CREATE_MENU_SUCCESS = 'CREATE_MENU_SUCCESS';
const CREATE_MENU_FAILURE = 'CREATE_MENU_FAILURE';
const UPDATE_MENU_REQUEST = 'UPDATE_MENU_REQUEST';
const UPDATE_MENU_SUCCESS = 'UPDATE_MENU_SUCCESS';
const UPDATE_MENU_FAILURE = 'UPDATE_MENU_FAILURE';
const DELETE_MENU_REQUEST = 'DELETE_MENU_REQUEST';
const DELETE_MENU_SUCCESS = 'DELETE_MENU_SUCCESS';
const DELETE_MENU_FAILURE = 'DELETE_MENU_FAILURE';

export {
  GET_MENU_REQUEST,
  GET_MENU_SUCCESS,
  GET_MENU_FAILURE,
  CREATE_MENU_FAILURE,
  CREATE_MENU_REQUEST,
  CREATE_MENU_SUCCESS,
  UPDATE_MENU_FAILURE,
  UPDATE_MENU_REQUEST,
  UPDATE_MENU_SUCCESS,
  DELETE_MENU_FAILURE,
  DELETE_MENU_REQUEST,
  DELETE_MENU_SUCCESS
}

export type CreateMenuTyped = {
  name: string;
  menuCategoryId: number;
  price: number;
  weight: number;
}

export type UpdateMenuTyped = {
  name: string;
  price: number;
  weight: number;
}

export type MenuTyped = {
  id: number;
  name: string;
  price: number;
  weight: number;
  menuCategory: MenuCategoriesCategoryTyped;
}

export type MenuCategoryTyped = {
  name: string;
  id: number;
  menu: MenuTyped[];
}

export type MenuState = {
  menu: MenuTyped[];
  isLoading: boolean;
  error: any;
}


