import Base from "./base";
import Article from "../model/article";
import { NOT_DELETE, ARTICLE_TYPE, QUESTION_TYPE } from "../model/article";

const articleModel = new Article();

/**
 * 用户
 */
export default class CommentContent extends Base {
  /**
   * 用户评论
   * @param {*} req
   * @param {*} res
   */
  async save(req, res) {
    
  }
}
