import Base from "./base";
import Comment from "../model/comment";
import moment from "moment";
import Article from "../model/article";
import DATE_FORMAT from "../constants/date_format";

const commentModel = new Comment();
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
    let data = req.body || {};

    if (!data.text || !data.article_id) {
      return this.send(res, {}, 500, "参数错误");
    }
    let articleDetail = await articleModel.detail({
      id: data.article_id,
    });
    if (!articleDetail || articleDetail.length <= 0) {
      return this.send(res, {}, 500, "文章不存在");
    }
    let articleData = articleDetail[0]

    data.created_at = moment().format(DATE_FORMAT.DISPLAY_BY_SECOND);
    data.updated_at = moment().format(DATE_FORMAT.DISPLAY_BY_SECOND);
    data.article_type = articleData.type || 0
    data.article_user_id = articleData.user_id || 0
    await commentModel.addComment(data);
    await articleModel.addCommentNum(articleData, true)

    return this.send(res, "保存成功");
  }

  /**
   * 删除评论
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async del(req, res) {
    let data = req.body || {};
    if (!data.id) {
      return this.send(res, {}, 500, "参数错误");
    }
    let articleDetail = await articleModel.detail({
      id: data.id,
    });
    if (!articleDetail || articleDetail.length <= 0) {
      return this.send(res, {}, 500, "文章不存在");
    }
    let articleData = articleDetail[0]
    await commentModel.del(data);
    await articleModel.addCommentNum(articleData, false)
    return this.send(res, "删除成功");
  }

  /**
   * 获取文章评论列表
   * @param {*} req 
   * @param {*} res 
   */
  async getArticleList(req, res) {
    let data = req.body || {},
      result = {},
      page = data.page || 1,
      pageSize = data.pageSize ? data.pageSize : 30;
    data.offset = page == 1 ? 0 : (page - 1) * pageSize;
    data.limit = pageSize;
    data.is_create_sort = true
    data.is_del = 1
    if (!data.id) {
      return this.send(res, {}, 500, "参数错误");
    }
    let commentList = await commentModel.getArticleList(data);
    let count = await commentModel.allNotDelCount(data)
    for (let i = 0; i < commentList.length; i++) {
      commentList[i].created_at = moment(commentList[i].created_at).format(DATE_FORMAT.DISPLAY_BY_SECOND);
      commentList[i].updated_at = moment(commentList[i].updated_at).format(DATE_FORMAT.DISPLAY_BY_SECOND);
    }
    result.commentList = commentList;
    result.count = count;
    return this.send(res, result);
  }
}
