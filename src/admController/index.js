import Base from "./base";
import Article from "../model/article";
import Comment from "../model/comment";
import { NOT_DELETE, NOTICE_TYPE } from "../model/article";
import moment from "moment";
import DATE_FORMAT from "../constants/date_format";

const articleModel = new Article();
const commentModel = new Comment();


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
      !data.is_boutique ||
      !data.is_del
    ) {
      return this.send(res, {}, 500, "参数错误");
    }
    data.created_at = moment().format(DATE_FORMAT.DISPLAY_BY_SECOND);
    data.updated_at = moment().format(DATE_FORMAT.DISPLAY_BY_SECOND);
    if (!!data.id) {
      await articleModel.updateAdmArticle(data);
    } else {
      await articleModel.addAdmArticle(data);
    }
    
    return this.send(res, "保存成功");
  }

  /**
   * 查询文章详情
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  async detail (req, res) {
    let data = req.body || {}
    if (
      !data.id
    ) {
      return this.send(res, {}, 500, "参数错误");
    }
    let result = await articleModel.detailAdmArticle({
      id: data.id
    })
    return this.send(res, result[0] || {});
  }

  /**
   * adm list
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async list(req, res) {
    let data = req.body || {},
      result = {},
      page = data.page || 1,
      pageSize = data.pageSize ? data.pageSize : 30;
    data.offset = page == 1 ? 0 : (page - 1) * pageSize;
    data.limit = pageSize;
    let activeData = await articleModel.admList(data);
    let count = await articleModel.admCount(data);
    for(let i = 0; i < activeData.length; i++) {
      activeData[i].created_at = moment( activeData[i].created_at).format(DATE_FORMAT.DISPLAY_BY_SECOND);
      if (activeData[i].type == 1) {
        activeData[i].comments = await commentModel.admGetCommentId(activeData[i].id)
      }
    }
    
    result.activeData = activeData;
    result.count = count;
    return this.send(res, result);
  }

  /**
   * 置顶
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async topping(req, res) {
    let data = req.body || {},
      types = [1, 2];
    if (
      !data.id ||
      !data.is_topping ||
      types.indexOf(Number(data.is_topping)) == -1
    ) {
      return this.send(res, {}, 500, "参数错误");
    }
    await articleModel.updateTopping(data);
    return this.send(res, "设置成功");
  }

  /**
   * 精品
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async boutique(req, res) {
    let data = req.body || {},
      types = [1, 2];
    if (
      !data.id ||
      !data.is_boutique ||
      types.indexOf(Number(data.is_boutique)) == -1
    ) {
      return this.send(res, {}, 500, "参数错误");
    }
    await articleModel.updateBoutique(data);
    return this.send(res, "设置成功");
  }

  /**
   * 删除
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async del(req, res) {
    let data = req.body || {},
      types = [1, 2];
    if (!data.id || !data.is_del || types.indexOf(Number(data.is_del)) == -1) {
      return this.send(res, {}, 500, "参数错误");
    }
    await articleModel.updateDel(data);
    return this.send(res, "设置成功");
  }

  /**
   * 添加评论
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  async addComment(req, res) {
    let data = req.body || {}
    if (!data.id || !data.content) {
      return this.send(res, {}, 500, "参数错误");
    }
    let articleDetail = await articleModel.detailAdmArticle({
      id: data.id
    })
    let article = articleDetail[0] || {};
    if (!articleDetail || articleDetail.length <= 0 || article.type != 1) {
      return this.send(res, {}, 500, "文章不存在");
    }
    let commentData = {
      comment_id: 0,
      article_id: article.id,
      article_type: article.type,
      article_user_id: article.user_id,
      avatar: '',
      auth: '',
      user_id: 0,
      text: data.content,
      is_del: 1,
      created_at: moment().format(DATE_FORMAT.DISPLAY_BY_SECOND),
      updated_at: moment().format(DATE_FORMAT.DISPLAY_BY_SECOND)
    }
    await commentModel.admAddComment(commentData)
    return this.send(res, "保存成功");
  }
}
