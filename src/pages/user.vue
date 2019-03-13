<template>
  <div class="user">
    <div class="top">
      <router-link to="/user/afei/personalSettings" class="editingInfo">
        <img :src="UserInfo.avatarUrl" alt="">
        <div>
          <h3>{{UserInfo.NickName || '点击编辑个人信息'}}</h3>
          <p>查看并编辑个人资料</p>
        </div>
      </router-link>
      <!-- <div>
        <p>余额<span>{{UserInfo.ValidMoney}}元</span></p>
        <router-link to="/user/afei/voucherCenter">充值</router-link>
      </div> -->
    </div>
    <group id="menus">
      <cell v-for="(item,index) of menus" :key="index" :title="item.title" :is-link='true' :link="item.link">
        <img slot="icon" :src="item.icon">
      </cell>
    </group>
    <group id="menus">
      <cell @click.native="logout" title="退出登录">
        <img slot="icon" src="../assets/images/me_icon_exit.png" alt="">
      </cell>
    </group>
    <m-footer tab="3"></m-footer>
  </div>
</template>
<script>
import { Cell, Group, numberPad } from "vux";
import { formatMoney } from "../utils/filter";
import mFooter from "../components/footer";
import { getUserDetail } from "../utils/util";
export default {
  components: {
    mFooter,
    Cell,
    Group
  },
  data() {
    return {
      menus: [
        // {
        //   title: "系统设置",
        //   link: "/setting",
        //   icon: require("../assets/images/me_icon_setup.png")
        // },
        // {
        //   title: "评价管理",
        //   link: "/myEvaluate",
        //   icon: require("../assets/images/me_icon_evaluate.png")
        // },
        // {
        //   title: "我的病历",
        //   link: "/myEvaluate",
        //   icon: require("../assets/images/me_icon_register.png")
        // },
      ],
      UserInfo: {}
    };
  },
  methods: {
    logout(){
      this.$vux.confirm.show({
        title: '退出登录提示',
        content: '确定需要退出登录吗？',
        onConfirm: _=>{
          window.sessionStorage.removeItem('studentID')
          this.$vux.toast.show({
            text: '退出成功',
            type: 'success'
          })
          setTimeout(_=>{
            this.$router.push('/')
          }, 500);
        }
      })
    },
    getStudentModel(id){
      let stuID = id || this.studentID || ''
      this.$api.getStudentModel(stuID).then(data=>{
        if(data.data) this.UserInfo = data.data[0]
      })
    },
  },
  mounted() {
    if(window.sessionStorage.getItem('studentID')){
      this.studentID = window.sessionStorage.getItem('studentID')
      this.getStudentModel()
    }

    // if (window.localStorage.getItem("userInfo")) {
    //   console.log("userInfouserInfouserInfo完整URL,", this.$route.fullPath);
    //   this.UserInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    // } else {
    //   // 获取登录人信息
    //   this.$http
    //     .get("/User/GetUserDetail")
    //     .then(res => {
    //       console.log("用户信息",res)
    //       if (res.data.state === "error") {
    //         console.error(res.data.message);
    //       } else {
    //         res.data.data.ValidMoney = formatMoney(res.data.data.ValidMoney);
    //         this.UserInfo = res.data.data
    //         window.localStorage.setItem(
    //           "userInfo",
    //           JSON.stringify(res.data.data)
    //         );
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // }
  },
  beforeRouteEnter (to, from, next) {
    if(window.sessionStorage.getItem('studentID')) next()
    else next('/login')
  }
};
</script>
<style lang="less" scoped>
.user {
  width: 7.5rem;
}
.top {
  width: 7.5rem;
  border-bottom: 0.01rem solid #e5e5e5;
  background-color: #fff;
  padding: 0.3rem 0 0 0.3rem;
  box-sizing: border-box;
  > div {
    width: 7.2rem;
    border-top: 0.01rem solid #e5e5e5;
    height: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
      font-size: 0.24rem;
      color: #999;
    }
    span {
      font-family: PingFang-SC-Bold;
      color: #222;
      font-size: 0.28rem;
      margin-left: 0.2rem;
    }
    a {
      display: block;
      height: 0.52rem;
      width: 1.2rem;
      text-align: center;
      line-height: 0.52rem;
      color: #fff;
      background-color: #ff9317;
      border-radius: 0.04rem;
      margin-right: 0.3rem;
    }
  }
}
.editingInfo {
  display: flex;
  align-items: center;
  padding-bottom: 0.4rem;
  img {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 0.6rem;
    border: 0.04rem solid #b2b2b2;
    margin-right: 0.35rem;
  }
  > div {
    height: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    h3 {
      font-size: 0.38rem;
      color: #333;
    }
    p {
      font-size: 0.28rem;
      color: #b2b2b2;
    }
  }
}
#menus {
  .weui-cell {
    padding: 0.46rem 0.3rem;
  }
  .vux-label {
    margin-top: 0.2rem;
  }
  img {
    width: 0.44rem;
    margin-right: 0.3rem;
  }
}
</style>
