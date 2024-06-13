import {defineStore} from "pinia";
import {reqHospitalDetail} from "@/api/hospital";
import type {HospitalDetail} from "@/api/hospital/type.ts";
import {DetailState} from "@/store/modules/interface";

let useDetailStore = defineStore('Detail', {
    state():DetailState {
        return {
            hospitalInfo: ({} as HospitalDetail)
        }
    },
    actions: {
        async getHospital(hoscode: string) {
            let result: HospitalDetail = await reqHospitalDetail(hoscode);
            if (result.code == 200) {
                this.hospitalInfo = result.data;
            }
        },
    },
    getters: {}
});

export default useDetailStore;