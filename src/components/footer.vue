<style lang="less">

/*背景颜色*/
.weui-tabbar{background-color: white !important; max-width: 750px;}
.weui-tabbar:before{border-top: 1px solid #E5E5E5 !important;}
.weui-tabbar{position: fixed !important;}      /*固定在底部*/
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{color: #999 !important;}    /*选中的底部文字颜色*/
.weui-tabbar__label span.cur{color: #F07803 !important;}


.weui-tabbar__item .weui-tabbar__icon,.weui-tabbar__item .weui-tabbar__icon img{width: .52rem; height: .52rem;}
.weui-tabbar__item p{font-size: .24rem;}

/*中间的tabbar*/
.weui-tabbar__item.middle .weui-tabbar__icon{width: 1.2rem; height: 1.2rem; border-radius: 50%; background-color: white; margin-top: -.4rem; position: relative;}
.weui-tabbar__item.middle .weui-tabbar__icon img{width: .6rem; height: .6rem; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);}
.weui-tabbar__item.middle p{margin-top: -.28rem; position: relative; z-index: 999;}
/*制作中间的圆的边框*/
// .bg{position: fixed; width: 100%; bottom: .15rem; height: 1.2rem; max-width: 750px;}
// .bg .circle{width: 1.2rem; height: 1.2rem; position: absolute; border-radius: 50%; border: 1px solid #E5E5E5; left: 0; right: 0; margin: auto;}
</style>
<template>
    <div>
        <tabbar>
            <tabbar-item :selected="tab == i" :link="v.link" v-for="(v,i) in tabbarList" :key="i">
                <img slot="icon" :src="tab == i?v.activeIcon:v.defaultIcon">
                <!-- <img slot="icon" v-else :src="../assets/images/tab/tab_icon_home_normal.png"> -->
                <span slot="label" :class="tab == i?'cur':''">{{v.title}}</span>
            </tabbar-item>
        </tabbar>
        <!-- <div class="bg">
            <div class="circle"></div>
        </div> -->
    </div>
</template>
<script>
import { Tabbar, TabbarItem } from 'vux'
export default {
    components:{
        Tabbar,
        TabbarItem,
    },
    props:{
        tab:{
            type: String,
            default: '0'
        }
    },
    data(){
        return{
            tabbarList:[
                {
                    link: '/',
                    defaultIcon: require("../assets/images/tab/tab_icon_location_normal.png"),
                    activeIcon: require("../assets/images/tab/tab_icon_location_selected.png"),
                    title: '附近',
                },
                {
                    link: '/store',
                    defaultIcon: require("../assets/images/tab/tab_icon_doctor_normal.png"),
                    activeIcon: require("../assets/images/tab/tab_icon_doctor_selected.png"),
                    title: '医师',
                },
                // {
                //     link: '/location',
                //     defaultIcon: require("../assets/images/tab/tab_icon_location_normal.png"),
                //     activeIcon: require("../assets/images/tab/tab_icon_location_selected.png"),
                //     title: '定位',
                // },
                {
                    link: '/order',
                    defaultIcon: require("../assets/images/tab/tab_icon_predetermine_normal.png"),
                    activeIcon: require("../assets/images/tab/tab_icon_predetermine_selected.png"),
                    title: '订单',
                },
                {
                    link: '/user',
                    defaultIcon: require("../assets/images/tab/tab_icon_me_normal.png"),
                    activeIcon: require("../assets/images/tab/tab_icon_me_selected.png"),
                    title: '我的',
                },
            ]
        }
    }
}
</script>
