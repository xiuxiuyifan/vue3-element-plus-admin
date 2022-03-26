<template>
  <div>
    <el-form-item label="姓名" v-for="(formItem, index) in formOptions" :key="index">
      <el-input placeholder="请输入" :style="{ width: formItem.width + 'px' }"></el-input>
      <el-select>
        <el-options></el-options>
      </el-select>
    </el-form-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'

interface IRules {
  [propName: string]: Array<
    | {
        required: boolean
        message: string
        trigger: 'blur' | 'change'
      }
    | {
        min: number
        max: number
        trigger: 'blur' | 'change'
      }
  >
}

// 把常用的抽离出来， 不常用的放到attrs里面
interface IFormOptions {
  label: string // label文字
  prop: string // 字段名
  element: string // 组件名
  initValue: string | Array<string | number | any> // 初始值有可能是数组
  placeholder: string
  rules: IRules
  width: number
  key: string
}

export default defineComponent({
  props: {
    formOptions: {
      type: Array as PropType<IFormOptions[]>
    }
  },
  setup() {
    const searchData = ref({})
    return { searchData }
  }
})
</script>
