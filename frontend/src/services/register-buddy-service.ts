import {IBuddy} from "../interface/IBuddy.ts";
import axios, {AxiosResponse} from 'axios';

export async function registerBuddyService(registerBuddy: IBuddy): Promise<AxiosResponse<IBuddy>> {
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

    //Access-Control-Allow-Origin: http://example.com
    //
    // Access-Control-Allow-Methods: POST, PUT, PATCH, GET, DELETE, OPTIONS
    //
    // Access-Control-Allow-Headers: Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization


    // res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    // res.header(
    //     'Access-Control-Allow-Headers',
    //     'Origin, X-Requested-With, Content-Type, Accept'
    // );
    return await axios.post("http://localhost:1234/buddy", registerBuddy, config);
}

export async function getBuddyByPhoneNumber(phoneNumber: String): Promise<AxiosResponse<IBuddy>> {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:1234',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization'
        }
    };
    return await axios.get("http://localhost:1234/buddy/phone/"+phoneNumber, config);
}