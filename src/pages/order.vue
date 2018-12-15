<template>
  <div class="order">
    <h1>订单</h1>
    <div class="banner">
      <img :src="banner" alt="">
      <p>亲爱的小伙伴，欢迎欢迎光临养生中医</p>
    </div>
    <ul id="nav">
      <li class="active">待付款</li>
      <li>已失效</li>
      <li>已预约</li>
      <li>已完成</li>
      <li>已取消</li>
    </ul>
    <div id="orderList">
      <m-default  v-if="orderList.length===0" :data="defaultData"></m-default>
      <template v-else>
        <div class="group" v-for="(item,index) of orderList" :key="index">
          <div class="gTitle">
            <div>
              <img :src="item.doctor_avatar" alt="">
              {{item.doctor_name}}
            </div>
            <span>{{item.status_text}}</span>
          </div>
          <router-link :to="'/orderDetail?ordercode=' + item.code" class="orderInfo">
            <div>
              <h4><img src="../assets/images/register_icon_me.png" alt=""> {{item.name}}</h4>
              <p><img src="../assets/images/register_icon_time.png" alt=""> {{getDate(item.book_date).split(' ')[0] + ' ' + item.book_time}}</p>
            </div>
            <span>¥ {{Number(item.book_price).toFixed(2)}}</span>
          </router-link>
          <div class="action">
            <template v-if="stateIndex === 0">
              <button class="on" @click="pay(item.code)">立即支付</button>
              <button @click="cancelOrder(0,item.code,index)">取消订单</button>
            </template>
            <template v-if="stateIndex === 1 || stateIndex == 4">
              <button @click="cancelOrder(1,item.code,index)">删除订单</button>
            </template>
            <template v-if="stateIndex === 2">
              <button @click="cancelOrder(0,item.code,index)">取消订单</button>
            </template>
            <template v-if="stateIndex === 3">
              <!-- <router-link :to="'/submitEvaluate?doctorId=' + item.DotorID" class="on">评价</router-link> -->
              <!-- <button v-if="!!item.isComment" @click="lookComment">查看评价</button> -->
              <button v-if="!!item.isComment" @click="lookComment(item.code)">已评价</button>
              <button class="on" @click="comment(item.doctorID,item.code)" v-else >评价</button>
            </template>
          </div>
        </div>
      </template>
      <load-more v-if="orderList.length" :show-loading="showLoading" :tip="tip" background-color="#F5F5F5" @click.native="loadMore"></load-more>
    </div>
    <m-footer tab="2"></m-footer>
  </div>
