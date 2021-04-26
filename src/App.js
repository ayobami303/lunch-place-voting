import { Provider } from 'react-redux'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {store} from './store';
import { StyledHeading } from './styled';
import './App.css';
import { SearchBox } from './components';
import Results from './components/Results';

function App() {
  return (
    <Provider store={store}>
      <Container>
        <Row>
          <Col>
            <StyledHeading>LunchPlace</StyledHeading>
            <SearchBox />
            <Results />
          </Col>
        </Row>
      </Container>
    </Provider>
  );
}

export default App;
