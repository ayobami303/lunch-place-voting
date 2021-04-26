import React from 'react';

import {
  StyledVenue,
  StyledRestaurant,
  StyledCategory,
  StyledRating,
  StyledParagraph,
  StyledIcon
} from './styled';

function Venue({venue, votes, mostVotes}) {
  if (!venue) 
    return null;

  return (
    <StyledVenue target="blank" href={venue.url || venue.shortUrl}>
      <StyledParagraph className="text-center" leading={mostVotes === votes && votes !== 0 }>
        {mostVotes === votes && votes !== 0 && <StyledIcon className="fas fa-check-circle" />}
        {mostVotes > votes && <br/>}
        <br/>
        <StyledRestaurant>{venue.name}</StyledRestaurant>
        <br/>
        <StyledCategory>
          {venue.categories !== undefined && venue.categories.map((category, index) => (
            <span key={index}>
              <span>{category.name}</span>
              {index < venue.categories.length-1 && `, `}
            </span>
          ))}
        </StyledCategory>
        <br/>
        <br/>
        <StyledRating>{venue.rating}</StyledRating>
      </StyledParagraph>
    </StyledVenue>
  )
}

Venue.defaultProps = {
  votes: 0,
  mostVotes: 0
}

export default Venue;
