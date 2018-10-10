<template>
<div class="home">
    <div class="home-header">
        <video src="../../../static/img/bg.mp4" class="glass" autoplay loop></video>
        <h2>欢迎来到Starboard的小社区</h2>
    </div>
    <home-content></home-content>
</div>
</template>

<script>
    import HomeContent from '@/components/home/HomeContent'

    export default{
        components:{HomeContent},
        data() {
            return {
            }
        }
    }
</script>

<style>
video{
    margin-top: 0;
    padding: 0;
    border: 0;
    box-shadow: 0 0 10px #8d8d8d;
}
.home {
    position: relative;
    overflow: hidden;
}
.home-header {
    background: #60fff7 url('../../../static/img/home-bg.png') no-repeat center; 
    background-size: cover;
    height: 800px;
    margin-bottom: 10px;
    box-sizing: border-box;
}
.glass{
    width: 100%;
}
.home h2{ 
    font-size: 40px;
    position: absolute;
    left:50%;
    margin-top:-40%;
    margin-left:-250px;
    color: #fff;
    position: absolute;
    z-index: 1;
    padding: 20px 0;
    border-top:2px solid #fff;
    border-bottom:2px solid #fff;
}
</style>

