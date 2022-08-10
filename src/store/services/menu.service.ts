import {del, get, post, put} from "../../helpers/apiProxy";
import {CreateMenuTyped, UpdateMenuTyped} from "../types/menu.types";

class MenuService {
  public getMenus(id: number) {
    return get(`/menu/corner/${id}`);
  }

  public createMenu(menu: CreateMenuTyped) {
    return post('/menu', menu);
  }

  public updateMenu(id: number, menu: UpdateMenuTyped) {
    return put(`/menu/${id}`, menu);
  }

  public deleteMenu(id: number) {
    return del(`/menu/${id}`);
  }
}

export { MenuService };
