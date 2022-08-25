<template>
  <div id="app">
    <keep-alive
      :include="cacheComponentNames"
      :exclude="notCacheComponentNames"
    >
      <router-view class="main-view" />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      // 需要缓存的组件name
      cacheComponentNames: '',
      // 不需要缓存的组件name
      notCacheComponentNames: ''
    }
  }
}
</script>

<style>
#app {
  height: 100vh;
  width: 100vw;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
  .main-view{
    height: 100vh;
    width: 100vw;
  }
</style>
