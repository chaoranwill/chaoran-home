<template>
  <div id="app">
    <!-- <hello></hello> -->
    <div class="main"  :class="{maintop: resList.length==0? false :true}">
      <transition name="searchOpen">
        <m-search-btn 
          v-if="!isSearch" 
          @click.native="() => isSearch=true"/>
      </transition>
      <transition name="search" >
        <m-search v-if="isSearch" :class="{hasRes: resList.length==0? false :true}">
          <input type="text" v-model="val" placeholder="Type to search">
          <div class="search">
            <m-search-btn @click.native="handleSearch" />
          </div>
        </m-search>
      </transition>
      <transition name="searchClose">
        <span v-if="isSearch" class="close"  @click="() => {isSearch=false; resList=[];}"></span>
      </transition>
      <div class="res-list">
        <a target="_blank" :href="'https://en.wikipedia.org/?curid='+item.index"  v-for="(item, index) in resList" :key="item.index">
          <m-list-item :result="item" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      isSearch: false,
      maintop: false,
      val: '',
      resList: []
    }
  },
  methods: {
    handleSearch () {
      var _t = this
      console.log(_t.val)
      var url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch='+_t.val+'&callback=JSON_CALLBACK'
      _t.$http.jsonp(url)
      .then(function (res) {
        console.log(res)
        _t.resList = res.body.query.pages
      })
    }
  }
}
</script>

<style lang="scss">
@import './assets/style/common';
.main {
  position: absolute;
  left: 50%;
  top: 48%;
  transform: translate(-50%, -50%);
  .m-search {
    width: 450px;
    height: 70px;
    position: relative;
    input {
      width: 100%;
      height: 100%;
      border: 0;
      background-color: rgba(0,0,0,0.5);
      border-radius: 50px;
      padding: 0px 70px 0 20px;
      color: #fff;
      font-size: 16px;
    }
    input::-webkit-input-placeholder {
      font-size: 18px;
    }
    .search {
      position: absolute;
      top: 8px;
      right: 10px;
      .m-search-btn {
        width: 54px;
        height: 54px;
        border-radius: 100%;
        .search-icon {
          transform: rotate(45deg);
        }
      }
    }
  }
  .hasRes {
    width: 670px;
  }
  .close {
    position: absolute;
    right: -50px;
    top: 26px;
    cursor: pointer;
    &:before {
      position: absolute;
      content: '';
      width: 5px;
      height: 25px;
      left: 10px;
      top: 0;
      background-color: #fff;
      border-radius: 2px;
      transform: rotate(45deg);
    }
    &::after {
      position: absolute;
      content: '';
      width: 5px;
      height: 25px;
      left: 10px;
      top: 0;
      background-color: #fff;
      border-radius: 2px;
      transform: rotate(135deg);
    }
  }
  .res-list {
    margin-top: 40px;
    overflow: auto;
  }
}
.maintop {
  top: 50px;
  transform: translateX(-50%);
}
.search-leave-active {
  transition: all .6s cubic-bezier(0.000, 0.105, 0.035, 1.570);
}
.search-enter-active {
  transition: all 1.5s cubic-bezier(0.000, 0.105, 0.035, 1.570);
  transition-delay: .3s;
}
.search-enter, .search-leave-active {
  height: 0;
  width: 0;
  opacity: 0;
}

.searchOpen-leave-active {
  transition: all 0s ease-out;
}
.searchOpen-enter-active {
  transition: all .8s cubic-bezier(0.000, 0.105, 0.035, 1.570);
  transition-delay: .7s;
}
.searchOpen-enter, .searchOpen-leave-active {
  height: 0;
  width: 0;
  opacity: 0;
}

.searchClose-leave-active {
  right: 20px;
  top: 26px;
  transform: rotate(45deg);
  transition: all .6s cubic-bezier(0.000, 0.105, 0.035, 1.570);
}
.searchClose-enter-active {
  right: 20px;
  top: 26px;
  //transform: rotate(135deg);
  transition: all .3s cubic-bezier(0.000, 0.105, 0.035, 1.570);
  transition-delay: .3s;
  
}
.searchClose-enter, .searchClose-leave-active {
  height: 0;
  width: 0;
  opacity: 0;
}
</style>
