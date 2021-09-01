import Onboarding from './components/onBoardingBtn'
import SendEth from './components/sendEth'
import styled from 'styled-components'
import './index.css'

import Web3 from "web3"
const web3 = new Web3(Web3.givenProvider || "http://localhost:3000")

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
      <SendEth  web3={web3} />
    </Container>
   
  );
}

export default App;
