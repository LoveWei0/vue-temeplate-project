<template>
  <div class="simple-upload-container">
    <div class="total-progress">
      <div class="btns">
        <el-button-group>
          <el-button :icon="Pointer">
            <i class="el-icon-upload2 el-icon--left" size="mini"></i>选择文件
            <!-- <el-input v-model="input" placeholder="Please input" /> -->
          </el-button>
          <el-button :icon="UploadFilled"
            ><i class="el-icon-upload el-icon--left" size="mini"></i
            >上传</el-button
          >
          <el-button :icon="Bell"
            ><i class="el-icon-video-pause el-icon--left" size="mini"></i
            >暂停</el-button
          >
          <el-button :icon="Open"
            ><i class="el-icon-video-play el-icon--left" size="mini"></i
            >恢复</el-button
          >
          <el-button :icon="Delete"
            ><i class="el-icon-video-play el-icon--left" size="mini"></i
            >清空</el-button
          >
        </el-button-group>
        <slot name="header"></slot>
      </div>
    </div>
    <!-- <div class="upload-tip">
          <i></i>
          只能上传:ooo
        </div> -->
  </div>
  <!-- 文件列表 -->
  <div class="file-list">
    <el-collapse accordion>
      <el-collapse-item>
        <template slot="title">
          <div class="progress-box">
            <div class="list-item">
              <div class="item-name">
                <span>名称:</span>
              </div>
              <div class="item-name">
                <span>大小:</span>
              </div>
              <div class="item-name">
                <span>文件进度:</span>
              </div>
            </div>
          </div>
        </template>
        <div class="item-chunk-box">
          <el-table border max-height="300">
            <el-table-column prop="index" label="#" align="center" />
            <el-table-column
              prop="hash"
              label="切片md5"
              align="center"
              show-overflow-tooltip
            />
            <el-table-column
              label="大小"
              align="center"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="uploaded"
              label="是否完成"
              align="center"
            ></el-table-column>
            <el-table-column label="进度" align="center"></el-table-column>
          </el-table>
        </div>
      </el-collapse-item>
    </el-collapse>
    <slot name="tip"></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  UploadFilled,
  Pointer,
  Delete,
  Open,
  Bell
} from '@element-plus/icons-vue'
const input = ref('')
</script>

<style scoped lang="scss">
.simple-upload-container {
  width: 100%;
  border: 1px solid #d2d2d2;
  border-radius: 4px;
  background-color: #fff;
  padding-bottom: 15px;
  padding: 10px;
  .progress-box {
    width: 100%;
  }
  .total-progress {
    margin-bottom: 15px;
    .btns {
      position: relative;
      .select-file-input {
        position: absolute;
        display: inline-block;
        left: 0;
        top: 0;
        border: none;
        opacity: 0;
        width: 96px;
        height: 28px;
      }
    }
  }

  .file-list {
    .list-item {
      padding: 8px 10px;
      display: flex;
      justify-content: center;
      justify-items: center;
      line-height: 25px;
      position: relative;
      &:hover .item-chunk-box {
        display: block;
      }
      div {
        flex: 1;
        margin-top: 6px;
      }
      .item-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-right: 6px;
        .svg-icon {
          font-size: 22px;
          vertical-align: sub;
        }
      }
      .item-status {
        flex: 0 0 10%;
        text-align: center;
        text-align: left;
        .el-icon-circle-check {
          color: #67c23a;
        }
        .el-icon-circle-close {
          color: #f00;
        }
      }
      .item-chunk-box {
        display: none;
        transition: all 3s;
        position: absolute;
        top: 0;
        left: 40px;
        z-index: 10;
      }
      .item-progress {
        flex: 0 0 60%;
      }
    }
  }

  .upload-tip {
    font-size: 12px;
    color: #606266;
    margin-top: 7px;
  }

  .el-progress {
    width: 80%;
    display: inline-block;
  }
}
</style>
