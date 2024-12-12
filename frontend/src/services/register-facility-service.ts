import {IRegisterBuddy} from "../interface/IRegisterBuddy";
import axios, {AxiosResponse} from 'axios';
import {RandomUUIDOptions} from "node:crypto";
import {IFacility} from "../interface/IFacility";
import {IActivity} from "../interface/IActivity";
import {ICourt} from "../interface/ICourt";

export async function registerFacilityService(registerFacility: IFacility): Promise<AxiosResponse<RandomUUIDOptions>> {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:1234',
            // 'Access-Control-Allow-Methods': ['POST', 'PUT', 'PATCH', 'GET', 'DELETE', 'OPTIONS'] ,
            'Access-Control-Allow-Methods': 'POST, PUT, PATCH, GET, DELETE, OPTIONS',
            // 'Access-Control-Allow-Headers': ['Origin', 'X-Api-Key', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
            'Access-Control-Allow-Headers': 'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization'
        }
    };

    return await axios.post("http://localhost:1234/facility", registerFacility, config);

}


export async function getFacilities(city: string): Promise<AxiosResponse<IFacility[]>> {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:1234',
            // 'Access-Control-Allow-Methods': ['POST', 'PUT', 'PATCH', 'GET', 'DELETE', 'OPTIONS'] ,
            'Access-Control-Allow-Methods': 'POST, PUT, PATCH, GET, DELETE, OPTIONS',
            // 'Access-Control-Allow-Headers': ['Origin', 'X-Api-Key', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
            'Access-Control-Allow-Headers': 'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization'
        }
    };

    return await axios.get("http://localhost:1234/facility/all/"+city, config);
}
