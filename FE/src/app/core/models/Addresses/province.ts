import { District } from "./district";

export interface Province {
    name: string;
    code: number,
    division_type: string,
    codename: string,
    phone_code: number,
    districts: District[],
}