import React from "react"

// import useStatusNetwork from "../customHooks/useStatusNetwork"
import Button from '../styledComponents/button'


const Status = () => {
//   const [getNetworkId, getChainId] = useStatusNetwork()

  return (
    <div>
      <Button> Network ID </Button>
      <Button> Chain ID </Button>
    </div>
  )
}

export default Status
