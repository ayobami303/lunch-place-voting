import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';

import Participant from './Participant';
import { StyledButton, StyledCard, StyledIcon, StyledTableBox } from './styled';
import Venue from './Venue';
import Vote from './Vote';
import { participantVote } from '../actions'

function Results(props) {
  const [participant, setParticipant] = useState('');
  const [vote, setVote] = useState('');

  if (props.venues.length <=0 && !props.appLoading){
    return null;
  }

  function onParticipantChange(e) {
    setParticipant(e.target.value);
  }
  
  function onVoteChange(e) {
    setVote(e.target.value);
  }

  function onAddParticipantPress(event) {
    event.preventDefault();
    const participantValue = event.target.elements['participant'].value;
    const voteValue = event.target.elements['vote'].value;

    setParticipant('');
    setVote('');

    props.participantVote(participantValue, voteValue);
  }

  function getHighestVote(votes) {
    if(!votes.participant) {
      return 0;
    }
    const votesObj = {...votes};
    delete votesObj.participant;
    
    if(votes.participant.length === 1) {
      return 1;
    }
    return Object.keys(votesObj).reduce((a, b) => votesObj[a] > votesObj[b] ? votesObj[a] : votesObj[b]);
  }
  
  return (
    <StyledCard>
      {props.appLoading && (
        <div className="d-flex justify-content-center p-3">
          <StyledIcon className="fas fa-spinner fa-pulse text-center"></StyledIcon>
        </div>
      )}
      {!props.appLoading && (
        <Form onSubmit={onAddParticipantPress}>
          <Table responsive className="bg-white">
            <thead>
              <tr>
                <th>Participants</th>
                {props.venues.map((venue, index) => (
                  <th className="p-0" key={index}>
                    <Venue
                      key={index}
                      venue={venue}
                      votes={props.votes[venue.id]}
                      mostVotes={getHighestVote(props.votes)}
                    />
                  </th>  
                ))}
              </tr>
            </thead>
            <tbody>
              {props.votes.participant !== undefined && props.votes.participant.length > 0 && props.votes.participant.map((item, index) => (
                <tr key={index}>
                  <td className="align-middle">
                    <Participant name={item.name} />
                  </td>
                  {props.venues.map((venue, index) => (
                    <td className="align-middle text-center" key={index}>
                      {item.vote === venue.id && <Vote />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <StyledTableBox className="align-middle">
                  <Form.Control
                    value={participant}
                    name="participant"
                    type="text"
                    placeholder="Tell us your name"
                    onChange={onParticipantChange}
                />
                </StyledTableBox>
                {props.venues.map((venue, index) => (
                  <StyledTableBox key={index}>
                    <Form.Check 
                      custom
                      type="radio"
                      id={venue.id}
                      value={venue.id}
                      name="vote"
                      label="I love this"
                      onChange={onVoteChange}
                      checked={vote === venue.id}
                    />
                  </StyledTableBox>
                ))}
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <StyledTableBox>
                  <StyledButton
                    type="submit"
                    className="float-right"
                    disabled={participant.trim().length <= 0 || vote.trim().length <= 0}
                  >
                    Add Participant
                  </StyledButton>
                </StyledTableBox>
              </tr>
            </tfoot>
          </Table>
        </Form>
      )}
    </StyledCard>
  )
}

const mapStateToProp = ({app}) => {
  const {appLoading, venues, votes} = app;
  return {
    appLoading,
    venues,
    votes
  }
}

export default connect(mapStateToProp, {participantVote})(Results);