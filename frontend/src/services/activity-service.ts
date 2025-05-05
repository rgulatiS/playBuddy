import axios, {AxiosResponse} from "axios";
import {IActivity} from "../interface/IActivity";

// export function activityService(){
//     axios.get("/activity/all").then().catch()
// }

export function getAllActivities(): Promise<AxiosResponse<IActivity[]>> {
    return axios.get("http://localhost:1234/activity/all");
}
