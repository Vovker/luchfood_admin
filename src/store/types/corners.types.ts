const GET_CORNER_REQUEST = 'GET_CORNER_REQUEST';
const GET_CORNER_SUCCESS = 'GET_CORNER_SUCCESS';
const GET_CORNER_FAILURE = 'GET_CORNER_FAILURE';
const CREATE_CORNER_REQUEST = 'CREATE_CORNER_REQUEST';
const CREATE_CORNER_SUCCESS = 'CREATE_CORNER_SUCCESS';
const CREATE_CORNER_FAILURE = 'CREATE_CORNER_FAILURE';
const UPDATE_CORNER_REQUEST = 'UPDATE_CORNER_REQUEST';
const UPDATE_CORNER_SUCCESS = 'UPDATE_CORNER_SUCCESS';
const UPDATE_CORNER_FAILURE = 'UPDATE_CORNER_FAILURE';
const DELETE_CORNER_REQUEST = 'DELETE_CORNER_REQUEST';
const DELETE_CORNER_SUCCESS = 'DELETE_CORNER_SUCCESS';
const DELETE_CORNER_FAILURE = 'DELETE_CORNER_FAILURE';
const GET_BY_ID_CORNER_REQUEST = 'GET_BY_ID_CORNER_REQUEST';
const GET_BY_ID_CORNER_SUCCESS = 'GET_BY_ID_CORNER_SUCCESS';
const GET_BY_ID_CORNER_FAILURE = 'GET_BY_ID_CORNER_FAILURE';

export {
  GET_CORNER_REQUEST,
  GET_CORNER_SUCCESS,
  GET_CORNER_FAILURE,
  CREATE_CORNER_REQUEST,
  CREATE_CORNER_SUCCESS,
  CREATE_CORNER_FAILURE,
  UPDATE_CORNER_REQUEST,
  UPDATE_CORNER_SUCCESS,
  UPDATE_CORNER_FAILURE,
  DELETE_CORNER_REQUEST,
  DELETE_CORNER_SUCCESS,
  DELETE_CORNER_FAILURE,
  GET_BY_ID_CORNER_REQUEST,
  GET_BY_ID_CORNER_SUCCESS,
  GET_BY_ID_CORNER_FAILURE,
}

export type CreateCornerTyped = {
  name: string;
  description: string;
  address: string;
  kitchenTypeId: number;
  mainImage: string;
  logo: string;
}

export type CornerTyped = {
  id: number;
  name: string;
  description: string;
  address: string;
  kitchenType: CornerTyped;
  mainImage: string;
  logo: string;
}

export type CornerState = {
  corners: CornerTyped[];
  isLoading: boolean;
  error: any;
}

export type CornerByIdState = {
  corner: CornerTyped | null;
  isLoading: boolean;
  error: any;
}
