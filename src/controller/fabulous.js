import Base from "./base";
import Article from "../model/article";
import { NOT_DELETE, ARTICLE_TYPE, QUESTION_TYPE } from "../model/article";

const articleModel = new Article();

/**
 * 用户
 */
export default class FabulousContent extends Base {
  /**
   * 用户点赞
   * @param {*} req
   * @param {*} res
   */
  async save(req, res) {
    
  }
}
