<template>
  <div class="level">
    <h1>医院</h1>
    <div class="content">
      <div class="left">等级:</div>
      <ul class="hospital">
        <li :class="{active:activeFlag==''}" @click="changeLevel('')">全部</li>
        <li v-for="level in levelArr" :key="level.value" :class="{active:activeFlag==level.value}"
            @click="changeLevel(level.value)">{{ level.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">

import {onMounted, ref} from "vue";
import {reqHospitalLevelAndRegion} from "@/api/home";
import type {HospitalLevelAndRegionArr, HospitalLevelAndRegionResponseData} from "@/api/home/type.ts";

let levelArr = ref<HospitalLevelAndRegionArr>([]);
let activeFlag = ref<string>('');
onMounted(() => {
  getLevel()
})
const getLevel = async () => {
  let result: HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion('HosType');
  if (result.code == 200) {
    levelArr.value = result.data;
  }
}
const changeLevel = (level: string) => {
  activeFlag.value = level;
  $emit('getLevel', level);
};

let $emit = defineEmits(['getLevel']);
</script>
<style scoped lang="scss">
.level {
  color: #7f7f7f;

  h1 {
    font-weight: 900;
    margin: 10px 0;
  }

  .content {
    display: flex;

    .left {
      margin-right: 10px;
    }

    .hospital {
      display: flex;

      li {
        margin-right: 10px;

        &.active {
          color: #55a6fe;
        }
      }

      li:hover {
        color: #55a6fe;
        cursor: pointer;
      }
    }
  }
}
</style>