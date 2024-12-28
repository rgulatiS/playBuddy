export interface ICourt {
    "id": {
        "activityId": string,
         "facilityId": string  | undefined
    }   ,
    "courtName": string | undefined,
    "courtFeatures": string,
    "courtPriceForOneHour": string | undefined,
    "courtPriceForTwoHours": string | undefined,
    "courtPriceForFourHours": string | undefined,
    "courtPriceForFullDay": string | undefined,
    "isLessPlayerDiscountAvailable": boolean | undefined,
    "lessPlayerDiscountInPercent": number | undefined
}

export interface IFetchedCourt {
    "id": {
        "activityId": string,
        "facilityId": string
    }   ,
    "courtName": string,
    "courtFeatures": string,
    "courtPriceForOneHour": string,
    "courtPriceForTwoHours": string,
    "courtPriceForFourHours": string,
    "courtPriceForFullDay": string,
    "isLessPlayerDiscountAvailable": false ,
    "lessPlayerDiscountInPercent": number
}