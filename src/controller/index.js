import Base from "./base";
import Article from "../model/article";
import moment from "moment";
import DATE_FORMAT from "../constants/date_format";

const articleModel = new Article();

/**
 * 文章
 */
export default class ArticleContent extends Base {
  /**
   * 添加文章
   * @param {*} req
   * @param {*} res
   */
  save(req, res) {
    let data = req.body || {},
      types = [1, 2, 3];

    if (
      !data.type ||
      !data.title ||
      !data.content ||
      types.indexOf(Number(data.type)) == -1
    ) {
      return this.send(res, {}, 500, "参数错误");
    }
    data.created_at = moment().format(DATE_FORMAT.DISPLAY_BY_SECOND);
    data.updated_at = moment().format(DATE_FORMAT.DISPLAY_BY_SECOND);
    articleModel.addArticle(data);
    return this.send(res, "保存成功");
  }

  /**
   * 获取文章详情
   * @param {*} req
   * @param {*} res
   */
  async detail(req, res) {
    let data = req.body || {},
      types = [1, 2, 3];

    if (!data.id) {
      return this.send(res, {}, 500, "参数错误");
    }
    let result = await articleModel.detail(data);
    if (!result || result.length == 0){
        return this.send(res, {}, 500, "文章不存在 ");
    }
    return this.send(res, result[0]);
  }
}
