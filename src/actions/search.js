import querystring from 'querystring';
import { $http } from "../api";

export const getVenue = (location) => {
  return async function(dispatch){
    dispatch({type: 'APP_LOADING', loading: true});
    try {
      const venue = await $http.get('/explore?' + querystring.stringify({
        near: location,
        limit: 3,
        query: 'lunch',
        sortByPopularity: true
      }));

      if(venue.data.meta.code === 200){
        dispatch({type: 'RESET_VENUES'});

        if(venue.data.response.groups[0].items.length > 0) {
          const detailedVenues = await venue.data.response.groups[0].items.map(async (item, index) =>{
            try {
              const venueDetails = await $http.get('/' + item.venue.id);
             
              if(venueDetails.data.meta.code === 200){
                dispatch({type: 'VENUES', payload: venueDetails.data.response.venue});
              }
              if (venue.data.response.groups[0].items.length-1 === index) {
                dispatch({type: 'APP_LOADING', loading: false});
              }
              return;
            } catch (error) {
              return error;
            }
          })
        }
      }

    } catch (error) {
      dispatch({type: 'APP_LOADING', loading: false});

      alert('Something went wrong. Please try again.');
    }
  }
}