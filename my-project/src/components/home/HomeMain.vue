<template>
  <div class="home-main">
        <el-card class="box-card" v-for=" (v,index) in shuoshuoList" :key="index">
            <div slot="header" class="clearfix">
                <span>{{v.name}}</span>
                <el-button style="float: right; padding: 3px 0" :loading="zanDisabled" @click="zanShuoshuo(v.date)" type="text">赞{{v.zan}}</el-button>
            </div>
            <div class="text item">
                {{v.content}}
            </div>
            <span class="date">{{v.date}}</span>
        </el-card>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[5,10,20]"
                :page-size="5"
                layout="sizes, prev, pager, next"
                :total="1000">
            </el-pagination>
        <el-card class="box-card">
            <el-input
                type="textarea"
                :rows="3"
                placeholder="请说出您想说的话"
                v-model="input">
            </el-input>
            <el-button type="primary" size="small" @click="submitBtn" round>提交</el-button>
        </el-card>
  </div>
</template>

<script>
import * as https from '@/modules/shuoshuoModules/http'
import * as common from '@/common/common';

const {handleCallBack} = common;
export default {
    data() {
        return {
            input:'',
            shuoshuoList: [],
            zanDisabled: false,
            pageNo: 1,
            pageSize: 5
        }
    },
    computed:{
        user(){
            return this.$store.state.userModules.user;
        }
    },
    beforeMount(){
        this.getShuoshuoList()
    },
    methods:{
        // 提交评论
        submitBtn(){
            https.postShuoshuo({
                'zan' : 0,
                'content' : this.input,
                'name' : this.user.name,
                'date' : new Date()
            })
            .then(res =>{
                if(handleCallBack(res)){
                    this.$message({ message: res.data.message, type: 'success' });
                    this.input = '';
                    this.getShuoshuoList()
                }
            })
        },
        // 获取说说列表
        getShuoshuoList(){
            https.getShuoshuo({
                'pageNo' : this.pageNo,
                'pageSize' : this.pageSize
            })
            .then(res =>{
                if(handleCallBack(res)){
                    this.zanDisabled = false
                    this.shuoshuoList = res.data.message
                }
            })
        },
        // 点赞,更新
        zanShuoshuo(val){
            this.zanDisabled = true
            https.updateShuoshuo({'date':val})
            .then(res =>{
                if(handleCallBack(res)){
                    this.getShuoshuoList()
                }
            })
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.getShuoshuoList()
        },
        handleCurrentChange(val) {
            this.pageNo = val
            this.getShuoshuoList()
        }
    }
}
</script>

<style>
  .home-main .item {
    margin-bottom: 18px;
  }
  .home-main .clearfix:before,
  .home-main .clearfix:after {
    display: table;
    content: "";
  }
  .home-main .clearfix:after {
    clear: both
  }
  .home-main{
      text-align: left;
  }
  .home-main .box-card{
      margin-bottom: 10px;
  }
  .home-main .el-button.is-round{
      margin: 10px 0;
      float: right;
  }
  .home-main .date{
      float: right;
      margin-bottom: 15px;
      font-size: 10px;
      color: #333;
  }
  .home-main .el-pagination{
      margin-bottom: 10px;
      text-align: center;
  }
</style>