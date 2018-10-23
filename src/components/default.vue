<style lang="less" scoped>
.default{height: 4rem; display: flex; justify-content: center; align-items: center; flex-direction: column;}
.default img{width: 1.44rem; height: 1.44rem;}
.default span{line-height: .6rem; font-size: .28rem; color: #B3B3B3;}
</style>
<template>
    <div class="default">
        <img :src="data.icon" alt="">
        <span>{{data.title}}</span>
    </div>
</template>
<script>
export default {
    props:{
        data:{
            type: Object,
            default: function(){
                return {
                    icon: require('../assets/images/default/star-144.png'),
                    title: '空空如也~'
                }
            }
        }
    }
}
</script>
