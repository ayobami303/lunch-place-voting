import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';

import { StyledCard, StyledButton } from './styled';
import { getVenue } from '../actions'

function SearchBox(props) {
  const [location, setLocation] = useState('');

  function onLocationChange(e) {
    setLocation(e.target.value);
  }

  function onSearchPress(event) {
    event.preventDefault();
    const locationValue = event.target.elements['location'].value;

    props.getVenue(locationValue);
  }

  return (
    <StyledCard>
      <Form onSubmit={onSearchPress}>
        <Form.Row>
          <Col md={8} lg={6}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                value={location}
                name="location"
                type="text"
                placeholder="e.g Amsterdam"
                aria-describedby="location-description"
                onChange={onLocationChange}
              />
              <Form.Text
                className="text-muted"
                id="location-description"
              >
                Have another place in mind?
              </Form.Text>
            </Form.Group>
          </Col>
          <Col md={4} lg={2}>
            <StyledButton
              type="submit"
              disabled={location.trim().length <= 0}
              block
            >
              Search
            </StyledButton>
          </Col>
        </Form.Row>
      </Form>
    </StyledCard>
  )
}



export default connect(null, { getVenue })(SearchBox);
