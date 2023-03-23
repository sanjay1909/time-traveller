import React, { createContext, useContext, useMemo } from 'react';
import { createTimeTraveller } from './timeTraveller';

const TimeTravellerContext = createContext(null);
/**
 * Provides TimeTraveller state management functionality using React context.
 * @param {{ initialState: object, snapshotInterval: number, children: React.ReactNode }} props
 * @returns {React.ReactElement}
 */
export const TimeTravellerProvider = ({ initialState = {}, snapshotInterval = 10, children }) => {
    const stateManager = useMemo(() => createTimeTraveller(snapshotInterval), [snapshotInterval]);

    return (
        <TimeTravellerContext.Provider value={{ stateManager, initialState }}>
            {children}
        </TimeTravellerContext.Provider>
    );
};

/**
 * A custom React hook to access TimeTraveller state management context.
 * @returns {object} An object containing the following properties:
 * - timeTraveller: { apply: function, undo: function, redo: function, delete: function, jumpTo: function, filterStatesByTags: function }
 * - initialState: object
 * @throws {Error} If the hook is used outside a TimeTravellerProvider component.
 */
export const useTimeTraveller = () => {
    const context = useContext(TimeTravellerContext);

    if (context === null) {
        throw new Error('useTimeTraveller must be used within a TimeTravellerProvider');
    }

    return context;
};
