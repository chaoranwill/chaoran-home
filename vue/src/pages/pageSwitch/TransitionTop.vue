<template>
  <div class="test">
    <transition name="slideUp">
      <transition-top-index 
      user-name='chaoran' 
      @touchstart.native = "onTouch($event)"
      @touchend.native = "onTouchend($event)"
      v-if="showItem == 'one'"/>
      <transition-top-next v-if="showItem == 'two'"/>
    </transition>
  </div>
</template>

<script>
var startX = 0,
    startY = 0,
    moveEndX = 0,
    moveEndY = 0;
var X,Y;
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      show: false,
      showItem: 'one'
    }
  },
  methods: {
    onTouch(e) {
      //e.preventDefault();
      startX = e.changedTouches[0].pageX,
      startY = e.changedTouches[0].pageY;
      console.log('touch');
    },
    onTouchend(e){
      var endx, endy;
        endx = e.changedTouches[0].pageX;
        endy = e.changedTouches[0].pageY;
        var direction = getDirection(startX, startY, endx, endy);
        if (direction == 1) {
          console.log("向上！")
          this.showItem = 'two'
          /*let jump = document.getElementById("play").offsetTop;
          document.body.scrollTop = jump
          this.isIndex = false;*/
        }
    },
  }
}
//获得角度
function getAngle(angx, angy) {
    return Math.atan2(angy, angx) * 180 / Math.PI;
};

//根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
function getDirection(startx, starty, endx, endy) {
  var angx = endx - startx;
  var angy = endy - starty;
  var result = 0;

  //如果滑动距离太短
  if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
      return result;
  }

  var angle = getAngle(angx, angy);
  if (angle >= -135 && angle <= -45) {
      result = 1;
  } else if (angle > 45 && angle < 135) {
      result = 2;
  } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
      result = 3;
  } else if (angle >= -45 && angle <= 45) {
      result = 4;
  }

  return result;
}
</script>
<style lang="scss">
html, body, #app, .test, .transition-top-index, .transition-top-next{
  padding: 0;
  margin: 0;
  height: 100%;
  overflow: hidden;
}
#app {
  background-color: #303333;
}
.test {
  .transition-top-index {
    width: 100%;
    transition: all .5s ease;
    background-color: #303333;
  }
  .transition-top-next {
    transition: all .5s ease;
    background-color: #666;
  }
  .slideUp-move{
    transition: all .5s ease;
  }
  .slideUp-enter{
    transform: translateY(100%);
  }
  .slideUp-leave-active{
    position: absolute;
    transform: translateY(100%);
  }
  .slideUp-leave{
    transform: translateY(-100%);
  }
  .slideUp-leave-active{
    position: absolute;
    transform: translateY(-100%);
  }
}
</style>