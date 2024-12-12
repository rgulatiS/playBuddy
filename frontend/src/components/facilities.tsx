import React, {useEffect, useState} from 'react';
import {getFacilities} from "../services/register-facility-service";
import {IFacility} from "../interface/IFacility";
import {AiOutlineLoading} from "react-icons/ai";
import styled from "styled-components";
import {IActivity} from "../interface/IActivity";
import {getAllActivities} from "../services/activity-service";
import {ICourt, IFetchedCourt} from "../interface/ICourt";


const ErrorRow = styled.div<{ isSuccess: boolean }>`
    display: grid;
    grid-template-columns: 1fr;
    box-sizing: border-box;
    margin: 5px;
    //width: 100%;
    font-family: Arial, sans-serif;
    font-size: 15px;
    line-height: 20px;
    padding: 11px;
    border-radius: 5px;
    position: relative;
    border: 3px solid ${({isSuccess}) => isSuccess ? "#006400FF" : "#8B0000FF"};
    background: ${({isSuccess}) => isSuccess ? "#488B00FF" : "#8B0000FF"};
    color: white;
`
const ErrorEmptyRow = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    box-sizing: border-box;
    margin: 5px;
    //width: 100%;
    font-family: Arial, sans-serif;
    font-size: 15px;
    line-height: 20px;
    padding: 11px;
    border-radius: 5px;
    position: relative;
    border: none;
    background: transparent;
    //color: white;
`

const TableContainer = styled.div`
    font-family: Arial, sans-serif;
    padding: 20px;
    text-align: center;
`;

const Table = styled.table`
    width: 60%;
    margin: 20px auto;
    border-collapse: collapse;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.th`
    padding: 12px;
    text-align: left;
    background-color: #f4f4f4;
`;

const TableCell = styled.td`
    padding: 12px;
    text-align: left;
`;

const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f9f9f9;
    }

    &:hover {
        background-color: #f1f1f1;
    }
`;

const Heading = styled.h1`
    font-size: 24px;
    color: #333;
`;

export function Facilities(props: any) {
    const [facilities, setFacilities] = useState<IFacility[]>([]);
    const [isFacilityLoading, setIsFacilityLoading] = useState<boolean>(false);
    const [activities, setActivities] = useState<IActivity[]>([]);
    const [isActivityLoading, setIsActivityLoading] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        getAllActivities().then((response) => {
                setIsActivityLoading(true);
                if (response.status === 200) {
                    setActivities(response.data);
                    console.log(response.data)
                    setIsActivityLoading(false);
                }
            }
        ).catch((err) => {
            setShowError(true);
            setErrorMessage("Activities not loaded" + err.toString());

        })
    }, [])


    useEffect(() => {
        getFacilities("Delhi").then((response) => {
            setIsFacilityLoading(true);
            if (response.status === 200) {
                setFacilities(response.data);
                setIsFacilityLoading(false)
            }
        }).catch((err) => {
            setShowError(true);
            setErrorMessage("Facilities not loaded" + err.toString());

        })
    }, []);

    function getActivityName(court: ICourt | IFetchedCourt) {
        return activities.filter(activity =>  activity.activityId === parseInt(court.id.activityId)).at(0)?.activityName || "";
    }

    return (
        isFacilityLoading || isActivityLoading ? <AiOutlineLoading></AiOutlineLoading> :
<div>
    {showError ? <ErrorRow isSuccess={false}>{errorMessage}</ErrorRow> : <ErrorEmptyRow> </ErrorEmptyRow>}

            <TableContainer>

                <Heading>Facility Activities and Prices</Heading>
                <Table>
                    <thead>
                    <tr>
                        <TableHeader>Facility Name</TableHeader>
                        <TableHeader>Activity</TableHeader>
                        <TableHeader>Price</TableHeader>
                    </tr>
                    </thead>
                    <tbody>
                    {facilities.map((facility, index) => (
                        facility.courts?.map((court, index) => (
                            <TableRow key={index}>
                                <TableCell>{facility.facilityName}</TableCell>
                                <TableCell>{getActivityName(court)}</TableCell>
                                <TableCell>{court.courtFeatures || ""}</TableCell>
                            </TableRow>
                        ))
                    ))}
                    </tbody>
                </Table>
            </TableContainer>
</div>
    )
}