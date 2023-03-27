import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { createTimeTraveller } from './timeTraveller';

const TimeTravellerContext = createContext(null);

const timeTravellerReducer = (state, action) => {
    switch (action.type) {
        case 'subscribe':
            return {
                ...state,
                subscribers: {
                    ...state.subscribers,
                    [action.componentKey]: action.callback,
                },
            };
        case 'unsubscribe':
            const newSubscribers = { ...state.subscribers };
            delete newSubscribers[action.componentKey];
            return {
                ...state,
                subscribers: newSubscribers,
            };
        case 'notify':
            if (
                state.subscribers.hasOwnProperty(action.componentKey) &&
                typeof state.subscribers[action.componentKey] === 'function'
            ) {
                state.subscribers[action.componentKey](action.newState);
            }
            return state;
        case 'link':
            return {
                ...state,
                links: {
                    ...state.links,
                    [action.sourceKey]: [...(state.links[action.sourceKey] || []), action.targetKey],
                },
            };
        case 'unlink':
            const updatedLinks = { ...state.links };
            if (updatedLinks[action.sourceKey]) {
                updatedLinks[action.sourceKey] = updatedLinks[action.sourceKey].filter(
                    (key) => key !== action.targetKey
                );
                if (updatedLinks[action.sourceKey].length === 0) {
                    delete updatedLinks[action.sourceKey];
                }
            }
            return {
                ...state,
                links: updatedLinks,
            };
        case 'setGlobalState':
            return {
                ...state,
                globalState: {
                    ...state.globalState,
                    [action.key]: action.value,
                },
            };
        default:
            return state;
    }
};

export const TimeTravellerProvider = ({ snapshotInterval = 10, children }) => {
    const timeTraveller = useMemo(() => createTimeTraveller(snapshotInterval), [snapshotInterval]);
    const [state, dispatch] = useReducer(timeTravellerReducer, { subscribers: {}, links: {}, globalState: {} });

    const undo = () => {
        const newState = timeTraveller.undo();
        const keysToUpdate = state.links[current];
        if (keysToUpdate) {
            keysToUpdate.forEach((key) => dispatch({ type: 'notify', componentKey: key, newState }));
        }
    };

    const redo = () => {
        const newState = timeTraveller.redo();
        const keysToUpdate = state.links[current];
        if (keysToUpdate) {
            keysToUpdate.forEach((key) => dispatch({ type: 'notify', componentKey: key, newState }));
        }
    };

    const jumpTo = (index) => {
        const newState = timeTraveller.jumpTo(index);
        const keysToUpdate = state.links[current];
        if (keysToUpdate) {
            keysToUpdate.forEach((key) => dispatch({ type: 'notify', componentKey: key, newState }));
        }
    };

    const value = useMemo(
        () => ({
            timeTraveller,
            undo,
            redo,
            jumpTo,
            subscribe: (componentKey, callback) =>
                dispatch({ type: 'subscribe', componentKey, callback }),
            unsubscribe: (componentKey) =>
                dispatch({ type: 'unsubscribe', componentKey }),
            notify: (componentKey, newState) =>
                dispatch({ type: 'notify', componentKey, newState }),
            link: (sourceKey, targetKey) =>
                dispatch({ type: 'link', sourceKey, targetKey }),
            unlink: (sourceKey, targetKey) =>
                dispatch({ type: 'unlink', sourceKey, targetKey }),
            links: state.links,
            setGlobalState: (key, value) =>
                dispatch({ type: 'setGlobalState', key, value }),
            globalState: state.globalState,
        }),
        [timeTraveller, dispatch, state.links, state.globalState, undo, redo, jumpTo]
    );

    return (
        <TimeTravellerContext.Provider value={value}>
            {children}
        </TimeTravellerContext.Provider>
    );
};

export const useTimeTraveller = () => {
    const context = useContext(TimeTravellerContext);

    if (context === null) {
        throw new Error('useTimeTraveller must be used within a TimeTravellerProvider');
    }

    return context;
};
