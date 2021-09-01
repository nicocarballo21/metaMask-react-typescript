import { useState, useEffect, useRef } from "react";
import MetaMaskOnboarding from "@metamask/onboarding";
import Card from "../styledComponents/card";
import Status from "./status";

import styled from "styled-components";

const BtnsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ONBOARD_TEXT = "Click here to install MetaMask!";
const CONNECT_TEXT = "Connect";
const CONNECTED_TEXT = "Connected";

const OnboardingButton = () => {
  const [buttonText, setButtonText] = useState(ONBOARD_TEXT);
  const [isDisabled, setDisabled] = useState(false);
  const [accounts, setAccounts] = useState<string[]>([]);
  let onboarding: any = useRef();

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  useEffect(() => {
    const handleNewAccounts = (newAccounts: string[]) => {
      setAccounts(newAccounts);
    };

    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum.on("accountsChanged", handleNewAccounts);
      return () => {
        window.ethereum.off("accountsChanged", handleNewAccounts);
      };
    }
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        setButtonText(CONNECTED_TEXT);
        setDisabled(true);
        onboarding.current.stopOnboarding();
      } else {
        setButtonText(CONNECT_TEXT);
        setDisabled(false);
      }
    }
  }, [accounts]);

  const onClick = async () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      try {
        const newAccounts = await window.ethereum.request<string[]>({
          method: "eth_requestAccounts",
        });
        setAccounts(newAccounts);
        window.alert("Login success!");
      } catch (err) {
        console.log(err);
      }
    } else {
      onboarding.current.startOnboarding();
    }
  };

  return (
    <Card>
      <BtnsContainer>
        <button onClick={onClick} disabled={isDisabled}>
          {buttonText}
        </button>
        <Status />
      </BtnsContainer>
      <p>Account: {accounts}</p>
    </Card>
  );
};

export default OnboardingButton;
