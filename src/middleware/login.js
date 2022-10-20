import Token from "../library/utils/token";
import API_RES from "../constants/api_res";
import axios from "axios";
import _ from "lodash";
let cApiReg = /^\/api/i;
let admApiReg = /^\/adm/i;

/**
 * login 中间件
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
//  http://test.webapi.sayhaiapp.com/sayhai/user
function login(req, res, next) {
  let path = req.path;
  if (path.search(cApiReg) === 0) {
    cLogin(req, res, next);
    return;
  }
  if (path.search(admApiReg) === 0) {
    aLogin(req, res, next);
    return;
  }
  next();
}

/**
 * 官网登录
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function cLogin(req, res, next) {
  let token = req.get("Authorization") || req.get("authorization") || "";
  if (!token) {
    res.send(API_RES.needLoginIn());
    return;
  }
  const instance = axios.create({
    baseURL: "https://test-webapi.sayhaiapp.com",
    timeout: 1000,
    headers: {
      Authorization: token,
    },
  });
  instance
    .get("/sayhai/user")
    .then((resData) => {
      if (resData.data.code != 200) {
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

/**
 * 后台登录验证
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function aLogin(req, res, next) {
  let token = req.get("Authorization") || "";
  if (!token) {
    res.send(API_RES.needLoginIn());
    return;
  }
  let data = Token.decrypt(token);
  if (data.token) {
    next();
  } else {
    res.send(API_RES.needLoginIn());
    return;
  }
}

export default login;
