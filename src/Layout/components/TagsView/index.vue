<!--
* new page
* @author:loveWei0
* @since:2023-11-22
* index.vue
-->
<template>
  <div class="tags-view-container">
    <div class="tags-view-wrapper" style="width: unset; flex: none">
      <TagViewItem :tag="tagsViewStore.visitedViews[0]" />
    </div>
    <el-scrollbar style="height: revert; margin-right: 20px">
      <el-row type="flex" class="tags-view-wrapper" style="flex-wrap: nowrap">
        <template
          v-for="(tag, index) in tagsViewStore.visitedViews.slice(1)"
          :key="index"
        >
          <TagViewItem :tag="tag" />
        </template>
      </el-row>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTagsViewStore } from '../../../store/tagsView'
// components
import TagViewItem from './TagViewItem.vue'
const route = useRoute()
console.log(route.path)
const tagsViewStore = useTagsViewStore()
// 添加到状态机种
const addTags = () => {
  const { name } = route
  if (name) {
    tagsViewStore.addView(route)
  }
}

// 监听路由添加到状态机
watch(
  () => route.path,
  () => addTags(),
  { immediate: true }
)
</script>

<style scoped lang="scss">
.tags-view-container {
  width: 100%;
  height: 34px;
  background-color: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.12),
    0,
    0,
    3px 0 rgba(0, 0, 0, 0.04);
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: row;
  align-items: center;
  .tags-view-wrapper {
    width: 100%;
  }
}
</style>
