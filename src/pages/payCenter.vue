<template>
  <div class="contaienr">
    <m-header v-bind="headerData"></m-header>
      <div class="content">
        <div class="group">
            <ul class="table-view">
              <li class='table-cell'>
                  <div class="text-center">
                    <p>
                      支付剩余时间
                    </p>
                    <clocker :time="time" class="clocker">
                          <span class="day">%_M1</span>
                          <span class="day">%_M2</span>
                        :
                          <span class="day" >%_S1</span>
                          <span class="day">%_S2</span>
                    </clocker>
                  </div>
              </li>
              <li class='table-cell'>
                    <img src="../assets/images/logo.png" class="pull-left" alt="">
                    <div class="media-body">
                        <h4>{{doctor}}</h4>
                        <p>{{F_CreatorTime}}</p>
                        <span class="pull-right">¥{{cost}}</span>
                    </div>
              </li>
            </ul>
         </div>
         <!-- <div class="group">
           <ul class="table-view">
           <li class='table-cell'>
                    <img src="../assets/images/register_icon_money.png" class="pull-left media-object" alt="">
                    <div class="media-body">
                        余额支付
                        <span class="pull-right">剩余{{balance}}元</span>
                    </div>
              </li>
         </ul>
         </div> -->
         <box gap="10px 10px">
           <x-button type="warn" @click.native="submit">{{btnText}}</x-button>
         </box>
      </div>
  </div>
</template>
<script>
import mHeader from "../components/header";
import { Box, XButton, Clocker, Cell,Group } from "vux";
import {postPay,getOrderDetail} from '../utils/request'
export default {
  components: {
    mHeader,
    XButton,
    Box,
    Cell,
    Clocker,
    Group
  },
  data() {
    return {
      headerData: {
        back: true,
        title: "支付中心",
      },
      doctor: '',
      time: "",
      cost:0,
      balance:0,
      btnText:'立即支付',
      OrderNum: '',
      F_CreatorTime: '',
    };
  },
  created() {
    this.OrderNum = this.$route.query.OrderNum;
    var that = this;
    this.$api.getOrderModule(this.OrderNum).then(data=>{
      if(data.success){
        // that.balance = data.ValidMoney;
        that.cost = data.data.book_price;
        that.doctor = data.data.doctor_name
        that.F_CreatorTime = new Date(Number(data.data.create_time)).toLocaleString('chinese',{hour12:false})
        that.time = this.getEndTime(Number(data.data.create_time));
      }
    })
    // getOrderDetail(this.OrderNum,(data)=>{
    //   console.log(data)
    //   that.balance = data.ValidMoney;
    //   that.cost = data.ActualPayMoney;
    //   that.doctor = data.ItemList[0].Title
    //   that.F_CreatorTime = new Date(data.create_time).toLocaleString('chinese',{hour12:false})
    //   that.time = this.getEndTime(data.create_time);
    //   that.changeState()
    // })
  },
  mounted(){
  },
  methods:{
    getEndTime(orderTime) {
      var time = new Date(orderTime);
      var endTime = new Date(parseInt(time.getTime()) + (0.5 * 3600 * 1000));
      return `${endTime.getFullYear()}-${endTime.getMonth() +
      1}-${endTime.getDate()} ${endTime.getHours()}:${endTime.getMinutes()}:${endTime.getSeconds()}`; //2018-01-02 12:00:00
    },
    changeState(){
          if(this.cost>this.balance){
              this.btnText="立即充值"
          }
          else{
            this.btnText="立即支付"
          }
    },
    //支付 / 充值
    submit(){
      this.$api.payOrder(this.OrderNum).then(data=>{
        this.$router.push({
          path:`/paySuccess`,
          query:{
            orderNumber: this.OrderNum
          }
        })
      })
      return


      if(this.cost>this.balance){
        this.$router.push({
          path:`user/userName/voucherCenter`
        })
      }else{
        var that = this;
        postPay([{OrderNum:this.OrderNum}],(data)=>{
          console.log(data)
          this.$router.push({
            path:`/paySuccess`,
            query:{
              orderNumber: that.OrderNum
            }
          })
        })
      }
    }
  }
};
</script>
<style scoped>
.clocker{
  padding:.2rem 0;
}
.group{
   padding: 0.1rem 0;
}
.group:first-of-type {
  border: none;
  width: 7.5rem;
  padding: 0.2rem 0;
  position: relative;
  background: radial-gradient(rgba(0, 0, 0, 0) 0.03rem, #ffffff 0.01rem);
  background-size: 0.1rem 0.44rem;
  background-position: 0.5rem 0.03rem;
}
.weui-btn_warn {
  background: #ff9317;
}
.weui-btn:after {
  border: none;
}
.group:first-of-type:before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0.03rem;
  left: 0;
  right: 0;
  z-index: -1;
  background-color: #ffffff;
  box-shadow: 0.01rem 0.03rem 0.08rem -0.03rem #999999;
}
.pull-left {
  float: left;
}
.pull-right {
  float: right;
}
.text-center {
  text-align: center;
}
.table-cell {
  padding: 0.1rem 0.15rem;
  font-size: 0.28rem;
  overflow: hidden;
}
.table-cell img {
  width: 0.88rem;
  height: 0.88rem;
  border-radius: 0.08rem;
  margin-right: 0.2rem;
}
.table-cell:not(:last-of-type) {
  border-bottom: 1px solid #e5e5e5;
}
.table-cell h4{
  font-size: .34rem;
  font-weight: normal;
  line-height: .88rem;
  font-family: 'PingFang-SC-Medium';
}
.media-body {
  padding: 0 0.2rem;
}
.media-body span.pull-right{
  color:#999;
}
.table-cell p {
  color: #999;
  font-size: 0.24rem;
}
.media-body p + .pull-right {
  margin-top: -0.5rem;
  font-size: .34rem;
  color:#333;
}
.table-cell .media-object {
  width: 0.36rem;
  height: 0.39rem;
}
.day{
  background:#666;
  text-align: center;
  color: #fff;
  padding:.02rem .1rem;
  border-radius:3px;
  font-size:.24rem;
}
</style>

