import { post } from "../../helpers/apiProxy";

class AuthService {
  public auth(username: string, password: string) {
    return post('/auth', {username, password});
  }
}

export default AuthService;
