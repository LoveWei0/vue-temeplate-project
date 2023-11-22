<!--
* new page
* @author:loveWei0
* @since:2023-11-22
* ScreenFull.vue
-->
<template>
  <div id="guide-full" @click="onToggle">
    <SvgIcon :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"></SvgIcon>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import screenfull from 'screenfull'
// 是否全屏
const isFullscreen = ref(false)
// 监听事件
const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}
// 切换事件
const onToggle = () => {
  screenfull.toggle()
}
// 设置侦听器
onMounted(() => {
  screenfull.on('change', change)
})
// 删除侦听器
onUnmounted(() => {
  screenfull.off('change', change)
})
</script>

<style scoped></style>
