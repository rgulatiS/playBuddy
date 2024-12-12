export interface ICourt {
    "id": {
        "activityId": string
        }   ,
    "courtFeatures": string
}

export interface IFetchedCourt {
    "id": {
        "activityId": string,
        "facilityId": string
    }   ,
    "courtName": string,
    "courtFeatures": string
}