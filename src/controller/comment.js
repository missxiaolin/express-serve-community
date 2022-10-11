import Base from "./base";
import Comment from "../model/comment";
import moment from "moment";
import DATE_FORMAT from "../constants/date_format";

const commentModel = new Comment();

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
    let data = req.body || {};

    if (!data.text || !data.article_id) {
      return this.send(res, {}, 500, "参数错误");
    }
    data.created_at = moment().format(DATE_FORMAT.DISPLAY_BY_SECOND);
    data.updated_at = moment().format(DATE_FORMAT.DISPLAY_BY_SECOND);
    commentModel.addComment(data);
    return this.send(res, "保存成功");
  }
}
