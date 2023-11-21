<!--
* new page
* @author:loveWei0
* @since:2023-11-21
* index.vue
-->
<template>
  <div class="app-main">
    <router-view v-slot="{ Component }">
      <keep-alive :max="10" :include="includes">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { computed } from 'vue'
import { useTagsViewStore } from '../../../store/tagsView'
const tagsViewStore = useTagsViewStore()
const includes = computed(() => tagsViewStore.cachedViews)
</script>

<style scoped lang="scss">
.app-main {
  padding: 104px 20px 20px 20px;
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #f2f3f5;
  box-sizing: border-box;
}
</style>
