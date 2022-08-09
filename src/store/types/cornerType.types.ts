const GET_CORNER_TYPE_REQUEST = 'GET_CORNER_TYPE_REQUEST';
const GET_CORNER_TYPE_SUCCESS = 'GET_CORNER_TYPE_SUCCESS';
const GET_CORNER_TYPE_FAILURE = 'GET_CORNER_TYPE_FAILURE';
const CREATE_CORNER_TYPE_REQUEST = 'CREATE_CORNER_TYPE_REQUEST';
const CREATE_CORNER_TYPE_SUCCESS = 'CREATE_CORNER_TYPE_SUCCESS';
const CREATE_CORNER_TYPE_FAILURE = 'CREATE_CORNER_TYPE_FAILURE';
const UPDATE_CORNER_TYPE_REQUEST = 'UPDATE_CORNER_TYPE_REQUEST';
const UPDATE_CORNER_TYPE_SUCCESS = 'UPDATE_CORNER_TYPE_SUCCESS';
const UPDATE_CORNER_TYPE_FAILURE = 'UPDATE_CORNER_TYPE_FAILURE';
const DELETE_CORNER_TYPE_REQUEST = 'DELETE_CORNER_TYPE_REQUEST';
const DELETE_CORNER_TYPE_SUCCESS = 'DELETE_CORNER_TYPE_SUCCESS';
const DELETE_CORNER_TYPE_FAILURE = 'DELETE_CORNER_TYPE_FAILURE';

export {
  GET_CORNER_TYPE_REQUEST,
  GET_CORNER_TYPE_SUCCESS,
  GET_CORNER_TYPE_FAILURE,
  CREATE_CORNER_TYPE_REQUEST,
  CREATE_CORNER_TYPE_SUCCESS,
  CREATE_CORNER_TYPE_FAILURE,
  UPDATE_CORNER_TYPE_REQUEST,
  UPDATE_CORNER_TYPE_SUCCESS,
  UPDATE_CORNER_TYPE_FAILURE,
  DELETE_CORNER_TYPE_REQUEST,
  DELETE_CORNER_TYPE_SUCCESS,
  DELETE_CORNER_TYPE_FAILURE,
}

export type CreateCornerTyped = {
  name: string;
}

export type CornerTyped = {
  id: number;
  name: string;
}

export type CornerTypesState = {
  cornerTypes: CornerTyped[];
  isLoading: boolean;
  error: any;
}
