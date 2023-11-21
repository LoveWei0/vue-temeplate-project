<!--
* new page
* @author:loveWei0
* @since:2023-11-21
* Breadcrumb.vue
-->
<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbData"
        :key="item.path"
      >
        <!-- 不可点击 -->
        <span v-if="index === breadcrumbData.length - 1" class="no-redirect">{{
          item.meta.title
        }}</span>
        <!-- 可以点击 -->
        <a v-else class="redirect">
          {{ item.meta.title }}
        </a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { ref, watch } from 'vue'
const breadcrumbData = ref([])
import { useRoute } from 'vue-router'
const route = useRoute()
const getBreadcrumbData = () => {
  breadcrumbData.value = route.matched
    .filter(item => item.meta && item.meta.title)
    .map(item => item)
  console.log(breadcrumbData.value)
}
watch(
  route,
  () => {
    getBreadcrumbData()
  },
  {
    immediate: true
  }
)
</script>

<style scoped lang="scss">
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  .redirect {
    color: #666;
    font-weight: 600;
  }
  .redirect:hover {
    color: #304156;
  }
  ::v-deep(.no-redirect) {
    color: #97a8be;
    cursor: text;
  }
}
</style>
