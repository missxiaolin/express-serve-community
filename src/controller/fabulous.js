import Base from "./base";
import Article from "../model/article";
import Fabulous from "../model/fabulous";
import moment from "moment";
import DATE_FORMAT from "../constants/date_format";

const articleModel = new Article();
const fabulousModel = new Fabulous();

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
    let data = req.body || {};

    if (!data.is_fabulous || !data.article_id) {
      return this.send(res, {}, 500, "参数错误");
    }
    let articleDetail = await articleModel.detail({
      id: data.article_id,
    });
    if (!articleDetail || articleDetail.length <= 0) {
      return this.send(res, {}, 500, "文章不存在");
    }
    // 点赞
    if (data.is_fabulous == 2) {
      let fabulousData = await fabulousModel.detail(data)
      if (!fabulousData || fabulousData.length != 0) {
        return this.send(res, {}, 500, "您已经点赞过");
      }
      data.created_at = moment().format(DATE_FORMAT.DISPLAY_BY_SECOND);
      data.updated_at = moment().format(DATE_FORMAT.DISPLAY_BY_SECOND);
      let fabulousDetail = await fabulousModel.save(data);
      if (fabulousDetail) {
        await articleModel.addFabulous({
          id: articleDetail[0].id,
          isFabulous: data.is_fabulous,
          fabulous_num: articleDetail[0].fabulous_num,
        });
      }
    }
    // 删除点赞
    if (data.is_fabulous == 1) {
      let isDel = await fabulousModel.del(data);
      if (isDel == 1) {
        await articleModel.addFabulous({
          id: articleDetail[0].id,
          isFabulous: data.is_fabulous,
          fabulous_num: articleDetail[0].fabulous_num,
        });
      }
    }

    return this.send(res, true);
  }
}
