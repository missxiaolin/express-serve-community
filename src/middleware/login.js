import Token from "../library/utils/token";
import API_RES from "../constants/api_res";
import axios from "axios";

/**
 * login 中间件
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
//  http://test.webapi.sayhaiapp.com/sayhai/user
function login(req, res, next) {
  // 测试代码
  req.body.user_info = {
    user_id: 2,
    auth: "xiaolin",
    avatar: "",
  };
  next();
  return;
  let token = req.get("Authorization") || "";
  if (!token) {
    res.send(API_RES.needLoginIn());
    return;
  }
  const instance = axios.create({
    baseURL: "http://test.webapi.sayhaiapp.com",
    timeout: 1000,
    headers: {
      Authorization: token,
    },
  });
  instance
    .get("/sayhai/user")
    .then((resData) => {
      console.log(resData.data);
      if (res.code != 200) {
        res.send(API_RES.needLoginIn());
        return;
      }
      req.body.user_info = {
        user_id: resData.data.data.id,
        auth: resData.data.data.nickName,
        avatar: resData.data.data.avatar,
      };
      next();
    })
    .catch((e) => {
      res.send(API_RES.needLoginIn());
      return;
    });
}

export default login;
