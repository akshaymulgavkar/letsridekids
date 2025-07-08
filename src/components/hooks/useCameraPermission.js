import React, { createContext, useState } from 'react';

const PermissionsContext = createContext();

function PermissionsProvider({ children }) {
    const [hasCameraPermissions, setHasCameraPermissions] = useState(null);

    return (
        <PermissionsContext.Provider value={[hasCameraPermissions, setHasCameraPermissions]}>
            {children}
        </PermissionsContext.Provider>
    );
}

export { PermissionsProvider, PermissionsContext };

// useCameraPermissions.js - custom hook
import { useContext, useEffect } from 'react';
import * as Permissions from 'expo-permissions';
import { PermissionsContext } from '../context/PermissionsContext';

export default function useCameraPermissions() {
    const [hasCameraPermissions, setHasCameraPermissions] = useContext(PermissionsContext);

    useEffect(() => {
        Permissions.askAsync(Permissions.CAMERA).then(({ status }) =>
            setHasCameraPermissions(status === 'granted'),
        );
    }, []);

    return hasCameraPermissions;
}