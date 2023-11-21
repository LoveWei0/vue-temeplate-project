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
      <div
        class="app-wrapper"
        :class="[appStore.sidebarOpened ? 'openSidebar' : 'hideSidebar']"
      >
        <!-- 左边导航 -->
        <SideBar
          class="sidebar-container"
          :sidebarOpened="appStore.sidebarOpened"
        />
      </div>
    </template>
  </el-config-provider>
</template>

<script setup>
import { RouterView } from 'vue-router'
// components
import SideBar from './components/SideBar/index.vue'
// pinia
import { useAppStore } from '../store/app'
const appStore = useAppStore()
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
.hideSidebar {
  .sidebar-container {
    width: 64px !important;
  }
  .main-container {
    margin-left: 64px;
  }
}
.sidebar-container {
  background-color: #304156;
  width: 210px !important;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}
</style>
