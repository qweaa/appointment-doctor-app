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
          <span class="ellipsis">{{v.NoticeContent}}</span>
        </div>
      </swiper-item>
    </swiper><!-- 垂直文字的滚动 END -->
    <!-- 推荐店铺 START -->
    <div class="recommendhead">您好，系统为您推荐的优质服务门店</div>
    <store-item :storeList="storeList" class="group"></store-item>
    <!-- 推荐店铺 END -->
    <!-- 公告弹窗 -->
    <popup v-model="trumpePopup" position="left" width="100%" class="trumpePopup">
      <div class="tru-head">公告</div>
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
import { GetQueryString } from "../utils/util";
const { getRecommend,getNotcomList,testMock } = require("../utils/request");
export default {
  components: {
    mFooter,
    mHeader,
    storeItem,
    Swiper,
    SwiperItem,
    Popup
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
      trumpetList: [
        {
          link: "javascript:",
          NoticeContent: '义务爱了 完成传奇世界H5-王者归来任务 获得30金币asdf',
          F_CreatorTime: '2017-12-20 10:16:39'
        },{
          link: "javascript:",
          NoticeContent: '公告二',
          F_CreatorTime: '2017-12-20 10:16:39'
        },{
          link: "javascript:",
          NoticeContent: '公告三',
          F_CreatorTime: '2017-12-20 10:16:39'
        },
      ],
      trumpeDetail: {},
      storeList: [
        // {
        //   Address:"棠下小区",
        //   Area:"天河区",
        //   City:"广州市",
        //   ECAId:"796bc861-c753-4421-83a3-21164ff9e09e",
        //   F_NickName:"杰6",
        //   Latitude:23.1200491,
        //   Longitude:113.3076497,
        //   Province:"广东省",
        //   ShopName:"鸿亿小区东风店",
        // }
      ],
      banner: [
        {
          //banner Swiper数据
          url: "javascript:",
          img: require("../assets/images/tmp/1.jpg")
        },
        {
          url: "javascript:",
          img: require("../assets/images/tmp/2.jpg")
        },
        {
          url: "javascript:",
          img: require("../assets/images/tmp/3.jpg")
        }
      ]
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
        getRecommend(val.province, val.city, val.lng, val.lat, function(data) {
          for (let i of data) {
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
          that.storeList = data;
        });
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
    // document.querySelector('.trumpePopup').addEventListener('touchstart',function(event){
    //   event.stopPropagation()
    // })
    // document.querySelector('.trumpePopup').addEventListener('touchmove',function(event){
    //   event.stopPropagation()
    // })

    var that = this;
    if (this.$store.state.local.local.state) {
      console.log("mounted")
      var pointStore,
          distance, //距离
          local = this.$store.state.local.local;
      var pointLocal = new BMap.Point(local.lng, local.lat);
      getRecommend(local.province, local.city, local.lng, local.lat, function(
        data
      ) {
        for (let i of data) {
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
        that.storeList = data;
      });
    }
    // 获取轮播图
    // this.$http
    //   .get("/Common/GetSystemBanner", {
    //   params: {
    //     ecaid: "00000000-0000-0000-0000-000000000000"
    //   }
    // })
    // .then(res => {
    //   if (res.data.state === "info") {
    //     this.banner = res.data.data.map(item => {
    //       return {
    //         url: item.Hyperlink,
    //         img: item.FileUrl
    //       };
    //     });
    //   } else {
    //     console.error(res.data.message);
    //   }
    // })
    // .catch(err => {
    //   console.log(err);
    // });
    //公告
    // getNotcomList(function(data){
    //   console.log("公告：",data)
    //   that.trumpetList = data.noList
    //   console.log(that.trumpetList)
    // })
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
