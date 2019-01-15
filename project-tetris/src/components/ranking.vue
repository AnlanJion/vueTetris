<template>
  <div id="ranking">
    <div class="ranking_wrapper">
      <h3>我在铁路伴侣APP等你挑战</h3>
      <h2>世界排名</h2>
      <p>
        <span style="margin-right:5px;">第{{raceNum}}赛季</span>
        <span>{{raceDateTime}}</span>
      </p>
      <div class="ranking_box">
        <span class="ranking_num">04</span>
        <div class="img_circle">
          <div><img src="../images/a1.jpg" alt=""></div>
        </div>
        <span>风追烟花雨</span>
      </div>
      <div class="ranking_score">
        <span>2985739485分</span>
      </div>
      <div class="ranking_bottom">
        <img src="../images/a1.jpg" alt="">
        <p>铁路伴侣APP</p>
      </div>
    </div>
    <div class="ranking_footer">
      <div class="footer_top">
        <p><span>正晚点</span></p>
        <p><span>候车室</span></p>
        <p><span>开停捡</span></p>
        <p><span>玩游戏</span></p>
      </div>
      <h3>铁路伴侣  全程陪你</h3>
    </div>
  </div>
</template>
<script>
import { getRaceTime } from '../api/index.js'
export default {
  name: 'ranking',
  data () {
    return {
      raceNum:getRaceTime().m,
      raceDateTime:getRaceTime().raceDate
    }
  }
}
</script>
<style scoped>
  #ranking {
    position: relative;
    top:-60px;
    width: 100%;
    height: 100%;
    overflow:hidden ;
    background: url('../images/ic_elsfk_bj.png') no-repeat;
    background-size: cover;
  }
  .ranking_wrapper{
    width:100%;
    position:absolute;
    top:80px;
    text-align: center;
    color:#fff;
    margin:0 auto;

  }

  h2{
    color: #ffdd13;
    margin:10px 0;
  }
  .ranking_box {
    margin-top:10px;
  }
  .ranking_num{
    font-size:30px;
    color: #ffdd13;
  }
  .img_circle{
    width:90px;
    height:90px;
    background:#4f58bd;
    border-radius: 50%;
    margin: 15px auto;
    border:1px solid transparent;

  }
  .img_circle div{
    width:80px;
    height:80px;
    border-radius: 50%;
    background:#4850aa;
    margin-top:6px;
    margin-left:5px;
  }
  .img_circle img{
    width:60px;
    height:60px;
    margin-top:10px;
    border-radius: 50%;
  }
  .ranking_score{
    margin-top:10px;
  }
  .ranking_bottom img{
    width:100px;
    height:100px;
    margin-top:10px;
  }
  .ranking_footer{
    color:#fff;
    width:100%;
    height:90px;
    position:absolute;
    bottom:0;
    text-align: center;
    display: flex;
    flex-direction: column;

  }
  .footer_top{
    margin:0 auto;

  }
  .footer_top p{
    width:70px;
    height:35px;
    line-height: 33px;
    border-radius:35px;
    background:#4054aa;
    text-align:center;
    float:left;
    margin-right:10px;
  }
  .footer_top p:last-child{
    margin-right:0;
  }
  .ranking_footer h3 {
    color:#fff;
    margin-top:10px;
  }
</style>
