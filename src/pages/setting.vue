<template>
  <div class="contaienr">
    <m-header v-bind="headerData"></m-header>
      <ul class="table-view">
          <li class="table-cell">
              <label for="">手机号码</label>
              <input type="number" v-model="phone">
          </li>
          <li class="table-cell">
              <label for="">微信号</label>
              <input type="text" v-model="wechat">
          </li>
      </ul>
      <div>
        <box gap="10px 10px" >
           <x-button type="warn" @click.native="submit">保存</x-button>
        </box>
      </div>
  </div>
</template>
<script>
import mHeader from "../components/header";
import { Box, XButton,Toast  } from "vux";
import { regexp } from "../utils/util";
import {getUserUpItem,getUserDetail} from '../utils/request'
export default {
  components: {
    mHeader,
    Box,
    XButton,
    Toast
  },
  data() {
    return {
      phone: "",
      wechat: "",
      headerData: {
        back: true,
        title: "系统设置",
        share: false
      }
    };
  },
  methods:{
    submit(){
      if(this.phone==""){
        this.$vux.toast.text('请输入手机号码', 'middle');
        return;
      }
      else if (!regexp.phone(this.phone)) {
        this.$vux.toast.text('请输入正确的手机号码', 'middle');
        return;
      }
      else{
        getUserUpItem(this.phone,this.wechat,(data)=>{
          console.log("系统设置",data)
          this.$vux.toast.show({
              type: 'success',
              text: '保存成功'
          })
          window.localStorage.removeItem("userInfo")
        })
      }
    }
  },
  mounted(){
    var that = this;
    if(window.localStorage.getItem('userInfo')){
      let data = JSON.parse(window.localStorage.getItem('userInfo'));
      console.log("本地存储",data);
      this.phone = data.F_MobilePhone;
      this.wechat = data.F_WeChat;
    }else{
      getUserDetail((data)=>{
        console.log("后台请求",data)
        that.phone = data.F_MobilePhone;
        that.wechat = data.F_WeChat;
      })
    }
  }
};
</script>
<style lang="less" scoped>
@borderColor: #e5e5e5;
.weui-btn_warn {
  background: #ff9317;
  border: none;
  font-size: 0.32rem;
}
.table-view {
  background: #fff;
  margin-top: 0.2rem;
  position: relative;
  border-top: 1px solid @borderColor;
  border-bottom: 1px solid @borderColor;
  box-sizing: border-box;
  overflow: hidden;
}
.table-cell {
  padding: 0.2rem 0.2rem;
  position: relative;
  display: flex;
  font-size: 0.28rem;
}
.table-cell:first-of-type:after {
  content: "";
  position: absolute;
  width: 100%;
  left: 0.2rem;
  bottom: 0;
  background: @borderColor;
  height: 1px;
}
.table-cell label {
  flex: 1;
}
.table-cell input {
  flex: 4;
  font-size: 0.28rem;
}
.weui-btn:after{
  border:none;
}
</style>

