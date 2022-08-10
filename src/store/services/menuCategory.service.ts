import {del, get, post, put} from "../../helpers/apiProxy";
import {CreateMenuCategoryTyped, UpdateMenuCategoryTyped} from "../types/menuCategory.types";

class MenuCategoryService{
  public getMenuCategories(id: number){
    return get(`/menu-category/${id}`);
  }

  public createMenuCategory(menuCategory: CreateMenuCategoryTyped){
    return post('/menu-category', menuCategory);
  }

  public updateMenuCategory(id: number, menuCategory: UpdateMenuCategoryTyped){
    return put(`/menu-category/${id}`, menuCategory);
  }

  public deleteMenuCategory(id: number){
    return del(`/menu-category/${id}`);
  }
}

export default MenuCategoryService;
