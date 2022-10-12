import _ from 'lodash'
import FabulousContent from '../../../controller/fabulous'
import RouterConfigBuilder from '../../../library/utils/router_config_builder'

const fabulousController = new FabulousContent()

// 用户点赞
const fabulousSave = RouterConfigBuilder.routerConfigBuilder('/api/fabulous/save', RouterConfigBuilder.METHOD_TYPE_POST, (req, res) => {
    return fabulousController.save(req, res)
}, true)


export default {
    ...fabulousSave,
}