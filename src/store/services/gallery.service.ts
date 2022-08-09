import {del, get, post, put} from "../../helpers/apiProxy";
import {CreateGalleryTyped} from "../types/gallery.types";

class GalleryService {
  public getGallery(amount: number, pageNumber: number) {
    return get(`/gallery/${amount}/${pageNumber}`);
  }

  public getGalleryById(id: number) {
    return get(`/gallery/${id}`);
  }

  public createGallery(gallery: CreateGalleryTyped) {
    return post('/gallery', gallery);
  }

  public updateGallery(id: number, gallery: CreateGalleryTyped) {
    return put(`/gallery/${id}`, gallery);
  }

  public deleteGallery(id: number) {
    return del(`/gallery/${id}`);
  }
}

export default GalleryService;
