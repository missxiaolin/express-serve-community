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
   * 点赞
   * @param {*} data
   */
  async addFabulous(data) {
    
  }
}
