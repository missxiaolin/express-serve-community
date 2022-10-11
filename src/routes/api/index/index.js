import _ from 'lodash'
import ArticleContent from '../../../controller/index'
import RouterConfigBuilder from '../../../library/utils/router_config_builder'

const indexController = new ArticleContent()

// 保存文章
const index = RouterConfigBuilder.routerConfigBuilder('/api/article/save', RouterConfigBuilder.METHOD_TYPE_POST, (req, res) => {
    return indexController.save(req, res)
}, true)

// 文章详情
const articleDetail = RouterConfigBuilder.routerConfigBuilder('/api/article/detail', RouterConfigBuilder.METHOD_TYPE_POST, (req, res) => {
    return indexController.detail(req, res)
}, true)

// 文章列表
const articleList = RouterConfigBuilder.routerConfigBuilder('/api/article/list', RouterConfigBuilder.METHOD_TYPE_POST, (req, res) => {
    return indexController.list(req, res)
}, true)

// 公告列表
const articleNoticeList = RouterConfigBuilder.routerConfigBuilder('/api/notice/list', RouterConfigBuilder.METHOD_TYPE_GET, (req, res) => {
    return indexController.noticeList(req, res)
}, true)

export default {
    ...index,
    ...articleDetail,
    ...articleList,
    ...articleNoticeList
}