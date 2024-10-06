export interface IBuddyActivity {
    "activity": {"activityId": number},
    "selfDeclaredProficiency": string
}
export interface IRegisterBuddy {
    "buddyName": string,
    "buddyDob": string,
    "gender": string,
    "email": string,
    "phone": string,
    "emergencyContact"?: string | undefined | null,
    "emergencyContactPhone"?: string | undefined | null ,
    "emergencyContactEmail"?: string | undefined | null,
    "address"?:
        {
            "addressType": "buddyAddress",
            "street": string,
            "city": string,
            "state": string,
            "zip": string,
            "country": string
        } | undefined | null
    ,
    "buddyActivities": IBuddyActivity[] | undefined | []
} ;