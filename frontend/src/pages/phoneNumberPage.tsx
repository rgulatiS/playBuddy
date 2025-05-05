import React from 'react';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import PhoneInput from "./phoneInput.tsx";

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

const PhoneNumberPage: React.FC = () => {
    const navigate = useNavigate();

    const handleValidSubmit = (phone: string) => {
        console.log('Sending OTP to:', phone);
        navigate('/verify', { state: { phone } });
    };

    return (
        <PageContainer>
            <Card>
                <Title>📱 Verify Your Phone</Title>
                <Subtitle>We'll send you a code to verify your number.</Subtitle>
                <PhoneInput onValidSubmit={handleValidSubmit} />
            </Card>
        </PageContainer>
    );
};

export default PhoneNumberPage;