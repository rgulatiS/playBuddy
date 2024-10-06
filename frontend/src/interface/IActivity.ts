export enum ProficiencyLevel {
    BEGINNER,
    INTERMEDIATE,
    PROFESSIONAL,
    STATE,
    NATIONAL
}

export interface IActivity{
    "activityId": number,
    "activityName": string,
    "activityType": string,
    "description": string,
    "isSelected": boolean,
    "proficiency": ProficiencyLevel
}

