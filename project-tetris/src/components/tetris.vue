<template>
  <div class="tetris">
    <div class="toast" v-if="toastOpen">
      <div class="close" @click="closeToast(0)"></div>
      <div class="toast-box">
        <img src="../images/组32@3x.png" alt="" @click="playGames">
        <img src="../images/组77@3x.png" alt="" @click="nowLogin">
      </div>
    </div>
    <div class="backGameToast" v-if="backGame">
      <h2 @click="comeBackGame">回到游戏</h2>
    </div>
    <div class="getScoreToast" v-if="dieGame">
      <div class="close" @click="closeToast(1)"></div>
      <div class="getScore_header">
        <h2>
          <img src="../images/1/本局得分：@3x.png" alt="">
          <span>{{getScore}}</span>
        </h2>
       <h2>
         <img src="../images/1/历史最高：@3x.png" alt="">
         <span>{{hScore}}</span>
       </h2>
        <h2>
          <img src="../images/1/我的排名：@3x.png" alt="">
          <span>{{nowRanking}}</span>
        </h2>
      </div>
      <div class="toast-box">
        <img src="../images/1/组32@3x.png" @click="diePlayGamesAgain">
        <img src="../images/1/share.png" @click="handleToShare">
      </div>
    </div>
    <div class="noLoginToast" v-if="noLoginToast">
      <div class="close" @click="closeToast(2)"></div>
      <div class="noLogin-top">
        <h2>
          <img src="../images/1/本局得分：@3x.png" alt="">
          <span>{{getScore}}</span>
        </h2>
        <h2 class="rank-k">
          <img src="../images/1/立即登录，参与世界排名！@3x.png">
        </h2>
      </div>
      <div class="toast-box">
        <img src="../images/1/组32@3x.png" @click="playGamesAgain">
        <img src="../images/1/组31@3x.png" @click="nowLogin">
      </div>
    </div>
    <div class="header">
      <div class="back" @click="handleToBack"></div>
      <div class="title">俄罗斯方块</div>
      <div class="refresh" @click="refreshCurrentPage"></div>
    </div>
    <div class="content">
      <div class="left">
        <div class="top" ref="top">
          <div class="top-wrapper">
            <canvas ref="canvas" class="canvas-wrapper"></canvas>
            <canvas ref="canvasBack" class="canvas-background"></canvas>
          </div>
        </div>
        <div class="bottom">
          <img src="../images/ic_elsfk_an_yi@3x.png" @touchstart="touchStart(-1)" @touchend="touchEnd(-1)">
          <img src="../images/ic_elsfk_an_er@3x.png"  @touchstart="touchStart(0)" @touchend="touchEnd(0)">
          <img src="../images/ic_elsfk_an_san@3x.png" @touchstart="touchStart(1)" @touchend="touchEnd(1)">
        </div>
      </div>
      <div class="right">
        <div class="wrapper-item">
          <div class="name">
            <img src="../images/下一个@3x.png" alt="">
          </div>
          <div class="val" ref="valImg">
            <canvas ref="myCanvas" id="myCanvas"></canvas>
          </div>
        </div>
        <div class="wrapper-item wrapper-block">
          <div class="score">
            <img src="../images/得分@3x.png" alt="">
          </div>
          <div class="font">{{getScore}}</div>
        </div>
        <div class="wrapper-item wrapper-block">
          <div class="speed">
            <img src="../images/速度@3x.png" alt="">
          </div>
          <div class="font">{{speed}}</div>
        </div>
        <div class="wrapper-item wrapper-block">
          <div class="history-scroe">
            <img src="../images/历史记录@3x.png" alt="">
          </div>
          <div class="font">{{hScore}}</div>
        </div>
        <div class="wrapper-foot">
          <img src="../images/pause.png" alt="" @click="pauseMove">
          <img src="../images/rank.png" @click="handleToSharePage">
          <img src="../images/ic_elsfk_an_si@3x.png" @click="rotateMove">
        </div>
      </div>
    </div>
    <Share v-if="share"
           @closeShare="closeShare"
           @handleToShare="handleToShare"
           :shareList="shareList" ></Share>
  </div>
