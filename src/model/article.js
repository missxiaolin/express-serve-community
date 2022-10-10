import Knex from '../library/mysql'
import _ from 'lodash'
import Logger from '../library/logger'

const TABLE_COLUMN = [

]


const BASE_TABLE_NAME = 'article'

function getTableName() {
    return BASE_TABLE_NAME
}

export default class Article {
    constructor() {

    }

    /**
     * 保存文章
     * @param {*} data 
     */
    async addArticle(data) {
        let tableName = getTableName()
        let insertData = {}
        insertData.type = data.type
        insertData.title = data.title
        insertData.content = data.content
        insertData.auth = data.auth
        insertData.flow = 0
        insertData.is_topping = 2
        insertData.is_boutique = 2
        insertData.is_del = 1
        insertData.created_at = data.created_at
        insertData.updated_at = data.updated_at

        let insertResult = await Knex.returning('id')
            .insert(insertData)
            .into(tableName)
            .catch(err => {
                console.log(err)
                Logger.log(err.message, 'resource_error    add   出错')
                return []
            })
        let id = _.get(insertResult, [0], 0)

        return id > 0
    }
}