<style lang="less" scoped>
@import '../assets/styles/default';
.first__group{
    /deep/.weui-cells{margin-top: 0;}
    /deep/.weui-cells:before{content: none;}
}
.myGroup{
    /deep/.weui-cell .vux-label{color: #b2b2b2;}
    /deep/.vux-tap-active .vux-label{color: #222 !important;}
}
.color-primary{color: @primary-color;}

.flex-center{display: flex; justify-content: center; align-items: center;}

.state-icon{height: 26px;}
.icon{font-size: .4rem; color: @primary-color;}

.tipss{line-height: .88rem; font-size: .28rem; color: #666; text-align: center;}
</style>
<template>
    <div class="container">
        <template v-if="order === null">
            <div class="tipss">网页正在加载中...</div>
        </template>
        <template v-if="order === false">
            <div class="tipss">加载失败，点击重试</div>
        </template>
        <template v-if="order === ''">
            <div class="tipss">订单不存在</div>
        </template>
        <template v-if="order">
            <!-- 订单状态 -->
            <group class="first__group myGroup">
                <cell class="state">
                    <div slot="title" class="state-icon color-primary flex-center">
                        <template v-if="order.status == state.WAY_PAY">
                            <icon class="icon" type="waiting"></icon>
                            <span>待付款</span>
                        </template>
                        <template v-if="order.status == state.LOSE">
                            <icon class="icon" type="warn"></icon>
                            <span>已失效</span>
                        </template>
                        <template v-if="order.status == state.BOOK">
                            <icon class="icon" type="success-circle"></icon>
                            <span>已预约</span>
                        </template>
                        <template v-if="order.status == state.FINISH">
                            <icon class="icon" type="success"></icon>
                            <span>已完成</span>
                        </template>
                        <template v-if="order.status == state.CLOSE">
                            <icon class="icon" type="cancel"></icon>
                            <span>已取消</span>
                        </template>
                    </div>
                </cell>
            </group>
            
            <group class="myGroup">
                <cell title="订单详情" is-link :border-intent="true" :arrow-direction="orderVisible ? 'up' : 'down'" @click.native="orderVisible = !orderVisible"></cell>
                <template v-if="orderVisible">
                    <cell title="预约单号" :value="order.code"></cell>
                    <cell title="下单时间" :value="getTime(Number(order.create_time))"></cell>
                    <cell title="预约医师" :value="order.doctor_name"></cell>
                    <cell title="预约定金" :value="order.book_price"></cell>
                </template>
            </group>

            <group class="myGroup">
                <cell title="预约详情" is-link :border-intent="true" :arrow-direction="bookVisible ? 'up' : 'down'" @click.native="bookVisible = !bookVisible"></cell>
                <template v-if="bookVisible">
                    <cell title="预约人" :value="order.name"></cell>
                    <cell title="联系电话" :value="order.phone"></cell>
                    <cell title="身份证号" :value="order.idcard"></cell>
                </template>
            </group>

            <group class="myGroup" v-if="order.isComment">
                <cell title="评论" is-link :border-intent="true" :arrow-direction="commentVisible ? 'up' : 'down'" @click.native="commentVisible = !commentVisible"></cell>
                <template v-if="commentVisible">
                    <cell title="评论内容" align-items="flex-start" :value="order.comment"></cell>
                    <cell title="打分">
                        <rater v-model="order.evaluate" disabled></rater>
                    </cell>
                    <cell title="评论时间" :value="order.comment_time"></cell>
                </template>
            </group>
        </template>
    </div>
</template>
<script>
import { Cell, Group, CellFormPreview, Icon, Rater } from "vux";
import config from '../utils/config.js'
export default {
    components: {
        Group,
        Cell,
        CellFormPreview,
        Icon,
        Rater,
    },
    data(){
        return {
            state: config.ORDER_STATE,

            ordercode: '',

            orderVisible: true,
            bookVisible: true,
            commentVisible: true,

            order: null,
        }
    },
    methods: {
        getDetail(code){
            this.$api.getOrderModule(code).then(data=>{
                this.order = data.data
            }).catch(data=>{
                this.order = false
            })
        },
        getTime(t){
            if(!t) return ''
            return new Date(t).toLocaleString('chinese',{hour12: false})
        },
    },
    created(){
        if(this.$route.query.ordercode){
            this.getDetail(this.$route.query.ordercode)
        }else this.order = ''
    }
}
</script>
