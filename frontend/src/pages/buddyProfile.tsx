import React, {useState} from 'react';
import styled from 'styled-components';
import {IBuddy, IBuddyAddress} from "../interface/IBuddy.ts";
// import {useAppContext} from "../common/context.tsx";
import {useLocation} from "react-router-dom";
import {AiOutlineLoading} from "react-icons/ai";
import {registerBuddyService} from "../services/register-buddy-service.ts";
import {ErrorEmptyRow, ErrorRow} from "../common/styleComponent/error.tsx";
import {useAppContext} from "../common/context.tsx";


const Container = styled.div`
    display: flex;
    justify-content: center;
    padding: 2rem;
    background-color: #f3f4f6;
    min-height: 100vh;
`;

const Card = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
    max-width: 800px;
    width: 100%;
`;

const Section = styled.div`
    margin-bottom: 2rem;
`;
const Row = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-auto-flow: column;
    grid-column-gap: 10px;
    grid-row-gap: 1px;
    border-bottom: 2px solid #f3f4f6;
    margin: 5px;
    width: 100%;
`;

const Label = styled.div`
    box-sizing: border-box;
    color: #1c1e21;
    display: inline-block;
    font-family: SFProText-Medium, Helvetica, Arial, sans-serif;
    font-size: 15px;
    line-height: 36px;
    padding: 0 28px 0 10px;
    width: 100%;

    //font-size: 0.9rem;
    //color: #555;
    //margin-bottom: 0.25rem;
`;

const Value = styled.div`
    font-size: 1.1rem;
    font-weight: 500;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 6px;
`;

// const TextArea = styled.textarea`
//   width: 100%;
//   padding: 0.5rem;
//   min-height: 80px;
//   font-size: 1rem;
//   border: 1px solid #ccc;
//   border-radius: 6px;
// `;

const Button = styled.button<{ secondary?: boolean }>`
    background-color: ${(p) => (p.secondary ? '#e5e7eb' : '#2563eb')};
    color: ${(p) => (p.secondary ? '#111' : 'white')};
    border: none;
    padding: 0.6rem 1rem;
    font-size: 1rem;
    border-radius: 6px;
    margin-right: 0.5rem;
    cursor: pointer;

    &:hover {
        background-color: ${(p) => (p.secondary ? '#d1d5db' : '#1e40af')};
    }
`;

const BuddyProfile: React.FC = () => {
    const location = useLocation();
    const [profile, setProfile] = useState<IBuddy>(location.state.buddy);
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const appContext = useAppContext();
    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState(profile);

    const handleInputChange = (field: string, value: string) => {
        setDraft((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleAddressChange = (
        field: keyof IBuddyAddress,
        value: string
    ) => {
        setDraft((prev) => {
            const currentAddress: IBuddyAddress = prev.address ?? {
                addressType: 'buddyAddress',
                street: '',
                city: '',
                state: '',
                zip: '',
                country: '',
            };

            return {
                ...prev,
                address: {
                    ...currentAddress,
                    [field]: value,
                },
            };
        });
    };

    const saveChanges = () => {
        setProfile(draft);
        registerBuddyService(draft).then(e => {
            console.log(" Fetched" + e.status);
            if (e.status === 200) {
                console.log("e.status" + e.status);
                setTimeout(() => {
                    alert("Registered successfully " + e.data.buddyName);
                }, 2000)
                appContext.dispatch({type: 'ADD_BUDDY', appState: {...appContext.state, buddy: e.data}});

                // dispatch({type: 'UPDATE_CITY', appState: {...state, city: selectedCity}});
            } else {
                // setTimeout(() => {
                //     setShowResult(true);
                //     setResultMessage("Registered Failed, please retry");
                // }, 2000);
            }
            // setShowResult(false);
            // setResultMessage("");

        }).catch((err: any) => {
            setShowError(true);
            setErrorMessage(err.toString());
        })
        ;
        setIsEditing(false);
    };


    return (<div>
            {showError ? <ErrorRow isSuccess={false}>{errorMessage}</ErrorRow> : <ErrorEmptyRow> </ErrorEmptyRow>}
            {profile == null ? <AiOutlineLoading/> : <Container>
                <Card>
                    <h2>👤 Buddy Profile</h2>

                    <Section>
                        <Row><Label>Full Name</Label>
                            <Value>{profile.buddyName}</Value></Row>

                        <Row><Label>Date of Birth</Label>
                            <Value>{profile.buddyDob}</Value></Row>

                        <Row> <Label>Gender</Label>
                            <Value>{profile.gender}</Value></Row>

                        <Row><Label>Email</Label>
                            <Value>{profile.email}</Value></Row>

                        <Row><Label>Phone</Label>
                            <Value>{profile.phone}</Value></Row>
                    </Section>

                    <Section>
                        <h3>📍 Address</h3>
                        {isEditing ? (
                            <>
                                <Input
                                    placeholder="Street"
                                    value={draft.address?.street || ''}
                                    onChange={(e) => handleAddressChange('street', e.target.value)}
                                />
                                <Input
                                    placeholder="City"
                                    value={draft.address?.city || ''}
                                    onChange={(e) => handleAddressChange('city', e.target.value)}
                                />
                                <Input
                                    placeholder="State"
                                    value={draft.address?.state || ''}
                                    onChange={(e) => handleAddressChange('state', e.target.value)}
                                />
                                <Input
                                    placeholder="ZIP"
                                    value={draft.address?.zip || ''}
                                    onChange={(e) => handleAddressChange('zip', e.target.value)}
                                />
                                <Input
                                    placeholder="Country"
                                    value={draft.address?.country || ''}
                                    onChange={(e) => handleAddressChange('country', e.target.value)}
                                />
                            </>
                        ) : (
                            <>
                                <Row><Label>Street</Label><Value>{profile.address?.street}</Value></Row>
                                <Row><Label>City</Label> <Value>
                                    {profile.address?.city} {profile.address?.state} {profile.address?.zip}
                                </Value></Row>
                                <Row><Label>Country</Label> <Value>{profile.address?.country}</Value></Row>
                            </>
                        )}
                    </Section>

                    <Section>
                        <h3>🚨 Emergency Contact</h3>
                        {isEditing ? (
                            <>
                                <Input
                                    placeholder="Contact Name"
                                    value={draft.emergencyContact || ''}
                                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                                />
                                <Input
                                    placeholder="Contact Phone"
                                    value={draft.emergencyContactPhone || ''}
                                    onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                                />
                                <Input
                                    placeholder="Contact Email"
                                    value={draft.emergencyContactEmail || ''}
                                    onChange={(e) => handleInputChange('emergencyContactEmail', e.target.value)}
                                />
                            </>
                        ) : (
                            <>
                                <Row><Label>Contact Person</Label> <Value>{profile.emergencyContact}</Value></Row>
                                <Row><Label>Phone Number</Label> <Value>{profile.emergencyContactPhone}</Value></Row>
                                <Row><Label>Email</Label> <Value>{profile.emergencyContactEmail}</Value></Row>
                            </>
                        )}
                    </Section>

                    <Section>
                        {isEditing ? (
                            <>
                                <Button onClick={saveChanges}>Save</Button>
                                <Button secondary onClick={() => setIsEditing(false)}>
                                    Cancel
                                </Button>
                            </>
                        ) : (
                            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                        )}
                    </Section>
                </Card>
            </Container>}
        </div>
    );
};

export default BuddyProfile;