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
        <!-- 右边内容区域 -->
        <div class="main-container">
          <!-- 头部 -->
          <div class="fixed-header">
            <AppHeader />
          </div>
          <!-- 内容区域 -->
          <!-- <el-scrollbar> <AppMain /></el-scrollbar> -->
        </div>
      </div>
    </template>
  </el-config-provider>
</template>

<script setup>
import { RouterView } from 'vue-router'
// components
import SideBar from './components/SideBar/index.vue'
import AppHeader from './components/AppHeader/index.vue'
// import AppMain from './components/AppMain/index.vue'
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

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - 210px);
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 64px);
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
.main-container {
  height: 100%;
  transition: margin-left 0.28s;
  margin-left: 210px;
  position: relative;
}
</style>
