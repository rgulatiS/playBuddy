import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import OTPInput from '../components/OTPInput.tsx';
import styled from 'styled-components';
import {ErrorEmptyRow, ErrorRow} from "../common/styleComponent/error.tsx";
import {getBuddyByPhoneNumber} from "../services/register-buddy-service.ts";
import {useAppContext} from "../common/context.tsx";

const PageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: linear-gradient(145deg, #e0eafc, #cfdef3);
`;

const Card = styled.div`
    background-color: #fff;
    padding: 2.5rem;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 90%;
    text-align: center;
`;

const Title = styled.h2`
    margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
    font-size: 0.95rem;
    color: #666;
    margin-bottom: 1.5rem;
`;

const VerificationPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const phone = (location.state as { phone: string })?.phone;
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const appContext = useAppContext();

    const handleOTPComplete = (otp: string) => {
        console.log(`Verifying ${otp} for ${phone}`);
        if (otp === '123456') {
            console.log("response.status otp" + otp);
            getBuddyByPhoneNumber(phone).then(response => {
                console.log("response.status" + response.status);
                if (response.status == 200 && response.data != null) {
                    console.log("response.data.address?.city" + response.data.address?.city);
                    appContext.dispatch({type: 'ADD_BUDDY',
                        appState: {
                            ...appContext.state,
                            buddy: response.data,
                            city: response.data.address?.city || appContext.state.city,
                        }
                    });
                    navigate("/");
                }

            }).catch(error => {
                if (error.status === 404) {
                    navigate("/registerBuddy", {state: {phone}});
                } else {
                    console.log("response.status" + error);

                    setShowError(true);
                    setErrorMessage(error.message);
                }
            })


            // alert('Verified successfully!');

        } else {
            setShowError(true);
            setErrorMessage('Invalid OTP. Try again.');
        }
    };

    if (!phone) return <p>No phone number provided.</p>;

    return (
        <PageContainer>
            {showError ? <ErrorRow isSuccess={false}>{errorMessage}</ErrorRow> : <ErrorEmptyRow> </ErrorEmptyRow>}
            {<Card>
                <Title>🔐 Enter Verification Code</Title>
                <Subtitle>We sent a 6-digit code to <strong>{phone}</strong></Subtitle>
                <OTPInput onComplete={handleOTPComplete}/>
            </Card>}
        </PageContainer>
    );
};

export default VerificationPage;