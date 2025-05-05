import React, { useState } from 'react';
import styled from 'styled-components';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

type Props = {
    onValidSubmit: (fullPhone: string) => void;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const InputRow = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Select = styled.select`
  padding: 0.6rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const Input = styled.input`
  padding: 0.6rem;
  font-size: 1rem;
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const Button = styled.button`
  padding: 0.7rem 1rem;
  font-size: 1rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  transition: background 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: #1e40af;
  }
`;

const ErrorText = styled.p`
  color: #dc2626;
  font-size: 0.9rem;
`;

const PhoneInput: React.FC<Props> = ({ onValidSubmit }) => {
    const [countryCode, setCountryCode] = useState('+91');
    const [number, setNumber] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        const fullPhone = `${countryCode}${number}`;
        const parsed = parsePhoneNumberFromString(fullPhone);

        if (!parsed || !parsed.isValid()) {
            setError('Invalid phone number');
            return;
        }

        setError('');
        onValidSubmit(parsed.number); // E.164 format
    };

    return (
        <Container>
            <label htmlFor="phone">Phone Number</label>
            <InputRow>
                <Select value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+91">🇮🇳 +91</option>
                </Select>
                <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                />
            </InputRow>
            {error && <ErrorText>{error}</ErrorText>}
            <Button onClick={handleSubmit}>Send Code</Button>
        </Container>
    );
};

export default PhoneInput;