/*
import { renderHook, act } from '@testing-library/react-hooks';
import { TimeTravellerProvider, useTimeTraveller, useTimeTravellerReducer } from './TimeTravellerProvider';

const reducer = (state, action) => {
    switch (action.type) {
        case 'increment':
            return state + 1;
        case 'decrement':
            return state - 1;
        default:
            return state;
    }
};

describe('useTimeTravellerReducer', () => {
    it('updates state and tracks changes using reducer', () => {
        const wrapper = ({ children }) => (
            <TimeTravellerProvider initialState={{ count: 0 }}>{children}</TimeTravellerProvider>
        );
        const { result } = renderHook(() => {
            const { timeTraveller } = useTimeTraveller();
            const [count, dispatch] = useTimeTravellerReducer(reducer, 0);

            return { timeTraveller, count, dispatch };
        }, { wrapper });

        expect(result.current.count).toBe(0);

        act(() => {
            result.current.dispatch({ type: 'increment' });
        });

        expect(result.current.count).toBe(1);
        expect(result.current.timeTraveller.history.length).toBe(1);

        act(() => {
            result.current.dispatch({ type: 'decrement' });
        });

        expect(result.current.count).toBe(0);
        expect(result.current.timeTraveller.history.length).toBe(2);
    });
});
*/
