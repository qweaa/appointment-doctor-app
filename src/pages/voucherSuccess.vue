<template>
  <div class="paySuccess">
    <m-header v-bind="headerData"></m-header>
    <div class="main">
      <img src="../assets/images/pay_icon_accomplish.png" alt="">
      <p>成功支付{{cost.toFixed(2)}}元</p>
      <!-- <span>{{ShopName}}</span> -->
    </div>
    <router-link to="/user" class="subButton">返回个人中心</router-link>
  </div>
</template>
<script>
import mHeader from "../components/header";
export default {
  components: {
    mHeader
  },
  data() {
    return {
      headerData: {
        back: true,
        title: "充值成功"
      },
      cost: 0,
      // ShopName: '',
    };
  },
  mounted() {
    var orderNumber = this.$route.query.orderNumber;
    this.cost = parseFloat(this.$route.query.orderMoney);
    window.localStorage.removeItem("userInfo")
  }
};
</script>
<style lang="less" scoped>
.paySuccess {
  width: 7.5rem;
  .main {
    width: 7.5rem;
    height: 2.54rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-bottom: 0.01rem solid #e5e5e5;
    background-color: white;
    img {
      width: 0.72rem;
      height: 0.72rem;
      margin-bottom: 0.2rem;
    }
    p {
      font-size: 0.32rem;
      color: #333;
      margin-bottom: 0.1rem;
    }
    span {
      color: #999;
      font-size: 0.28rem;
    }
  }
}
</style>


