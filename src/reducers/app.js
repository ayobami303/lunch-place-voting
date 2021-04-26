const initialState = {
  appLoading: false,
  venues: [],
  votes: {}
};

function app(state = initialState, action) {
  if (action.type === 'APP_LOADING') {
    return {
      ...state,
      appLoading: action.loading,
    };
  }

  if (action.type === 'VENUES') {
    const venuesArr = [...state.venues, action.payload];
    return {
      ...state,
      venues: venuesArr,
    };
  }
  
  if (action.type === 'RESET_VENUES') {
    return {
      ...state,
      venues: [],
    };
  }

  if (action.type === 'VOTES') {
    let  currentVotes = {...state.votes};
    const currentParticipant = currentVotes.participant ? currentVotes.participant: [];

    if(currentVotes[action.payload.vote]) {
      currentVotes[action.payload.vote] = currentVotes[action.payload.vote]+1;
    } else {
      currentVotes[action.payload.vote] = 1;
    }
    
    currentVotes.participant =  [...currentParticipant, {name: action.payload.participant, vote: action.payload.vote}];
    return {
      ...state,
      votes: currentVotes,
    };
  }

  return state;
}

export default app;
