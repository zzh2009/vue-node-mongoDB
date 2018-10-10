<template>
  <div>
    <el-container>
        <el-main>
            <home-main></home-main>
        </el-main>
        <el-aside width="400px">
            <all-users></all-users>
        </el-aside>
    </el-container>
  </div>
</template>

<script>
import AllUsers from '../common/AllUsers'
import HomeMain from './HomeMain'
export default{
    components:{AllUsers,HomeMain},
    data(){
        return{

        }
    }
}

</script>
