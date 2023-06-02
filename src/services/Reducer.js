let initialState = {
  activeBot: 'none',
  activeBotInstance: null,
  listOfUsers: '123134',
};

export const botChangeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE-SIMPLE':
      return {
        ...state,
        activeBot: 'simple',
        activeBotInstance: action.body.activeBotInstance,
      };

    case 'CHANGE-RANDOM':
      return {
        ...state,
        activeBot: 'random',
        activeBotInstance: action.body.activeBotInstance,
      };

    default:
      return state;
  }
};
