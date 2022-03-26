<template>
  <div class="login">
    <div class="login-content">
      <div class="left i-box">
        <img class="img-cs" src="../../../public/img/bg-left.png" alt="主题cms" />
      </div>
      <div class="right i-box">
        <div class="form-wrapper">
          <h1 class="word">欢迎登陆</h1>
          <div class="login-form">
            <div class="login-tab">
              <div
                class="tab-top"
                :class="activeKey === index ? 'active' : ''"
                v-for="(item, index) in tabList"
                :key="index"
                @click="handleTab(index)"
              >
                {{ item }}
              </div>
              <div class="sloid" :style="solidStyle"></div>
            </div>
            <account-login v-show="activeKey === 0" ref="accountLoginRef"></account-login>
            <phone-login v-show="activeKey === 1"></phone-login>
            <el-button class="sub-btn" type="primary" @click="handleLogin">登陆</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import AccountLogin from './cpns/account-login.vue'
import PhoneLogin from './cpns/phone-login.vue'
import useTabs from './hooks/use-tabs'

//定义一个组件的ref类型
let accountLoginRef = ref<InstanceType<typeof AccountLogin>>()
const handleLogin = () => {
  accountLoginRef.value?.handleAccountLogin()
}
const { solidStyle, activeKey, tabList, handleTab } = useTabs()
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url('../../assets/img/bg.png') no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-content {
    width: 1280px;
    height: 700px;
    background-color: #ffffff;
    border-radius: 10.83px;
    display: flex;
    padding: 60px 66px;
    .left {
      position: relative;
    }
    .i-box {
      width: 50%;
      .img-cs {
        width: 500px;
        height: 407px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .form-wrapper {
      width: 550px;
      height: 570px;
      background-color: #ffffff;
      box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
      border-radius: 0px;
      border: solid 1px #f5f5f5;
      .word {
        color: #333333;
        font-style: italic;
        font-size: 28px;
        text-align: center;
        margin: 50px 0 60px 0;
      }
      .login-form {
        width: 385px;
        margin: 0 auto;
        .login-tab {
          width: 281px;
          margin: 0 auto;
          display: flex;
          height: 45px;
          margin-bottom: 50px;
          justify-content: space-between;
          position: relative;
          .tab-top {
            &.active {
              color: @th_color;
            }
            font-size: 18px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0.2px;
            cursor: pointer;
          }
          .sloid {
            height: 3px;
            background: @th_color;
            width: 100px;
            position: absolute;
            left: 0;
            bottom: 0;
            transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
          }
        }
        .sub-btn {
          width: 100%;
          height: 50px;
          border-radius: 5px;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0.2px;
          color: #ffffff;
        }
      }
    }
  }
}
@media screen and(max-width: 1280px) {
  .login {
    .login-content {
      width: unset;
      .left {
        display: none;
      }
    }
  }
}

@media screen and(max-width: 700px) {
  .login {
    .login-content {
      width: 90%;
      padding: 0;
      height: unset;
      overflow: hidden;
      .i-box {
        width: 100%;
      }
      .left {
        display: none;
      }
      .form-wrapper {
        width: 100%;
        box-shadow: none;
        border: 0;
        height: unset;
        .login-form {
          width: 100%;
          padding: 0 20px;
          padding-bottom: 30px;
          .login-tab {
            width: 245px;
          }
        }
      }
    }
  }
}
</style>
