<style lang="less" scoped>
/*推荐门店*/
.center-flex{display: flex; align-items: center; justify-content: center;}
.recommendStore{margin-bottom: 0; padding-left: .3rem; background-color: white;}
.recommendStore .item{border-bottom: 1px solid #E5E5E5; display: flex; padding-top: .2rem; padding-bottom: .2rem;}
.recommendStore .item:last-child{border-bottom: none;}
.recommendStore .store-logo{width: 1.5rem; justify-content: flex-start;}
.recommendStore .store-logo img{width: 1.3rem; height: 1.3rem; border-radius: .12rem; border: 1px solid #F5F5F5;}
.recommendStore .left{flex: 1; color: #999; line-height: .4rem; overflow: hidden;}
.recommendStore .left h4{line-height: .5rem; font-size: .32rem; color: #222; justify-content: flex-start;}
.recommendStore .left h4 span{max-width: 3.5rem;}
.recommendStore .left h4 i{width: 1.4rem; height: .36rem; border: 1px solid #F83A09; color: #F83A09; text-align: center; font-size: .24rem; line-height: .36rem; border-radius: .06rem; margin-left: .3rem;}
.recommendStore .left p{width: 3.5rem; font-size: .24rem;}
.recommendStore .right{width: 2rem;}
.recommendStore .right a{width: 1.44rem; height: .64rem; border-radius: .06rem; background-color: #F07803; color: white; font-size: .26rem; line-height: .64rem; text-align: center;}
</style>
<template>
    <div class="recommendStore">
        <!-- <div class="head">您好，系统为您推荐的优质服务门店</div> -->
        <div class="item" v-for="(v,i) in storeList" :key="i">
            <div class="store-logo center-flex">
                <img :src="v.FileUrl" alt="">
            </div>
            <div class="left">
                <h4 class="center-flex">
                    <span class="ellipsis">{{v.ShopName}}</span>
                </h4>
                <p class="ellipsis">{{v.City+v.Area+v.Address}}</p>
                <p>负责人: {{v.F_NickName}} 距您{{v.distance}}</p>
            </div>
            <div class="right center-flex">
            <router-link :to="'/storeInfo?ecaid='+v.ECAId+'&address='+v.City+v.Area+v.Address+'&lng='+v.Longitude+'&lat='+v.Latitude">进入门店</router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        storeList: Array,
        default: [
            // {
            //     Address:"棠下小区",
            //     Area:"天河区",
            //     City:"广州市",
            //     ECAId:"796bc861-c753-4421-83a3-21164ff9e09e",
            //     F_NickName:"杰6",
            //     Latitude:23.1200491,
            //     Longitude:113.3076497,
            //     Province:"广东省",
            //     ShopName:"鸿亿小区东风店",
            // }
        ],
    },
    data(){
        return{
        }
    }
}
</script>
