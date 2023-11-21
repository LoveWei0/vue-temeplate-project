<!--
* new page
* @author:loveWei0
* @since:2023-11-21
* Hamburger.vue
-->
<template>
  <div class="hamburger-container" id="guide-hamburger" @click="toggleClick">
    <SvgIcon
      :icon="appStore.sidebarOpened ? 'hamburger-opened' : 'hamburger-closed'"
    ></SvgIcon>
  </div>
</template>

<script setup>
import { useAppStore } from '../../../../store/app'
const appStore = useAppStore()
// 点击切换
const toggleClick = () => {
  appStore.toggleSidebar()
}
</script>

<style scoped lang="scss">
.hamburger-container {
  padding: 0 16px;
  ::v-deep(.svg-icon) {
    font-size: 25px;
    margin-top: 13px;
  }
}
</style>
