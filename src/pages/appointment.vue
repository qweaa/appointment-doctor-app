<template>
  <div class="appointment">
    <m-header v-bind="headerData"></m-header>
    <div class="title"><img src="../assets/images/register_icon_registration.png" alt="">预约信息</div>
    <div class="appointmentInfo">
      <p>预约医师<span>{{doctor.realName}}</span></p>
      <p>就诊时间<span>{{DTime}}</span></p>
    </div>
    <div class="trainerInfo">
      <div class="title"><img src="../assets/images/register_icon_businesscard.png" alt="">就诊人信息</div>
      <form>
        <label>
          <span>姓名</span>
          <input type="text" placeholder="请输入就诊人姓名" v-model="name">
        </label>
        <label>
          <span>身份证号</span>
          <input type="text" placeholder="请输入就诊人身份证号" v-model="idNumber">
        </label>
        <label>
          <span>手机号</span>
          <input type="text" placeholder="请输入就诊人手机号" v-model="phoneNumber">
        </label>
      </form>
    </div>
    <div class="total">
      <div class="title"><img src="../assets/images/register_icon_money.png" alt="">费用</div>
      <div><span>合计</span><h4>{{appointmentInfo.price}}元</h4></div>
    </div>
    <button class="subButton" @click="submited">预约</button>
  </div>
</template>
<script>
import mHeader from "../components/header";
import { regexp } from "../utils/util";
import { getDate } from "../utils/filter";
export default {
  components: {
    mHeader
  },
  data() {
    return {
      headerData: {
        back: true,
        title: "预约",
        share: false
      },
      doctor: '',
      // name: "",
      // idNumber: "",
      // phoneNumber: "",
      name: "测试",
      idNumber: "440184122512451241",
      phoneNumber: "13726445124",
      appointmentInfo: {},
      DTime: ""
    };
  },
  methods: {
    submited() {
      var that = this;
      if (this.name === "") {
        this.$vux.toast.show({
          text: "请填写姓名",
          type: "warn"
        });
        return;
      } else if (!regexp.str(this.name)) {
        this.$vux.toast.show({
          text: "姓名填写有误",
          type: "warn"
        });
        return;
      }
      if (this.idNumber === "") {
        this.$vux.toast.show({
          text: "请填写身份证",
          type: "warn"
        });
        return;
      } else if (!regexp.idCard(this.idNumber)) {
        this.$vux.toast.show({
          text: "身份证填写有误",
          type: "warn"
        });
        return;
      }
      if (this.phoneNumber === "") {
        this.$vux.toast.show({
          text: "请填写手机号",
          type: "warn"
        });
        return;
      } else if (!regexp.phone(this.phoneNumber)) {
        this.$vux.toast.show({
          text: "手机号填写有误",
          type: "warn"
        });
        return;
      }
      this.$api.submitOrder({
        'doctorID': this.doctor.doctorID,
        'book_id': this.appointmentInfo.id,
        // 'book_date': this.appointmentInfo.date,
        'book_date': this.appointmentInfo.appointmentDate,
        'book_price': this.appointmentInfo.price,
        'name': this.name,
        'idcard': this.idNumber,
        'phone': this.phoneNumber,
        'book_time': this.appointmentInfo.start_time + '~' +this.appointmentInfo.end_time
      }).then(data=>{
        if(data.success){
          this.$vux.toast.show({
            text: "订单提交成功",
            type: "success"
          });
          setTimeout(_=>{
            this.$router.push({path:'/payCenter',query:{OrderNum:data.data.code}})
          },1000)
        }
      })
    }
  },
  mounted() {
    if(window.localStorage.getItem('oysyBook')){
      this.appointmentInfo = JSON.parse(window.localStorage.getItem('oysyBook'))
      console.log("aaa",this.appointmentInfo)
      this.DTime = getDate(this.appointmentInfo.date).split(' ')[0] + ' ' + this.appointmentInfo.start_time + '~' +this.appointmentInfo.end_time

      this.$api.getDoctorDetail(this.appointmentInfo.doctor_id).then(data=>{
        this.doctor = data.data[0]
      })
    }
    // this.appointmentInfo = JSON.parse(this.$route.query.appointmentInfo);
    // var dataArr = this.appointmentInfo.DDate.split(" ");
    // var date = dataArr[0].split("-");
    // this.DTime = `${date[0]}年${date[1]}月${date[2]}日 ` + this.appointmentInfo.DTime
  }
};
</script>
<style lang="less" scoped>
.appointment {
  width: 7.5rem;
}
.title {
  height: 0.88rem;
  font-size: 0.28rem;
  color: #333;
  display: flex;
  align-items: center;
  background-color: #fff;
  font-family: PingFang-SC-Bold;
  img {
    width: 0.36rem;
    height: 0.36rem;
    margin-left: 0.3rem;
    margin-right: 0.16rem;
  }
}
.appointmentInfo {
  font-size: 0.28rem;
  color: #999;
  padding: 0.3rem;
  background-color: #fff;
  border-top: 0.01rem solid #e5e5e5;
  border-bottom: 0.01rem solid #e5e5e5;
  margin-bottom: 0.2rem;
  p:last-of-type {
    margin-top: 0.2rem;
  }
  span {
    color: #333;
    margin-left: 0.7rem;
  }
}
.trainerInfo {
  background-color: #fff;
  border-top: 0.01rem solid #e5e5e5;
  border-bottom: 0.01rem solid #e5e5e5;
  margin-bottom: 0.2rem;
  form {
    width: 7.2rem;
    padding-left: 0.3rem;
    display: flex;
    flex-direction: column;
    border-top: 0.01rem solid #e5e5e5;
  }
  input {
    font-size: 0.28rem;
    width: 5.4rem;
  }
  label {
    display: flex;
    align-items: center;
    height: 0.88rem;
    border-bottom: 0.01rem solid #e5e5e5;
    font-size: 0.28rem;
    color: #333;
    justify-content: space-between;
  }
  label:last-of-type {
    border-bottom: none;
  }
}
.total {
  width: 100%;
  border-bottom: 0.01rem solid #e5e5e5;
  background-color: #fff;
  .title {
    border-top: 0.01rem solid #e5e5e5;
  }
  div:last-of-type {
    display: flex;
    border-top: 0.01rem solid #e5e5e5;
    justify-content: space-between;
    align-items: center;
    height: 0.88rem;
    font-size: 0.28rem;
    padding: 0 0.3rem;
  }
}
</style>


