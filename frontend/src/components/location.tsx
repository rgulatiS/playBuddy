import React, {useEffect, useState} from "react";

const GeolocationExample: React.FC = () => {
    // State to hold location data
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Check if geolocation is available in the browser
        if (navigator.geolocation) {
            // Get the current position
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // On success, extract lat and lng from position and set state
                    const { latitude, longitude } = position.coords;
                    setLocation({ lat: latitude, lng: longitude });
                },
                (err) => {
                    // On error, set the error state
                    setError('Error getting geolocation: ' + err.message);
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    }, []); // Empty array ensures this runs once on component mount

    return (
        <div>
            <h1>Geolocation Example</h1>
            {location ? (
                <div>
                    <p>Your location:</p>
                    <p>Latitude: {location.lat}</p>
                    <p>Longitude: {location.lng}</p>
                </div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <p>Loading your location...</p>
            )}
        </div>
    );
};

export default GeolocationExample;