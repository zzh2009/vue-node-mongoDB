<template>
    <div class="login">
        <div class="header">
            <h1>Welcome to the z-Hub. <span>Continuous updating...</span></h1>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" label-width="80px">
                <el-form-item label="Username" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="Password" prop="password">
                    <el-input type="password" v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="signIn" plain>登陆</el-button>
                    <el-button type="success"  @click="signUp('ruleForm')">注册</el-button>
                </el-form-item>
        </el-form>
        <div class="footer">
            <!-- <img src="@/../static/img/weibo.png" alt=""> -->
        </div>
        <canvas id="canvas"></canvas>  
    </div>
</template>

<script>
import * as https from '@/modules/userModules/http'
import * as common from '@/common/common';
import weibo from '@/../static/img/weibo.png';

const {handleCallBack} = common;
    export default {
        data(){
            return {
                ruleForm:{
                    name:'',
                    password:''
                },
                weibo,
                rules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                    ],
                }
            }
        },
        beforeMount(){
        },
        mounted(){
            var canvas = document.getElementById('canvas'),
                ctx = canvas.getContext('2d'),
                w = canvas.width = window.innerWidth,
		        h = canvas.height = window.innerHeight - 4,
                
            hue = 217,
            stars = [],
            count = 0,
            maxStars = 1400;
            
            // Cache gradient
            var canvas2 = document.createElement('canvas'),
                ctx2 = canvas2.getContext('2d');
                canvas2.width = 100;
                canvas2.height = 100;
            var half = canvas2.width/2,
                gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
                gradient2.addColorStop(0.025, '#fff');
                gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
                gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
                gradient2.addColorStop(1, 'transparent');
            
                ctx2.fillStyle = gradient2;
                ctx2.beginPath();
                ctx2.arc(half, half, half, 0, Math.PI * 2);
                ctx2.fill();
            
            // End cache
            
            function random(min, max) {
                if (arguments.length < 2) {
                    max = min;
                    min = 0;
                }
                
                if (min > max) {
                    var hold = max;
                    max = min;
                    min = hold;
                }
                
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            
            var Star = function() {
            
                this.orbitRadius = random(w / 2 - 50);
                this.radius = random(100, this.orbitRadius) / 10;
                this.orbitX = w / 2;
                this.orbitY = h / 2;
                this.timePassed = random(0, maxStars);
                this.speed = random(this.orbitRadius) / 100000;
                this.alpha = random(2, 10) / 10;
                
                count++;
                stars[count] = this;
            }
            
            Star.prototype.draw = function() {
                var x = Math.sin(this.timePassed + 1) * this.orbitRadius + this.orbitX,
                    y = Math.cos(this.timePassed) * this.orbitRadius/2 + this.orbitY,
                    twinkle = random(10);
                
                if (twinkle === 1 && this.alpha > 0) {
                    this.alpha -= 0.05;
                } else if (twinkle === 2 && this.alpha < 1) {
                    this.alpha += 0.05;
                }
                
                ctx.globalAlpha = this.alpha;
                    ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
                this.timePassed += this.speed;
            }
            
            for (var i = 0; i < maxStars; i++) {
                new Star();
            }
            
            function animation() {
                ctx.globalCompositeOperation = 'source-over';
                ctx.globalAlpha = 0.8;
                ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';
                ctx.fillRect(0, 0, w, h)
            
                ctx.globalCompositeOperation = 'lighter';
                for (var i = 1, l = stars.length; i < l; i++) {
                    stars[i].draw();
                };  
                
                window.requestAnimationFrame(animation);
            }
            
            animation();
        },
        methods:{
            signUp(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        https.doRegist(this.ruleForm)
                        .then(res =>{
                            if(handleCallBack(res)){
                                window.location.href = '/#/index';
                                this.$message({ message: res.data.message, type: 'success' });
                            }
                        })
                    } else {
                        this.$message({ message: '错误输入', type: 'error' });
                        return false;
                    }
                })
                
            },
            signIn() {
                https.doLogin(this.ruleForm)
                .then(res =>{
                    if(handleCallBack(res)){
                        window.location.href = '/#/index';
                        this.$message({ message: res.data.message, type: 'success' });
                    }
                })
            }
        }
    }
</script>

<style>
.login{
    width: 100%;
    background-color: #060e1b;
    overflow: hidden;
}
/* Header */
.login .header{
	position: absolute;
	top: 50px;
	left: 50%;
    text-align:center;
    margin-left: -320px;
    color: #fff;
}

.login .el-form{
    position: absolute;
    width: 400px;
    left: 50%;
    margin-left: -200px;
    margin-top: 20%;
}
.login .el-form-item__label{
    color: #fff;
}
.login .el-input{
    opacity: 0.6;
}
.login .el-button{
    opacity: 0.8;
}

   /* Header */
.login .footer{
    position: absolute;
    bottom: 0;
}
</style>
