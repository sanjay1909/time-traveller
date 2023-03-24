/*
import { renderHook, act } from '@testing-library/react-hooks';
import { TimeTravellerProvider, useTimeTraveller, useTimeTravellerState } from './TimeTravellerProvider';

describe('useTimeTravellerState', () => {
    it('updates state and tracks changes', () => {
        const wrapper = ({ children }) => (
            <TimeTravellerProvider initialState={{ count: 0 }}>{children}</TimeTravellerProvider>
        );
        const { result } = renderHook(() => {
            const { timeTraveller } = useTimeTraveller();
            const [count, setCount] = useTimeTravellerState(0);

            return { timeTraveller, count, setCount };
        }, { wrapper });

        expect(result.current.count).toBe(0);

        act(() => {
            result.current.setCount(1);
        });

        expect(result.current.count).toBe(1);
        expect(result.current.timeTraveller.history.length).toBe(1);

        act(() => {
            result.current.setCount(2);
        });

        expect(result.current.count).toBe(2);
        expect(result.current.timeTraveller.history.length).toBe(2);
    });
});
*/
