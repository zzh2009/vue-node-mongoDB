import * as mutationTypes from './mutationTypes'
export default {
    [mutationTypes.NOW_USER_INFO] (state,payLoad) {//当前用户信息
        state.user=payLoad
    },
}