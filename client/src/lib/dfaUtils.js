/**
 * DFA Utility Functions for Frontend Validation and Processing
 */

export const validateSequence = (config, sequence) => {
    let currentState = config.startState;
    for (const gesture of sequence) {
        if (config.transitions[currentState] && config.transitions[currentState][gesture]) {
            currentState = config.transitions[currentState][gesture];
        } else {
            return { isValid: false, lastState: currentState };
        }
    }
    return { 
        isValid: config.acceptStates.includes(currentState), 
        finalState: currentState 
    };
};

export const getProgress = (config, currentState) => {
    if (!config || !currentState) return 0;
    const index = config.states.indexOf(currentState);
    return index / (config.states.length - 1);
};

export const getStatusLabel = (config, state) => {
    return config?.labels?.[state] || state;
};
