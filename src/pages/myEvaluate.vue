<template>
  <div class="contaienr">
    <m-header v-bind="headerData"></m-header>
    <m-default :data="defaultData" v-if="commentList.length == 0" class="mDefault"></m-default>
    <template v-else>
      <div class="card" v-for="(v,i) in commentList" :key="i">
        <div class="card-head">
            <div class="img-box">
              <img :src="v.FileUrl" alt="">
            </div>
            <div class="card-head-title">
              {{v.ShopName}} - {{v.Doctor}}
              <p>{{v.Address}}</p>
            </div>
        </div>
        <div class="card-content">
          {{v.cnt}}
        </div>
        <div class="card-footer">
            <P class="text-left">
              <x-icon type="ios-star" size="22" v-for="(i) in v.Commentlevel" :key="i"></x-icon>
              <x-icon type="ios-star-outline" size="22"  v-for="(i) in (5 - v.Commentlevel)" :key="i"></x-icon>
            </P>
            <P class="text-right">{{v.Time}}</P>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import mHeader from "../components/header";
import mDefault from '../components/default';
export default {
  components: {
    mHeader,
    mDefault
  },
  data() {
    return {
      headerData: {
        back: true,
        title: "我的评价",
      },
      defaultData:{
        icon: require('../assets/images/default/empty_icon_pen.png'),
        title: '您暂无评价记录'
      },
      commentList:[
        // {
        //   Address: '广州天河',
        //   ShopName: '鸿亿猫态店',
        //   FileUrl: 'http://hyfw-img.oss-cn-hangzhou.aliyuncs.com/mt/20171214/14092930649.png',
        //   Commentlevel: 4,
        //   Doctor: '黄医师',
        //   Time: '2017-11-11 12:00:00',
        //   cnt: '5分好评',
        //   OrderTime: '2017-11-10 12:00:00',
        //   Money: 10,
        // }
      ]
    };
  },
  methods: {},
  mounted(){
    var that = this;
    // getPrucomList(function(data){
    //   console.log('评论:',data)
    //   that.commentList = data.ProList
    // })
  }
};
</script>
<style lang="less" scoped>
.mDefault{height: 10rem;}
.text-right{
  text-align: right;
}
.text-left{
  text-align: left;
}
.vux-x-icon {
  fill: #FA5732;
}
.card {
  padding: 0.2rem 0.3rem;
  background: #fff;
  margin-top:.2rem;
  .card-head {
    padding: 0.1rem 0;
    display: flex;
    align-items: center;
    .img-box {
      flex: 1;
      img {
        width: 0.7rem;
        height: 0.7rem;
        border-radius:50%;
      }
    }
    .card-head-title {
      font-size: 0.28rem;
      float: right;
      flex:6;
    }
  }
  .card-content{
    font-size:.28rem;
  }
  .card-footer{
    padding:.1rem 0 0;
    display: flex;
    align-items: center;
    p{
      flex:1;
    }
  }
  p {
    color: #999;
    font-size: 0.24rem;
  }

}
</style>

