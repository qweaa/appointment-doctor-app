<style lang="less" scoped>
.flex-center{display: flex; justify-content: center; align-items: center;}
/* 日期选择 */
.date{width: 7.5rem;; overflow-x: scroll; background-color: #F5F5F5;}
.date ul{width: 9.5rem;;}
.date li{width: 1.3rem; float: left; line-height: .4rem; height: 1rem; flex-direction: column; font-size: .24rem; border-left: 1px solid #F5F5F5; border-right: 1px solid #F5F5F5; border-bottom: 1px solid #E5E5E5; color: #666;}
.date li.cur{background-color: white; border-left: 1px solid #E5E5E5; border-right: 1px solid #E5E5E5; border-bottom: 1px solid white; color: @primary-color;}
.date li:first-child{border-left: 1px solid #F5F5F5;}
.date li:last-child{border-right: 1px solid #F5F5F5;}
/* 预约时间 */
.list-reservation .item{border-bottom: 1px solid #E5E5E5; height: 1.56rem; color: #222; font-size: .26rem; line-height: .35rem; justify-content: flex-start; justify-content: space-between} /*字体默认样式#222；大小.26rem；行高.4rem；*/
.list-reservation .item:last-child{border-bottom: none;}
.list-reservation .left{font-size: .28rem; width: 1.56rem; flex-direction: column;}
.list-reservation .middle{flex: 1;}
.list-reservation .middle h5{font-size: .32rem; line-height: .5rem;}
.list-reservation .middle p{color: #999;}
.list-reservation .right{width: 1.22rem; height: .58rem; border-radius: .5rem; border: 1px solid @primary-color; color: @primary-color; line-height: .58rem; text-align: center; margin-right: .3rem;}
.list-reservation .right.outTime{color: #999; border: 1px solid #999;}
//医生页面的预约列表样式
.list-reservation .inDoctor{flex: 1; line-height: .6rem; padding-left: .3rem;}
.list-reservation .inDoctor h6{font-size: .32rem; font-weight: bold;}
.list-reservation .inDoctor p{font-size: .26rem; color: #999; line-height: .4rem;}
</style>
<template>
    <div>
        <!-- 日期选择 -->
        <div class="date">
            <ul>
                <li :class="['flex-center',dateTab == i ? 'cur':'']" v-for="(v,i) in dateList" :key="i" @click="selectECASchedul(i)">
                    <p>{{v.date}}</p>
                    <span>{{v.week}}</span>
                </li>
            </ul>
        </div>
        <!-- 预约时间 -->
        <div class="list-reservation">
            <div class="item flex-center" v-for="(v,i) in bookList" :key="i">
                <div class="left flex-center" v-if="ecaid">
                    <p>{{v.start_time}}</p>
                    <p>~</p>
                    <p>{{v.end_time}}</p>
                </div>
                <div class="middle" v-if="ecaid">
                    <h5>{{v.DNickName}}</h5>
                    <p>价格 ¥{{v.price}}</p>
                    <p>剩余名额 {{v.can_book - v.has_book}}人</p>
                </div>
                <div class="inDoctor" v-else>
                    <h6>{{v.start_time + '~' + v.end_time}}</h6>
                    <p>剩余名额 {{v.can_book - v.has_book}}人</p>
                </div>
                <span v-if="v.outTime" class="right outTime">已过期</span>
                <span v-else class="right" @click="gotoAppoint(v)">预定</span>
            </div>
            <default-page v-if="bookList.length == 0" :data="defaultData"></default-page>
        </div>
        <!-- 预约时间 END -->
    </div>
</template>
<script>
import {getFuture} from '../utils/util';
import defaultPage from '../components/default'
export default {
    components:{
        defaultPage,
    },
    props:['ecaid','doctorId'],
    data(){
        return{
            defaultData:{
                title: '暂无排班信息',
                icon: require('../assets/images/default/star-144.png')
            },
            dateList:[],                //存储未来7天日期
            dateTab: 0,                 //时间日期的选择
            bookList: [],
        }
    },
    mounted(){
        //获得未来7天的日期
        var date = getFuture(7);
        console.log(date)
        this.dateList = date;
        // JSON.stringify
        if(this.ecaid){
            this.getECASchedul(
                date[0].year+'-'+date[0].date,
                date[0].year+'-'+date[0].date
            )
        }
        if(this.doctorId){
            this.getDoctorSchedul(
                date[0].weekValue,
                // date[0].year+'-'+date[0].date,
                date[0].year+'-'+date[0].date
            )
        }
    },
    methods:{
        //跳转预约页面
        gotoAppoint(v){
            let date = new Date(this.dateList[this.dateTab].time).getTime()
            v.appointmentDate = date
            window.localStorage.setItem('oysyBook',JSON.stringify(v))
            this.$router.push('/appointment')
        },
        //setOutTime
        setOutTime(data){
            let result = data,
                now = new Date(),
                nowTime = now.getTime(),
                startTime;
            for(let i of result){
                if(this.dateList[this.dateTab].timeValue > nowTime){
                    i.outTime = false
                    continue
                }

                // if(i.date > nowTime){
                //     i.outTime = false
                //     continue
                // }
                startTime = new Date(now.toLocaleDateString() + ' ' + i.start_time).getTime();
                if(startTime < nowTime){
                    i.outTime = true;
                }else{
                    i.outTime = false;
                }
            }
            return result;
        },
        setBookList(data){
            this.bookList = data;
        },
        //单个医师排班列表
        getDoctorSchedul(start,end){
            var that = this;
            this.$api.getBookListByWeek({
                id: this.doctorId,
                week: start,
            }).then(data=>{
                console.log(data.data)
                if(data.data && data.data.length > 0){
                    console.log("00",new Date(start + ' 00:00:00').getTime(), new Date().getTime())
                    if(new Date(start + ' 00:00:00').getTime() > new Date().getTime()){
                        for(let i of data.data){
                            i.outTime = false
                        }
                        this.bookList = data.data
                    }else{
                        this.bookList = this.setOutTime(data.data)
                    }
                }
                console.log("000",this.bookList)
            })
            return
            this.$api.getDoctorBooks({
                id: this.doctorId,
                date: start,
            }).then(data=>{
                console.log(data.data)
                if(data.data && data.data.length > 0){
                    console.log("00",new Date(start + ' 00:00:00').getTime(), new Date().getTime())
                    if(new Date(start + ' 00:00:00').getTime() > new Date().getTime()){
                        for(let i of data.data){
                            i.outTime = false
                        }
                        this.bookList = data.data
                    }else{
                        this.bookList = this.setOutTime(data.data)
                    }
                }
                console.log("000",this.bookList)
            })
            // getDoctorScheduling(this.doctorId,start,end,function(data){
            //     that.setBookList(that.setOutTime(data))
            // })
        },
        //请求ECA店医师排班列表
        getECASchedul(start,end){
            var that = this;
            console.log("根据医院取医师待开发")
            // getECAScheduling(this.ecaid,start,end,function(data){
            //     that.setBookList(that.setOutTime(data))
            // })
        },
        //点击日期选择ECA列表
        /*
        "对于“NFine.WebApi.Controllers.DoctorController”
        中方法“System.Web.Mvc.ActionResult GetECADoctorList(System.Guid)”
        的不可以为 null 的类型“System.Guid”的参数“ecaId”，参数字典包含一个 null 项。
        可选参数必须为引用类型、可以为 null 的类型或声明为可选参数。
            参数名: parameters"
        */
        selectECASchedul(i){
            this.bookList = []
            var date = this.dateList[i];
            this.dateTab = i;
            if(this.ecaid) this.getECASchedul(date.year+'-'+date.date,date.year+'-'+date.date)
            else if(this.doctorId) this.getDoctorSchedul(date.weekValue,date.year+'-'+date.date)
        },
    },
    watch:{
        ecaid: function(){
            let date = this.dateList[0];
            this.getECASchedul(
                date.year+'-'+date.date,
                date.year+'-'+date.date
            )
        },
        doctorId: function(){
            let date = this.dateList[0];
            this.getDoctorSchedul(
                date.weekValue,
                date.year+'-'+date.date
            )
        }
    }
}
</script>