</template>
<script>
  /* eslint-disable quotes */
  import Share from './share.vue'
  import {interactiveBridge, setCookie, getCookie, getRaceTime} from '../api/index.js'
  import Service from '../Service/index.js'

  const X_COUNT = 10
  const DEFAULT_BOTTOM = 90
  const N_COUNT = 5
  export default {
    name: 'tetris',
    data() {
      return {
        getScore: 0,
        speed: 0,
        hScore: 0,
        toastOpen: false,
        share: false,
        backGame: false,
        dieGame: false,
        shareList: [],
        nowRanking: 0,
        noLoginToast:false,
        raceNum:getRaceTime().m
      }
    },
    components: {
      Share
    },
    methods: {
      initCount() {
        const w = this.$refs.canvas.offsetWidth
        const h = this.$refs.canvas.offsetHeight
        const nextW = this.$refs.myCanvas.offsetWidth
        // 计算出一块的边长
        this.oneEleVal = (w - 1) / X_COUNT - 1
        this.nextOneVal = nextW / N_COUNT
        // 得到y轴元素的个数
        this.yCount = parseInt((h - 1) / (1 + this.oneEleVal))
        // 得到新的高度值
        const newBottom = h - (this.yCount * (this.oneEleVal + 1) + 1) + DEFAULT_BOTTOM
        // 赋值给外层元素top的底部值
        this.$refs.top.style.bottom = `${newBottom}px`
      },
      // 图形canvas
      initCanvas() {
        this.ele = this.$refs.canvas
        this.width = this.ele.width = this.ele.offsetWidth
        this.height = this.ele.height = this.ele.offsetHeight
        this.ctx = this.ele.getContext('2d')
      },
      // 背景canvas
      initCanvasBack() {
        this.eleBack = this.$refs.canvasBack
        this.widthBack = this.eleBack.width = this.eleBack.offsetWidth
        this.heightBack = this.eleBack.height = this.eleBack.offsetHeight
        this.ctxBack = this.eleBack.getContext('2d')
      },
      // 下一个canvas初始值
      nextCanvas() {
        this.nextEle = this.$refs.myCanvas
        this.nextWidth = this.nextEle.width = this.nextEle.offsetWidth
        this.nextHeight = this.nextEle.height = this.nextEle.offsetHeight
        this.context = this.nextEle.getContext('2d')
      },
      initDefaultConfig() {
        // 获取当前x轴元素的个数
        this.xCount = X_COUNT
        this.nCount = N_COUNT
        // 初始化整体背景网格
        this.backAreaGrid = this.makeMatrix(this.xCount, this.yCount)
        // 绘制
        this.drawLine()
      },
      initConfig() {
        // 初始化整体背景
        this.backArea = this.makeMatrix(this.xCount, this.yCount)
        // 运动状态
        this.running = false
        // 默认次数
        this.countVal = 100
      },
      initHandle() {
        // 初始化移动的图片
        const pieces = "ijlostz"
        this.moveArea = this.nextImage ? this.makePiece(this.nextImage) : this.makePiece(pieces[Math.floor(Math.random() * pieces.length)])
        this.nextImage = pieces[Math.floor(Math.random() * pieces.length)]
        this.nextMoveArea = this.makeNextPiece(this.nextImage)
        // 初始化位置
        this.pos = {
          x: (Math.floor(this.xCount / 2)) - (Math.floor(this.moveArea[0].length / 2)),
          y: 0
        }
        // 初始化下一个图片类型的位置
        this.nextPos = {
          x: this.nCount / 2 - this.nextMoveArea[0].length / 2,
          y: this.nCount / 2 - this.nextMoveArea.length / 2
        }
        // 绘制下一个图片
        this.drawNextMoveArea()
        // 是否出现碰撞
        if (this.collide()) {
          // 停止游戏
          this.running = false
          // 弹窗...分数变化
          if (!getCookie('user')) {
            this.noLoginToast = true
          } else {
            this.dieGameToast()
          }
        }
      },
      startHandle () {
        // 更改运动状态
        this.running = true
        // 下落间隔
        let i = 0 // 执行下落操作间隔 = 10 * i
        this.timer = setInterval(() => {
          if (this.running) {
            i++
            if (i > this.countVal) {
              // 下降
              this.realDropMove()
              // 重置
              i = 0
            }
            // 绘制
            this.draw()
          } else {
            clearInterval(this.timer)
          }
        }, 10)
      },
      // 画的操作
      draw() {
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.drawBackArea()
        this.drawMoveArea()
      },
      drawLine() {
        this.ctxBack.lineWidth = 1
        this.ctxBack.strokeStyle = '#a471b1'
        for (let y = 0; y <= this.backAreaGrid.length; y++) {
          this.ctxBack.moveTo(0, y * (this.oneEleVal + 1))
          this.ctxBack.lineTo(this.widthBack, y * (this.oneEleVal + 1))
          this.ctxBack.stroke()
        }
        for (let x = 0; x <= this.backAreaGrid[0].length; x++) {
          this.ctxBack.moveTo(x * (this.oneEleVal + 1), 0)
          this.ctxBack.lineTo(x * (this.oneEleVal + 1), this.heightBack)
          this.ctxBack.stroke()
        }
      },
      drawBackArea() {
        if (!this.backArea) return
        for (let y = 0; y < this.backArea.length; y++) {
          for (let x = 0; x < this.backArea[y].length; x++) {
            if (this.backArea[y][x] !== 0) {
              const posY = y * (1 + this.oneEleVal) + 1
              const posX = x * (1 + this.oneEleVal) + 1
              const img = this.color[this.backArea[y][x]]
              this.ctx.drawImage(img, posX, posY, this.oneEleVal, this.oneEleVal)
            }
          }
        }
      },
      drawMoveArea() {
        if (!this.moveArea) return
        for (let y = 0; y < this.moveArea.length; y++) {
          for (let x = 0; x < this.moveArea[y].length; x++) {
            if (this.moveArea[y][x] !== 0) {
              const posY = (y + this.pos.y) * (1 + this.oneEleVal) + 1
              const posX = (x + this.pos.x) * (1 + this.oneEleVal) + 1
              const img = this.color[this.moveArea[y][x]]
              this.ctx.drawImage(img, posX, posY, this.oneEleVal, this.oneEleVal)
            }
          }
        }
      },
      drawNextMoveArea() {
        this.context.clearRect(0, 0, this.nextWidth, this.nextHeight)
        for (let y = 0; y < this.nextMoveArea.length; y++) {
          for (let x = 0; x < this.nextMoveArea[y].length; x++) {
            if (this.nextMoveArea[y][x] !== 0) {
              const nextY = (y + this.nextPos.y) * (this.nextOneVal)
              const nextX = (x + this.nextPos.x) * (this.nextOneVal)
              const img = this.color[this.nextMoveArea[y][x]]
              this.context.drawImage(img, nextX, nextY, this.nextOneVal, this.nextOneVal)
            }
          }
        }
      },
      realDropMove() {
        if (!this.pos) return
        this.pos.y += 1
        if (this.collide()) {
          // 回退到上一步
          this.pos.y -= 1
          // 将图形数据合并到当前背景数据上
          this.mergeData()
          // 计算是否要消除行
          this.removeData()
          // 重新开始
          this.initHandle()
        }
      },
      touchStart (val) {
        // 执行方法
        switch (val) {
          case -1:
            this.leftMove()
            break
          case 0:
            this.dropMove()
            break
          case 1:
            this.rightMove()
            break
        }
        this.touchTimer = setTimeout(() => {
          this.touchStart(val)
        }, 120)
      },
      touchEnd () {
        clearTimeout(this.touchTimer)
      },
      dropMove() {
        this.move('y', 1)
      },
      leftMove() {
        this.move('x', -1)
      },
      rightMove() {
        this.move('x', 1)
      },
      move(direction, val) {
        // 停止操作
        if (!this.running) return
        // 计算
        this.pos[direction] = this.pos[direction] + val
        // 发生碰撞
        if (this.collide()) {
          // 回退到上一步
          this.pos[direction] = this.pos[direction] - val
        }
      },
      rotateMove() {
        // 停止操作
        if (!this.running) return
        // 计算
        const pos = this.pos.x
        let offset = 1
        // 旋转
        this.rotate(1)
        // 是否碰撞
        while (this.collide()) {
          this.pos.x += offset
          offset = -(offset + (offset > 0 ? 1 : -1))
          if (offset > this.moveArea[0].length) {
            // 反旋转
            this.rotate(-1)
            this.pos.x = pos
            return
          }
        }
      },
      rotate(dir) {
        for (let y = 0; y < this.moveArea.length; y++) {
          for (let x = 0; x < y; x++) {
            [
              this.moveArea[x][y],
              this.moveArea[y][x]
            ] = [
              this.moveArea[y][x],
              this.moveArea[x][y]
            ]
          }
        }
        if (dir > 0) {
          this.moveArea.forEach(row => row.reverse())
        } else {
          this.moveArea.reverse()
        }
      },
      makeMatrix(w, h) {
        const matrix = []
        while (h--) {
          matrix.push(new Array(w).fill(0))
        }
        return matrix
      },
      makePiece(type) {
        switch (type) {
          case 't':
            return [
              [0, 6, 0],
              [6, 6, 6],
              [0, 0, 0]
            ]
          case 'o':
            return [
              [4, 4],
              [4, 4]
            ]
          case 'l':
            return [
              [0, 3, 0],
              [0, 3, 0],
              [0, 3, 3]
            ]
          case 'j':
            return [
              [0, 2, 0],
              [0, 2, 0],
              [2, 2, 0]
            ]
          case 'i':
            return [
              [0, 1, 0, 0],
              [0, 1, 0, 0],
              [0, 1, 0, 0],
              [0, 1, 0, 0]
            ]
          case 's':
            return [
              [0, 5, 5],
              [5, 5, 0],
              [0, 0, 0]
            ]
          case 'z':
            return [
              [7, 7, 0],
              [0, 7, 7],
              [0, 0, 0]
            ]
        }
      },
      makeNextPiece(type) {
        switch (type) {
          case 't':
            return [
              [0, 6, 0],
              [6, 6, 6]
            ]
          case 'o':
            return [
              [4, 4],
              [4, 4]
            ]
          case 'l':
            return [
              [3, 0],
              [3, 0],
              [3, 3]
            ]
          case 'j':
            return [
              [0, 2],
              [0, 2],
              [2, 2]
            ]
          case 'i':
            return [
              [1],
              [1],
              [1],
              [1]
            ]
          case 's':
            return [
              [0, 5, 5],
              [5, 5, 0]
            ]
          case 'z':
            return [
              [7, 7, 0],
              [0, 7, 7]
            ]
        }
      },
      collide() {
        for (let y = 0; y < this.moveArea.length; y++) {
          for (let x = 0; x < this.moveArea[y].length; x++) {
            if (this.moveArea[y][x] !== 0 && (this.backArea[y + this.pos.y] && this.backArea[y + this.pos.y][x + this.pos.x]) !== 0) {
              return true
            }
          }
        }
        return false
      },
      mergeData() {
        for (let y = 0; y < this.moveArea.length; y++) {
          for (let x = 0; x < this.moveArea[y].length; x++) {
            if (this.moveArea[y][x] !== 0) {
              this.backArea[y + this.pos.y][x + this.pos.x] = this.moveArea[y][x]
            }
          }
        }
      },
      removeData() {
        for (let y = this.backArea.length - 1; y >= 0; y--) {
          const str = this.backArea[y].join('')
          // 当不存在0的情况下，消除当前行
          if (str.indexOf('0') === -1) {
            // 消除
            const row = this.backArea.splice(y, 1)[0].fill(0)
            this.backArea.unshift(row)
            // 分数
            this.countScore()
            // 重新开始
            y++
          }
        }
      },
      // 计分规则
      countScore() {
        // 更新得分
        this.getScore += 100
        // 根据得分，改变运行速度
        const val = parseInt(this.getScore / 1500) + 1
        this.speed = val
        this.countVal = this.countVal / val
      },
      // 刷新当前页面
      refreshCurrentPage() {
        this.initConfig()
        this.initHandle()
        this.startHandle()
      },
      // 暂停操作
      pauseMove() {
        // 停掉计时器
        this.running = false
        // 出现回到游戏弹窗
        this.backGame = true
      },
      // 暂停后回到游戏
      comeBackGame() {
        this.backGame = false
        this.startHandle()
      },
      // 跳转到分享页面计步排名
      handleToSharePage() {
        if (getCookie('user')) {
          // 停掉计时器
          this.running = false
          this.share = true
          let reqData = {}
          Service.getWorldRanking(reqData).then(
            (result) => {
              this.shareList = result.data.data
            }, (err) => {
              console.log(err)
            }
          )
        }
      },
      // 关闭分享页面计步排名
      closeShare() {
        this.share = false
      },
      // 返回上个网页
      handleToBack() {
        let u = navigator.userAgent
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        if (isiOS) {
          window.location.href = "winsion://interactive/back"
        } else {
          window.location.href = "winsion://interactive/finish"
        }
      },
      // 关闭弹窗
      closeToast(val) {
        switch (val) {
          case 0:
            this.toastOpen = false
            break
          case 1:
            this.dieGame = false
            break
          case 2:
            this.noLoginToast = false
            break
        }

      },
      // 关闭弹窗 开始游戏
      playGames() {
        this.toastOpen = false
        this.refreshCurrentPage()
      },
      // 再来一局,重新开始游戏
      playGamesAgain() {
        this.noLoginToast = false
        // 重新开始游戏
        this.initConfig()
        this.initHandle()
        this.startHandle()
        this.getScore = 0
      },
      diePlayGamesAgain() {
        this.dieGame = false
        // 重新开始游戏
        this.initConfig()
        this.initHandle()
        this.startHandle()
      },
      // 马上登陆
      nowLogin() {
        this.toastOpen = false
        this.noLoginToast = false
        let _this = this
        interactiveBridge('sendLogin', 'receiveJwt', {}, function (jwt) {
          // 保存当前用户
          setCookie('user', jwt)
          //开始游戏
          _this.initConfig()
          _this.initHandle()
          _this.startHandle()

        })
      },
      //  第一次进入页面是否有弹窗
      firstInGame() {
        let _this = this
        interactiveBridge('confirmLogin', 'receiveJwt', {}, function (jwt) {
          // 保存当前用户
          if (jwt ==='') {
            _this.toastOpen = true
          } else {
            setCookie('user', jwt)
            //开始游戏
            _this.initConfig()
            _this.initHandle()
            _this.startHandle()
          }

        })
      },
      // 登录状态下的游戏结束弹窗
      dieGameToast() {
        this.dieGame = true
        let reqData = {
          score: this.getScore,
          jwt: getCookie('user')
        }
        Service.saveScore(reqData).then(
          (result) => {
            let saveData = result.data.data
            this.getScore = saveData.score
            this.hScore = saveData.historyScore
            this.nowRanking = saveData.ranking
          }, (err) => {
            console.log(err)
          }
        )
      },
      //分享操作
      handleToShare () {
        let reqData = {
          score: `${this.getScore}`,
          season: `${this.raceNum}`,
          rank: `${this.nowRanking}`
        }
        interactiveBridge('sendShare', '', reqData, function () {

        })
      },
      //进入轮询是否暂停操作
      setPauseTimeout(){
        setInterval(() => {
          console.log('页面1分钟轮询')
          let _this = this
          interactiveBridge('', 'receivePause', {}, function (data) {
            if(data){
              //暂停
              _this.running = false
              // 出现回到游戏弹窗
              _this.backGame = true
            }
          })
        }, 1000 * 60)
      }
    },
    mounted() {
      // 初始配置
      this.initCount()
      this.initCanvas()
      this.initCanvasBack()
      this.nextCanvas()
      this.initDefaultConfig()
      // 其他操作
      this.firstInGame()
      this.setPauseTimeout()
    },
    created() {
      // 获取当前方块类型颜色
      const arr = ['', 'I', 'J', 'L', 'O', 'S', 'T', 'Z']
      this.color = arr.map(t => {
        if (t === '') {
          return null
        }
        const imgDom = document.createElement("IMG")
        imgDom.src = `static/img/${t}.png`
        return imgDom
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tetris {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: url('../images/ic_elsfk_bj.png') no-repeat;
    background-size: cover;
  }

  .toast {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 320px;
    height: 256px;
    background: url('../images/toast_bg.png') no-repeat;
    background-size: cover;
    z-index: 998;
  }

  .backGameToast {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 320px;
    height: 256px;
    background: url('../images/1/bg.png') no-repeat;;
    background-size: cover;
    z-index: 998;
    color: #fff;
    text-align: center;
  }
  .backGameToast h2{
    margin-top:80px;
  }
  .getScoreToast {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 320px;
    height: 256px;
    background: url('../images/1/bg.png') no-repeat;;
    background-size: cover;
    z-index: 998;
    color:#724403;
    text-align: center;


  }
  .getScore_header{
    margin-top:80px;
  }
  .getScore_header h2 img{
    height:20px;
  }


  .noLoginToast {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 320px;
    height: 256px;
    background: url('../images/1/bg.png') no-repeat;
    background-size:cover;
    z-index: 998;
    color:#724403;
    text-align: center;

  }
  .noLogin-top{
    margin-top:80px;
  }
  .noLogin-top h2 img{
    height:20px;
  }
  .rank-k{
    margin-top:30px;
  }

  .getHistory {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }

  .close {
    width: 20px;
    height: 20px;
    background: url('../images/close.png') no-repeat;
    background-size: cover;
    position: absolute;
    right: 18px;
    top: 43px;
  }

  .toast-box {
    position: absolute;
    bottom: 20px;
    margin-left: 29px;
  }

  .toast-box img {
    height: 37px;
  }

  .toast-box img:first-child {
    margin-right: 10px;
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
    background: url('../images/ic_elsfk_cxks@3x.png') no-repeat;
    background-size: cover;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 60px;
    bottom: 0;
    display: flex;
  }

  /* 左边 */
  .left {
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  /* 左侧的上部 */
  .top {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 90px;
    top: 0;
    box-sizing: border-box;
    border: 3px solid #97aefe;
    margin: 10px 15px;
    padding: 5px;
    border-radius: 10px;
  }

  .top-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .canvas-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
  }

  .canvas-background {
    background: #252654;
    width: 100%;
    height: 100%;
  }

  #myCanvas {
    width: 100%;
    height: 100%;
    background: #8d78dd;
  }

  /* 左侧的下部 */
  .bottom {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 90px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .bottom img {
    display: block;
    width: 68px;
    height: 68px;
  }

  /* 右边 */
  .right {
    flex-shrink: 0;
    width: 100px;
    height: 100%;
    box-sizing: border-box;
    padding-right: 15px;
    margin-top: 10px;
  }

  .val {
    width: 68px;
    height: 68px;
    background: url('../images/ic_elsfk_xyg@3x.png') no-repeat;
    background-size: cover;
    margin: 8px auto;
    border: 3px solid #97aefe;
    border-radius: 5px;
  }

  .font {
    color: #ffdd13;
    font-size: 18px;
    text-shadow: 1px 1px 1px #ffdd13;
    letter-spacing: 1.5px;
  }

  .wrapper-item {
    position: relative;
    height: 90px;
    text-align: center;

  }

  .wrapper-item > div img {
    height: 20px;
  }

  .wrapper-block {
    height: 65px;
  }

  .score {
    margin-top: 25px;
  }

  .wrapper-foot {
    text-align: center;
  }

  .wrapper-foot img {
    height: 68px;
    margin-bottom: 5px;
  }
</style>
