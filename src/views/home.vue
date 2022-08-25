<template>
  <div class="home-main">
    这是一个首页
    <digit-signature />
  </div>
</template>
<script>
  export default {
    name: 'Home',
    components: {
      DigitSignature: () => import('@/components/DigitSignature')
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>
<style lang="scss" scoped>
  .home-main {
    height: 100vh;
    background: lightskyblue;
  }
</style>
