import styled from 'styled-components'
import './index.css'
import Onboarding from './components/onBoardingBtn'

const Container = styled.div `
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 0 200px 0 200px;
`

function App() {
  return (
    <Container>
      <Onboarding />
      <h2>hl</h2>
    </Container>
  
  );
}

export default App;
