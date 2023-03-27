/*
import { act, renderHook } from '@testing-library/react-hooks';
import { TimeTravellerProvider } from './TimeTravellerProvider';
import { useTimeTravellerReducer } from './useTimeTravellerReducer';

const initialState = { count: 0 };
const reducer = (state, action) => {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        default:
            return state;
    }
};

describe('useTimeTravellerReducer', () => {
    it('should return the correct state and dispatch function', () => {
        const wrapper = ({ children }) => <TimeTravellerProvider>{children}</TimeTravellerProvider>;

        const { result } = renderHook(() => useTimeTravellerReducer(reducer, initialState), { wrapper });

        expect(result.current[0]).toEqual(initialState);

        act(() => {
            result.current[1]({ type: 'increment' });
        });

        expect(result.current[0]).toEqual({ count: 1 });
    });

    it('should link and unlink components correctly', () => {
        const wrapper = ({ children }) => <TimeTravellerProvider>{children}</TimeTravellerProvider>;

        const { result } = renderHook(() => useTimeTravellerReducer(reducer, initialState), { wrapper });

        act(() => {
            result.current[2].link('componentA', 'componentB');
        });

        expect(result.current[2].links).toEqual({ componentA: ['componentB'] });

        act(() => {
            result.current[2].unlink('componentA', 'componentB');
        });

        expect(result.current[2].links).toEqual({});
    });
});
*/
