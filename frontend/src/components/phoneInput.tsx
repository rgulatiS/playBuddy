import React, { useState } from 'react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

type Props = {
    onValidSubmit: (fullPhone: string) => void;
};

const PhoneInput: React.FC<Props> = ({ onValidSubmit }) => {
    const [countryCode, setCountryCode] = useState('+1');
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
        onValidSubmit(parsed.number); // returns E.164 format
    };

    return (
        <div>
            <label>Phone Number</label>
    <div style={{ display: 'flex', gap: '8px' }}>
    <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
    <option value="+1">🇺🇸 +1</option>
    <option value="+44">🇬🇧 +44</option>
    <option value="+91">🇮🇳 +91</option>
    </select>
    <input
    type="tel"
    placeholder="Enter number"
    value={number}
    onChange={(e) => setNumber(e.target.value)}
    />
    </div>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    <button onClick={handleSubmit}>Send Verification Code</button>
    </div>
    );
    };

    export default PhoneInput;