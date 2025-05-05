export enum ProficiencyLevel {
    BEGINNER,
    INTERMEDIATE,
    PROFESSIONAL,
    STATE,
    NATIONAL
}

export interface IActivity{
    "activityId": number,
    "activityName": ActivityName,
    "activityType": string,
    "description": string,
    "isSelected": boolean,
    "proficiency": ProficiencyLevel,
    "iconPath": string,
}

export enum ActivityName {
    CRICKET = 'Cricket',
    BADMINTON = 'Badminton',
    SWIMMING = 'Swimming',
    POOL = 'Pool',
}

