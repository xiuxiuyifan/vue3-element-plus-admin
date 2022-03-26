<template>
  <el-form ref="form" :model="ruleForm" :rules="rules" class="account-login">
    <el-form-item label="" prop="account">
      <el-input placeholder="请输入账号" v-model="ruleForm.account" clearable class="input-class" />
    </el-form-item>
    <el-form-item label="" prop="password">
      <el-input
        placeholder="请输入密码"
        show-password
        v-model="ruleForm.password"
        clearable
        class="input-class"
      />
    </el-form-item>
    <div class="forget-password">忘记密码</div>
  </el-form>
</template>
<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'account-login',
  setup() {
    const store = useStore()
    const ruleForm = reactive({
      account: 'admin',
      password: '123456'
    })
    const rules = {
      account: { required: true, message: '请输入账号！' },
      password: { required: true, message: '请输入密码！' }
    }
    const form = ref<InstanceType<typeof ElForm>>()
    const handleAccountLogin = () => {
      form.value?.validate(async (valid) => {
        if (valid) {
          await store.dispatch('login/accountLoginAction', {
            account: ruleForm.account,
            password: ruleForm.password
          })
        }
      })
    }
    return {
      ruleForm,
      rules,
      form,
      handleAccountLogin
    }
  }
})
</script>
<style lang="less" scoped>
.account-login {
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
