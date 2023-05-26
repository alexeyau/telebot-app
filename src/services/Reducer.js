let initialState = {
  activeBot: 'none',
  activeBotInstance: null,
};

export const botChangeReducer = (state = initialState, action) => {
	switch(action.type) {
    case 'CHANGE-SIMPLE':
      const nextState = {
        ...state,
        activeBot: 'simple',
        activeBotInstance: action.body.activeBotInstance,
      };

      return nextState;
    case 'CHANGE-RANDOM':
      return {
        ...state,
        activeBot: 'random',
        activeBotInstance: action.body.activeBotInstance,
      };
    default: return state;
	}
};
