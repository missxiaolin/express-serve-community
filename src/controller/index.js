import Base from "./base";
import Article from "../model/article";
import { NOT_DELETE } from '../model/article'
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
    let data = req.body || {};

    if (!data.id) {
      return this.send(res, {}, 500, "参数错误");
    }
    // 查询文章
    let result = await articleModel.detail(data);
    if (!result || result.length == 0) {
      return this.send(res, {}, 500, "文章不存在 ");
    }
    // 文章浏览数+1
    await articleModel.addFlow(result[0]);
    return this.send(res, result[0]);
  }

  detailType(data) {}

  /**
   * 文章列表
   * @param {*} req
   * @param {*} res
   */
  async list(req, res) {
    let data = req.body || {},
      result = {},
      page = data.page;
    data.offset = page == 1 ? 0 : (page - 1) * 10;
    data.limit = data.pageSize ? data.pageSize : 10;
    data.is_del = NOT_DELETE;
    let activeData = await articleModel.delList(data);
    let count = await articleModel.allNotDelCount({
      is_del: NOT_DELETE,
      title: data.title
    });
    result.activeData = activeData;
    result.count = count;
    return this.send(res, result);
  }
}
