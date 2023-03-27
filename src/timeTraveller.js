import { applyPatch } from 'fast-json-patch';

/**
 * Creates a new TimeTraveller instance.
 * @param {number} snapshotInterval - The interval between state snapshots.
 * @returns {object} An object containing the following functions:
 * - apply: function(patch: object[], state: object, tags: string[]=[]): object
 * - undo: function(): object
 * - redo: function(): object
 * - delete: function(): void
 * - jumpTo: function(index: number): object
 * - filterStatesByTags: function(tags: string[]): object[]
 */
export const createTimeTraveller = (snapshotInterval = 10) => {
    let states = [];
    let current = -1;

    const getStateAt = (index) => {
        let state = states[index].snapshot || states[Math.floor(index / snapshotInterval) * snapshotInterval].snapshot;
        for (let i = Math.floor(index / snapshotInterval) * snapshotInterval + 1; i <= index; i++) {
            state = applyPatch(state, states[i].action).newDocument;
        }
        return state;
    };

    const apply = (action, state, tags = []) => {
        const newState = applyPatch(state, action).newDocument;
        if (current < states.length - 1) {
            states = states.slice(0, current + 1);
        }
        states.push({ state: newState, action, tags });
        current++;
        if (current % snapshotInterval === 0) {
            states[current].snapshot = newState;
        }
        return newState;
    };

    const undo = () => {
        if (current > 0) {
            current--;
        }
        return getStateAt(current);
    };

    const redo = () => {
        if (current < states.length - 1) {
            current++;
        }
        return getStateAt(current);
    };

    const jumpTo = (index) => {
        if (index >= 0 && index < states.length) {
            current = index;
        }
        return getStateAt(current);
    };

    const deleteState = (index) => {
        if (index >= 0 && index < states.length) {
            states.splice(index, 1);
            if (current >= index) {
                current--;
            }
        }
        return getStateAt(current);
    };

    const filterStates = (tagFilter) => {
        return states.filter((state) => state.tags.includes(tagFilter));
    };

    const canUndo = () => {
        return current > 0;
    };

    const canRedo = () => {
        return current < states.length - 1;
    };

    return {
        apply,
        undo,
        redo,
        canUndo,
        canRedo,
        jumpTo,
        delete: deleteState,
        filterStates,
    };
};
