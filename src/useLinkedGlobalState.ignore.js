/*
// useLinkedGlobalState.ignore.js
import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { TimeTravellerProvider, useLinkedGlobalState } from './TimeTravellerProvider';

describe('useLinkedGlobalState', () => {
    it('should return the correct global state and update function', () => {
        const wrapper = ({ children }) => <TimeTravellerProvider>{children}</TimeTravellerProvider>;

        const { result } = renderHook(() => useLinkedGlobalState('myKey', { count: 0 }), { wrapper });

        expect(result.current[0]).toEqual({ count: 0 });

        act(() => {
            result.current[1]({ count: 1 });
        });

        expect(result.current[0]).toEqual({ count: 1 });
    });

    it('should link and unlink components correctly', () => {
        const wrapper = ({ children }) => <TimeTravellerProvider>{children}</TimeTravellerProvider>;

        const { result } = renderHook(() => useLinkedGlobalState('myKey', { count: 0 }), { wrapper });

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
