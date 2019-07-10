// const url = '/sample.com.web/formpage/';
// const url = 'https://www.easy-mock.com/mock/5d1c514d84237536ccb6169e/samplebank/'
const url = '/formpage/'
export const pageApi = {
    /**
     * 获取表单模板信息
     * @param {*} obj 
     */
    getPage(obj) {
        return $ajax.get(url + 'getPage.action', { params: obj }).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 添加表单模板
     */
    setPage(obj) {
        return $ajax.post(url + 'setPage.action', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 修改表单模板
     */
    upPage(obj) {
        return $ajax.post(url + 'upPage.action', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 删除表单模板
     */
    delPageById(obj) {
        return $ajax.get(url + 'delPageById.action', { params: obj }).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 获取表单指标信息
     * @param {*} obj 
     */
    getElementByPid(obj) {
        return $ajax.get(url + 'getElementByPid.action', { params: obj }).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 导入表单元素
     */
    importElement(obj) {
        return $ajax.post(url + 'importElement.action', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 编辑导入表单元素
     */
    upElement(obj) {
        return $ajax.post(url + 'upElement.action', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 全部导入
     */
    importElementByCatalogId(obj) {
        return $ajax.get(url + 'importElementByCatalogId.action', { params: obj }).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 删除表单元素
     */
    delElement(obj) {
        return $ajax.get(url + 'delElement.action', { params: obj }).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 
     */
}