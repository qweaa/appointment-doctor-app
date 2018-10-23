<template>
  <div id="voucherCenter">
    <m-header v-bind="headerData" class="header"></m-header>
    <h2>充值金额</h2>
    <ul class="selectMoney">
      <li class="active">100 元</li>
      <li>50 元</li>
      <li>30 元</li>
      <li><input type="number" id="money" placeholder="请输入金额" v-model="money"> 元</li>
    </ul>
    <h2>支付方式</h2>
    <ul class="payStyle">
      <li class="active">
        <div><img src="../assets/images/pay_icon_wechat.png" alt="">微信支付</div>
        <img src="../assets/images/common_icon_pitchon.png" alt="">
      </li>
    </ul>
    <div class="footerBlock">
      <p>中意养生目前只支持余额支付</p>
      <button class="subButton" @click='paying'>去充值</button>
    </div>
  </div>
</template>
<script>
import mHeader from "../components/header";
import $ from "webpack-zepto";
export default {
  components: {
    mHeader
  },
  data() {
    return {
      headerData: {
        back: true,
        title: "充值中心",
      },
      money: ""
    };
  },
  mounted() {
    // 选择充值金额和选择支付方式 绑定点击事件
    $(".selectMoney li,.payStyle li").click(function() {
      if ($(this).attr("class") === "active") {
        return;
      }
      $(this)
        .addClass("active")
        .siblings()
        .removeClass("active");
    });
  },
  methods: {
    paying() {
      var i = $(".selectMoney .active").index();
      var money;
      if (i === 0) {
        money = 100;
      } else if (i === 1) {
        money = 50;
      } else if (i === 2) {
        money = 30;
      } else if (i === 3) {
        if (this.money === "") {
          this.$vux.toast.show({
            text: "金额不能为空",
            type: "warn"
          });
          return;
        }
        money = this.money;
      }
      this.$vux.loading.show({text: '正在充值'})
      // 提交充值
      this.$http
        .post("/Recharge/RechargeOrder", {
          RechargeAmount: money * 100
        })
        .then(res => {
          console.log("充值返回", res);
          this.$vux.loading.hide()
          if (res.data.state === "info") {
            console.log("订单号:::::::", res.data.data);
            this.$http
              .post("/TenPay/JsApiPay", {
                tradeno: res.data.data,
                callbackurl: `${window.location.origin}/#/voucherSuccess?orderNumber=${res.data.data}&orderMoney=${money}`,
                body: `用户充值${money}元`
              })
              .then(resp => {
                if (resp.data.state === "info") {
                  window.location.href = resp.data.data;
                } else {
                  console.error(res.data.message);
                  this.$vux.toast.show({
                    text: res.data.message,
                    type: "warn"
                  });
                }
              });
          } else {
            this.$vux.loading.hide()
            console.error(res.data.message);
            this.$vux.toast.show({
              text: res.data.message,
              type: "warn"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
#voucherCenter {
  width: 7.5rem;
  background-color: #fff;
  .header {
    border-bottom: 0.01rem solid #e5e5e5;
  }
  > h2 {
    color: #333;
    font-size: 0.32rem;
    padding-left: 0.3rem;
    margin: 0.4rem 0 0.3rem 0;
  }
}
.selectMoney {
  width: 6.9rem;
  padding: 0 0.3rem;
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  li {
    width: 3.3rem;
    height: 0.96rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;
    font-size: 0.28rem;
    background-color: #f2f2f2;
    margin: 0.15rem 0;
    box-sizing: border-box;
    input {
      font-size: 0.28rem;
      text-align: center;
      width: 1.6rem;
      height: 0.96rem;
    }
  }
  li.active {
    color: #fff;
    background-color: #ff9317;
    input {
      color: #fff;
    }
    input::-webkit-input-placeholder {
      color: #f2f2f2;
    }
  }
}
.payStyle {
  li {
    box-sizing: border-box;
    padding: 0 0.3rem;
    height: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #222;
    font-size: 0.28rem;
    div {
      display: flex;
      align-items: center;
      img {
        width: 0.48rem;
        height: 0.48rem;
        margin-right: 0.25rem;
      }
    }
    > img {
      width: 0.24rem;
      height: 0.24rem;
      display: none;
    }
  }
  li.active {
    > img {
      display: block;
    }
  }
}
.footerBlock {
  > p {
    text-align: center;
    font-size: 0.24rem;
    color: #999;
  }
  .subButton {
    margin: 0.3rem auto;
  }
}
</style>


