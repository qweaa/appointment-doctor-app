<template>
  <div id="personalSettings">
    <m-header v-bind="headerData"></m-header>
    <group class="F_Birthday">
      <!-- <cell title="头像" class="userImg my-cell" is-link @click.native="showUserImg = true">
        <img slot="icon" :src="F_HeadIcon" alt="">
      </cell> -->
      <label for="userImg" class="userImg">
        <input type="file" style="display: none" id="userImg">
        <div class="title">头像</div>
        <div class="img">
          <div id="touxiang">
            <img slot="icon" :src="F_HeadIcon" alt="">
          </div>
          <img src="../assets/images/list_icon_right.png" alt="">
        </div>
      </label>
      <x-input title="昵称" placeholder="请输入昵称" v-model='F_NickName'></x-input>
      <cell title="性别" @click.native="genderPopup = true" class="my-cell" value-align="right" :value="F_Gender[0]" is-link></cell>
    </group>
    <group class="F_Birthday">
      <!-- <calendar @on-change="onChangeBirthday" v-model="F_Birthday" title="生日" show-popup-header popup-header-title="请选择日期" disable-future></calendar> -->

      <datetime :min-year="1900" :class="[F_Birthday == '请选择'?'birthday':'']" v-model="F_Birthday" @on-change="onChangeBirthday" title="生日" :max-year="new Date().getFullYear()"></datetime>

      <x-input title="身份证" class="idcard" placeholder="请输入身份证号码" v-model='F_IdCard'></x-input>
      <!-- <x-input title="地址" placeholder="请输入地址" v-model='F_Address'></x-input> -->
    </group>
    <!-- <group class="F_Birthday">
      <cell title="健康" @click.native="healthyPopup = true" class="my-cell" value-align="right" :value="F_Healthy[0]" is-link></cell>
      <x-input title="身高" placeholder="请输入身高 cm" type="number" v-model='F_Height'></x-input>
      <x-input title="体重" placeholder="请输入体重 kg" type="number" v-model='F_Weight'></x-input>
    </group> -->

    <button class="subButton" @click="changeComfirm">保存</button>

    <!-- 弹出健康选择弹窗 START -->
    <!-- <popup v-model="healthyPopup">
      <picker :data='healthyList' v-model='healthyTmp' @on-change='changeHealthy'></picker>
      <div class="healthyAction">
        <button @click="healthyPopup = false">取消</button>
        <button @click="comfirmHealthy">确定</button>
      </div>
    </popup> -->
    <!-- 弹出健康选择弹窗 END-->
    <!-- 弹出性别选择弹窗 START -->
    <popup v-model="genderPopup">
      <picker :data='genderList' v-model='healthyTmp' @on-change='changeHealthy'></picker>
      <div class="healthyAction">
        <button @click="genderPopup = false">取消</button>
        <button @click="comfirmGender">确定</button>
      </div>
    </popup><!-- 弹出性别选择弹窗 END-->
    <!-- 选择头像 -->
    <!-- <actionsheet v-model="showUserImg" :menus="suerImgMenus" @on-click-menu="userImgAction" show-cancel></actionsheet> -->
    <!-- 选择头像 END -->
  </div>
