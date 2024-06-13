<template>
  <div>
    <!--首页轮播图的结构-->
    <Carousel/>
    <!--首页搜索医院的表单区域-->
    <Search></Search>
    <!--底部展示医院的结构-->
    <el-row gutter="20">
      <el-col :span="20">
        <Level @getLevel="getLevel"/>
        <Region @getRegion="getRegion"/>
        <div class="hospital" v-if="hasHospitalArr.length>0">
          <Card class="item" v-for="(item,index) in hasHospitalArr" :key="index" :hospitalInfo="item"/>
        </div>
        <el-empty v-else description="暂无数据" />

        <!-- 分页器 -->
        <el-pagination
            v-model:current-page="pageNo"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]"
            :background="true"
            layout="prev, pager, next,jumper,->,sizes , total "
            :total="total"
            @current-change="currentChange"
            @size-change="sizeChange"
        />
      </el-col>
      <el-col :span="4">
        <tip></tip>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import {reqHospital} from '@/api/home'
import Carousel from './carousel/index.vue'
import Search from './search/index.vue'
import Level from './level/index.vue'
import Region from './region/index.vue'
import Card from './card/index.vue'
import Tip from './tip/index.vue'
import type {Content, HospitalResponseData} from '@/api/home/type'
// 分页器需要的数据
import {ref, onMounted} from 'vue'
// 分页器页码
let pageNo = ref<number>(1);
//一页展示几条数据
let pageSize = ref<number>(10);
let total = ref<number>(0);
let hasHospitalArr = ref<Content>([]);
let hostype = ref<string>('');
let districtCode = ref<string>('');

onMounted(() => {
  getHospitalInfo();
})

const getHospitalInfo = async () => {
  let result: HospitalResponseData = await reqHospital(pageNo.value, pageSize.value, hostype.value, districtCode.value);
  if (result.code == 200) {
    hasHospitalArr.value = result.data.content;
    total.value = result.data.totalElements;
  }
};

const currentChange = () => {
  getHospitalInfo()
};

const sizeChange = () => {
  getHospitalInfo()
};

const getLevel = (level: string) => {
  hostype.value = level;
  getHospitalInfo();
}

const getRegion = (region: string) => {
  districtCode.value = region;
  getHospitalInfo();
}
</script>

<style scoped lang="scss">
.hospital {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .item {
    width: 48%;
    margin: 10px 0;
  }
}
</style>