const url = '/sample.com.web/element/';
export const formApi = {
    /**
     * 获取树结构
     */
    getCatage(obj) {
        return $ajax.get(url + 'getCatage.action', { params: obj }).then((res) => {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 添加树结构
     */
    setCatage(obj) {
        return $ajax.post(url + 'setCatage.action', obj).then((res) => {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 修改树结构
     */
    upCatage(obj) {
        return $ajax.post(url + 'upCatage.action', obj).then((res) => {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 删除树结构
     */
    delCatage(obj) {
        return $ajax.get(url + 'delCatage.action', { params: obj }).then((res) => {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 获取表单元素列表
     */
    getElementsByCatalogId(obj) {
        return $ajax.get(url + 'getElementsByCatalogId.action', { params: obj }).then((res) => {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 添加表单元素
     */
    setElement(obj) {
        return $ajax.post(url + 'setElement.action', obj).then((res) => {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 修改表单元素
     */
    upElement(obj) {
        return $ajax.post(url + 'upElement.action', obj).then((res) => {
            return Promise.resolve(res.data)
        })
    }
}