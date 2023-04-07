import { Geolocation, Geoposition } from '@awesome-cordova-plugins/geolocation';
import React, { useState } from 'react';

interface LocationError {
    showError: boolean;
    message?: string;
}

const GeolocationButton: React.FC = () => {
    const [error, setError] = useState<LocationError>({ showError: false });
    const [position, setPosition] = useState<Geoposition>();

    async function getLocation() {
        try {
            const position = await Geolocation.getCurrentPosition();
            setPosition(position);
            setError({ showError: false });
        } catch (e) {
            setError({ showError: true, message: e.message });
        }
    }

    getLocation();

    return (props);
};

export default GeolocationButton;