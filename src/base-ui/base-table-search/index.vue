<template>
  <div class="base-table-search">
    <el-form v-bind="$attrs" :inline="true" :model="searchData" label-width="90px"> </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
    <div class="demo-pagination-block">
      <el-pagination
        v-model:currentPage="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
// interface IColumns {
//   type:
// }
// 设计的时候上面的 form 和 table传入参数分开传递。
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  name: 'base-table-search',
  props: {
    // columns: {
    //   type:
    // }
  },
  setup(ctx, props) {
    const searchData = reactive({
      name: ''
    })

    const tableData = [
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }
    ]

    const currentPage = ref(1)
    const handleSizeChange = (val: number) => {
      console.log(`${val} items per page`)
    }
    const handleCurrentChange = (val: number) => {
      console.log(`current page: ${val}`)
    }
    return {
      searchData,
      tableData,
      handleSizeChange,
      handleCurrentChange,
      currentPage
    }
  }
})
</script>
<style lang="less" scoped>
.base-table-search {
  background: #fff;
}
</style>
