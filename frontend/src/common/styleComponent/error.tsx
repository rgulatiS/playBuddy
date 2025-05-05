import styled from "styled-components";


export const ErrorRow = styled.div<{ isSuccess: boolean }>`
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
export const ErrorEmptyRow = styled.div`
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