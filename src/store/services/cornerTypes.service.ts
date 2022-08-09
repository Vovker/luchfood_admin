import {del, get, post, put} from "../../helpers/apiProxy";
import {CreateCornerTyped} from "../types/cornerType.types";

class CornerTypesService {
  public getCornerTypes() {
    return get('/kitchen-type');
  }

  public deleteCornerType(id: number) {
    return del(`/kitchen-type/${id}`);
  }

  public createCornerType(cornerType: CreateCornerTyped) {
    return post('/kitchen-type', cornerType);
  }

  public updateCornerType(id: number, cornerType: CreateCornerTyped) {
    return put(`/kitchen-type/${id}`, cornerType);
  }
}

export default CornerTypesService;
