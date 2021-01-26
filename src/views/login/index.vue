<template>
  <div class="login">
    <main class="container">
      <div class="left item ib"></div>
      <div class="right item ib">
        <el-form
            class="demo-ruleForm"
            label-position="top"
            label-width="100px"
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
        >
          <el-form-item label="用户名/邮箱" prop="account">
            <el-input
                autocomplete="off"
                placeholder="用户名admin"
                clearable
                v-model="ruleForm.account"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
                autocomplete="off"
                placeholder="密码123456"
                type="password"
                clearable
                v-model="ruleForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="checked">记住密码</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="loginHandle" :loading="loading" round class="login-btn"><span class="login-world">登录</span></el-button>
          </el-form-item>
        </el-form>
      </div>
    </main>
  </div>
</template>
<script lang="ts">
import {useRouter} from "vue-router";
import {useStore} from "vuex"
import {ref} from "vue"

export default {

  //由于写的时候element-plus 的form 有bug 所以只能这样样子  有相同的issues
  // https://github.com/element-plus/element-plus/issues/1176
  data() {
    return {
      ruleForm: {
        account: "admin",
        password: "123456"
      }
    }
  },
  setup() {
    const router = useRouter()
    const store = useStore()

    const checked = ref(true)
    const rules = {
      account: [
        { required: true, message: "请输入用户名" }
      ],
      password: [
        { required: true, message: "请输入密码" }
      ]
    };
    const login :any = () => store.dispatch('login')
    let loading = ref<boolean>(false)
    const loginHandle = async () => {
      //调用登录接口
      loading.value = true
      await login()
      loading.value = false
      router.push('/dashboard')
    }
    return {
      loginHandle,
      rules,
      checked,
      loading
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: #161616;

  .container {
    width: 1105px;
    height: 700px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);

    .zhe {
      width: 150px;
      height: 150px;
      border-radius: 75px;
    }

    .item {
      width: 50%;
      height: 100%;
    }

    .left {
      background: url("../../assets/img/login-bg.png") no-repeat;
      background-size: 100% 100%;
    }

    .right {
      background-color: #fff;
      padding: 154px 64px 120px 90px;

      .label-title {
        color: #b1b1b1;
        font-size: 15px;
        margin-top: 18px;
      }

      .input-c {
        color: #1a1a1a;
        outline: none;
        border: 0;
        border-bottom: 1px solid #949494;
        width: 100%;
        margin-top: 10px;
        height: 36px;
        line-height: 36px;
      }

      .qrcode-qrapper {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        .input-qrcode {
          width: 185px;
        }

        .change-qrcode {
          width: 178px;
          height: 36px;
          background: #383838;
          color: #ffffff;
          line-height: 36px;
          text-align: center;
          letter-spacing: 4px;
          font-size: 14px;
        }
      }

      .pwd {
        text-align: right;
        margin-top: 66px;
        font-size: 15px;
        color: #b1b1b1;
      }

      .login-btn {
        font-size: 14px;
        text-align: center;
        margin-top: 54px;
        cursor: pointer;
        width: 100%;
        .login-world{
          letter-spacing: 6px;
        }
      }
    }
  }
}
</style>
