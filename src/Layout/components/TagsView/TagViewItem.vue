<!--
* new page
* @author:loveWei0
* @since:2023-11-22
* TagViewItem.vue
-->
<template>
  <router-link
    :to="{ path: tag.path, query: tag.query }"
    style="flex: none"
    class="tags-view-item"
    :class="isActive(tag)"
    ref="currentRouterRef"
  >
    <el-dropdown
      trigger="contextmenu"
      @command="command => handleTagCommand(command, tag)"
    >
      <span style="line-height: 26px">{{ tag.meta.title }}</span>
      <span
        class="el-icon-close"
        v-if="!isAffix(tag)"
        @click.prevent.stop="closeSelectedTag(tag)"
      ></span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
          <el-dropdown-item command="other">关闭其他</el-dropdown-item>
          <el-dropdown-item command="self" v-if="!tag.meta || !tag.meta.affix"
            >关闭</el-dropdown-item
          >
          <el-dropdown-item command="refresh">刷新</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-icon class="icon-close" v-if="!isAffix(tag)">
      <CloseBold @click.prevent.stop="closeSelectedTag(tag)" />
    </el-icon>
  </router-link>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { CloseBold } from '@element-plus/icons-vue'
import { ref } from 'vue'
const currentRouterRef = ref(null)
const props = defineProps({
  tag: {
    type: Object,
    required: true
  }
})
const route = useRoute()
const isActive = tag => {
  console.log(tag.meta.affix)
  return tag.path === route.path
}
const isAffix = tag => {
  return tag.meta && tag.meta.affix
}
// 右键菜单的时候
const handleTagCommand = (command, view) => {
  switch (command) {
    case 'all':
      handleCloseAllTag(view)
      break
    case 'other':
      handleCloseOtherTag(view)
      break
    case 'self':
      closeSelectedTag(view)
      break
    case 'refresh':
      refreshSelectedTag(view)
      break
  }
}
// 关闭当前
const closeSelectedTag = view => {
  tagsViewStore.delView(view)
  if (isActive(view)) {
    toLastView(tagsViewStore.visitedViews, view)
  }
}
// 刷新
const refreshSelectedTag = async view => {
  tagsViewStore.delCachedView(view)
  router.go(0)
}
import { useTagsViewStore } from '../../../store/tagsView'
import router from '../../../router'
const tagsViewStore = useTagsViewStore()
// 关闭全部的
const handleCloseAllTag = view => {
  tagsViewStore.delAllView()
  toLastView(tagsViewStore.visitedViews, view)
}
// 关闭其他
const handleCloseOtherTag = view => {
  if (!view) return
  tagsViewStore.delOthersViews(view)
  if (!isActive(view)) {
    if (view && view.path) {
      router.push(view.path)
    }
  }
}

const toLastView = (visitedViews, view) => {
  const lastView = visitedViews[visitedViews.length - 1]
  if (lastView) {
    router.push(lastView.path)
  } else {
    if (view.name === 'home') {
      router.push({ path: view.path })
    } else {
      router.push('/')
    }
  }
}
</script>

<style scoped lang="scss">
.tags-view-item {
  display: inline-block;
  line-height: 26px;
  border: 1px solid #d8dce5;
  background: #fff;
  color: #495060;
  padding: 0 8px;
  box-sizing: border-box;
  font-size: 12px;
  margin-left: 5px;
  &.active {
    background-color: #304156;
    color: #fff;
    border-color: #304156;

    .el-dropdown {
      color: #fff;
    }
    &::before {
      position: relative;
      display: inline-block;
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-right: 5px;
      background: #fff;
    }
  }
}
span {
  vertical-align: middle;
}
.icon-close {
  width: 16px;
  height: 16px;
  vertical-align: middle;
  position: relative;
  left: 2px;
  border-radius: 50%;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transform-origin: 100% 50%;
  &:before {
    transform: scale(0.6);
    display: inline-block;
    vertical-align: -1px;
  }
  &:hover {
    background-color: #b4bccc;
    color: #fff;
  }
}
</style>
