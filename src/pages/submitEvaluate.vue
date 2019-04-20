<template>
<div class="contaienr">
  <m-header v-bind="headerData"></m-header>
  <div class="user-item group">
    <div to="###" class="item flex-center">
      <div class="left flex-center">
        <img :src="doctorInfo.avatarUrl" alt="">
      </div>
      <div class="middle">
        <h5 class="flex-center">{{doctorInfo.NickName}} <span>主任医师</span></h5>
        <p class="ellipsis">{{doctorInfo.info}}</p>
      </div>
    </div>
  </div>
  <div class="group">
    <ul class="table-view">
      <li class="table-cell">
        医生评分
        <box gap="0 10px">
          <!-- <span class="gray" v-bind:class='{{thisMark <= mark ? "on" : "off"}}'
 v-for="(n,i) in 5"  :key="i">★</span> -->
        <p class="all" >
            <input type="radio" name="b" :value="0"  v-model="inputdata"/>
            <span>★</span>
            <input type="radio" name="b" :value="1" v-model="inputdata" />
            <span>★</span>
            <input type="radio" name="b" :value="2" v-model="inputdata" />
            <span>★</span>
            <input type="radio" name="b" :value="3" v-model="inputdata" />
            <span>★</span>
            <input type="radio" name="b" :value="4" v-model="inputdata" />
            <span>★</span>
            <input type="radio" name="b" :value="5" v-model="inputdata" />
            <span>★</span>
        </p>
        </box>
      </li>
    </ul>
    <group>
      <x-textarea :max="200" :height="80" v-model="comment" placeholder="请输入你的评价"></x-textarea>
    </group>
  </div>
  <div>
    <box gap="10px 10px" class="btn-box" >
      <x-button type="warn" :class="[comment == ''?'unfinish':'']" :disabled="comment == ''" @click.native="submitComment">发表评价</x-button>
    </box>
  </div>
</div>
</template>
<script>
import mHeader from "../components/header";
import { Group, Box, XTextarea, XButton } from "vux";
import $ from "webpack-zepto";
export default {
  components: {
    mHeader,
    Group,
    Box,
    XTextarea,
    XButton
  },
  data() {
    return {
      headerData: {
        back: true,
        title: "提交评价",
      },
      // thisMark:20,
      doctorInfo: {},
      OrderNum: '',
      inputdata: 5,
      comment: '',
      doctorID: '',
    };
  },
  methods: {
    submitComment(){
      if(!this.comment){
        this.$vux.toast.show({
            type: 'warn',
            text: '请填写评价'
        })
        return
      }
      this.$api.submitComment({
        doctorID: this.doctorID,
        orderCode: this.OrderNum,
        content: this.comment,
        evaluate: this.inputdata,
      }).then(data=>{
        this.$vux.toast.show({
            type: 'success',
            text: '评价成功'
        })
        this.$router.back(1)
      })
    },
  },
  mounted(){
    this.doctorID = this.$route.query.doctorId
    this.OrderNum = this.$route.query.OrderNum
    console.log(this.doctorID)
    this.$api.getDoctorDetail(this.doctorID).then(data=>{
      this.doctorInfo = data.data[0]
    })
  },
};
</script>
<style lang="less">
//头部医生介绍
@import "../assets/styles/user-item.css";
.user-item {
  border-top: none;
}
.user-item .middle {
  flex: 1;
}
.btn-box .weui-btn_warn {
  background: #ff9317;
  border: none;
  font-size: 0.32rem;
}
.btn-box .unfinish {
  opacity: 0.4;
}
.vux-x-textarea {
  font-size: 0.28rem;
}
.group {
  border-bottom: none;
  box-sizing: border-box;
}
@borderColor: #e5e5e5;
.table-view {
  background: #fff;
  margin-top: 0.2rem;
  position: relative;
}
.table-cell {
  padding: 0.2rem 0.15rem 0;
  position: relative;
  font-size: 0.32rem;
  display: flex;
}
.group .weui-textarea {
  font-size: 0.28rem;
}
.weui-btn:after {
  border: none;
}

/*星星*/
.all{margin-top: -.1rem;}
.all>input{opacity:0;position:absolute;width:2em;height:2em;margin:0;}
.all>input:nth-of-type(1),
.all>span:nth-of-type(1){display:none;}
.all>span{font-size:.44rem;color:#fa5732;
    -webkit-transition:color .2s;
    transition:color .2s;
}
.all>input:checked~span{color:#999;}
.all>input:checked+span{color:#fa5732;}
</style>

