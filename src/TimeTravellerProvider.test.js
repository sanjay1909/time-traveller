// TimeTravellerProvider.test.js
import React, { useRef } from 'react';
import { render } from '@testing-library/react';
import { TimeTravellerProvider, useTimeTraveller } from './TimeTravellerProvider';

// ...
const TestComponent = React.forwardRef((props, ref) => {
    const contextValue = useTimeTraveller();
    ref.current = contextValue;
    return <div data-testid="test-component"></div>;
});
// ...


describe('TimeTravellerProvider', () => {
    it('should provide a valid context value', () => {
        const contextValueRef = { current: null };
        const { getByTestId } = render(
            <TimeTravellerProvider>
                <TestComponent ref={contextValueRef} />
            </TimeTravellerProvider>
        );

        const contextValue = contextValueRef.current;

        expect(contextValue).toHaveProperty('timeTraveller');
        expect(contextValue).toHaveProperty('subscribe');
        expect(contextValue).toHaveProperty('unsubscribe');
        expect(contextValue).toHaveProperty('notify');
        expect(contextValue).toHaveProperty('link');
        expect(contextValue).toHaveProperty('unlink');
        expect(contextValue).toHaveProperty('globalState');
        expect(contextValue).toHaveProperty('setGlobalState');
        expect(contextValue).toHaveProperty('links');
        expect(contextValue).toHaveProperty('undo');
        expect(contextValue).toHaveProperty('redo');
        expect(contextValue).toHaveProperty('jumpTo');
    });
});
