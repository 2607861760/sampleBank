export const dict = [{
        type: 1,
        label: '标题'
    },
    {
        type: 2,
        label: '文本框'
    },
    {
        type: 3,
        label: '多行文本框'
    },
    {
        type: 4,
        label: '整形数值框'
    },
    {
        type: 5,
        label: '小数数值框'
    },
    {
        type: 6,
        label: '开关'
    },
    {
        type: 7,
        label: '单选按钮'
    },
    {
        type: 8,
        label: '复选框'
    },
    {
        type: 9,
        label: '下拉菜单'
    },
    {
        type: 10,
        label: '可查询下拉菜单'
    },
    {
        type: 11,
        label: '日期'
    },
    {
        type: 12,
        label: '时间'
    },
    {
        type: 13,
        label: '日期时间'
    },
]

export const mapCol = function(val) {
    let obj = dict.find(item => {
        if (val == item.type) {
            return item
        }
    })
    return obj.label
}