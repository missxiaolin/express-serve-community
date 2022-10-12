import Base from "./base";
import User from "../model/user";

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
    
    return this.send(res, "保存成功");
  }
}
