<template>
  <div class="paySuccess">
    <m-header v-bind="headerData"></m-header>
    <div class="main">
      <img src="../assets/images/pay_icon_accomplish.png" alt="">
      <p>成功支付</p>
      <span>{{ShopName}}</span>
    </div>
    <router-link to="/" class="subButton backHome">返回首页</router-link>
    <router-link to="/order" class="subButton">查看订单</router-link>
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
        title: "预约成功"
      },
      cost: 0,
      ShopName: '',
    };
  },
  mounted() {
    // window.localStorage.removeItem("userInfo")
    // var orderNumber = this.$route.query.orderNumber;
    // if (!orderNumber) return;
    // this.$http
    //   .get("/Order/GetOrderItem", {
    //     params: {
    //       OrderNum: orderNumber
    //     }
    //   })
    //   .then(res => {
    //     console.log(res)
    //     if (res.data.state === "error") {
    //       console.error(res.data.message);
    //       this.$vux.toast.show({
    //         text: res.data.message,
    //         type: "warn"
    //       });
    //     } else {
    //       this.cost = res.data.data.ItemList[0].TotalPrice
    //       this.ShopName = res.data.data.ItemList[0].ShopName
    //     }
    //   }).catch(err=>{
    //     console.log(err)
    //   });
  }
};
</script>
<style lang="less" scoped>
.backHome{background-color: white; color: #666; border: 1px solid #ccc;}
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


