import { createTimeTraveller } from './timeTraveller';

describe('TimeTraveller', () => {
    it('should apply new state and navigate through states with undo, redo, and jumpTo', () => {
        const timeTraveller = createTimeTraveller();

        const state1 = { value: 1 };
        const patch1 = [{ op: 'add', path: '/value', value: 2 }];
        const state2 = timeTraveller.apply(patch1, state1, ['operation1']);

        expect(state2).toEqual({ value: 2 });

        const state3 = timeTraveller.redo();
        expect(state3).toEqual({ value: 2 });

        const state4 = timeTraveller.undo();
        expect(state4).toEqual({ value: 1 });

        const state5 = timeTraveller.jumpTo(0);
        expect(state5).toEqual({ value: 1 });
    });

    it('should delete state and filter states based on tags', () => {
        const timeTraveller = createTimeTraveller();

        const state1 = { value: 1 };
        const patch1 = [{ op: 'add', path: '/value', value: 2 }];
        const state2 = timeTraveller.apply(patch1, state1, ['operation1']);

        const patch2 = [{ op: 'add', path: '/value', value: 3 }];
        const state3 = timeTraveller.apply(patch2, state2, ['operation2']);

        const filteredStates = timeTraveller.filterStates('operation1');
        expect(filteredStates).toHaveLength(1);

        const newStateAfterDelete = timeTraveller.delete(1);
        expect(newStateAfterDelete).toEqual({ value: 1 });
    });
});

