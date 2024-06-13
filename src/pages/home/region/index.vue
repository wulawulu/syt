<template>
  <div class="region">
    <div class="content">
      <div class="left">地区:</div>
      <ul class="hospital">
        <li :class="{active:activeFlag==''}" @click="changeRegion('')">全部</li>
        <li v-for="region in regionArr" :key="region.value" :class="{active:activeFlag==region.value}"
            @click="changeRegion(region.value)">{{ region.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {reqHospitalLevelAndRegion} from "@/api/home";
import type {HospitalLevelAndRegionArr, HospitalLevelAndRegionResponseData} from "@/api/home/type.ts";

let regionArr = ref<HospitalLevelAndRegionArr>([]);
let activeFlag = ref<string>('');
onMounted(() => {
  getRegion()
})
const getRegion = async () => {
  let result: HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion('Beijin');
  if (result.code == 200) {
    regionArr.value = result.data;
  }
}

const changeRegion = (region: string) => {
  activeFlag.value = region;
  $emit('getRegion', region);
};

let $emit = defineEmits(['getRegion']);
</script>

<style scoped lang="scss">
.region{
  color: #7f7f7f;
  margin-top: 10px;
  .content{
    display: flex;
    .left{
      margin-right: 10px;
      width: 50px;
    }
    ul{
      display: flex;
      flex-wrap: wrap;
      li{
        margin-right: 5px;
        margin-bottom: 10px;
        &.active{
          color: #55a6fe;
        }
      }
      li:hover{
        color: #55a6fe;
        cursor: pointer;
      }
    }
  }
}
</style>