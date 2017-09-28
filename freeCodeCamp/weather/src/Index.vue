<template>
  <div class="g-index">
    <div class="left">
      <div class="date">
        {{date}}
      </div>
      <m-left-temp :curMonth="curMonth" :temp="temp" :weather="weather" />
    </div>
    <div class="main">
      <div class="statistic">
        <div class="stat-title">
          Statistics
          <a href="">more</a>
        </div>
      </div>
      <div class="cond-list">
        <u-stat-item type="hum" :state="hum" />
        <u-stat-item type="wind_dir" :state="wind_dir" :deg="wind_deg" />
        <u-stat-item type="wind_spd" :state="wind_spd" />
        <u-stat-item type="cloud" :state="vis" />
      </div>
      <div class="temp-info">
        <ul class="temp-title">
          <li :class="[curIndex == 1 ? 'title-cur' :'false', 'title-item']"  @click="switchHour">Today</li>
          <li :class="[curIndex == 2 ? 'title-cur' :'false', 'title-item']" @click="switchWeek">Week</li>
          <!-- <li :class="[curIndex == 3 ? 'title-cur' :'false', 'title-item']">Month</li> -->
        </ul>
        <div class="temp-list" v-for="(data, index) in weatherData" :key="index">
          <m-list-item :data="data" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      hum: 0,
      wind_dir: 0,
      wind_spd: 0,
      temp: 0,
      weather: '',
      vis:'',
      wind_deg:'',
      dates: new Date(),
      month: this.$store.state.month,
      hourData:[],
      weatherData: [],
      curIndex: 1
    }
  },
  computed: {
    date() {
      return this.month[parseInt(this.dates.getMonth())] + ' ' + this.dates.getDate() + ' ,' + this.dates.getFullYear()
    },
    curMonth() {
      return this.month[parseInt(this.dates.getMonth())]
    }
    
  },
  mounted() {
    var _t = this
    console.log()
    var url = 'https://free-api.heweather.com/v5/now?city='+cip+'&key='+key+'&lang=en'
    
    _t.$http.get(url)
    .then(function (res) {
      _t.hum = res.body.HeWeather5[0].now.hum + '%'
      _t.wind_dir = res.body.HeWeather5[0].now.wind.dir
      _t.wind_deg = res.body.HeWeather5[0].now.wind.deg
      _t.wind_spd = res.body.HeWeather5[0].now.wind.spd + ' km/h'
      _t.vis = res.body.HeWeather5[0].now.vis + 'km'
      _t.weather = res.body.HeWeather5[0].now.cond.txt
      _t.temp = res.body.HeWeather5[0].now.tmp
      console.log(res.body.HeWeather5[0].now.tmp)
    })
    _t.switchHour()
    
  },
  methods: {
    switchWeek () {
      var _t = this
      _t.curIndex = 2
      let weekUrl = 'https://free-api.heweather.com/v5/forecast?city='+cip+'&key='+key+'&lang=en'
      _t.$http.get(weekUrl)
      .then(function (res) {
        if(res.ok === true){
          let wData = res.body.HeWeather5[0].daily_forecast
          _t.weatherData = []
          for(let i=0; i< wData.length; i++){
            let item = {
              'time': wData[i].date.replace('-','/'),
              'cond': wData[i].cond.txt_d,
              'tmp': wData[i].tmp.min+'~'+wData[i].tmp.max+'°C'
            }
          
            _t.weatherData.push(item)
          }
        }
      })
    },
    switchHour () {
      var _t = this
      _t.curIndex = 1
      var hourUrl = 'https://free-api.heweather.com/v5/hourly?city='+cip+'&key='+key+'&lang=en'
      _t.$http.get(hourUrl)
      .then(function (res) {
        if(res.ok === true){
          _t.hourData = res.body.HeWeather5[0].hourly_forecast
          _t.weatherData = []
          var hData = res.body.HeWeather5[0].hourly_forecast
          for(let i=0; i< hData.length; i++){
            let item = {
              'time': dateFormate(hData[i].date),
              'cond': hData[i].cond.txt,
              'tmp': hData[i].tmp+'°C'
            }
            _t.weatherData.push(item)
          }
        }
        
      })
    }
  }
}
function dateFormate(date) {
  let num = parseInt(date.split(' ')[1].split(':')[0])
  console.log(num < 12 ? num+':00 am' : (num-12)+':00 pm')
  return num < 12 ? num+':00 am' : (num-12)+':00 pm'
  //return (date.split(' ')[1])
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
    .cond-list {
      margin: 50px 0 60px;
      display: flex;  
    }
    .temp-list {
      margin-top: 50px;
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
        cursor: pointer;
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

