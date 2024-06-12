import request from '@/utils/request'
import type {HospitalResponseData} from './type.ts'

enum API {
    HOSPITAL_URL = '/hosp/hospital/'
}

export const reqHospital =
    (page: number, limit: number) => request.get<HospitalResponseData>(API.HOSPITAL_URL + `${page}/${limit}`)