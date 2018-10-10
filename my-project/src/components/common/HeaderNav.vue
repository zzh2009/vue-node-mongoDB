<template>
  <div class="header-nav">
       <div class="left">
           <img src="../../../static/img/Group8.png" alt="">
           <span>社区中心</span>
       </div>
       <div class="right">
           <el-input
                size="small"
                suffix-icon="el-icon-search"
                v-model="input">
            </el-input>
            <span class="username">{{user.name}}</span>
       </div>
        <i class="el-icon-error" @click="exit"></i>
        <img class="head-portrait" src="../../../static/img/默认头像.png" alt="">
  </div>
</template>


<script>
import * as https from '@/modules/userModules/http'
import * as mutationTypes from '@/modules/userModules/mutationTypes'
import * as common from '@/common/common';

const {handleCallBack} = common;
export default{
    data(){
        return{
            input:''
        }
    },
    computed:{
        user(){
            return this.$store.state.userModules.user;
        }
    },
    beforeMount(){
        https.logout()
            .then(res =>{
                if(handleCallBack(res)){
                    this.$store.commit(mutationTypes.NOW_USER_INFO, res.data.data);
                }
            })
    },
    methods:{
        exit(){
            this.$message({ message: '退出成功', type: 'info' });
            window.location.href = "/#/login";
        }
    }
}
</script>

<style>
 .header-nav{
     box-shadow: 0 0 1px rgba(0,0,0,0.25);
     background-color: #fff;
     height: 40px;
     padding: 10px 60px;
     width: 100%; 
     position: fixed;
     z-index: 999;
 }
 .header-nav .left{
     height: 40px;
     float: left;
 }
 .header-nav .left img{
     height: 40px;
     float: left;
 }
 .header-nav .left span{
     font-size: 25px;
     color: #2c3e50;
     font-weight: 500;
     font-family: "Dosis", "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
     line-height: 40px;
     margin-left: 10px;
 }
 .header-nav .right{
     height: 40px;
     float: right;
     padding-right: 100px;
 }
 .header-nav .right .el-input--small{
     width: 200px;
     margin-top: 5px;
     padding-bottom: 20px;
 }
 .header-nav .right .username{
     margin-left: 90px;
     display: inline-block;
 }
 .header-nav .head-portrait{
     right: 220px;
     cursor: pointer;
     position: absolute;
     height: 40px;
 }
 .header-nav .el-icon-error:before{
     cursor: pointer;
     position: absolute;
     right: 130px;
     top: 23px;
 }
</style>
