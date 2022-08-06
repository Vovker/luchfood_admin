import {toast} from "react-toastify";
import {post} from "../../helpers/apiProxy";
import {endpoints} from "../endpoints";

export const auth = (username: string, password: string) => {
  const notification = toast.loading("Попытка входа...", {autoClose: 2000});
  post(endpoints.auth, {username, password}).then(
    (response) => {
      toast.update(notification, {render: "Добро пожаловать!", type: "success", isLoading: false, autoClose: 2000});
      localStorage.setItem('token', response.data);
      window.location.href = '/';
      return true
    }
  ).catch(error => {
    if(error.response.status === 401)
      toast.update(notification, {render: "Неправильные данные для входа!", type: "error", isLoading: false, autoClose: 2000});
    else
      toast.update(notification, {render: "Что-то пошло не так!", type: "error", isLoading: false, autoClose: 2000});
    return false;
  })
}
