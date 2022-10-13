import Base from "./base";
import User from "../model/user";
import md5 from "md5-node";
import Token from "../library/utils/token";

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
  async login(req, res) {
    let data = req.body || {};
    if (!data.name || !data.password) {
      return this.send(res, {}, 500, "参数错误");
    }
    data.password = md5(data.password)
    let user = await userModel.getUser(data)
    if (!user || user.length <= 0) {
      return this.send(res, {}, 500, "账号密码错误");
    }
    
    let token = Token.encrypt({id: user[0].id})
    return this.send(res, token);
  }
}
