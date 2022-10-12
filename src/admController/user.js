import Base from "./base";
import User from "../model/user";
import md5 from "md5-node";

const userModel = new User();

/**
 * adm 用户登录
 */
export default class UserContent extends Base {
  /**
   * 登录
   * @param {*} req
   * @param {*} res
   */
  login(req, res) {
    console.log(md5('admin'))
    return this.send(res, "保存成功");
  }
}
