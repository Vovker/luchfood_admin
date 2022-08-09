import {del, get, post, put} from "../../helpers/apiProxy";
import {CreateCornerTyped} from "../types/corners.types";

class CornersService {
  public getCorners() {
    return get('/corner');
  }

  public deleteCorner(id: number) {
    return del(`/corner/${id}`);
  }

  public getCornerById(id: number) {
    return get(`/corner/${id}`);
  }

  public createCorner(corner: CreateCornerTyped) {
    return post('/corner', corner);
  }

  public updateCorner(id: number, corner: CreateCornerTyped) {
    return put(`/corner/${id}`, corner);
  }
}

export default CornersService;
