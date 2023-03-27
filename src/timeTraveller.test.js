// timeTraveller.test.js
import { createTimeTraveller } from './timeTraveller';
import { applyPatch } from 'fast-json-patch';

describe('Time Traveller', () => {
    it('should apply patches correctly', () => {
        const timeTraveller = createTimeTraveller();

        const initialState = { a: 1, b: 2 };
        const patch1 = [{ op: 'replace', path: '/a', value: 2 }];
        const patch2 = [{ op: 'add', path: '/c', value: 3 }];

        const state1 = timeTraveller.apply(patch1, initialState);
        expect(state1).toEqual({ a: 2, b: 2 });

        const state2 = timeTraveller.apply(patch2, state1);
        expect(state2).toEqual({ a: 2, b: 2, c: 3 });
    });

    it('should undo and redo patches correctly', () => {
        const timeTraveller = createTimeTraveller();

        const initialState = { a: 1, b: 2 };
        const patch1 = [{ op: 'replace', path: '/a', value: 2 }];
        const patch2 = [{ op: 'add', path: '/c', value: 3 }];

        const state1 = timeTraveller.apply(patch1, initialState);
        const state2 = timeTraveller.apply(patch2, state1);

        const undoState = timeTraveller.undo();
        expect(undoState).toEqual(state1);

        const redoState = timeTraveller.redo();
        expect(redoState).toEqual(state2);
    });

    it('should jump to a specific state correctly', () => {
        const timeTraveller = createTimeTraveller();

        const initialState = { a: 1, b: 2 };
        const patch1 = [{ op: 'replace', path: '/a', value: 2 }];
        const patch2 = [{ op: 'add', path: '/c', value: 3 }];

        const state1 = timeTraveller.apply(patch1, initialState);
        const state2 = timeTraveller.apply(patch2, state1);

        const jumpState = timeTraveller.jumpTo(0);
        expect(jumpState).toEqual(initialState);

        const jumpState2 = timeTraveller.jumpTo(1);
        expect(jumpState2).toEqual(state1);
    });

    it('should delete a specific state correctly', () => {
        const timeTraveller = createTimeTraveller();

        const initialState = { a: 1, b: 2 };
        const patch1 = [{ op: 'replace', path: '/a', value: 2 }];
        const patch2 = [{ op: 'add', path: '/c', value: 3 }];

        const state1 = timeTraveller.apply(patch1, initialState);
        const state2 = timeTraveller.apply(patch2, state1);

        timeTraveller.delete(1);
        const currentState = timeTraveller.jumpTo(1);
        expect(currentState).toEqual(state2);
    });
});
