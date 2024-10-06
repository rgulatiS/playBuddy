import axios from "axios";

// export function activityService(){
//     axios.get("/activity/all").then().catch()
// }

export  function  getAllActivities(){
    return  axios.get("/activity/all");
}
