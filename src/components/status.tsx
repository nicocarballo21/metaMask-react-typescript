import useStatusNetwork from "../customHooks/useStatusNetwork"
import Button from '../styledComponents/button'


const Status = () => {
  const [getNetworkId, getChainId] = useStatusNetwork()

  return (
    <div>
      <Button onClick={getNetworkId}> Network ID </Button>
      <Button onClick={getChainId}> Chain ID </Button>
    </div>
  )
}

export default Status
