/*
import { act, renderHook } from '@testing-library/react-hooks';
import { TimeTravellerProvider } from './TimeTravellerProvider';
import { useTimeTravellerState } from './useTimeTravellerState';

describe('useTimeTravellerState', () => {
    it('should return the correct state and setState function', () => {
        const wrapper = ({ children }) => <TimeTravellerProvider>{children}</TimeTravellerProvider>;

        const { result } = renderHook(() => useTimeTravellerState(0), { wrapper });

        expect(result.current[0]).toBe(0);

        act(() => {
            result.current[1](1);
        });

        expect(result.current[0]).toBe(1);
    });

    it('should link and unlink components correctly', () => {
        const wrapper = ({ children }) => <TimeTravellerProvider>{children}</TimeTravellerProvider>;

        const { result } = renderHook(() => useTimeTravellerState(0), { wrapper });

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
