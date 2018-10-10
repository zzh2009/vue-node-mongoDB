import fetch from '@/common/fetch'

// 提交说说
export const postShuoshuo = ( params = {} ) => {
    return fetch.post('/postShuoshuo', params)
}
// 获取说说列表
export const getShuoshuo = ( params = {} ) => {
    return fetch.post('/getShuoshuo', params)
}
// 赞说说
export const updateShuoshuo = ( params ) => {
    return fetch.post('/updateShuoshuo', params)
}