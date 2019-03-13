<style lang="less" scoped>
.container {
  margin-bottom: 1rem;
}

/*垂直滚动的文字*/
.text-scroll {
  height: 44px;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  color: #666;
}
.text-scroll img {
  width: 15px;
  height: 15px;
  margin-right: 0.3rem;
}
.text-scroll .text-content {
  display: flex !important;
  font-size: 14px;
  width: 100%;
  align-items: center;
  height: 44px;
  color: #333;
}
.text-scroll .text-content span {
  display: inline-block;
  width: 100%;
}

/*推荐门店*/
.recommendhead {
  line-height: 0.88rem;
  text-align: center;
  color: #666;
  border-top: 1px solid #e5e5e5;
  font-size: 0.26rem;
  font-weight: bold;
  background-color: white;
}
//公告
.trumpePopup{background-color: #fafafa;}
.trumpePopup .tru-head{line-height: .88rem; border-bottom: 1px solid #E5E5E5; text-align: center; font-size: .3rem;}
.trumpePopup .tru-foo{line-height: 1rem; font-size: .32rem; text-align: center; color: #666; border-top: 1px solid #E5E5E5; position: fixed; bottom: 0; width: 100%; background-color: #fafafa;}
.trumpePopup .tru-cont{padding: .4rem .3rem 1.4rem;}
.trumpePopup .tru-cont p{text-indent: 2em; line-height: .44rem; margin-top: .2rem; font-size: .26rem;}
.trumpePopup .tru-cont .tru-time{margin-top: .3rem; text-align: right; font-size: .24rem; color: #666;}
</style>
<style>
/* 轮播 */
@import "../assets/styles/swiper.css";
</style>

<template>
  <div class="container">
    <m-header v-bind="headerData"  ref="header" @on-address-change="onAddressChange" @inSearch="inSearch" @outSearch="outSearch"></m-header>
    <swiper loop auto dots-position="center" dots-class="banner-dots" :list="banner" :show-desc-mask="false"></swiper>
    <!-- 垂直文字的滚动 START -->
    <swiper auto height="44px" direction="vertical" :interval='2000' class="text-scroll group" :show-dots="false">
      <swiper-item v-for="(v,i) in trumpetList" :key="i">
        <div @click="showTrumpe(i)" class="text-content">
          <img src="../assets/images/home_icon_trumpet.png" alt="">
          <span class="ellipsis">{{v.title}}</span>
        </div>
      </swiper-item>
    </swiper><!-- 垂直文字的滚动 END -->
    <!-- 推荐店铺 START -->
    <div class="recommendhead">您好，系统为您推荐的优质服务医师</div>
    <!-- <store-item :storeList="storeList" class="group"></store-item> -->
     <doctor-item :doctorList="doctorList" class="group"></doctor-item> 
    <!-- 推荐店铺 END -->
    <!-- 公告弹窗 -->
    <popup v-model="trumpePopup"  position="left" width="100%" class="trumpePopup">
      <div class="tru-head">{{trumpeDetail.title || '公告'}}</div>
      <div class="tru-cont">
        <p>{{trumpeDetail.NoticeContent}}</p>
        <p class="tru-time">{{trumpeDetail.F_CreatorTime}}</p>
      </div>
      <div class="tru-foo" @click="trumpePopup = false">返回</div>
    </popup> <!-- 公告弹窗 end -->
    <m-footer tab="0"></m-footer>
  </div>
</template>

<script>
import { Swiper, SwiperItem, Popup } from "vux";
import mFooter from "../components/footer";
import mHeader from "../components/header";
import storeItem from "../components/store-item";
import doctorItem from "../components/doctor-item";
import { GetQueryString } from "../utils/util";
const { getRecommend,getNotcomList,testMock } = require("../utils/request");
export default {
  components: {
    mFooter,
    mHeader,
    storeItem,
    Swiper,
    SwiperItem,
    Popup,
    doctorItem
  },
  data() {
    return {
      headerData: {
        address: true,
        share: true,
        search: true
      },
      trumpePopup: false,
      //公告列表
      trumpetList: [],
      trumpeDetail: {},
      storeList: [],
      banner: [],

      doctorList: [],
    };
  },
  methods: {
    //公告
    showTrumpe(index){
      this.trumpeDetail = this.trumpetList[index]
      this.trumpePopup = true;
      console.log(this.trumpeDetail)
    },
    //地址更新重新获取推荐门店
    onAddressChange(val) {
      console.log("onAddressChange")
      var that = this,
        pointLocal,
        pointStore,
        distance; //距离
      console.log(val);
      if (val.state) {
        pointLocal = new BMap.Point(val.lng, val.lat);
        this.$api.getRecommend().then(data=>{
          if(data.data){
            for (let i of data.data) {
              pointStore = new BMap.Point(i.Longitude, i.Latitude);
              distance = parseFloat(
                BMapLib.GeoUtils.getDistance(pointLocal, pointStore).toFixed(2)
              );
              if (distance > 1000) {
                distance = parseFloat((distance / 1000).toFixed(2)) + "千米";
              } else {
                distance = distance + "米";
              }
              i.distance = distance;
            }
            that.storeList = data.data;
          }
        })
      }
    },
    inSearch() {
      this.headerData.back = true;
      this.headerData.address = false;
    },
    outSearch() {
      this.headerData.back = false;
      this.headerData.address = true;
    }
  },
  mounted() {
    document.querySelector('.trumpePopup').addEventListener('touchstart',function(event){
      event.preventDefault()
    },false)
    document.querySelector('.trumpePopup').addEventListener('touchmove',function(event){
      event.preventDefault()
    },false)

    var that = this;
    if (this.$store.state.local.local.state) {
      console.log("mounted")
      var pointStore,
          distance, //距离
          local = this.$store.state.local.local;
      var pointLocal = new BMap.Point(local.lng, local.lat);
      this.$api.getRecommend().then(data=>{
        if(data.data){
          for (let i of data.data) {
            pointStore = new BMap.Point(i.Longitude, i.Latitude);
            distance = parseFloat(
              BMapLib.GeoUtils.getDistance(pointLocal, pointStore).toFixed(2)
            );
            if (distance > 1000) {
              distance = parseFloat((distance / 1000).toFixed(2)) + "千米";
            } else {
              distance = distance + "米";
            }
            i.distance = distance;
          }
          that.storeList = data.data;
        }
      })
    }
    //取推荐医师列表
    this.$api.getRecommendDoctor().then(data=>{
      if(data.data){
        console.log(data.data)
        this.doctorList = data.data
      }
    })
    // 获取轮播图
    this.$api.GetSystemBanner().then(data=>{
      if(data.data){
        this.banner = data.data
      }
    })
    
    //公告
    this.$api.getNotcomList().then(data=>{
      if(data.data){
        that.trumpetList = data.data
      }
    })
  }
};
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px;
}
</style>
