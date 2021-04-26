export const participantVote = (participant, vote) => {
  return async function(dispatch){    
    dispatch({type: 'VOTES', payload: {participant, vote}});
  }
}