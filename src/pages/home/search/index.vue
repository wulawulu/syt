<template>
  <div class="search">
    <el-autocomplete
        clearable
        placeholder="请你输入医院名称"
        v-model="hsname"
        :trigger-on-focus="false"
        :fetch-suggestions="fetchData"
        @select="goDetail"
    />
    <el-button type="primary" size="default" :icon="Search">搜索</el-button>
  </div>
</template>

<script setup lang="ts">
import {Search} from '@element-plus/icons-vue';
import {ref} from "vue";
import {reqHospitalInfo} from "@/api/home";
import type {HospitalInfo} from "@/api/home/type.ts";
import {useRouter} from "vue-router";

let $router = useRouter();

let hsname = ref<string>('');

const fetchData = async (keyword: string, cd: any) => {
  let result: HospitalInfo = await reqHospitalInfo(keyword);
  let showData = result.data.map(item => {
    return {
      value: item.hosname,
      hoscode: item.hoscode,
    }
  });
  cd(showData);
}

const goDetail = (item:any) => {
  console.log(item)
  $router.push({path:'/hospital/register',query: {hoscode:item.hoscode}})
};
</script>

<style scoped lang="scss">
.search {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;

  ::v-deep(.el-input__wrapper) {
    width: 600px;
    margin-right: 10px;
  }
}
</style>