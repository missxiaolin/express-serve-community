import Base from "./base";
import Article from "../model/article";
import { NOT_DELETE, ARTICLE_TYPE, QUESTION_TYPE } from "../model/article";

const articleModel = new Article();

/**
 * 用户
 */
export default class UserContent extends Base {
  /**
   * 用户成就
   * @param {*} req
   * @param {*} res
   */
  async getUserArticleAchievement(req, res) {
    let data = req.body || {},
      result = {};
    // 问题总数
    let questionCount = await articleModel.allNotDelCount({
      is_del: NOT_DELETE,
      type: QUESTION_TYPE,
      user_id: data.user_info.user_id,
    });
    // 文章总数
    let activeCount = await articleModel.allNotDelCount({
      is_del: NOT_DELETE,
      type: ARTICLE_TYPE,
      user_id: data.user_info.user_id,
    });
    // 评论总数
    let total_comment = await articleModel.allDelUserIdSum({
      is_del: NOT_DELETE,
      user_id: data.user_info.user_id,
      is_comment_sum: true,
    });
    // 点赞总数
    let total_fabulous = await articleModel.allDelUserIdSum({
      is_del: NOT_DELETE,
      user_id: data.user_info.user_id,
      is_fabulous_num: true,
    });

    result = {
      questionCount,
      activeCount,
      total_comment,
      total_fabulous,
    };

    return this.send(res, result);
  }

  /**
   * 用户文章提问list
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async getUserList(req, res) {
    let data = req.body || {},
      result = {},
      page = data.page || 1;
    data.offset = page == 1 ? 0 : (page - 1) * 10;
    data.limit = data.pageSize ? data.pageSize : 30;
    data.user_id = data.user_info.user_id;
    data.is_create_sort = true;
    data.is_del = NOT_DELETE;
    let activeData = await articleModel.delList(data);
    let count = await articleModel.allNotDelCount({
      is_del: NOT_DELETE,
      title: data.title,
      user_id: data.user_info.user_id,
    });
    result.activeData = activeData;
    result.count = count;
    return this.send(res, result);
  }
}
