import moment from "moment";

export function tokenSession () {
  const now = moment().unix();
  const tokenDate = localStorage.getItem("tokenDate")
  const token = localStorage.getItem("token")
  if(tokenDate === null && token){
    localStorage.setItem("tokenDate", String(now));
    return true;
  }
  else{
    if(now - Number(tokenDate) > 3600){
      localStorage.removeItem("token");
      localStorage.removeItem("tokenDate");
      window.location.href = "/login";
      return false;
    }
  }
}
