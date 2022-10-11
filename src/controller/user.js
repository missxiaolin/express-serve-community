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
        user_id: data.user_info.user_id
    })
    // 文章总数
    let activeCount = await articleModel.allNotDelCount({
        is_del: NOT_DELETE,
        type: ARTICLE_TYPE,
        user_id: data.user_info.user_id
    })
    // 评论总数
    let total_comment = await articleModel.allDelUserIdSum({
        is_del: NOT_DELETE,
        user_id: data.user_info.user_id,
        is_comment_sum: true
    })
    // 点赞总数
    let total_fabulous = await articleModel.allDelUserIdSum({
        is_del: NOT_DELETE,
        user_id: data.user_info.user_id,
        is_fabulous_num: true
    })

    result = {
        questionCount,
        activeCount,
        total_comment,
        total_fabulous
    }

    return this.send(res, result);
  }
}
