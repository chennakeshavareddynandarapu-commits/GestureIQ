class DFA {
  constructor(config) {
    this.name = config.name;
    this.states = config.states;
    this.transitions = config.transitions;
    this.startState = config.startState;
    this.acceptStates = config.acceptStates || [];
    this.rejectStates = config.rejectStates || [];
    this.labels = config.labels || {};
    this.currentState = this.startState;
    this.history = [];
  }

  transition(gesture) {
    this.history.push(gesture);
    const nextStates = this.transitions[this.currentState];

    if (nextStates && nextStates[gesture]) {
      this.currentState = nextStates[gesture];
    } else {
      // If no transition exists for this gesture, it might be a loop or a reject
      // For this implementation, we'll stay in current state unless a reject is forced
      // unless the gesture is fundamentally different
    }

    const isAccepted = this.acceptStates.includes(this.currentState);
    const isRejected = this.rejectStates.includes(this.currentState);
    const statusLabel = this.labels[this.currentState] || this.currentState;

    // Progress estimation based on state index if possible
    const progress = this.states.indexOf(this.currentState) / (this.states.length - 1);

    return {
      newState: this.currentState,
      isAccepted,
      isRejected,
      progress,
      statusLabel,
      lastGesture: gesture
    };
  }

  reset() {
    this.currentState = this.startState;
    this.history = [];
    return this.currentState;
  }
}

module.exports = DFA;
