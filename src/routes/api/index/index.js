import _ from 'lodash'
import ArticleContent from '../../../controller/index'
import RouterConfigBuilder from '../../../library/utils/router_config_builder'

const indexController = new ArticleContent()

// 保存文章
const index = RouterConfigBuilder.routerConfigBuilder('/api/article/save', RouterConfigBuilder.METHOD_TYPE_POST, (req, res) => {
    return indexController.save(req, res)
}, false)

// 文章详情
const articleDetail = RouterConfigBuilder.routerConfigBuilder('/api/article/detail', RouterConfigBuilder.METHOD_TYPE_POST, (req, res) => {
    return indexController.detail(req, res)
}, false)

export default {
    ...index,
    ...articleDetail
}