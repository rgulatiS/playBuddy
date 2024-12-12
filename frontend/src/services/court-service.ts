import {IActivity} from "../interface/IActivity";
import axios, {AxiosResponse} from "axios";
import {ICourt} from "../interface/ICourt";

export async function getCourts(activities  : IActivity[] | null): Promise<AxiosResponse<ICourt[]>> {
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

    return await axios.post("http://localhost:1234/court/all",activities, config);
}