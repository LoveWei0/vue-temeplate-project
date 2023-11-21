<!--
* new page
* @author:loveWei0
* @since:2023-11-21
* index.vue
-->
<template>
  <div class="navbar">
    <!-- 左侧折叠 -->
    <Hamburger class="hamburger-container" />
  </div>
</template>

<script setup>
import Hamburger from './components/Hamburger.vue'
</script>

<style scoped lang="scss">
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.5s;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