</template>
<script>
import { regexp } from "../utils/util";
import mHeader from "../components/header";
import { Group, Calendar, Actionsheet, XInput, Cell, Picker, Popup, Datetime} from "vux";
import {getUserDetail,saveUserInfo} from '../utils/request'
import $ from "webpack-zepto";
export default {
  components: {
    mHeader,
    Actionsheet,
    Group,
    Calendar,
    XInput,
    Cell,
    Picker,
    Popup,
    Actionsheet,
    Datetime,
  },
  data() {
    return {
      headerData: {
        back: true,
        title: "个人设置",
      },
      // suerImgMenus: {
      //   menu1: "拍照",
      //   menu2: "从相册选择"
      // },
      // healthyList:[['健康','良好','一般','较差']],
      genderList:[['男','女']],
      show1: false,
      healthyPopup: false,
      genderPopup: false,
      showUserImg: false,
      healthyTmp: [],
      F_NickName: "",
      F_Gender: ['男'],
      F_HeadIcon: '',
      F_Birthday: '',
      F_IdCard: '',
      // F_Address: "",
      // F_Healthy: ["健康"],
      // F_Height: 176,
      // F_Weight: 62
    };
  },
  methods: {
    onChangeBirthday() {
      console.log(this.F_Birthday);
    },
    //更新健康、性别状况
    changeHealthy(value){
      this.healthyTmp = value;
    },
    // comfirmHealthy(){
    //     this.healthyPopup = false;
    //     this.F_Healthy = this.healthyTmp;
    // },
    comfirmGender(){
        this.genderPopup = false;
        this.F_Gender = this.healthyTmp;
    },
    //保存更改
    changeComfirm(){
      console.log(this.F_IdCard)
      console.log(this.F_NickName)
      // if($('.touxiang > img').css('src') == ''){

      // }
      if(this.F_NickName == null || this.F_NickName == ''){
        this.$vux.toast.show({
          text: '昵称不能为空',
          type: 'warn'
        })
      }else if(this.F_IdCard == null || this.F_IdCard == ''){
        this.$vux.toast.show({
          text: '身份证不能为空',
          type: 'warn'
        })
      }else if(regexp.check(this.name)){
        this.$vux.toast.show({
          text: '昵称包含非法字符',
          type: 'warn'
        })
      }else if(!regexp.idCard(this.F_IdCard)){
        this.$vux.toast.show({
          text: '身份证号码有误',
          type: 'warn'
        })
      }else{
        console.log("表单通过")
        // var that = this;
        // var form_data = new FormData();
        // var file_data = $("#userImg").prop("files")[0];
        // // 把上传的数据放入form_data
        // form_data.append("F_NickName", that.F_NickName);
        // form_data.append("F_Gender", that.F_Gender[0] == '女' ? false : true);
        // form_data.append("F_Birthday", that.F_Birthday);
        // form_data.append("F_IdCard", that.F_IdCard);
        // form_data.append("FileUrl", file_data);

        // saveUserInfo(form_data,function(data){
        //     window.localStorage.removeItem("userInfo")
        // });

        this.$api.updateStudentModule({
          studentID: window.sessionStorage.getItem('studentID'),
          NickName: this.F_NickName,
          gender: this.F_Gender[0] == '女' ? 2 : 1,
          birthady: this.F_Birthday,
          idcard: this.F_IdCard,
          // FileUrl: this.file_data,
        }).then(data=>{
          if(data.success){
            this.$vux.toast.show({
              text: '修改个人信息成功',
              type: 'success'
            })
          }
        })
      }
    },
  },
  mounted(){
    var that = this;
    // if(window.localStorage.getItem('userInfo')){
    //   var data = JSON.parse(window.localStorage.getItem('userInfo'))
    //   console.log("本地存储",data)
    //   this.F_NickName = data.F_NickName;
    //   this.F_HeadIcon = data.F_HeadIcon;
    //   this.F_Gender = data.F_Gender == 0 ? ['女'] : ['男'];
    //   this.F_IdCard = data.F_IdCard;
    //   if(!!data.F_Birthday){
    //     console.log(this.F_Birthday)
    //     this.F_Birthday = data.F_Birthday.split(' ')[0];
    //     console.log(this.F_Birthday)
    //   }else{
    //     this.F_Birthday ='请选择';
    //   }
    // }else{
      this.$api.getStudentModule().then(data=>{
        console.log("get",data)

        that.F_NickName = data.data[0].NickName;
        that.F_HeadIcon = data.data[0].avatarUrl;
        that.F_Gender = data.data[0].gender ? data.data[0].gender == 1 ? ['男'] : ['女'] : [''];
        that.F_IdCard = data.data[0].idcard;
        if(!!data.data[0].birthady){
          that.F_Birthday = data.data[0].birthady;
        }else{
          that.F_Birthday ='请选择';
        }
      })
      // getUserDetail((data)=>{
      //   console.log("网络请求",data)
      //   that.F_NickName = data.F_NickName;
      //   that.F_HeadIcon = data.F_HeadIcon;
      //   that.F_Gender = data.F_Gender ? ['男'] : ['女'];
      //   that.F_IdCard = data.F_IdCard;
      //   if(!!data.F_Birthday){
      //     that.F_Birthday = data.F_Birthday.split(' ')[0];
      //   }else{
      //     that.F_Birthday ='请选择';
      //   }
      // })
    // }
    $('#userImg').on('change',(e)=>{
      var file = e.target.files[0]; //获取图片资源

      // 只选择图片文件
      if (!file.type.match('image.*')) {
        that.$vux.toast.show({
          type: 'warn',
          text: '请上传图片文件'
        })
        console.log("请上传图片文件")
        return false;
      }

      var reader = new FileReader();

      reader.readAsDataURL(file); // 读取文件

      // 渲染文件
      reader.onload = function(arg) {
        var img = '<img class="preview" src="' + arg.target.result + '" alt="preview"/>';
        $("#touxiang").empty().append(img);
      }
    })
  }
};
</script>
<style lang="less">
.vux-datetime > div:first-child{width: 1.6rem;}
.weui-cell{display: black;}
.vux-cell-bd{width: 1.6rem;}
.vux-x-input .weui-cell__hd{width: 1.6rem; text-align: left;}

//头像
.userImg{height: 1.18rem; display: flex; align-items: center; justify-content: space-between}
.userImg .title{width: 1.6rem; padding-left: .3rem}
.userImg .img{display: flex; align-items: center;}
.userImg .img img{margin-right: .3rem;}
.userImg #touxiang img{width: .9rem; height: .9rem; border-radius: 50%;}
.userImg .img > img{width: .12rem; height: .21rem;}

.my-cell .weui-cell__ft{flex: 1; box-sizing: border-box; color: #333;}
.my-cell .vux-cell-bd{width: 1.6rem; flex: none;}

//弹窗
.vux-popup-dialog{background-color: white !important;}
.healthyAction{height: 1rem; border-top: 1px solid #E5E5E5; display: flex;}
.healthyAction button{width: 50%; flex: 1; color: @primary-color; font-size: .28rem;}
.healthyAction button:first-child{color: #999;}

//生日
.birthday .vux-cell-value{color: #B3B3B3 !important;}

#personalSettings {
  width: 7.5rem;

  .weui-cell__ft {
    text-align: left;
    font-size: 0.28rem;
  }
  .vux-cell-value{
    color: #333;
  }
  .weui-cell__bd{
    width: 4.8rem;
    input{
      width: 4.8rem;
      font-size: 0.28rem;
      color: #333;
    }
  }
  .weui-cells{
    font-size: 0.28rem;
    color: #333;
  }
}
</style>


