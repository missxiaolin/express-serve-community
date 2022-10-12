import Knex from "../library/mysql";
import _ from "lodash";

const BASE_TABLE_NAME = "admin";

function getTableName() {
  return BASE_TABLE_NAME;
}

export default class User {
  constructor() {}

  /**
   * 查询用户
   * @param {*} data
   * @returns
   */
  async getUser(data) {
    let tableName = getTableName();
    let res = await Knex.from(tableName)
      .where("name", data.name)
      .andWhere("password", data.password)
      .catch((err) => {
        console.log(err);
        return [];
      });
    return res;
  }
}
