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
    <!-- 面包屑 -->
    <Breadcrumb class="breadcrumb-container" />
    <!-- 右边菜单 -->
    <div class="right-menu">
      <ScreenFull class="right-menu-item hover-effect" />
    </div>
  </div>
</template>

<script setup>
import Hamburger from './components/Hamburger.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import ScreenFull from './components/ScreenFull.vue'
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
  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;
    ::v-deep(.right-menu-item) {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;
      line-height: 46px;
      &.hover-effect {
        cursor: pointer;
      }
    }
  }
}
</style>
