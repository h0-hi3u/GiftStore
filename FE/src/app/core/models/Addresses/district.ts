import { Ward } from "./ward";

export interface District {
    name: string,
    code: number,
    division_type: string,
    codename: string,
    province_code: number,
    wards: Ward[]
}