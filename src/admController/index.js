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
  save(req, res) {
    
    return this.send(res, "保存成功");
  }
}
