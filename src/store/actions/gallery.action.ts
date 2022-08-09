import {Dispatch} from "@reduxjs/toolkit";
import {
  CREATE_GALLERY_FAILURE,
  CREATE_GALLERY_REQUEST, CREATE_GALLERY_SUCCESS, CreateGalleryTyped,
  DELETE_GALLERY_FAILURE,
  DELETE_GALLERY_REQUEST, DELETE_GALLERY_SUCCESS,
  GET_GALLERY_BY_ID_FAILURE,
  GET_GALLERY_BY_ID_REQUEST,
  GET_GALLERY_BY_ID_SUCCESS,
  GET_GALLERY_FAILURE,
  GET_GALLERY_REQUEST,
  GET_GALLERY_SUCCESS, UPDATE_GALLERY_FAILURE, UPDATE_GALLERY_REQUEST, UPDATE_GALLERY_SUCCESS
} from "../types/gallery.types";
import GalleryService from "../services/gallery.service";
import {toast} from "react-toastify";

const galleryService = new GalleryService();

export function getGallery(amount: number, pageNumber: number): (dispatch: Dispatch) => void {
  return (dispatch) => {
    dispatch({type: GET_GALLERY_REQUEST});
    galleryService.getGallery(amount, pageNumber).then(response => {
      const {data} = response;
      if (data) {
        dispatch({type: GET_GALLERY_SUCCESS, payload: data});
      }
    }, (error) => {
      dispatch({type: GET_GALLERY_FAILURE, payload: error});
    });
  }
}

export function getGalleryById(id: number): (dispatch: Dispatch) => void {
  return (dispatch) => {
    dispatch({type: GET_GALLERY_BY_ID_REQUEST});
    galleryService.getGalleryById(id).then(response => {
      const {data} = response;
      if (data) {
        dispatch({type: GET_GALLERY_BY_ID_SUCCESS, payload: data});
      }
    }, (error) => {
      dispatch({type: GET_GALLERY_BY_ID_FAILURE, payload: error});
    });
  }
}

export function deleteGallery(id: number): (dispatch: Dispatch) => void {
  return (dispatch) => {
    dispatch({type: DELETE_GALLERY_REQUEST});
    galleryService.deleteGallery(id).then(response => {
      const {data} = response;
      if (data) {
        dispatch({type: DELETE_GALLERY_SUCCESS, payload: [data]});
        toast("Фотография успешно удалена", {type: "success"});
      }
    }, (error) => {
      dispatch({type: DELETE_GALLERY_FAILURE, payload: error});
    });
  }
}

export function createGallery(gallery: CreateGalleryTyped): (dispatch: Dispatch) => void {
  return (dispatch) => {
    dispatch({type: CREATE_GALLERY_REQUEST});
    galleryService.createGallery(gallery).then(response => {
      const {data} = response;
      if (data) {
        dispatch({type: CREATE_GALLERY_SUCCESS, payload: [data]});
        toast("Фотография добавлена в галерею", {type: "success"});
        window.location.href = `/gallery/${data.id}`;
      }
    }, (error) => {
      dispatch({type: CREATE_GALLERY_FAILURE, payload: error});
    });
  }
}

export function updateGallery(id: number, gallery: CreateGalleryTyped): (dispatch: Dispatch) => void {
  return (dispatch) => {
    dispatch({type: UPDATE_GALLERY_REQUEST});
    galleryService.updateGallery(id, gallery).then(response => {
      const {data} = response;
      if (data) {
        dispatch({type: UPDATE_GALLERY_SUCCESS, payload: data});
        toast("Фотография успешно обновлена", {type: "success"});
      }
    }, (error) => {
      dispatch({type: UPDATE_GALLERY_FAILURE, payload: error});
    });
  }
}
