<template>
  <div id="app">
    <div class="mater-upload-container">
      <Simple>
        <div slot="tip" class="upload-tip">
          <i class="el-icon-info"></i>: 只能上传：
        </div>
      </Simple>
    </div>
  </div>
</template>

<script setup lang="ts">
import Simple from './views/simple.vue'
</script>

<style scoped lang="scss"></style>
