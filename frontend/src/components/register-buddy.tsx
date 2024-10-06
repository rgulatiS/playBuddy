import React, {useEffect, useState} from "react";
import {IRegisterBuddy} from "../interface/IRegisterBuddy";
import {registerBuddyService} from "../services/register-buddy-service";
import styled from "styled-components";

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
    // &:hover{
        //     border: 2px solid ${props => props.isInvalid ? "#8B0000FF" : "#ccd0d5"};
    // }
    //
    // &:active{
        //     border: 2px solid ${props => props.isInvalid ? "#8B0000FF" : "#ccd0d5"};
    // }
    color: #1c1e21;
`
const Span = styled.span`
    font-family: Arial, sans-serif;
    font-size: 15px;
    line-height: 16px;
    width: 100px;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccd0d5;
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
    border: 3px solid  ${({isSuccess}) => isSuccess ? "#006400FF" : "#8B0000FF"};
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
    height: 36px;
    margin: 0;
    position: absolute;
    right: 10px;
    top: 0;
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

const QuestionImage = styled.i`
    //background-image: url("/rsrc.php/v3/y4/r/EV7ny501e-i.png");
    background-size: auto;
    background-repeat: no-repeat;
    display: inline-block;
    line-height: 12px;
    color: #385898;
    cursor: pointer;
`;

function getDays() {
    const days: string[] = [];
    for (let i = 1; i < 32; i++) {
        if (i < 10) {
            days.push("0".concat(i.toString()));
        } else {
            days.push(i.toString())
        }
    }
    return days;
}

function getYears() {
    const years: number[] = [];
    for (let i = 1905; i < 2025; i++) {
        years.push(i);
    }
    return years;
}

