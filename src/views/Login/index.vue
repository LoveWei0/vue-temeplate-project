<!--
* new page
* @author:loveWei0
* @since:2023-11-20
* index.vue
-->
<template>
  <div class="login-container">
    <div class="login-panel">
      <div class="login-logo"></div>
      <div class="login-form">
        <el-form>
          <div class="title-container">
            <h3 class="title">管理系统</h3>
          </div>
          <div class="input-row">
            <i class="icon icon-user"></i>
            <el-form-item>
              <el-input placeholder="请输入用户名" name="username" type="text" />
            </el-form-item>
          </div>
          <div class="input-row">
            <i class="icon icon-password"></i>
            <el-form-item>
              <el-input placeholder="请输入密码" name="password" />
            </el-form-item>
          </div>
          <el-button type="primary"
            style="width: 100%; margin-bottom: 30px; margin-top: 30px; height: 40px;">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.login-container {
  background-image: url('../../assets/images/bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .login-panel {
    max-width: 1000px;
    margin: 0 auto;
    background: #fff;
    box-shadow: 0 4px 8px 1px rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 92%;
    height: auto;
    display: flex;
    flex-direction: row;

    .login-logo {
      background-image: url('../../assets/images/ad.png');
      background-repeat: no-repeat;
      background-size: cover;
      flex-basis: 60%;
    }

    .login-form {
      padding: 30px 20px;
      flex-basis: 40%;
      box-sizing: border-box;

      .title {
        font-size: 26px;
        color: #409eff;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }

      .input-row {
        width: 100%;
        border-bottom: 1px solid #ccc;
        background: #fff;
        margin-bottom: 8px;
        margin-top: 20px;
        display: flex;
        align-items: center;
      }

      .icon {
        width: 20px;
        height: 20px;
        display: block;
        border: none;
        background-size: 20px;
        background-repeat: no-repeat;
        margin-right: 10px;

        &.icon-user {
          background-image: url('../../assets/images/icon-user.png');
        }

        &.icon-password {
          background-image: url('../../assets/images/icon-password.png');
        }
      }

      ::v-deep {
        .el-input {
          width: 95%;
          border: none;
        }

        .el-form-item {
          width: 100%;
          margin-bottom: 0 !important;
        }

        .el-input__wrapper {
          border: none;
          box-shadow: none;
        }
      }
    }
  }
}
</style>