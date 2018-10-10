<template>
    <div class="all-users">
        <span class="head">社区成员</span>
        <div v-for="v in allUsername">
            <img src="../../../static/img/默认头像.png" alt="">
            <span>{{v}}</span>
        </div>
    </div>
</template>

<script>
import * as https from '@/modules/userModules/http'
import * as common from '@/common/common';

const {handleCallBack} = common;
export default{
    data() {
        return{
            allUsername:[]
        }
    },
    mounted(){
        this.getAllUsername()
    },
    methods:{
        getAllUsername() {
            https.getAllUsername()
            .then(res =>{
                if(handleCallBack(res)){
                    this.allUsername = res.data.message
                }
            })
        }
    } }
</script>

<style>
    img{
        width: 40px;
    }
    span{
        display: inline-block;
    }
    .all-users{
        margin-top: 20px;
        border-left:1px solid #ddd;
    }
    .all-users div{
        cursor: pointer;
        text-align: left;
        padding-left: 20px;
        margin-bottom: 10px;
    }
    .all-users div:hover{
        border-bottom:1px solid #7abbfc;
    }
    .all-users .head{
        display: block;
        background-color: #ddd;
    }
</style>
