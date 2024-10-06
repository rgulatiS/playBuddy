import styled from "styled-components";
import React, {useState} from "react";
import {BsFillPersonLinesFill} from "react-icons/bs";

import Playbuddy from '../playbuddy.jpg';
import {NavLink} from "react-router-dom";

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
const Profile = styled.div`
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

// export enum  {
//     PENDING = 'pending',
//     SUCCESS = 'success',
//     ERROR = 'error',
// }
//
// function checkIFAlready

export function Header() {

    // const [show, setShow] = useState<String>("")

    return (
        <HeaderGrid>
            <FlexStart>
                <Button width1={"120px"}>playbuddy</Button>
            </FlexStart>
            <div></div>

            <FlexEnd>
                <Profile >
                    <BsFillPersonLinesFill title={"Account"}> </BsFillPersonLinesFill>
                </Profile>
            </FlexEnd>

        </HeaderGrid>
    )
}