<style lang="less" scoped>
//头部医生介绍
@import '../assets/styles/user-item.css';
.user-item{border-top: none;}
.user-item .middle{flex: 1;}

//选择预约时间
.schedul{justify-content: space-between; padding-left: .3rem; color: #666; font-size: .26rem; height: .88rem;}
.schedul img{margin-right: .3rem;}
.schedul img:first-child{width: .26rem; height: .3rem;}
.schedul img:last-child{width: .12rem; height: .21rem;}
.schedul span{flex: 1;}
//医生详细介绍
.detailInfo{padding: .3rem; padding-right: .3rem; color: #666;}
.detailInfo h6{font-size: .28rem; line-height: .6rem; color: #333;}
.detailInfo p{line-height: .4rem; font-size: .26rem; padding-bottom: .15rem;}

//弹窗背景颜色
.bg-white{background-color: white;}
</style>
<template>
    <div class="container">
        <m-header v-bind="headerData"></m-header>
        <div class="user-item group">
            <div to="###" class="item flex-center">
                <div class="left flex-center">
                    <img :src="info.avatarUrl" alt="">
                </div>
                <div class="middle">
                    <h5 class="flex-center">{{info.NickName}} <span>主任医师</span></h5>
                    <p class="ellipsis">首都医科大学 医学博士</p>
                </div>
            </div>
        </div>
        <!-- 选择预约时间 -->
        <div class="schedul flex-center group" @click="popup = true">
            <img src="../assets/images/tab/tab_icon_predetermine_normal.png" alt="">
            <span>在线预约</span>
            <img src="../assets/images/list_icon_right.png" alt="">
        </div>
        <!-- 选择预约时间 END-->
        <!-- 医生详细介绍 -->
        <div class="detailInfo group">
            <h6>医师简介</h6>
            <p>{{info.info}}</p>
        </div>
        <!-- 医生详细介绍 END-->
        <!-- 预约弹窗 -->
        <popup v-model="popup" height="50%" class="bg-white">
            <schedul :doctorId="doctorId"></schedul>
        </popup>
        <!-- 预约弹窗 END -->

    </div>
</template>
<script>
import mHeader from '../components/header';
import schedul from '../components/select-ECA-schedul'
import {Popup } from 'vux';
const {getDoctorDetail} = require("../utils/request")

export default {
    components:{
        mHeader,
        schedul,
        Popup,
    },
    data(){
        return {
            headerData:{
                back: true,
                title: "医师主页",
            },
            popup: false,
            doctorId: '',
            info: {
                // Detail:"ttt",
                // F_CreatorTime:"2017-12-03 08:50:16",
                // id:"390d5a64-a13a-4694-a910-01035f88d12b",
                // FileUrl:"http://hyfw-img.oss-cn-hangzhou.aliyuncs.com/mt/20171203/03085011931.png",
                // NickName:"zzz"
            }
        }
    },
    methods:{
    },
    mounted(){
        this.doctorId = this.$route.query.doctorId;
        var that = this;
        this.$api.getDoctorDetail(this.doctorId).then(data=>{
            console.log(data.data)
            that.info = data.data[0]
        })
        // getDoctorDetail(this.doctorId,function(data){
        //     console.log(data)
        //     that.info = data
        // })
    }
}
</script>
