import React, {useState} from "react";
import styled from "styled-components";
import {GiCricketBat, GiPoolTableCorner, GiShuttlecock} from "react-icons/gi";
import {GrSwim} from "react-icons/gr";
import {IRegisterFacility} from "../interface/IRegisterFacility";
import {registerFacilityService} from "../services/register-facility-service";
import {isAfter} from "date-fns";
import {Address} from "./address";
import {IAddress} from "../interface/IAddress";


const Inpute = styled.input.attrs<{ $size?: string; }>(props => ({
    // we can define static props
    type: "text",

    // or we can define dynamic ones
    $size: props.$size || "1em",
}))`
    color: #BF4F74;
    font-size: 1em;
    border: 2px solid #BF4F74;
    border-radius: 3px;

    /* here we use the dynamically computed prop */
    margin: ${props => props.$size};
    padding: ${props => props.$size};
`;

// async function registerbuddy(formData:IRegisterBuddy) {
//     // 'use server'
//     // const productId = formData.get('productId')
//    return  await registerBuddyService(formData);
// }
const Input = styled.input<{ isInvalid?: boolean }>`
    font-family: Arial, sans-serif;
    font-size: 15px;
    line-height: 16px;
    width: 170px;
    padding: 11px;
    border-radius: 5px;
    position: relative;
    border: 1px solid ${({isInvalid}) => isInvalid ? "#8B0000FF" : "#ccd0d5"};
    background: transparent;
    color: #1c1e21;
`


const Select = styled.select`
    font-family: Arial, sans-serif;
    font-size: 15px;
    line-height: 16px;
    width: 120px;
    padding: 11px;
    border-radius: 5px;
    position: relative;
    border: 1px solid #ccd0d5;
    background: transparent;
    color: #1c1e21;
`

const Button = styled.button`
    font-family: Arial, sans-serif;
    font-size: 18px;
    line-height: 16px;
    width: 170px;
    padding: 11px;
    border-radius: 5px;
    position: relative;
    border: 1px solid #ccd0d5;
    background: green;
    color: white;
    cursor: pointer;
`;

const ActivityButton = styled.div<{ isSelected: boolean }>`
    font-family: Arial, sans-serif;
    font-size: 15px;
    line-height: 16px;
    min-width: 10px;
    padding: 11px;
    border-radius: 5px;
    position: relative;
    border: 1px solid ${({isSelected}) => isSelected ? "#006400FF" : "#000000"};
    background: ${({isSelected}) => isSelected ? "#D8D5D5FF" : "#ffffff"};
    color: ${({isSelected}) => isSelected ? "#488B00FF" : "#000000"};
    cursor: pointer;
`;

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
const Row = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-flow: column;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    //&.item {
    //    display: flex;
    //    align-content: center;
    //    justify-content: center;
    //}
    margin: 5px;
    width: 100px;

`;

const RegisterForm = styled.form`
    background-color: transparent;
    overflow: visible;
    padding: 0;
    margin: 30px 5px 5px 5px;
    width: auto;
    //margin-top: 30px;
`;


const GenderSpan = styled.span`
    background-color: #fff;
    border: 1px solid #ccd0d5;
    box-sizing: border-box;
    display: inline-block;
    flex: 1 0 auto;
    font-weight: normal;
    height: 36px;
    margin: 0 6px 6px 0;
    padding: 0;
    position: relative;
    width: auto;
    border-radius: 5px;
`;

const GenderLabel = styled.label`
    box-sizing: border-box;
    color: #1c1e21;
    display: inline-block;
    font-family: SFProText-Medium, Helvetica, Arial, sans-serif;
    font-size: 15px;
    line-height: 36px;
    padding: 0 28px 0 10px;
    width: 100%;
`;

const GenderInput = styled.input`
    width: 20px;
    height: 20px;
    margin: 5px;
    padding: 10px;
    border-radius: 5px;
`;


const SmartLabel = styled.div`
    color: #606770;
    font-family: Arial, sans-serif;
    font-size: 12px;
    font-weight: bold;
    line-height: 20px;
    margin: 18px 0 0 5px;
    text-align: left;
`;

const QuestionImage = styled.img`
    //background-image: url("/rsrc.php/v3/y4/r/EV7ny501e-i.png");
    background-size: auto;
    background-repeat: no-repeat;
    display: inline-block;
    line-height: 12px;
    color: #385898;
    cursor: pointer;