</template>
<script>
import mHeader from "../components/header";
import mFooter from "../components/footer";
import mDefault from '../components/default'
import $ from "webpack-zepto";
import { formatMoney, getDate } from "../utils/filter";
import { LoadMore } from "vux";
import {DeleteOrderCancel, getOrderCancel} from "../utils/request"
export default {
  data() {
    return {
      defaultData:{
        icon: require("../assets/images/default/empty_icon_order.png"),
        title: '您暂无订单记录'
      },
      orderList: [],
      stateIndex: 0,
      rows: 6,
      page: 1,
      showLoading: false,
      hasMore: true,
      orderUrl:"/Order/GetOrderTempList",
      banner: require('../assets/images/tmp/1.jpg')
    };
  },
  components: {
    mHeader,
    mFooter,
    LoadMore,
    mDefault,
  },
  computed: {
    orderState() {
      if (this.stateIndex === 0) {
        return "待付款";
      }
      if (this.stateIndex === 1) {
        return "已失效";
      }
      if (this.stateIndex === 2) {
        return "已预约";
      }
      if (this.stateIndex === 3) {
        return "已完成";
      }
    },
    tip() {
      if (this.showLoading) {
        return "正在加载";
      } else {
        if (this.hasMore) {
          return "点击加载更多";
        } else {
          return "全部加载完毕";
        }
      }
    }
  },
  mounted() {
    // 绑定导航栏 点击切换状态
    var that = this;
    $("#nav li").click(function() {
      if ($(this).attr("class") === "active") {
        return;
      }
      $(this)
        .addClass("active")
        .siblings()
        .removeClass("active");
      that.orderList = [];
      that.stateIndex = $(this).index();
      that.hasMore = true
      that.rows = 6
      that.page = 1
      // if (that.stateIndex === 0) {
      //   that.orderUrl = "/Order/GetOrderTempList"
      // } else if (that.stateIndex === 1) {
      //   that.orderUrl = "/Order/GetOrderCancelList"
      // } else if (that.stateIndex === 2) {
      //   that.orderUrl = "/Order/GetOrderTradeList"
      // } else if (that.stateIndex === 3) {
      //   that.orderUrl = "/Order/GetOrderSuccessList"
      // } else if (that.stateIndex === 4) {
      //   that.orderUrl = "/Order/GetOrderSuccessList"
      // }
      that.GetOrderList(that.orderUrl,that.rows,that.page);
    });
    // 绑定滚动事件
    $(window).scroll(function() {
      var nav = $("#nav");
      if (nav.attr("class") !== "fixed") {
        if ($(this).scrollTop() + nav.height() > nav.offset().top) {
          nav.addClass("fixed");
          $(".order").css("padding-top", "1.76rem");
        }
      } else {
        if ($(".banner").height() > $(this).scrollTop()) {
          nav.removeClass("fixed");
          $(".order").css("padding-top", "0.88rem");
        }
      }
    });
    // 获取待付款订单
    this.GetOrderList(this.orderUrl,this.rows,this.page);
    // 获取海报
    // this.$http
    //   .get("/Common/GetSystemBanner", {
    //     params: {
    //       ecaid: "00000000-0000-0000-0000-000000000000"
    //     }
    //   })
    //   .then(res => {
    //     if (res.data.state === "info") {
    //       this.banner = res.data.data[0].FileUrl
    //     } else {
    //       console.error(res.data.message);
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     that.$vux.toast.show({
    //         type: 'warn',
    //         text: '服务器开小差，请稍后重试'
    //     })
    //   });
  },
  methods: {
    getDate,
    //跳转支付页面
    pay(orderNumber){
      this.$router.push({path:'/payCenter',query:{OrderNum: orderNumber}})
    },
    //跳转到评论页面
    comment(DotorID,OrderNum){
      this.$router.push({path:'/submitEvaluate',query:{doctorId: DotorID,OrderNum:OrderNum}})
    },
    //跳转到我的评论
    lookComment(code){
      this.$router.push({path:'/orderDetail',query:{ordercode: code}})
    },
    // url：订单请求地址;rows:请求一次返回的数据条数；page：页数
    GetOrderList(code) {
      this.$api.getOrderList({
        status: this.stateIndex,
        page: this.page,
        rows: this.rows,
      }).then(data=>{
        if(data.data.length < this.rows) this.hasMore = false
        if(data.success){
          if(code) this.orderList = this.orderList.concat(data.data)
          else this.orderList = data.data
        }else{
          that.$vux.toast.show({
              type: 'error',
              text: data.messages || '请求订单列表数据失败'
          })
        }
      })
    },
    //加载更多
    loadMore() {
      if (!this.hasMore) {
        return;
      }
      this.showLoading = true;
      this.page++;
      this.GetOrderList(1);
    },
    //取消或删除订单
    cancelOrder(code,OrderNum,index){
      console.log("订单号",OrderNum)
      console.log("索引",index)
      var that = this;
      if(code === 0){
        this.$vux.confirm.prompt('取消原因', {
          title: "取消提示",
          content: '确定取消该订单吗？',
          onCancel: () => {
            console.log("用户点击了取消")
          },
          onConfirm: (reason) => {
            if(reason != ''){
              console.log("取消原因",reason)
              this.$api.cancelOrder({
                Code: OrderNum,
                reason: reason,
              }).then(data=>{
                console.log('取消成功')
                this.orderList.splice(index,1);
              })
              // getOrderCancel(OrderNum,reason,function(data){
              //   that.orderList.splice(index,1);
              //   window.localStorage.removeItem("userInfo")          //清除本地存储个人信息
              // })
            }else{
              that.$vux.toast.show({
                type: 'cancel',
                text: '取消原因不能为空'
              })
              that.cancelOrder(code,OrderNum,index);
            }
          }
        })
      }else if(code === 1){
        this.$vux.confirm.show({
          title: "删除提示",
          content: '确定删除该订单吗？',
          onCancel: () => {
            console.log("用户点击了取消")
          },
          onConfirm: () => {
            this.$api.deleteOrder(OrderNum).then(data=>{
              this.orderList.splice(index,1);
            })
          }
        })
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    $(window).off("scroll");
    next();
  },
  filters: {
    formatMoney,
    getDate
  }
};
</script>
<style lang="less" scoped>
.order {
  width: 7.5rem;
  padding-top: 0.88rem;
  > h1 {
    width: 7.5rem;
    height: 0.88rem;
    text-align: center;
    line-height: 0.88rem;
    font-size: 0.32rem;
    color: #333;
    background-color: #fff;
    position: fixed;
    top: 0;
    z-index: 99;
    border-bottom: 1px solid #e5e5e5;
  }
}
.banner {
  height: 3rem;
  width: 7.5rem;
  position: relative;
  > img {
    height: 3rem;
    width: 7.5rem;
    position: absolute;
    left: 0;
    bottom: 0;
  }
  > p {
    height: 0.6rem;
    background-color: #000;
    opacity: 0.5;
    color: #fff;
    font-size: 0.28rem;
    line-height: 0.6rem;
    position: absolute;
    left: 0;
    bottom: 0;
    padding-left: 0.3rem;
    width: 7.2rem;
  }
}
#nav {
  height: 0.88rem;
  border-bottom: 1px solid #e5e5e5;
  box-sizing: border-box;
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  position: relative;
  li {
    color: #999;
    font-size: 0.28rem;
    border-bottom: 0.06rem solid #fff;
    height: 0.86rem;
    box-sizing: border-box;
    line-height: 0.82rem;
    padding: 0 0.1rem;
  }
  li.active {
    color: @primary-color;
    border-bottom: 0.06rem solid @primary-color;
  }
}
#nav.fixed {
  position: fixed;
  top: 0.89rem;
}
#orderList {
  padding-bottom: 1.04rem;
  .group {
    margin-top: 0.2rem;
    background-color: #fff;
  }
  .gTitle {
    height: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 0.3rem;
    box-sizing: border-box;
    margin: 0;
    font-size: 0.28rem;
    border-bottom: 1px solid #e5e5e5;
    > div {
      display: flex;
      align-items: center;
      color: #333;
      > img {
        width: 0.4rem;
        height: 0.4rem;
        margin-right: 0.15rem;
      }
    }
    > span {
      color: #f83a09;
    }
  }
  .orderInfo {
    display: flex;
    width: 7.2rem;
    margin-left: 0.3rem;
    justify-content: space-between;
    padding: 0.3rem 0;
    h4 {
      font-size: 0.28rem;
      color: #333;
      display: flex;
      align-items: center;
      img {
        width: 0.4rem;
        margin-right: 0.2rem;
      }
    }
    p {
      display: flex;
      align-items: center;
      font-size: 0.26rem;
      color: #b3b3b3;
      margin-top: 0.2rem;
      img {
        width: 0.4rem;
        margin-right: 0.2rem;
      }
    }
    > span {
      display: block;
      color: #fa5355;
      font-size: 0.28rem;
      margin-right: 0.3rem;
    }
  }
  .action {
    border-top: 1px solid #e5e5e5;
    width: 7.2rem;
    margin-left: 0.3rem;
    height: 0.98rem;
    padding: 0 0.3rem;
    display: flex;
    justify-content: flex-end;
    box-sizing: border-box;
    justify-content: flex-end;
    align-items: center;
    button,a {
      width: 1.5rem;
      height: 0.56rem;
      border-radius: 0.1rem;
      border: 1px solid #666;
      margin-left: 0.1rem;
      color: #666;
      font-size: 0.24rem;
    }
    .on {
      border: 1px solid @primary-color;
      color: @primary-color;
    }
  }
}
</style>

