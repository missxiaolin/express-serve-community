import _ from 'lodash'
import AdmArticleContent from '../../../admController/index'
import RouterConfigBuilder from '../../../library/utils/router_config_builder'

const admArticleContent = new AdmArticleContent()

// 保存公告
const index = RouterConfigBuilder.routerConfigBuilder('/adm/article/save', RouterConfigBuilder.METHOD_TYPE_POST, (req, res) => {
    return admArticleContent.save(req, res)
}, true)

// 查询
const detail = RouterConfigBuilder.routerConfigBuilder('/adm/article/detail', RouterConfigBuilder.METHOD_TYPE_POST, (req, res) => {
    return admArticleContent.detail(req, res)
}, true)

// 所有文章列表
const admArticleList = RouterConfigBuilder.routerConfigBuilder('/adm/article/list', RouterConfigBuilder.METHOD_TYPE_POST, (req, res) => {
    return admArticleContent.list(req, res)
}, true)

// 是否置顶
const toppingArticle = RouterConfigBuilder.routerConfigBuilder('/adm/article/topping', RouterConfigBuilder.METHOD_TYPE_POST, (req, res) => {
    return admArticleContent.topping(req, res)
}, true)

// 是否精品
const boutiqueArticle = RouterConfigBuilder.routerConfigBuilder('/adm/article/boutique', RouterConfigBuilder.METHOD_TYPE_POST, (req, res) => {
    return admArticleContent.boutique(req, res)
}, true)

// 删除文章
const delArticle = RouterConfigBuilder.routerConfigBuilder('/adm/article/del', RouterConfigBuilder.METHOD_TYPE_POST, (req, res) => {
    return admArticleContent.del(req, res)
}, true)

export default {
    ...index,
    ...detail,
    ...admArticleList,
    ...toppingArticle,
    ...boutiqueArticle,
    ...delArticle
}