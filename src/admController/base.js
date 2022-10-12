import API_RES from "../constants/api_res";

/**
 * 基础Base类
 */
export default class Base {
  /**
   * 发送
   * @param {*} res
   * @param {*} data
   * @param {*} code
   * @param {*} errorMessage
   * @param {*} errorCode
   */
  send(res, data, code = 200, errorMessage = "", errorCode = "") {
    return res.send(API_RES.showResult(data, code, errorMessage, errorCode));
  }
}
