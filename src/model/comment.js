import Knex from "../library/mysql";
import _ from "lodash";
import Logger from "../library/logger";

const BASE_TABLE_NAME = "comment";
const NOT_DELETE = 1

function getTableName() {
  return BASE_TABLE_NAME;
}

export default class Comment {
  constructor() {}

  /**
   * 保存评论
   * @param {*} data
   */
  async addComment(data) {
    let tableName = getTableName();
    let insertData = {};
    insertData.text = data.text;
    insertData.comment_id = 0
    insertData.article_id = data.article_id;
    insertData.auth = data.user_info.auth;
    insertData.avatar = data.user_info.avatar;
    insertData.is_del = NOT_DELETE;
    insertData.user_id = data.user_info.user_id;
    insertData.created_at = data.created_at;
    insertData.updated_at = data.updated_at;

    let insertResult = await Knex.returning("id")
      .insert(insertData)
      .into(tableName)
      .catch((err) => {
        console.log(err);
        Logger.log(err.message, "resource_error    add   出错");
        return [];
      });
    let id = _.get(insertResult, [0], 0);

    return id > 0;
  }
}
