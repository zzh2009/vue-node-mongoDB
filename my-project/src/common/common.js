import Vue from 'vue';

// 服务器返回状态处理,params为服务器返回的参数
export const handleCallBack = (params) => {
    // 服务器没有返回数据
    if (!params.statusText) {
        if (parseInt(params.status) === 401) {
            new Vue().$message({ message: '您还未登录，请先登录', type: 'error' });
            window.location.href = '/#/login';
            return false;
        }
        if (parseInt(params.status) === 403) {
            new Vue().$message({ message: '没有访问权限', type: 'error' });
            window.location.href = "/#/index";
            window.location.reload();
            return false;
        }
        if (parseInt(params.status) === 400) {
            new Vue().$message({ message: '请求参数错误', type: 'error' });
            return false;
        }
        new Vue().$message({ message: '服务器通信失败！code：'+params.status, type: 'error' });
        return false;
    }

    // 返回正确状态
    if (params.data.result.toLowerCase() === 'ok') {
        return true;
    }
    else{
        new Vue().$message({ message: params.data.message, type: 'error' });
        return false;
    }
}