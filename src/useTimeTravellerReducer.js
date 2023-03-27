import { useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTimeTraveller } from './TimeTravellerProvider';

/**
 * Custom useReducer hook with time-traveling functionality.
 * @param {function} reducer - The reducer function.
 * @param {*} initialState - The initial state value.
 * @returns {[*, function]} - A tuple with the current state and a function to dispatch actions.
 */
export const useTimeTravellerReducer = (reducer, initialState) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [key] = useState(uuidv4());
    const { timeTraveller, subscribe, unsubscribe, notify } = useTimeTraveller();

    useEffect(() => {
        const callback = (newState) => {
            setState(newState);
        };
        subscribe(key, callback);
        return () => {
            unsubscribe(key);
        };
    }, [key, subscribe, unsubscribe]);

    const timeTravellerDispatch = (action) => {
        const currentState = state;
        const newState = reducer(currentState, action);
        if (currentState !== newState) {
            timeTraveller.apply(newState, currentState);
            notify(key, newState);
        }
        dispatch(action);
    };

    return [state, timeTravellerDispatch];
};
