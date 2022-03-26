<template>
  <el-form ref="form" :model="ruleForm" status-icon :rules="rules" class="phone-login">
    <el-form-item label="" prop="account">
      <el-input
        placeholder="请输入手机号"
        v-model="ruleForm.account"
        clearable
        class="input-class"
      />
    </el-form-item>
    <el-form-item label="" prop="password">
      <el-input
        placeholder="请输入验证码"
        v-model="ruleForm.password"
        clearable
        class="input-class"
      />
    </el-form-item>
    <div class="forget-password">忘记密码</div>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
const name = 'account-login'
const ruleForm = reactive({
  account: '',
  password: ''
})
const rules = ref({
  account: { required: true, message: '请输入账号！' },
  password: { required: true, message: '请输入密码！' }
})
</script>
<style lang="less" scoped>
.phone-login {
  ::v-deep(.el-form-item--small.el-form-item) {
    margin-bottom: 20px;
  }
  .input-class {
    ::v-deep(.el-input__inner) {
      border-radius: 5px;
      height: 55px;
      line-height: 55px;
      border: solid 1px #dedede;
    }
    ::v-deep(.el-input__icon) {
      line-height: 55px;
    }
  }
  .forget-password {
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0.2px;
    color: #666666;
    text-align: right;
    margin-bottom: 44px;
  }
}
</style>
