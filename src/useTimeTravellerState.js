import { useState } from 'react';
import { useTimeTraveller } from './TimeTravellerProvider';

/**
 * Custom useState hook with time-traveling functionality.
 * @param {*} initialValue - The initial state value.
 * @returns {[*, function]} - A tuple with the current state and a function to update the state.
 */
export const useTimeTravellerState = (initialValue) => {
    const [state, setState] = useState(initialValue);
    const { timeTraveller } = useTimeTraveller();

    const setTTState = (newState) => {
        const patch = createPatch(state, newState);
        const updatedState = timeTraveller.apply(patch);
        setState(updatedState);
    };

    return [state, setTTState];
};