interface Month {
    name: string,
    seq: string
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

function getMonths(): Month[] {
    return [{name: "Jan", seq: "01"}, {name: "Feb", seq: "02"}, {name: "Mar", seq: "03"},
        {name: "Apr", seq: "04"}, {name: "May", seq: "05"}, {name: "Jun", seq: "06"},
        {name: "Jul", seq: "07"}, {name: "Aug", seq: "08"}, {name: "Sep", seq: "09"},
        {name: "Oct", seq: "10"}, {name: "Nov", seq: "11"}, {name: "Dec", seq: "12"}];
}

function isNotNull(firstName: string | undefined | null) {
    return firstName !== undefined && firstName !== null && firstName !== "";
}

export function RegisterBuddy() {
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [showResult, setShowResult] = useState<boolean>(false);
    const [resultMessage, setResultMessage] = useState<string>("");

    const [firstName, setFirstName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [dayOfBirth, setDayOfBirth] = useState<string>("01");
    const [monthOfBirth, setMonthOfBirth] = useState<string>("01");
    const [yearOfBirth, setYearOfBirth] = useState<string>("1980");
    const [gender, setGender] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    // const [registerBuddy, setRegisterBuddy] = useState<IRegisterBuddy>(dummyRegisterBuddy);
    // const [emergencyContactName , setEmergencyContactName] = useState<string>("");
    // const [emergencyContactPhone , setEmergencyContactPhone] = useState<string>("");
    // const [emergencyContactEmail , setEmergencyContactEmail] = useState<string>("");
    //
    // const [street, setStreet] = useState<string>("");
    // const [city, setCity] = useState<string>("");
    // const [state, setState] = useState<string>("");
    // const [zipCode, setZipCode] = useState<string>("");
    // const [country, setCountry] = useState<string>("");
    const nameRegex = new RegExp("^[a-zA-Z.][^0-9]*$");
    const nameRegexWithSpace = new RegExp("^[a-zA-Z\\s? .][^\\t\\n\\r0-9]*$");
    const phoneNumberRegex = new RegExp("^(\\+91[\\-\\s]?)?[0]?(91)?[789]\\d{9}$");
    const emailRegex = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$");

    function validateFirstName(localFirstName: string) {
        return !!(localFirstName != null && localFirstName.length > 0 && localFirstName.match(nameRegexWithSpace));
    }

    function validateSurname(localSurname: string) {
        return localSurname != null && localSurname.length > 0 && localSurname.match(nameRegex)
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

    function validateGender(localGender: string) {
        return localGender === "0" || localGender === "1"
    }

    function isMandatoryFieldsFilled() {
        return isNotNull(gender) && isNotNull(firstName) && isNotNull(surname)
            && isNotNull(dayOfBirth) && isNotNull(monthOfBirth) && isNotNull(yearOfBirth)
            && isNotNull(phoneNumber) && isNotNull(email)
            && isNotNull(password)
    }


    function validateFormFilledCorrectly() {
        return isMandatoryFieldsFilled()
            && validateFirstName(firstName) && validateSurname(surname)
            && validateEmail(email) && validatePhoneNumber(phoneNumber)
            && validateGender(gender)

    }


    function submitForm() {
        const registerBuddy: IRegisterBuddy = {
            buddyDob: yearOfBirth.toString().concat("-").concat(monthOfBirth.toString()).concat("-").concat(dayOfBirth.toString()).concat(" 00:00"),
            buddyName: firstName.concat(" ").concat(surname),
            email: email,
            gender: gender.toString(),
            phone: phoneNumber,
            buddyActivities: [],
            address: null
        }
        registerBuddyService(registerBuddy).then(e => {
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
       return (()=> { if (validateFormFilledCorrectly()) {
            submitForm();
        } else {
            setShowError(true);
            setErrorMessage("Please fill Mandatory fields as required")
        }
       })
    }


    function onChangeFirstName() {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            const localFirstName = event.target.value;
            setFirstName(localFirstName);
            if (validateFirstName(localFirstName)) {
                setShowError(false);
                setErrorMessage("");
            } else {
                setShowError(true);
                setErrorMessage("FirstName is not filled correctly");
            }
        }
    }

    function onChangePhoneNumber() {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            const localPhoneNumber = event.target.value;
            setPhoneNumber(localPhoneNumber);
            if (validatePhoneNumber(localPhoneNumber)) {
                setShowError(false);
                setErrorMessage("");
            } else {
                setShowError(true);
                setErrorMessage("PhoneNumber is not filled correctly");
            }
        }
    }

    function onChangeEmail() {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            const localEmail = event.target.value;
            setEmail(localEmail);
            if (validateEmail(localEmail)) {
                setShowError(false);
                setErrorMessage("");
            } else {
                setShowError(true);
                setErrorMessage("Email is not filled correctly");
            }
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

    function onChangeSurname() {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            const localSurname = event.target.value;
            setSurname(localSurname);
            if (validateSurname(localSurname)) {
                setShowError(false);
                setErrorMessage("");
            } else {
                setShowError(true);
                setErrorMessage("Surname is not filled correctly");
            }
        }
    }

    return (
        <RegisterForm id={"registerForm"}>
            {showResult ? <ErrorRow isSuccess={resultMessage.includes("success")}>{resultMessage}</ErrorRow> :
                <></>}
            {showError ? <ErrorRow isSuccess={false}>{errorMessage}</ErrorRow> : <ErrorEmptyRow> </ErrorEmptyRow>}
            <SmartLabel>Name<span style={{color: 'red'}}>*</span>
                {/*<a id="birthday-help" href="#"  title="Click for more information" role="button" >*/}
                {/*    <QuestionImage></QuestionImage></a>*/}
            </SmartLabel>
            <Row><Input type="input" name="firstName" placeholder={"FirstName"}
                        onChange={onChangeFirstName()}
                        value={firstName}
                // isInvalid={nameRegexWithSpace.test(firstName)}
            />
                <Input type="input" name="surname" placeholder={"Surname"}
                       onChange={onChangeSurname()}
                       value={surname}
                />
            </Row>


            <SmartLabel>Date of birth<span style={{color: 'red'}}>*</span>
                {/*<a id="birthday-help" href="#"  title="Click for more information" role="button" >*/}
                {/*    <QuestionImage></QuestionImage></a>*/}
            </SmartLabel>


            <Row>
                <Select aria-label="Day" name="birthday_day" id="day" title="Day"
                        onChange={event => setDayOfBirth(event.target.value)}
                        value={dayOfBirth}>
                    {getDays().map((day) => <option value={day}>{day}</option>)}

                </Select>
                <Select aria-label="Month" name="birthday_month" id="month" title="Month"
                        onChange={event => setMonthOfBirth(event.target.value)}
                        value={monthOfBirth}>
                    {getMonths().map((month, index) => <option value={month.seq}>{month.name}</option>)}
                </Select>
                <Select aria-label="Year" name="birthday_year" id="year" title="Year"
                        onChange={event => setYearOfBirth(event.target.value)}
                        value={yearOfBirth}>
                    {getYears().map((year) => <option value={year}>{year}</option>)}
                </Select>
            </Row>

            <SmartLabel>Gender<span style={{color: 'red'}}>*</span>
                {/*<a id="birthday-help" href="#"  title="Click for more information" role="button" >*/}
                {/*    <QuestionImage></QuestionImage></a>*/}
            </SmartLabel>
            <Row>
                <GenderSpan><GenderLabel>Female
                    <GenderInput type="radio" id="gender" name="gender"
                                 value={gender}
                                 onClick={e => setGender("1")}
                    /></GenderLabel></GenderSpan>
                <GenderSpan><GenderLabel>Male
                    <GenderInput type="radio" id="gender" name="gender"
                                 value={gender}
                                 onClick={e => setGender("0")}/>
                </GenderLabel></GenderSpan>
            </Row>

            <SmartLabel>Contact<span style={{color: 'red'}}>*</span>
                {/*<a id="birthday-help" href="#"  title="Click for more information" role="button" >*/}
                {/*    <QuestionImage></QuestionImage></a>*/}
            </SmartLabel>
            <Row><Input type="input" name="phoneNumber" placeholder={"PhoneNumber"}
                        onChange={onChangePhoneNumber()}
                        value={phoneNumber}/>
                <Input type="email" name="email" placeholder={"Email"}
                       onChange={onChangeEmail()}
                       value={email} aria-invalid={true}/>
            </Row>
            <SmartLabel> Password<span style={{color: 'red'}}>*</span>
                {/*<a id="birthday-help" href="#"  title="Click for more information" role="button" >*/}
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