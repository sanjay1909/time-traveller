// timeTraveller.d.ts
declare module 'time-traveller' {
    export function createTimeTraveller(snapshotInterval?: number): object;

    export function TimeTravellerProvider(props: {
        snapshotInterval?: number;
        children: React.ReactNode;
    }): React.ReactElement;

    export function useTimeTraveller(): {
        timeTraveller: {
            apply: Function;
            undo: Function;
            redo: Function;
            jumpTo: Function;
            delete: Function;
            filterStates: Function;
        };
        subscribe: Function;
        unsubscribe: Function;
        notify: Function;
        link: Function;
        unlink: Function;
        links: object;
    };

    export function useTimeTravellerState(initialValue: any): [any, Function, object];

    export function useTimeTravellerReducer(
        reducer: (state: any, action: any) => any,
        initialState: any,
        initializer?: (initialArg: any) => any
    ): [any, (action: any) => void, object];

    export function useTimeTravellerGlobalState(globalKey: string, initialState: any): [any, Function, object];
}
