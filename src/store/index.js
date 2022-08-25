// 1.引入vuex中的一些配置文件
import Vue from 'vue' // 引入vue
import Vuex from 'vuex' // 引入vuex

// 2.引入各个模块
import getters from './getters'

Vue.use(Vuex)

// 创建仓库
const store = new Vuex.Store({
  modules: {},
  getters
})

// 暴露仓库
export default store
