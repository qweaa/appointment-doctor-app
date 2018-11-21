<template>
  <div class="contaienr">
    <m-header v-bind="headerData" class="login-header"></m-header>
    <div class="group login">
      <div class="portrait">
          <img src="../assets/images/logo.png" alt="头像">
      </div>
      <group>
        <x-input title="" class="weui-vcode" v-model="NickName"  @on-blur="checkNickName" placeholder="请输入昵称"></x-input>
      </group>
      <group>
        <x-input title="" :type="'number'" class="weui-vcode" v-model="studentID"  @on-blur="checkStudentID" placeholder="请输入学号"></x-input>
      </group>
      <group>
        <x-input title="" type="password" class="weui-vcode" v-model="password"  @on-blur="checkPassword" placeholder="请输入密码"></x-input>
      </group>
      <group>
        <x-input title="" type="password" class="weui-vcode" v-model="repeatPassword"  @on-blur="checkRepeat" placeholder="请确认密码"></x-input>
      </group>
      <!-- <group>
        <x-input title="" class="weui-vcode" v-model="phone"  @on-blur="checkPhone" placeholder="请输入手机号码"></x-input>
      </group>
      <group>
        <x-input title="" class="weui-vcode" placeholder="请输入验证码" v-model="code">
          <x-button slot="right" v-if="show" type="primary" @click.native="getCode" mini class="btn-outline">获取验证码</x-button>
          <x-button slot="right" type="primary" v-if="!show" mini class="btn-outline">{{count}}秒</x-button>
        </x-input>
      </group> -->
      <div style="padding:.5rem 0;">
        <x-button type="warn" :class="{unfinish:isUnfinish}" :disabled="isUnfinish" @click.native="submit">注册</x-button>
      </div>
      <div style="padding:.5rem 0;">
        <p class="goto">
          <span>已有账号，</span>
          <router-link class="color-origin" to="/login">登陆</router-link>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import mHeader from "../components/header";
import { Box, Group, XInput, XButton, Toast } from "vux";
import { regexp } from "../utils/util";
import $ from "webpack-zepto";
export default {
  components: {
    mHeader,
    Box,
    XButton,
    Toast,
    Group,
    XInput
  },
  data() {
    return {
      headerData: {
        back: true,
        title: "注册",
      },
      phone: '',
      count: '',
      code:'',

      NickName: '',
      studentID: '',
      password: '',
      repeatPassword: '',
      timer: null,
      show: true
    };
  },
  methods: {
    //确认注册
    submit(){
      if(!this.NickName){
        this.$vux.toast.text("请填写昵称", "middle");
        return;
      }
      if(!this.studentID){
        this.$vux.toast.text("请填写学号", "middle");
        return;
      }

      if(!this.password){
        this.$vux.toast.text("请填密码", "middle");
        return;
      }

      if(this.password !== ""){
        if(this.password.length < 6 || this.password.length > 20){
          this.$vux.toast.text("密码长度应在6-20位间", "middle");
          return;
        }
        if(/[\[\]'":\.\{\}*&%$\\\|\/><#!~,+\-\?]/g.test(this.password)){
          this.$vux.toast.text("密码含有非法支付，请修改", "middle");
          return;
        }
      }

      this.$api.register({
        studentID: this.studentID,
        NickName: this.NickName,
        password: this.password,
      }).then(data=>{
        if(data.success){
          this.$vux.toast.show({
            text: '注册成功',
            type: 'success'
          })
          window.sessionStorage.setItem('studentID',this.studentID)
          setTimeout(()=>{
            this.$router.push('/')
          },1000)
        }else{
          this.$vux.toast.text(data.messages || "注册失败", "middle");
        }
      })
    },
    checkNickName(){
      if(!this.NickName){
        this.$vux.toast.text("请填写昵称", "middle");
        return;
      }
    },
    checkPhone() {
      if (this.phone == "") {
        this.$vux.toast.text("请输入手机号码", "middle");
        return;
      } else if (!regexp.phone(this.phone)) {
        this.$vux.toast.text("请输入正确的手机号码", "middle");
        return;
      }
    },
    checkStudentID(){
      if(this.studentID !== ""){
        if(this.studentID.length !== 10){
          this.$vux.toast.text("请检查学号", "middle");
          return false;
        }
      }
    },
    checkPassword(){
      if(this.password !== ""){
        if(this.password.length < 6 || this.password.length > 20){
          this.$vux.toast.text("密码长度应在6-20位间", "middle");
          return;
        }
        if(/[\[\]'":\.\{\}*&%$\\\|\/><#!~,+\-\?]/g.test(this.password)){
          this.$vux.toast.text("密码含有非法支付，请修改", "middle");
          return;
        }
      }
    },
    checkRepeat(){
      if(this.repeatPassword !== ''){
        if(this.password !== this.repeatPassword){
          this.$vux.toast.text("两次密码不相同，请检查", "middle");
          return;
        }
      }
    },
    getCode() {
      console.log("1232");
      const time_count =59;
      if (!this.timer) {
        this.count = time_count;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= time_count) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    }
  },
  computed:{
    isUnfinish(){
      return this.password===''||this.studentID===''||this.repeatPassword===''
    }
  },
  created(){
      $("body").css("backgroundColor", "white");
  },
  beforeRouteLeave: (to, from, next) => {
      $("body").css("backgroundColor", "#F5F5F5");
      next();
  }
};
</script>

<style lang="less">
.goto{font-size: .24rem; text-align: right; color: #666;}
.color-origin{color: #ff9317;}

.login-header .my-header{border: none !important;}
.login {
  border: none;
  padding: 0 0.7rem;
  .weui-btn_warn {
    background: #ff9317;
    border: none;
    font-size: 0.32rem;
    padding: 0.15rem 0;
  }
  .unfinish {
    opacity: 0.4;
  }
  .portrait {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    img {
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
    }
  }
  .weui-btn:after {
    border: none;
  }
  .weui-cells {
    background: #f5f5f5;
    border-radius: 4px;
    margin: 0.5rem 0 0;
    .weui-input {
      font-size: 0.32rem;
    }
  }
  .weui-cells:before,
  .weui-cells:after {
    border: none;
  }
}
.login .btn-outline {
  background: none !important;
  color: #ff9317;
}
</style>

