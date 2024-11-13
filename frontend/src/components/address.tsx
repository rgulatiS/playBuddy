import React, {useEffect, useState} from "react";
import {City, Country, State} from 'country-state-city';
import styled from "styled-components";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;
import {IAddress} from "../interface/IAddress";

const Row = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-flow: column;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    //&.item {
    //    display: flex;
    //    align-content: center;
    //    justify-content: center;
    //}
    margin: 5px;
    width: 600px;
`;
const Select = styled.select`
    font-family: Arial, sans-serif;
    font-size: 15px;
    line-height: 16px;
    width: 300px;
    padding: 11px;
    border-radius: 5px;
    position: relative;
    border: 1px solid #ccd0d5;
    background: transparent;
    color: #1c1e21;
`
const Input = styled.input<{ isInvalid?: boolean }>`
    font-family: Arial, sans-serif;
    font-size: 15px;
    line-height: 16px;
    width: 300px;
    padding: 11px;
    border-radius: 5px;
    position: relative;
    border: 1px solid ${({isInvalid}) => isInvalid ? "#8B0000FF" : "#ccd0d5"};
    background: transparent;
    color: #1c1e21;
`
const SmartLabel = styled.div`
    color: #606770;
    font-family: Arial, sans-serif;
    font-size: 12px;
    font-weight: bold;
    line-height: 20px;
    margin: 18px 0 0 5px;
    text-align: left;
`;

interface AddressProps {
    setAddress: any,
address: IAddress,
}

export function Address(props: AddressProps) {
    // // Address Later
    // const [buildingNo, setBuildingNo] = useState<string>("");
    // const [addressLine1, setAddressLine1] = useState<string>("");
    // const [addressLine2, setAddressLine2] = useState<string>("");
    // const [street, setStreet] = useState<string>("");
    // const [city, setCity] = useState<string>("");
    // const [state, setState] = useState<string>("DL");
    // // const [zipCode, setZipCode] = useState<string>("");
    // const [country, setCountry] = useState<string>("");

    // useEffect(() => {
    //     props.setAddress(
    //         {
    //             "buildingNo": buildingNo,
    //             "addressLine1": addressLine1,
    //             "addressLine2": addressLine2,
    //             "street": street,
    //             "city": city,
    //             "state": state,
    //             "zip": "",
    //             "country": country
    //         }
    //     )
    //     props.setSubmit(false);
    // }, [submit]);


    return (
        <div>
            <SmartLabel>Address<span style={{color: 'red'}}>*</span></SmartLabel>

            <div style={{
                borderStyle: "groove", margin: "5px", padding: "5px",
                borderRadius: "5px", background: "transparent"
            }}>

                <Row>
                    <div>
                        <SmartLabel>BuildingNo<span style={{color: 'red'}}>*</span></SmartLabel>
                        <Input type="input" name="buildingNo" placeholder={"Building No"}
                               onChange={e => props.setAddress({...props.address, "buildingNo": e.target.value})}
                            // onChange={onChangeFacilityOwnerName()}
                               value={props.address.buildingNo}/>
                    </div>
                    <div>
                        <SmartLabel>Street<span style={{color: 'red'}}>*</span></SmartLabel>
                        <Input type="input" name="street" placeholder={"Street"}
                               onChange={e => props.setAddress({...props.address, "street": e.target.value})}
                               value={props.address.street}/>
                    </div>
                </Row>
                <Row>
                    <div>
                        <SmartLabel>AddressLine2<span style={{color: 'red'}}>*</span></SmartLabel>
                        <Input type="input" name="addressLine1" placeholder={"Address Line 1"}
                               onChange={e => props.setAddress({...props.address, "addressLine1": e.target.value})}
                               value={props.address.addressLine1}/>
                    </div>
                    <div>
                        <SmartLabel>AddressLine2<span style={{color: 'red'}}>*</span></SmartLabel>
                        <Input type="input" name="addressLine2" placeholder={"Address Line 2"}
                               onChange={e => props.setAddress({...props.address, "addressLine2": e.target.value})}
                               value={props.address.addressLine2}/>
                    </div>
                </Row>

                <Row>
                    <div>
                        <SmartLabel>City<span style={{color: 'red'}}>*</span></SmartLabel>
                        <Select aria-label="City" name="City" id="city" title="City"
                                onChange={e => props.setAddress({...props.address, "city": e.target.value})}
                                value={props.address.city}>
                            {City.getCitiesOfState("IN", props.address.state)?.map((lcity) => <option
                                value={lcity.name}>{lcity.name}</option>)}
                        </Select>
                    </div>
                    <div>
                        <SmartLabel>State<span style={{color: 'red'}}>*</span></SmartLabel>


                        <Select aria-label="State" name="State" id="state" title="State"
                                onChange={e => props.setAddress({...props.address, "state": e.target.value})}
                                value={props.address.state}>
                            {State.getStatesOfCountry("IN")?.map((lstate) => <option
                                value={lstate.isoCode}>{lstate.name}</option>)}
                        </Select>
                    </div>

                    <div>
                        <SmartLabel>County<span style={{color: 'red'}}>*</span></SmartLabel>
                        <Select aria-label="Country" name="Country" id="country" title="Country"
                                onChange={e => props.setAddress({...props.address, "country": e.target.value})}
                                value={props.address.country} disabled={true}>
                            {<option
                                value={Country.getCountryByCode("IN")?.name}>{Country.getCountryByCode("IN")?.name}</option>}
                        </Select>
                    </div>
                </Row>
            </div>
        </div>);
}