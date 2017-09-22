<template>
  <div class="g-index">
    <div class="left">
      <div class="date">
        July 8, 2016
      </div>
      <m-left-temp />
    </div>
    <div class="main">
      <div class="statistic">
        <div class="stat-title">
          Statistics
          <a href="">more</a>
        </div>
      </div>
      <div class="temp-list">
        <u-stat-item type="hum" />
        <u-stat-item type="wind_dir" />
        <u-stat-item type="wind_spd" />
        <u-stat-item type="cloud" />
      </div>
      <div class="temp-info">
        <ul class="temp-title">
          <li class="title-item title-cur">Today</li>
          <li class="title-item">Week</li>
          <li class="title-item">Month</li>
        </ul>
        <div class="temp-list">
          <m-list-item />
        </div>
        <div class="temp-list">
          <m-list-item />
        </div>
        <div class="temp-list">
          <m-list-item />
        </div>
        <div class="temp-list">
          <m-list-item />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  mounted() {
    var url = 'https://free-api.heweather.com/v5/now'
    /* this.$http.get(url).then(function(data){
        console.log(data)
    },function(response){
        console.info(response);
    }) */
  }
}
</script>
<style lang="scss">
@import './assets/style/common';
.g-index {
  background-color: #fff;
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  .left {
    float: left;
    width: 450px;
    padding: 0 0 70px 50px;
    border-top-left-radius: 14px;
    border-bottom-left-radius: 14px;
    color: rgba(255,255,255, .9);
    min-height: 400px;
    // background-image:linear-gradient(135deg, #F24B90 141.4213562373095px, #F78167 282.842712474619px);
    background: -moz-linear-gradient(left top, #F24B90, #F78167);
    background: linear-gradient(left top, #F24B90, #F78167);
  }
  .date {
    margin-top: 50px;
    // margin-bottom: 360px;
    margin-bottom: 50%;
    letter-spacing: 1px;
    color: rgba(255,255,255, .8);
  }
  .main {
    float: left;
    flex: auto;
    padding: 50px 50px 70px 50px;
    background-color: #fff;
    // color: RGB(171,169,169);
    color: RGB(145,145,145);
    text-shadow: 0 0 1px RGBA(145,145,145,.8);
    letter-spacing: 1px;
    .statistic {
      width: 100%;
      padding-bottom: 20px;
      border-bottom: 1.5px solid RGBA(171,169,169,.5);
      .stat-title {
        position: relative;
        font-size: 26px;
        font-weight: 300;
        color: RGB(117,117,117);
        text-shadow: 0 0 1px RGB(117,117,117);
      }
      a {
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 16px;
        text-shadow: none;
        color: #EF5896;
        text-decoration: none;
        text-shadow: none;
      }
    }
    .temp-list {
      margin: 40px 0 50px;
      display: flex;  
    }
    .u-stat-item {
      flex: 1;
    }
    .temp-title {
      font-size: 24px;
      font-weight: 300;
      display: flex;
      border-bottom: 1.5px solid RGBA(171,169,169,.5);
      .title-item {
        margin-right: 20px;
        padding: 0 10px 18px;
        margin-bottom: -3px;
      }
      .title-cur {
        border-bottom: 6px solid;
        color: RGB(95,94,94);
        text-shadow: 0 0 1px RGBA(95,94,94,.7);
        border-image: linear-gradient(to right, #F24B90, #F78167) 20 20;
        border-image: -moz-linear-gradient(to right, #F24B90, #F78167) 20 20;
        border-image: linear-gradient(to right, #F24B90, #F78167) 20 20;
      }
    }
  }
}

</style>

