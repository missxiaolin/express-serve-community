import Knex from "../library/mysql";
import _ from "lodash";
import Logger from "../library/logger";


const BASE_TABLE_NAME = "comment";

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
    
  }
}
