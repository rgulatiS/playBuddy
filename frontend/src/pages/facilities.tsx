import  {useEffect, useState} from 'react';
import {getFacilities} from "../services/register-facility-service";
import {IFacility} from "../interface/IFacility";
import {AiOutlineLoading} from "react-icons/ai";
// import styled from "styled-components";
// import { IActivity} from "../interface/IActivity";
// import {getAllActivities} from "../services/activity-service";
// import {ICourt, IFetchedCourt} from "../interface/ICourt";
// import {MdSportsCricket} from "react-icons/md";
// import {FaPersonSwimming} from "react-icons/fa6";
// import {GiPoolTableCorner, GiShuttlecock} from "react-icons/gi";
import {useAppContext} from "../common/context";
import FacilityCard from "./facilityCard.tsx";
import {IAddress} from "../interface/IAddress.ts";
import {ErrorEmptyRow, ErrorRow} from "../common/styleComponent/error.tsx";


//
// const TableContainer = styled.div`
//     font-family: Arial, sans-serif;
//     padding: 20px;
//     text-align: center;
// `;
//
// const Table = styled.table`
//     width: 60%;
//     margin: 20px auto;
//     border-collapse: collapse;
//     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
// `;
//
// const TableHeader = styled.th`
//     padding: 12px;
//     text-align: left;
//     background-color: #f4f4f4;
// `;
//
// const TableCell = styled.td`
//     padding: 12px;
//     text-align: left;
// `;
//
// const Cell = styled.td`
//     display: flex;
//     padding: 12px;
//     text-align: left;
//     column-gap: 2px;
// `;
//
// const TableRow = styled.tr`
//     &:nth-child(even) {
//         background-color: #f9f9f9;
//     }
//
//     &:hover {
//         background-color: #f1f1f1;
//     }
// `;

// const Heading = styled.h1`
//     font-size: 24px;
//     color: #333;
// `;

export function Facilities(/*props: any*/) {
    const [facilities, setFacilities] = useState<IFacility[]>([]);
    const [isFacilityLoading, setIsFacilityLoading] = useState<boolean>(false);
    // const [activities, setActivities] = useState<IActivity[]>([]);
    // const [isActivityLoading, setIsActivityLoading] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const appContext = useAppContext();




    // useEffect(() => {
    //     getAllActivities().then((response) => {
    //             setIsActivityLoading(true);
    //             if (response.status === 200) {
    //                 setActivities(response.data);
    //                 console.log(response.data)
    //                 setIsActivityLoading(false);
    //             }
    //         }
    //     ).catch((err) => {
    //         setShowError(true);
    //         setErrorMessage("Activities not loaded" + err.toString());
    //
    //     })
    // }, [])


    useEffect(() => {
        getFacilities(appContext.state.city).then((response) => {
            setIsFacilityLoading(true);
            if (response.status === 200) {
                setFacilities(response.data);
                setIsFacilityLoading(false)
            }
        }).catch((err) => {
            setShowError(true);
            setErrorMessage("Facilities not loaded" + err.toString());

        })
    }, [appContext.state.city]);


    // function getIconOfActivity(activityName: string) {
    //     if(activityName.match())
    // }





    const getAddressString  = (iAddress: IAddress | null ) : string => {
      return iAddress?.buildingNo + ", " + iAddress?.addressLine1 +", " + iAddress?.addressLine2+ ", "+ iAddress?.city;
    }

    return (
        isFacilityLoading  ? <AiOutlineLoading></AiOutlineLoading> :
<div>
    {showError ? <ErrorRow isSuccess={false}>{errorMessage}</ErrorRow> : <ErrorEmptyRow> </ErrorEmptyRow>}
    {
        facilities?.map((facility, findex) => facility.courts?.map((court, index) => {
            return (<FacilityCard key={findex + index} image={facility.profilePicture || ""}
                              name={facility.facilityName+ " "+ court.courtName}
                              description={getAddressString(facility.facilityAddress)}></FacilityCard>)}
        ))
    }



            {/*<TableContainer>*/}

            {/*    /!*<Heading>Facility Activities and Prices</Heading>*!/*/}
            {/*    <Table>*/}
            {/*        <thead>*/}
            {/*        <tr>*/}
            {/*            <TableHeader>Facility Name</TableHeader>*/}
            {/*            <TableHeader>Court Name</TableHeader>*/}
            {/*            <TableHeader>Feature</TableHeader>*/}

            {/*            <TableHeader>Price</TableHeader>*/}
            {/*        </tr>*/}
            {/*        </thead>*/}
            {/*        <tbody>*/}
            {/*        {facilities?.map((facility, findex) => (*/}
            {/*            facility.courts?.map((court, index) => (*/}
            {/*                */}
            {/*                */}
            {/*                */}
            {/*                <TableRow key={(findex + index)}>*/}
            {/*                    <TableCell>{facility.facilityName}</TableCell>*/}
            {/*                    <TableCell>{<Cell>{getIconOfActivity(getActivityName(court))}{" "} { court.courtName}</Cell>}</TableCell>*/}
            {/*                    <TableCell>{court.courtFeatures || ""}</TableCell>*/}
            {/*                    <TableCell>{court.courtPriceForOneHour || ""}</TableCell>*/}
            {/*                </TableRow>*/}
            {/*            ))*/}
            {/*        ))}*/}
            {/*        </tbody>*/}
            {/*    </Table>*/}
            {/*</TableContainer>*/}
</div>
    )
}