// useTimeTravellerGlobalState.js
import { useContext, useState, useEffect } from 'react';
import { useTimeTraveller } from './TimeTravellerProvider';

export const useLinkedGlobalState = (globalKey, initialState) => {
    const { timeTraveller, subscribe, unsubscribe, notify, link, unlink, links } = useTimeTraveller();
    const [state, setState] = useState(initialState);

    useEffect(() => {
        subscribe(globalKey, (newState) => setState(newState));
        return () => {
            unsubscribe(globalKey);
        };
    }, [globalKey, subscribe, unsubscribe]);

    const updateState = (newState) => {
        notify(globalKey, newState);
        setState(newState);
    };

    return [state, updateState, { link, unlink, links }];
};
