// useTimeTravellerState.js
import { useState, useEffect, useCallback } from 'react';
import { useTimeTraveller, useComponentKey } from './TimeTravellerProvider';

export const useTimeTravellerState = (initialValue) => {
    const [state, setState] = useState(initialValue);
    const { timeTraveller, subscribe, unsubscribe, notify, link, unlink } = useTimeTraveller();
    const componentKey = useComponentKey();

    useEffect(() => {
        subscribe(componentKey, (newState) => {
            setState(newState);
        });
        return () => {
            unsubscribe(componentKey);
        };
    }, [componentKey, subscribe, unsubscribe]);

    const setTTState = useCallback(
        (newState) => {
            try {
                const patch = createPatch(state, newState);
                const updatedState = timeTraveller.apply(patch);
                notify(componentKey, updatedState);
            } catch (error) {
                console.error('Error while setting the Time Traveller state:', error);
            }
        },
        [state, timeTraveller, notify, componentKey]
    );

    return [state, setTTState, { link, unlink }];
};
