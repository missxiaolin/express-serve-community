import Base from "./base";
import Article from "../model/article";
import { NOT_DELETE, NOTICE_TYPE } from "../model/article";
import moment from "moment";
import DATE_FORMAT from "../constants/date_format";

const articleModel = new Article();

/**
 * 文章
 */
export default class AdmArticleContent extends Base {
  /**
   * 添加文章
   * @param {*} req
   * @param {*} res
   */
  async save(req, res) {
    let data = req.body || {},
      types = [1, 2, 3];
    if (
      !data.type ||
      !data.title ||
      !data.content ||
      types.indexOf(Number(data.type)) == -1 ||
      !data.auth ||
      !data.is_topping ||
      !data.is_boutique
    ) {
      return this.send(res, {}, 500, "参数错误");
    }
    data.created_at = moment().format(DATE_FORMAT.DISPLAY_BY_SECOND);
    data.updated_at = moment().format(DATE_FORMAT.DISPLAY_BY_SECOND);
    await articleModel.addAdmArticle(data);
    return this.send(res, "保存成功");
  }

  /**
   * adm list
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  async list(req, res) {
    return this.send(res, "保存成功");
  }

  /**
   * 置顶
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  async topping(req, res) {
    return this.send(res, "保存成功");
  }

  /**
   * 精品
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  async boutique(req, res) {
    return this.send(res, "保存成功");
  }
}
