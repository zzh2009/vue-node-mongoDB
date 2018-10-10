import fetch from '@/common/fetch'

// 注册用户
export const doRegist = ( params = {}) =>{
    return fetch.post('/regist', params)
}
// 登陆
export const doLogin = ( params = {}) =>{
    return fetch.post('/login', params)
}

// 判断是否登陆接口
export const logout = () => {
    return fetch.get('/logout', {});
}

// 返回所有用户姓名
export const getAllUsername = () => {
    return fetch.get('/allUsername', {})
}