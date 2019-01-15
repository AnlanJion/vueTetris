<template>
  <div class="share">
    <div class="header">
      <div class="back" @click="handleToBack"></div>
      <div class="title">排行榜</div>
      <div class="refresh" @click="handleToShare"></div>
    </div>
    <div class="content">
      <div class="top">
        <p>
          <span style="margin-right:5px;">第{{raceNum}}赛季</span>
          <span>{{raceDateTime}}</span>
        </p>
      </div>
      <div class="bottom">
         <div class="bottom_box" v-for="(item,index) in shareList" :key="item+index">
          <div class="bottom_lefe">
            <span class="span_num span_num_first"><b v-if="index>2">{{index+1}}</b></span>
            <img :src="item.avatar" alt="">
            <span class="span_name">{{item.nickName}}</span>
          </div>
          <div class="bottom_right">
            <span>{{item.score}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getRaceTime } from '../api/index.js'
export default {
  name: 'share-ranking',
  data () {
    return {
      raceNum:getRaceTime().m,
      raceDateTime:getRaceTime().raceDate
    }
  },
  props: ['shareList'],
  methods: {
    handleToShare () {
      this.$emit('handleToShare')
    },
    // 返回上个网页
    handleToBack () {
      this.$emit('closeShare')
    }
  }
}
</script>
<style scoped>
  .share {
    position: relative;
    top:-60px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: url('../images/ic_elsfk_bj.png') no-repeat;
    background-size: cover;

  }
  .header {
    height: 60px;
    color: #fff;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .back {
    margin-left: 20px;
    width: 14px;
    height: 24px;
    background: url('../images/icon_left.png') no-repeat;
    background-size: cover;
  }

  .title {
    font-size: 18px;
    letter-spacing: 2px;
  }

  .refresh {
    margin-right: 20px;
    width: 24px;
    height: 24px;
    background: url('../images/图层12@3x.png') no-repeat;
    background-size: cover;
  }
  .content{
    position: absolute;
    left: 0;
    right: 0;
    top: 60px;
    bottom: 0;

  }
  .content .top{
    width:100%;
    height:54px;
  }
  .top p{
    background:#4054aa;
    color:#fff;
    width:50%;
    line-height:35px;
    border-radius:35px;
    margin:0 auto;
    text-align:center;
  }
  .bottom{
    width:100%;
    height:100%;
    overflow-y:scroll;
  }
  .bottom_box{
    height:80px;
    display: flex;
    align-items: center;
    background:url('../images/组21@3x.png') no-repeat;
    background-size:cover;
  }
  .bottom_lefe{
    display: flex;
    align-items: center;
    width:100%;
    height:100%;

  }
  .bottom_lefe span{
    font-weight:bold;
    color:#fff;
  }
  .bottom_lefe .span_num{
    width:30px;
    height:30px;
    margin-left:15px;
    text-align:center;
  }
  .bottom_box:nth-of-type(1) .bottom_lefe .span_num {
    margin-left:15px;
    background:url('../images/组18@3x.png') no-repeat;
    background-size:cover;
  }
  .bottom_box:nth-of-type(2) .bottom_lefe .span_num {
    margin-left:15px;
    background:url('../images/组19@3x.png') no-repeat;
    background-size:cover;
  }
  .bottom_box:nth-of-type(3) .bottom_lefe .span_num {
    margin-left:15px;
    background:url('../images/44@3x.png') no-repeat;
    background-size:cover;
  }
  .bottom_lefe img{
    width:60px;
    height:60px;
    border-radius:50%;
    margin:0 10px;
  }
  .bottom_right{
    color: #ffdd13;
    flex-shrink: 0;
    width:100px;
    text-align:center;
  }
</style>
