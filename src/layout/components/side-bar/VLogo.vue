<template>
  <div class="logo">
    <img class="logo-img" src="../../../assets/img/logo.png">
    <img class="logo-world" src="../../../assets/img/logo-1.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'v-logo'
}
</script>

<style lang="scss" scoped>
.logo {
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  width: 260px;
  z-index: 10;
  background-color: #fff;
  padding: 0 20px;
  display: flex;
  align-items: center;
  .logo-img{
    width: 34px;
  }
  .logo-world{
    width: 65px;
    margin-left: 20px;
  }
}
</style>
