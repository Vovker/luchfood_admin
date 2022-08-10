import {del, get, post, put} from "../../helpers/apiProxy";
import {CreateCornerTypeTyped} from "../types/cornerType.types";

class CornerTypesService {
  public getCornerTypes() {
    return get('/kitchen-type');
  }

  public deleteCornerType(id: number) {
    return del(`/kitchen-type/${id}`);
  }

  public createCornerType(cornerType: CreateCornerTypeTyped) {
    return post('/kitchen-type', cornerType);
  }

  public updateCornerType(id: number, cornerType: CreateCornerTypeTyped) {
    return put(`/kitchen-type/${id}`, cornerType);
  }
}

export default CornerTypesService;
