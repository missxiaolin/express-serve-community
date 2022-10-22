import Knex from "../library/mysql";
import _ from "lodash";
import Logger from "../library/logger";

const BASE_TABLE_NAME = "comment";
const NOT_DELETE = 1;
const DELETE = 2;

function getTableName() {
  return BASE_TABLE_NAME;
}

export default class Comment {
  constructor() { }

  /**
   * adm 保存评论
   * @param {*} data 
   * @returns 
   */
  async admAddComment(data) {
    let tableName = getTableName();
    let insertData = {};
    insertData.text = data.text;
    insertData.comment_id = 0;
    insertData.article_id = data.article_id;
    insertData.article_type = data.article_type
    insertData.article_user_id = data.article_user_id
    insertData.auth = data.auth || '';
    insertData.avatar = data.avatar || '';
    insertData.is_del = NOT_DELETE;
    insertData.user_id = data.user_id;
    insertData.created_at = data.created_at;
    insertData.updated_at = data.updated_at;

    let insertResult = await Knex.returning("id")
      .insert(insertData)
      .into(tableName)
      .catch((err) => {
        console.log(err);
        Logger.log(err.message, "comment    add   出错");
        return [];
      });
    let id = _.get(insertResult, [0], 0);

    return id > 0;
  }

  /**
   * 保存评论
   * @param {*} data
   */
  async addComment(data) {
    let tableName = getTableName();
    let insertData = {};
    insertData.text = data.text;
    insertData.comment_id = 0;
    insertData.article_id = data.article_id;
    insertData.article_type = data.article_type
    insertData.article_user_id = data.article_user_id
    insertData.auth = data.user_info.auth || '';
    insertData.avatar = data.user_info.avatar || '';
    insertData.is_del = NOT_DELETE;
    insertData.user_id = data.user_info.user_id;
    insertData.created_at = data.created_at;
    insertData.updated_at = data.updated_at;

    let insertResult = await Knex.returning("id")
      .insert(insertData)
      .into(tableName)
      .catch((err) => {
        console.log(err);
        Logger.log(err.message, "comment    add   出错");
        return [];
      });
    let id = _.get(insertResult, [0], 0);

    return id > 0;
  }

  /**
   * 查询回复
   */
  async admGetCommentId(id) {
    let tableName = getTableName();
    let model = Knex.from(tableName)
      .andWhere("article_id", id);
    model = await model;

    return model;
  }

  /**
   * 查询列表
   * @param {*} data
   * @returns
   */
  async getUserList(data) {
    let tableName = getTableName();
    let model = Knex.from(tableName)
      .where("is_del", NOT_DELETE)
      .andWhere("article_id", data.article_id);

    if (data.is_create_sort) {
      model = model.orderBy("created_at", "desc");
    }

    model = await model;

    return model;
  }

  /**
   * 获取文章评论列标
   * @param {*} data 
   * @returns 
   */
  async getArticleList(data) {
    let tableName = getTableName();
    let model = Knex.from(tableName).where("is_del", data.is_del)
      .andWhere("article_id", data.id);

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
    let model = Knex.from(tableName).where("is_del", data.is_del)
      .andWhere("article_id", data.id);

    model = await model.count("* as commentCount");
    return model[0].commentCount;
  }

  /**
   * 隐藏评论
   * @param {*} data
   * @returns
   */
  async del(data) {
    let tableName = getTableName();
    let model = await Knex.from(tableName)
      .where("id", data.id)
      .andWhere("user_id", data.user_info.user_id)
      .update('is_del', DELETE);

    return model;
  }

  /**
   * 用户文章评论列表
   * @param {*} data 
   * @returns 
   */
  async getUserCommentNotDelList(data) {
    let tableName = getTableName();
    let model = Knex.from(tableName).where("is_del", NOT_DELETE);

    if (data.article_type) {
      model.andWhere("article_type", data.article_type);
    }

    if (data.article_user_id) {
      model.andWhere("article_user_id", data.article_user_id);
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
   * 评论总数
   * @param {*} data 
   * @returns 
   */
  async getUserCommentNotDelCount(data) {
    let tableName = getTableName();
    let model = Knex.from(tableName).where("is_del", NOT_DELETE);

    if (data.article_user_id) {
      model.andWhere("article_user_id", data.article_user_id);
    }
    if (data.type) {
      model.andWhere("article_type", data.article_type);
    }

    model = await model.count("* as activeCount");
    return model[0].activeCount;
  }
}
