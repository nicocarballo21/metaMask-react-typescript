import { useState, useEffect, useRef } from "react"
import MetaMaskOnboarding from "@metamask/onboarding"
import styled from 'styled-components'

import Button from '../styledComponents/button'
import Card from '../styledComponents/card'
import P from '../styledComponents/p'
import Status from "./status"


const BtnsContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

declare let window: any;
const ONBOARD_TEXT = "Click here to install MetaMask!"
const CONNECT_TEXT = "Connect"
const CONNECTED_TEXT = "Connected"

const OnboardingButton = () => {
  const [buttonText, setButtonText] = useState(ONBOARD_TEXT)
  const [isDisabled, setDisabled] = useState(false)
  const [accounts, setAccounts] = useState([])
  let onboarding: any = useRef()

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding()
    }
  }, [])

  useEffect(() => {
    const handleNewAccounts = (newAccounts: []) => {
      setAccounts(newAccounts)
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum.on("accountsChanged", handleNewAccounts)
      return () => {
        window.ethereum.off("accountsChanged", handleNewAccounts)
      }
    }
  }, [])

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        setButtonText(CONNECTED_TEXT)
        setDisabled(true)
        onboarding.current.stopOnboarding()
      } else {
        setButtonText(CONNECT_TEXT)
        setDisabled(false)
      }
    }
  }, [accounts])

  const onClick = async () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      try {
        const newAccounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        setAccounts(newAccounts)
        window.alert("Login success!")
      } catch (err) {
        console.log(err)
      }
    } else {
      onboarding.current.startOnboarding()
    }
  }

  return (
        <Card>
            <BtnsContainer>
                <Button onClick={onClick} disabled={isDisabled} >{buttonText}</Button>
                <Status/>
            </BtnsContainer>
            <P>Account: {accounts}</P>
        </Card>
  )
}

export default OnboardingButton
