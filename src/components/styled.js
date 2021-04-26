import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

export const StyledCard = styled.div`
  margin: 20px 0;
  padding: 36px 24px;
  background-color: #f7f7f7;
`

export const StyledButton = styled(Button)`
  background-color: #554cb4;
  border-radius: 999px;

  &:active,
  &:focus,
  &:hover {
    background-color: #3f34b7;
  }

  &:disabled {
    background-color: #c4c4c4;
  }
`

export const StyledVenue = styled.a`
  color: #212529;

  &:hover {
    text-decoration: none;
    color: #212529;
  }
`
export const StyledParagraph = styled.p`
  margin-bottom: 0;
  padding: 14px;
  ${({leading}) => leading ? 'background-color: #f1f4e1;' : ''}
  &:hover {
    text-decoration: none;
    color: #212529;
    background-color: #e4e4e4;
  }
`

export const StyledRestaurant = styled.span`
  color: #554cb4;
  text-decoration: underline;
`

export const StyledCategory = styled.span`
  font-weight: normal;
  font-size: 14px;
`
export const StyledRating = styled.span``

export const StyledIcon = styled.i`
  font-size: 24px;
  color: #b7c747;
  margin: 12px 0;
`

export const StyledTableBox = styled.td`
  min-width: 200px;
`
