declare module 'time-traveller' {
    export interface TimeTraveller {
        apply: (operation: string, data: any, tags?: string[]) => any;
        undo: () => any;
        redo: () => any;
        delete: () => void;
        jumpTo: (index: number) => any;
        filterStatesByTags: (tags: string[]) => any[];
    }

    export function createTimeTraveller(initialState?: object): TimeTraveller;

    // React-specific types
    import * as React from 'react';

    export interface TimeTravellerProviderProps {
        children: React.ReactNode;
        initialState?: object;
    }

    export function TimeTravellerProvider(props: TimeTravellerProviderProps): JSX.Element;
    export function useTimeTraveller(): { timeTraveller: TimeTraveller; initialState: object };
    export function useTimeTravellerState<T>(initialState: T): [T, React.Dispatch<React.SetStateAction<T>>];
    export function useTimeTravellerReducer<T>(
        reducer: React.Reducer<T, any>,
        initialState: T,
        initializer?: undefined
    ): [T, React.Dispatch<any>];
}
