import {IAddress} from "./IAddress";

export interface IBuddyActivity {
    "activity": {"activityId": number},
    "selfDeclaredProficiency": string
}
export interface IRegisterFacility {
    "facilityName": string,
    // "registeredOn": "2024-11-10",
    "registeredOn": string,
    "facilityPocName": string,
    "facilityPocPhone": string,
    "facilityPocEmail": string,
    "facilityOwnerPhone": string,
    "facilityOwnerEmail": string,
    "facilityOwnerName": string,

    "active": boolean
    "facilityAddress": IAddress | null
    ,
    "courts": [] |  null
} ;

//{

//     "facilityActivityCourts": [],
//     "facilityPocPhone": "9900990099",
//     "facilityPocEmail": "rohit@gmail.com",
//     "facilityOwnerPhone": "9900990099",
//     "facilityOwnerEmail": "rohit@gmail.com",
//     "facilityOwnerName": null,
//     "registeredOn": "2024-11-10",
//     "active": false
// }