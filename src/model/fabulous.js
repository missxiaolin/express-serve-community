import Knex from "../library/mysql";
import _ from "lodash";
import Logger from "../library/logger";


const BASE_TABLE_NAME = "fabulous";

function getTableName() {
  return BASE_TABLE_NAME;
}

export default class Fabulous {
  constructor() {}

  /**
   * 添加点赞
   * @param {*} data
   */
  async save(data) {
    let tableName = getTableName();
    let insertData = {};
    insertData.article_id = data.article_id;
    insertData.user_id = data.user_info.user_id;
    insertData.created_at = data.created_at;
    insertData.updated_at = data.updated_at;

    let insertResult = await Knex.returning("id")
      .insert(insertData)
      .into(tableName)
      .catch((err) => {
        console.log(err);
        Logger.log(err.message, "fabulous    add   出错");
        return [];
      });
    let id = _.get(insertResult, [0], 0);

    return id > 0;
  }

  /**
   * 点赞查询，插入之前查一遍避免垃圾数据
   * @param {*} data 
   * @returns 
   */
  async detail(data) {
    let tableName = getTableName();
    let res = await Knex.from(tableName)
    .where('user_id', data.user_id)
    .andWhere('article_id', data.article_id)
    .catch((err) => {
      console.log(err);
      return [];
    });
    return res
  }

  /**
   * 删除点赞
   * @param {*} data 
   */
  async del(data) {
    let tableName = getTableName();
    let res = await Knex.from(tableName)
    .where('user_id', data.user_info.user_id)
    .andWhere('article_id', data.article_id)
    .del()
    return res
  }
}
