

export interface IBuddyActivity {
    "activity": {"activityId": number},
    "selfDeclaredProficiency": string
}

export interface IBuddyAddress  {
    "addressType": "buddyAddress",
    "street": string,
    "city": string,
    "state": string,
    "zip": string,
    "country": string
};

export interface IBuddy {
    "buddyName": string,
    "buddyDob": string,
    "gender": string,
    "email": string,
    "phone": string,
    "emergencyContact"?: string | undefined | null,
    "emergencyContactPhone"?: string | undefined | null ,
    "emergencyContactEmail"?: string | undefined | null,
    "address"?:        IBuddyAddress | undefined | null
    ,
    "buddyActivities": IBuddyActivity[] | undefined | []
} ;