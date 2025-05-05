import {ActivityName, IActivity} from "../interface/IActivity.ts";
import {MdSportsCricket} from "react-icons/md";
import {GiPoolTableCorner, GiShuttlecock} from "react-icons/gi";
import {FaPersonSwimming} from "react-icons/fa6";
import {ICourt, IFetchedCourt} from "../interface/ICourt.ts";


export function getActivityName(court: ICourt | IFetchedCourt, activities: IActivity[]) {
    return activities.find(activity => activity.activityId === parseInt(court.id.activityId))?.activityName || "";
}

export function getIconOfActivity(activityName: ActivityName) {
    switch (activityName) {
        case ActivityName.CRICKET :
            return <div><MdSportsCricket/></div>;
        case ActivityName.BADMINTON :
            return <div><GiShuttlecock/></div>;
        case ActivityName.SWIMMING :
            return <div><FaPersonSwimming/></div>;
        case ActivityName.POOL :
            return <div><GiPoolTableCorner/></div>;
        default:
            return <div></div>;
    }
}