`;

function getDays() {
    const days: number[] = [];
    for (let i = 1; i < 32; i++) {
        // if (i < 10) {
        //     days.push("0".concat(i.toString()));
        // } else {
        //     days.push(i.toString())
        // }
        days.push(i);
    }
    return days;
}

function getYears() {
    const years: number[] = [];
    const year = new Date().getFullYear();
    for (let i = year; i < year + 2; i++) {
        years.push(i);
    }
    return years;
}

interface Month {
    name: string,
    seq: number
}


// const dummyRegisterBuddy : IRegisterBuddy = {
//     buddyDob: "",
//     buddyName: "",
//     email: "",
//     gender: "",
//     phone: "",
//     buddyActivities: [],
//     address: null
// }

// function getMonths(): Month[] {
//     return [{name: "Jan", seq: "01"}, {name: "Feb", seq: "02"}, {name: "Mar", seq: "03"},
//         {name: "Apr", seq: "04"}, {name: "May", seq: "05"}, {name: "Jun", seq: "06"},
//         {name: "Jul", seq: "07"}, {name: "Aug", seq: "08"}, {name: "Sep", seq: "09"},
//         {name: "Oct", seq: "10"}, {name: "Nov", seq: "11"}, {name: "Dec", seq: "12"}];
// }
function getMonths(): Month[] {
    return [{name: "Jan", seq: 1}, {name: "Feb", seq: 2}, {name: "Mar", seq: 3},
        {name: "Apr", seq: 4}, {name: "May", seq: 5}, {name: "Jun", seq: 6},
        {name: "Jul", seq: 7}, {name: "Aug", seq: 8}, {name: "Sep", seq: 9},
        {name: "Oct", seq: 10}, {name: "Nov", seq: 11}, {name: "Dec", seq: 12}];
}

function isNotNull(value: string | undefined | null) {
    return value !== undefined && value !== null && value !== "";
}

export function RegisterFacility() {
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [showResult, setShowResult] = useState<boolean>(false);
    const [resultMessage, setResultMessage] = useState<string>("");
    const [submit, setSubmit] = useState<boolean>(false);
    const [facilityName, setFacilityName] = useState<string>("");

    const [dayOfActivation, setDayOfActivation] = useState<number>((new Date()).getDate());
    const [monthOfActivation, setMonthOfActivation] = useState<number>((new Date()).getMonth() + 1);
    const [yearOfActivation, setYearOfActivation] = useState<number>((new Date()).getFullYear());


    const [ownerName, setOwnerName] = useState<string>("");
    const [ownerEmail, setOwnerEmail] = useState<string>("");
    const [ownerPhoneNumber, setOwnerPhoneNumber] = useState<string>("");

    const [isPocOwnerSame, setIsPocOwnerSame] = useState<boolean>(false);
    const [pocName, setPocName] = useState<string>("");
    const [pocEmail, setPocEmail] = useState<string>("");
    const [pocPhoneNumber, setPocPhoneNumber] = useState<string>("");

    const [password, setPassword] = useState<string>("");

    const dummyAddress = {
        "addressType": "facilityAddress",
        "gpsLocation": null,
        "buildingNo": "",
        "addressLine1": "",
        "addressLine2": "",
        "street": "",
        "city": "",
        "state": "DL",
        "zip": "",
        "country": "India"
    };

    const [address, setAddress] = useState<IAddress>(dummyAddress)
    // const [isActivityLoading, setIsActivityLoading] = useState<boolean>(true);
    // const [activities, setActivities] = useState<IActivity[]>([]);


    const nameRegex = new RegExp("^[a-zA-Z.][^0-9]*$");
    const nameRegexWithSpace = new RegExp("^[a-zA-Z\\s? .][^\\t\\n\\r0-9]*$");
    const phoneNumberRegex = new RegExp("^(\\+91[\\-\\s]?)?[0]?(91)?[789]\\d{9}$");
    const emailRegex = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$");

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
    // }, [""])

    function validateName(localName: string) {
        return !!(localName != null && localName.length > 0 && localName.match(nameRegexWithSpace));
    }


    function validatePhoneNumber(localPhoneNumber: string) {
        return localPhoneNumber != null && localPhoneNumber.length > 0 && localPhoneNumber.match(phoneNumberRegex)
    }

    function validateEmail(localEmail: string) {
        return localEmail != null && localEmail.length > 0 && localEmail.match(emailRegex)
    }

    function validatePassword(localPassword: string) {
        return localPassword != null && localPassword.length > 8 && localPassword.length < 14
            && localPassword.match(nameRegex)
    }


    function isMandatoryFieldsFilled() {
        return isNotNull(facilityName)
            && isNotNull(dayOfActivation.toString()) && isNotNull(monthOfActivation.toString()) && isNotNull(yearOfActivation.toString())
            && isNotNull(pocName) && isNotNull(pocPhoneNumber) && isNotNull(pocEmail)
            && isNotNull(ownerName) && isNotNull(ownerPhoneNumber) && isNotNull(ownerEmail)
            && isNotNull(password)
    }

    function validateActivationDate(year: number, month: number, day: number) {
        const activationDate = new Date(Number(year), Number(month) - 1, Number(day), 0, 0, 0, 0);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        if (isAfter(currentDate, activationDate)) {
            setShowError(true);
            setErrorMessage("Activation date cannot be less than today")
            return false;
        } else {
            setShowError(false);
            setErrorMessage("");
            return true;
        }
    }

    function validateFormFilledCorrectly() {
        return validateName(facilityName)
            && validateActivationDate(yearOfActivation, monthOfActivation, dayOfActivation)
            && validateName(pocName) && validateEmail(pocEmail) && validatePhoneNumber(pocPhoneNumber)
            && validateName(ownerName) && validateEmail(ownerEmail) && validatePhoneNumber(ownerPhoneNumber)

        //Need Address
        //Need Courts
    }


    function submitForm() {
        // const declaredActivities : IBuddyActivity[] = activities.filter((act)=>act.isSelected).map((act) =>
        //     {return ({activity: {activityId: act.activityId},
        //             selfDeclaredProficiency: "BEGINNER"})
        //     }
        // );

        const registerFacility: IRegisterFacility = {
            registeredOn: yearOfActivation.toString().concat("-").concat(monthOfActivation.toString()).concat("-").concat(dayOfActivation.toString()),
            facilityName: facilityName,
            facilityPocPhone: pocPhoneNumber,
            facilityPocEmail: pocEmail,
            facilityPocName: pocName,
            facilityOwnerPhone: ownerPhoneNumber,
            facilityOwnerEmail: ownerEmail,
            facilityOwnerName: ownerName,
            active: true,
            courts: [],
            facilityAddress: {
                addressType: "facilityAddress",
                gpsLocation: null,
                buildingNo: address?.buildingNo,
                addressLine1: address?.addressLine1,
                addressLine2: address?.addressLine2,
                street: address?.street,
                city: address?.city,
                state: address?.state,
                zip: "",
                country: address?.country
            }
        }
        registerFacilityService(registerFacility).then(e => {
            console.log(" Fetched" + e.status);
            if (e.status === 200) {
                console.log("e.status" + e.status);
                setTimeout(() => {
                    setShowResult(true);
                    setResultMessage("Registered successfully " + e.data);
                }, 2000)

            } else {
                setTimeout(() => {
                    setShowResult(true);
                    setResultMessage("Registered Failed, please retry");
                }, 2000);
            }
            setShowResult(false);
            setResultMessage("");

        }).catch((err: any) => {
            setShowError(true);
            setErrorMessage(err.toString());
        })
        ;

    }

    function validateAndSubmit() {
        return (() => {
            setSubmit(true);
            if (isMandatoryFieldsFilled()) {
                setShowError(true);
                setErrorMessage("Please fill Mandatory fields as required")
            }
            if (validateFormFilledCorrectly()) {
                submitForm();
            }
        })
    }


    function nameGenericValidation(localName: string, nameOf: string) {
        const errorMessage = nameOf.concat(" name is not filled correctly");
        if (validateName(localName)) {
            setShowError(false);
            setErrorMessage("");
        } else {
            setShowError(true);
            setErrorMessage(errorMessage);
        }
    }

    function onChangeFacilityName() {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            const localName = event.target.value;
            setFacilityName(localName);
            nameGenericValidation(localName, "Facility");
        }
    }

    function onChangeFacilityOwnerName() {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            const localName = event.target.value;
            setOwnerName(localName);
            if (isPocOwnerSame) {
                setPocName(localName);
            }
            nameGenericValidation(localName, "Facility Owner");
        }
    }

    function onChangeFacilityPocName() {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            const localName = event.target.value;
            setPocName(localName);
            nameGenericValidation(localName, "Facility Poc");
        }
    }

    function phoneNumberGenericValidation(localPhoneNumber: string, phoneOf: string) {
        const errorMessage = phoneOf.concat(" Phone Number is not filled correctly");
        if (validatePhoneNumber(localPhoneNumber)) {
            setShowError(false);
            setErrorMessage("");
        } else {
            setShowError(true);
            setErrorMessage(errorMessage);
        }
    }

    function onChangeOwnerPhoneNumber() {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            const localPhoneNumber = event.target.value;
            setOwnerPhoneNumber(localPhoneNumber);
            if (isPocOwnerSame) {
                setPocPhoneNumber(localPhoneNumber);
            }
            phoneNumberGenericValidation(localPhoneNumber, "Facility Owner");
        }
    }

    function onChangePocPhoneNumber() {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            const localPhoneNumber = event.target.value;
            setPocPhoneNumber(localPhoneNumber);
            phoneNumberGenericValidation(localPhoneNumber, "Facility Poc ");
        }
    }

    function emailGenericValidation(localEmail: string, emailOf: string) {
        const errorMessage = emailOf.concat(" email is not filled correctly")
        if (validateEmail(localEmail)) {
            setShowError(false);
            setErrorMessage("");
        } else {
            setShowError(true);
            setErrorMessage(errorMessage);
        }

    }

    function onChangeOwnerEmail() {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            const localEmail = event.target.value;
            setOwnerEmail(localEmail);
            if (isPocOwnerSame) {
                setPocEmail(localEmail);
            }
            emailGenericValidation(localEmail, "Facility Owner");
        }
    }

    function onChangePocEmail() {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            const localEmail = event.target.value;
            setPocEmail(localEmail);
            emailGenericValidation(localEmail, "Facility Poc");
        }
    }

    function onChangePassword() {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            const localPassword = event.target.value;
            setPassword(localPassword);
            if (validatePassword(localPassword)) {
                setShowError(false);
                setErrorMessage("");
            } else {
                setShowError(true);
                setErrorMessage("Password is not filled correctly");
            }
        }
    }


    function handlePocOwnerCheckBox() {
        setIsPocOwnerSame(!isPocOwnerSame);
        setPocName(ownerName);
        setPocEmail(ownerEmail);
        setPocPhoneNumber(ownerPhoneNumber);
    }

    function handleDayChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const value = Number(event.target.value);
        setDayOfActivation(value);
        validateActivationDate(yearOfActivation, monthOfActivation, value);
    }

    function handleMonthChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const value = Number(event.target.value);
        console.log("month", value);
        setMonthOfActivation(value);
        validateActivationDate(yearOfActivation, value, dayOfActivation);
    }

    function handleYearChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const value = Number(event.target.value);
        setYearOfActivation(value);
        validateActivationDate(value, monthOfActivation, dayOfActivation);
    }

    return (
        // isActivityLoading ?
        //     <RegisterForm><QuestionImage src={playBuddyLoading}>
        //     </QuestionImage></RegisterForm> :
        <RegisterForm id={"registerForm"}>
            {showResult ? <ErrorRow isSuccess={resultMessage.includes("success")}>{resultMessage}</ErrorRow> :
                <></>}
            {showError ? <ErrorRow isSuccess={false}>{errorMessage}</ErrorRow> : <ErrorEmptyRow> </ErrorEmptyRow>}
            <SmartLabel>Facility Name<span style={{color: 'red'}}>*</span></SmartLabel>
            <Row><Input type="input" name="facilityName" placeholder={"Facility Name"}
                        onChange={onChangeFacilityName()}
                        value={facilityName}/>
            </Row>


            <SmartLabel>Date of Activation<span style={{color: 'red'}}>*</span></SmartLabel>
            <Row>
                <Select aria-label="Day" name="Activationday_day" id="day" title="Day"
                        onChange={event => handleDayChange(event)}
                        value={dayOfActivation}>
                    {getDays().map((day) => <option value={day}>{day}</option>)}

                </Select>
                <Select aria-label="Month" name="Activationday_month" id="month" title="Month"
                        onChange={event => handleMonthChange(event)}
                        value={monthOfActivation}>
                    {getMonths().map((month, index) => <option key={month.seq}
                                                               value={month.seq}>{month.name + month.seq}</option>)}
                </Select>
                <Select aria-label="Year" name="Activationday_year" id="year" title="Year"
                        onChange={event => handleYearChange(event)}
                        value={yearOfActivation}>
                    {getYears().map((year) => <option value={year}>{year}</option>)}
                </Select>
            </Row>
            <SmartLabel>Owner Contact<span style={{color: 'red'}}>*</span>
                {/*<a id="Activationday-help" href="#"  title="Click for more information" role="button" >*/}
                {/*    <QuestionImage></QuestionImage></a>*/}
            </SmartLabel>
            <Row>
                <Input type="input" name="ownerName" placeholder={"Owner Name"}
                       onChange={onChangeFacilityOwnerName()}
                       value={ownerName}/>
                <Input type="input" name="ownerPhoneNumber" placeholder={"Owner Phone Number"}
                       onChange={onChangeOwnerPhoneNumber()}
                       value={ownerPhoneNumber}/>
                <Input type="email" name="ownerEmail" placeholder={"Owner Email"}
                       onChange={onChangeOwnerEmail()}
                       value={ownerEmail} aria-invalid={true}/>
            </Row>

            <SmartLabel>
                <GenderInput type="checkbox" id="isPocAndOwnerSame" name="isPocAndOwnerSame"
                    // value={isPocAndOwnerSame}
                    // defaultValue={false}
                             onClick={e => handlePocOwnerCheckBox()}
                />
                Are Point Of Contact(Poc) & Owner Same
                {/*<a id="Activationday-help" href="#"  title="Click for more information" role="button" >*/}
                {/*    <QuestionImage></QuestionImage></a>*/}
            </SmartLabel>

            <SmartLabel>Point Of Contact(Poc) Info <span hidden={isPocOwnerSame} style={{color: 'red'}}>*</span>
                {/*<a id="Activationday-help" href="#"  title="Click for more information" role="button" >*/}
                {/*    <QuestionImage></QuestionImage></a>*/}
            </SmartLabel>
            <Row>
                <Input type="input" name="ownerName" placeholder={"Poc Name"}
                       onChange={onChangeFacilityPocName()} disabled={isPocOwnerSame}
                       value={pocName}/>
                <Input type="input" name="ownerPhoneNumber" placeholder={"Poc Phone Number"}
                       onChange={onChangePocPhoneNumber()} disabled={isPocOwnerSame}
                       value={pocPhoneNumber}/>
                <Input type="email" name="ownerEmail" placeholder={"Poc Email"}
                       onChange={onChangePocEmail()} disabled={isPocOwnerSame}
                       value={pocEmail} aria-invalid={true}/>
            </Row>
            {/*<SmartLabel>Choose any 3 Activities*/}
            {/*    /!*<a id="Activationday-help" href="#"  title="Click for more information" role="button" >*!/*/}
            {/*    /!*    <QuestionImage></QuestionImage></a>*!/*/}
            {/*</SmartLabel>*/}
            {/*<Row>*/}
            {/*    {activities.map((activity) =>*/}
            {/*        <GenderSpan>*/}
            {/*            <ActivityButton isSelected={activity.isSelected}*/}
            {/*                            id={activity.activityId.toString()}*/}
            {/*                            onClick={updateActivities(activity)}*/}
            {/*                            key={activity.activityId}>*/}
            {/*                {*/}
            {/*                    // getImage(activity.activityName) +*/}
            {/*                    activity.activityName}*/}
            {/*            </ActivityButton>*/}
            {/*        </GenderSpan>*/}
            {/*    )}*/}

            {/*</Row>*/}
            <Address setAddress={setAddress} address={address}></Address>

            <SmartLabel> Password<span style={{color: 'red'}}>*</span>
                {/*<a id="Activationday-help" href="#"  title="Click for more information" role="button" >*/}
                {/*    <QuestionImage></QuestionImage></a>*/}
            </SmartLabel>
            <Row><Input type="password"
                // className="inputtext _58mg _5dba _2ph-" data-type="password"
                // autoComplete="new-password" name="reg_passwd__" id="password_step_input" aria-required="true"
                // placeholder="New Password" aria-label="New password" aria-describedby="js_fq"
                // aria-invalid="true"
                // aria-autocomplete="list"
                        name="password" placeholder={"New Password"}
                        onChange={onChangePassword()}
                        value={password} aria-invalid={true}
            /></Row>

            <Row style={{marginTop: "30px"}}>
                <Button type="button" onClick={validateAndSubmit()}>Register</Button>
            </Row>
        </RegisterForm>

    )
}