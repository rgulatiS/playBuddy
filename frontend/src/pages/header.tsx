import styled from "styled-components";
import  {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {BsFillPersonLinesFill} from "react-icons/bs";
import {City} from 'country-state-city';
import {useAppContext} from "../common/context.tsx";
import {getLocationFromGeoCode} from "../services/opencagelocation.ts";
import {getAllActivities} from "../services/activity-service.ts";
// import {IActivity} from "../interface/IActivity.ts";
import {AiOutlineLoading} from "react-icons/ai";
import {ErrorEmptyRow, ErrorRow} from "../common/styleComponent/error.tsx";
import { FiLogOut } from 'react-icons/fi';

const HeaderGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    height: 55px;
    background-color: #282c34;
`;

const FlexStart = styled.div`
    display: flex;
    justify-content: flex-start;
    height: inherit;
    position: relative;
    margin-left: 5px;
`;
const FlexEnd = styled.div`
    display: flex;
    justify-content: flex-end;
    height: inherit;
    position: relative;
    margin-right: 5px;
`;

const FlexMiddle = styled.div`
    display: flex;
    align-items: center;
    justify-self: center;
    height: inherit;
    font-family: Arial, sans-serif;
    font-size: 18px;
    font-weight: 400;
    color: white;
    background-color: #282c34;
    border-radius: 6px;

`;


const Select = styled.select`
    font-family: Arial, sans-serif;
    font-size: 15px;
    width: 200px;
    padding: 0 8px 0 8px;
    border-radius: 5px;
    position: relative;
    //border: 1px solid #ccd0d5;
    background: transparent;
    //color: #1c1e21;
    color: darkgrey;

    &:hover {
        color: lightslategrey;
        background-color: white;

    }
`
// const Logo = styled.div`
//     font-family: Arial, sans-serif;
//     font-size: 20px;
//     font-weight: 800;
//     margin: auto;
//     text-align: left;
//     cursor: pointer;
//     color: white;
//     background-color: #282c34;
//     border: none;
//     &:hover {
//         color: #282c34;
//         background-color: white;
//         font-weight: 800;
//     }
// `
const ProfileIcon = styled.div`
    font-family: Arial, sans-serif;
    font-size: 35px;
    font-weight: 800;
    height: inherit;
    color: white;
    padding: 5px;
    margin: 0 10px 0 auto;
    text-align: right;
    cursor: pointer;
    border-radius: 6px;

    &:hover {
        color: #282c34;
        background-color: white;
    }
`

const Button = styled.button<{ width1: string }>`
    font-family: Arial, sans-serif;
    font-size: 20px;
    font-weight: 600;
    height: inherit;
    width: ${props => props.width1};
    color: white;
    background-color: #282c34;
    border: none;
    cursor: pointer;
    border-radius: 6px;

    &:hover {
        color: #282c34;
        background-color: white;

    }
`;

const StyledLogoutButton = styled.button`
    background: none;
    border: none;
    padding: 8px;
    cursor: pointer;
    color: #ff4d4f;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        color: #d9363e;
    }

    &:focus {
        outline: none;
    }
    
  //background-color: #ff4d4f;
  //color: white;
  //border: none;
  //padding: 10px 20px;
  //font-size: 1rem;
  //border-radius: 4px;
  //cursor: pointer;
  //transition: background-color 0.2s ease;
  //
  //&:hover {
  //  background-color: #d9363e;
  //}
  //
  //&:disabled {
  //  background-color: #ccc;
  //  cursor: not-allowed;
  //}
`;
// export enum  {
//     PENDING = 'pending',
//     SUCCESS = 'success',
//     ERROR = 'error',
// }
//
// function checkIFAlready
interface HeaderProps {
    title: string;
}


export function Header(props: HeaderProps) {
    // const [ city, setCity ] = useState<string>("Delhi");
    const navigate = useNavigate();

    const {state, dispatch} = useAppContext();
    // const [activities, setActivities] = useState<IActivity[]>([]);
    const [isActivityLoading, setIsActivityLoading] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    useEffect(() => {
        getAllActivities().then((response) => {
                setIsActivityLoading(true);
                if (response.status === 200) {
                    // setActivities(response.data);
                    dispatch({type: 'ADD_ACTIVITIES', appState: {...state, activities: response.data}});
                    console.log(response.data)
                    setIsActivityLoading(false);
                }
            }
        ).catch((err) => {
            setShowError(true);
            setErrorMessage("Activities not loaded" + err.toString());

        })
    }, [])

    // const handleLogin = () => {
    //     dispatch({ type: 'LOGIN', user: 'JohnDoe' });H
    // };

    const [coordinate, setCoordinate] = useState<{ lat: number; lng: number } | null>(null);
    const [errorFetchingCoordinate, setErrorFetchingCoordinate] = useState<string | null>(null);

    useEffect(() => {
        // Check if geolocation is available in the browser
        if (navigator.geolocation) {
            // Get the current position
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // On success, extract lat and lng from position and set state
                    const {latitude, longitude} = position.coords;
                    setCoordinate({lat: latitude, lng: longitude});
                },
                (err) => {
                    // On error, set the error state
                    setErrorFetchingCoordinate('Error getting geolocation: ' + err.message);
                },
                {
                    enableHighAccuracy: true,  // This requests a more accurate position
                    timeout: 5000,             // Timeout in milliseconds
                    maximumAge: 0              // Disables using cached location
                }
            );
        } else {
            setErrorFetchingCoordinate('Geolocation is not supported by this browser.');
        }
    }, []); // Empty array ensures this runs once on component mount

    useEffect(() => {
        if ((errorFetchingCoordinate?.length || 0) === 0 && coordinate != null) {
            console.log("coordinate " + coordinate.lat + " --" + coordinate.lng);
            const geoCode = (coordinate?.lat || "")?.toString().concat(' ').concat(coordinate?.lng.toString() || "");
            console.log(geoCode);
            getLocationFromGeoCode(geoCode)
                .then(res => {
                        if (res.status == 200) {
                            handleCityUpdate(res.data.results[0].components.city);
                        }
                    }
                ).catch(
                //need to ask for City Manually
                //pop up Please Select City
            )
        }
    }, [coordinate]);


    const handleCityUpdate = (selectedCity: string) => {
        dispatch({type: 'UPDATE_CITY', appState: {...state, city: selectedCity}});
    };
    const handleLogout = () => {
        return () =>
            dispatch({type: 'ADD_BUDDY', appState: {...state, buddy: null}});
    }

    return (isActivityLoading ? <AiOutlineLoading></AiOutlineLoading> :
            <div>
                {showError ? <ErrorRow isSuccess={false}>{errorMessage}</ErrorRow> : <ErrorEmptyRow> </ErrorEmptyRow>}

                {<HeaderGrid>
                    <FlexStart>
                        <Button key={"button"} width1={"120px"} onClick={() => navigate("/")}>{'playbuddy'}</Button>
                        <Select key={"CitySelect"} aria-label="City" name="City" id="city" title="City"
                                onChange={e => handleCityUpdate(e.target.value)}
                                value={state.city}

                        >
                            {City.getCitiesOfCountry("IN")?.map((lcity, index) => <option
                                key={index} value={lcity.name}> {lcity.name} {" - "}{lcity.stateCode}</option>)}
                        </Select>
                    </FlexStart>
                    <FlexMiddle>{props.title}</FlexMiddle>

                    <FlexEnd>
                        <ProfileIcon>
                            <BsFillPersonLinesFill title={"Account"}
                                                   onClick={() =>
                                                       state.buddy != null ? navigate("/myProfile", {state: state}) : navigate("/login")}> </BsFillPersonLinesFill>
                        </ProfileIcon>
                        {state.buddy != null ? (
                                <StyledLogoutButton onClick={handleLogout()} title={"title"} aria-label={"title"}>
                                    <FiLogOut />
                                </StyledLogoutButton>
                           ):  <></>}
                    </FlexEnd>

                </HeaderGrid>}
            </div>
    )
}
