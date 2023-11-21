<!--
* new page
* @author:loveWei0
* @since:2023-11-21
* SideBarItem.vue
-->
<template>
  <el-sub-menu
    :index="route.path ? route.path : ''"
    :style="{ width: !props.sidebarOpened ? '210px' : '64px' }"
    v-if="route.children?.length && !route.meta?.hidden"
  >
    <template #title>
      <span>{{ route.meta?.title }}</span>
    </template>
    <SideBarItem
      v-for="item in route.children"
      :key="item.path"
      :route="item"
      :basePath="item.path"
    >
    </SideBarItem>
  </el-sub-menu>
  <template v-else>
    <template v-if="!route.meta?.hidden">
      <el-menu-item
        :index="route.path ? route.path : ''"
        :style="{
          width: !props.sidebarOpened ? '210px' : '64px',
          display: 'block',
          background: '#304156'
        }"
      >
        <template #title>
          <span>
            {{ route.meta?.title }}
          </span>
        </template>
      </el-menu-item>
    </template>
  </template>
</template>

<script setup>
const props = defineProps({
  route: {
    type: Object,
    default: () => {},
    required: true
  },
  basePath: {
    type: String,
    required: true
  },
  sidebarOpened: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped></style>
