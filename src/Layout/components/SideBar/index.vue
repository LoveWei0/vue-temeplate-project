<!--
* new page
* @author:loveWei0
* @since:2023-11-20
* index.vue
-->
<template>
  <div class="sidebar">
    <router-link to="/home">
      <div class="logo-container">
        <el-avatar shape="square" :size="logoHeight"></el-avatar>
        <h1 class="logo-title" v-if="props.sidebarOpened">
          {{ title }}
        </h1>
      </div>
    </router-link>
    <el-scrollbar>
      <el-menu
        class="sidebar-container-menu"
        mode="vertical"
        :default-active="activeMenu"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#fff"
        :collapse="!props.sidebarOpened"
        :collapse-transition="true"
        :unique-opened="true"
        router
      >
        <SideBarItem
          v-for="route in menuRoutes"
          :key="route.path"
          :route="route"
          :basePath="route.path"
        ></SideBarItem>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
// components
import SideBarItem from './SideBarItem.vue'
const logoHeight = 44
const title = ref('admin-web')
const props = defineProps({
  sidebarOpened: {
    type: Boolean,
    default: false
  }
})
const route = useRoute()
const activeMenu = computed(() => {
  return route.path
})
import { routes } from '../../../router/index'
const menuRoutes = computed(() => routes)
</script>

<style scoped lang="scss">
.logo-container {
  height: v-bind(logoHeight) + 'px';
  padding: 10px 0 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
  ::v-deep(el-menu) {
    border-right: none !important;
  }
}
</style>
