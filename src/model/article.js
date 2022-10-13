import Knex from "../library/mysql";
import _ from "lodash";
import Logger from "../library/logger";

const TABLE_COLUMN = [];

export const NOT_DELETE = 1;
export const DELETE = 2;
export const TOPPING = 1;
export const NOT_TOPPING = 2;
export const BOUTIQUE = 1;
export const NOT_BOUTIQUE = 2;
export const QUESTION_TYPE = 1;
export const ARTICLE_TYPE = 2;
export const NOTICE_TYPE = 3;

const BASE_TABLE_NAME = "article";

function getTableName() {
  return BASE_TABLE_NAME;
}

export default class Article {
  constructor() {}

  /**
   * adm 保存
   * @param {*} data
   * @returns
   */
  async addAdmArticle(data) {
    let tableName = getTableName();
    let insertData = {};
    insertData.type = data.type;
    insertData.title = data.title;
    insertData.content = data.content;
    insertData.auth = data.auth;
    insertData.flow = 0;
    insertData.is_topping = data.is_topping;
    insertData.is_boutique = data.is_boutique;
    insertData.is_del = NOT_DELETE;
    insertData.user_id = data.user_id || 0;
    insertData.comment_num = 0;
    insertData.fabulous_num = 0;
    insertData.created_at = data.created_at;
    insertData.updated_at = data.updated_at;

    let insertResult = await Knex.returning("id")
      .insert(insertData)
      .into(tableName)
      .catch((err) => {
        console.log(err);
        Logger.log(err.message, "article    add   出错");
        return [];
      });
    let id = _.get(insertResult, [0], 0);

    return id > 0;
  }

  /**
   * 设置置顶
   * @param {*} data
   * @returns
   */
  async updateTopping(data) {
    let tableName = getTableName();
    let model = await Knex.from(tableName)
      .where("id", data.id)
      .update("is_topping", data.is_topping);

    return model;
  }

  /**
   * 设置精品
   * @param {*} data
   * @returns
   */
  async updateBoutique(data) {
    let tableName = getTableName();
    let model = await Knex.from(tableName)
      .where("id", data.id)
      .update("is_boutique", data.is_boutique);

    return model;
  }

  /**
   * 保存文章
   * @param {*} data
   */
  async addArticle(data) {
    let tableName = getTableName();
    let insertData = {};
    insertData.type = data.type;
    insertData.title = data.title;
    insertData.content = data.content;
    insertData.auth = data.user_info.auth;
    insertData.flow = 0;
    insertData.is_topping = TOPPING;
    insertData.is_boutique = NOT_BOUTIQUE;
    insertData.is_del = NOT_DELETE;
    insertData.user_id = data.user_info.user_id;
    insertData.comment_num = 0;
    insertData.fabulous_num = 0;
    insertData.created_at = data.created_at;
    insertData.updated_at = data.updated_at;

    let insertResult = await Knex.returning("id")
      .insert(insertData)
      .into(tableName)
      .catch((err) => {
        console.log(err);
        Logger.log(err.message, "article    add   出错");
        return [];
      });
    let id = _.get(insertResult, [0], 0);

    return id > 0;
  }

  /**
   * 获取文章详情
   * @param {*} data
   */
  async detail(data) {
    let tableName = getTableName();
    let res = await Knex.select(
      "id",
      "flow",
      "type",
      "title",
      "content",
      "auth",
      "comment_num",
      "fabulous_num",
      "created_at",
      "updated_at"
    )
      .from(tableName)
      .where("id", data.id)
      .andWhere("is_del", NOT_DELETE)
      .catch((err) => {
        console.log(err);
        return [];
      });
    return res;
  }

  /**
   * 浏览数增加
   * @param {*} data
   * @returns
   */
  async addFlow(data) {
    let tableName = getTableName();
    let res = await Knex.from(tableName)
      .where("id", data.id)
      .andWhere("is_del", NOT_DELETE)
      .update("flow", data.flow + 1)
      .catch((err) => {
        console.log(err);
        return [];
      });
    return res;
  }

  /**
   * 文章列表
   * @param {*} data
   * @returns
   */
  async delList(data) {
    let tableName = getTableName();
    let model = Knex.from(tableName).where("is_del", data.is_del);

    if (data.title) {
      model = model.andWhere("title", "like", `%${data.title}%`);
    }

    if (data.type) {
      model = model.andWhere("type", data.type);
    }

    if (data.user_id) {
      model = model.andWhere("user_id", data.user_id);
    }

    // 置顶逻辑，按照is_topping 降序 updated_at 降序
    if (!!data.is_topping && data.is_topping == true) {
      model = model.orderBy([
        { column: "is_topping", order: "desc" },
        { column: "updated_at", order: "desc" },
      ]);
    }
    // 按照浏览量排序
    if (!!data.is_flow && data.is_flow == true) {
      model = model.orderBy("flow", "desc");
    }

    if (data.is_create_sort) {
      model = model.orderBy("created_at", "desc");
    }
    if (data.offset) {
      model = model.offset(data.offset);
    }
    model = await model.limit(data.limit);

    return model;
  }

  /**
   * 数据总数
   * @param {*} data
   * @returns
   */
  async allNotDelCount(data) {
    let tableName = getTableName();
    let model = Knex.from(tableName).where("is_del", data.is_del);

    if (data.title) {
      model = model.andWhere("title", "like", `%${data.title}%`);
    }
    if (data.user_id) {
      model.andWhere("user_id", data.user_id);
    }
    if (data.type) {
      model.andWhere("type", data.type);
    }

    model = await model.count("* as activeCount");
    return model[0].activeCount;
  }

  /**
   * 查询总数和
   * @param {*} data
   * @returns
   */
  async allDelUserIdSum(data) {
    let tableName = getTableName();
    let model = Knex.from(tableName).where("is_del", data.is_del);
    if (data.type) {
      model.andWhere("type", data.type);
    }
    if (data.user_id) {
      model.andWhere("user_id", data.user_id);
    }

    if (data.is_comment_sum) {
      model = model.sum("comment_num as comment_total");
    }

    if (data.is_fabulous_num) {
      model = model.sum("fabulous_num as fabulous_total");
    }

    if (data.is_flow) {
      model = model.sum("flow as flow_total");
    }
    model = await model;

    return model[0];
  }

  /**
   * 点赞数加1或者减1
   * @param {*} data
   * @returns
   */
  async addFabulous(data) {
    let tableName = getTableName();
    let res = await Knex.from(tableName)
      .where("id", data.id)
      .andWhere("is_del", NOT_DELETE)
      .update(
        "fabulous_num",
        data.isFabulous == 2 ? data.fabulous_num + 1 : data.fabulous_num - 1
      )
      .catch((err) => {
        console.log(err);
        return [];
      });
    return res;
  }
}
