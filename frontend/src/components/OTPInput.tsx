import React, { useRef, useState } from 'react';

type Props = {
    onComplete: (code: string) => void;
};

const OTPInput: React.FC<Props> = ({ onComplete }) => {
    const [otp, setOtp] = useState(Array(6).fill(''));
    const inputs = useRef<Array<HTMLInputElement | null>>([]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;

        const updated = [...otp];
        updated[index] = value;
        setOtp(updated);

        if (value && index < 5) {
            inputs.current[index + 1]?.focus();
        }

        if (updated.every((v) => v)) {
            onComplete(updated.join(''));
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pasted = e.clipboardData.getData('text').slice(0, 6).split('');
        if (pasted.every((char) => /^\d$/.test(char))) {
            setOtp(pasted);
            pasted.forEach((char, i) => {
                if (inputs.current[i]) inputs.current[i]!.value = char;
            });
            onComplete(pasted.join(''));
        }
    };

    return (
        <div style={{ display: 'flex', gap: '8px' }}>
            {otp.map((_, i) => (
                <input
                    key={i}
                    ref={(el: HTMLInputElement | null) => {inputs.current[i] = el}}
                    type="text"
                    maxLength={1}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onPaste={handlePaste}
                    style={{ width: '2rem', textAlign: 'center', fontSize: '1.5rem' }}
                />
            ))}
        </div>
    );
};

export default OTPInput;