<!--
* new page
* @author:loveWei0
* @since:2023-11-20
* index.vue
-->
<template>
  <el-config-provider>
    <template v-if="$route.meta.isNotLayout">
      <RouterView />
    </template>
    <template v-else>
      <div class="app-wrapper">
        <!-- 左边导航 -->
        <SideBar />
      </div>
    </template>
  </el-config-provider>
</template>

<script setup>
import { RouterView } from 'vue-router'
// components
import SideBar from './components/SideBar/index.vue'
</script>

<style scoped lang="scss">
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  &:after {
    content: '';
    display: table;
    clear: both;
  }
}
</style>
