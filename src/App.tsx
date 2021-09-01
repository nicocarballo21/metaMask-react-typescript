import Onboarding from "./components/onBoardingBtn";
import SendEth from "./components/sendEth";
import Encrypt from "./components/encrypt";
import styled from "styled-components";
import "./index.css";
import { WebProvider } from "./customHooks/useWeb3";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 0 10% 0 10%;
`;

function App() {
  return (
    <WebProvider>
      <Container>
        <Onboarding />
        <SendEth />
        <Encrypt />
      </Container>
    </WebProvider>
  );
}

export default App;
