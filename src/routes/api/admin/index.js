import _ from 'lodash'
import AdmArticleContent from '../../../admController/index'
import RouterConfigBuilder from '../../../library/utils/router_config_builder'

const admArticleContent = new AdmArticleContent()

// 保存公告
const index = RouterConfigBuilder.routerConfigBuilder('/adm/article/save', RouterConfigBuilder.METHOD_TYPE_POST, (req, res) => {
    return admArticleContent.save(req, res)
}, true)


export default {
    ...index,
}